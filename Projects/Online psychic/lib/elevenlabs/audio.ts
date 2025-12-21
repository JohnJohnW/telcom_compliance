export class AudioCapture {
  private mediaStream: MediaStream | null = null
  private audioContext: AudioContext | null = null
  private mediaRecorder: MediaRecorder | null = null
  private sourceNode: MediaStreamAudioSourceNode | null = null
  private processorNode: ScriptProcessorNode | null = null
  private isRecording = false
  private onAudioDataCallbacks: ((audioData: ArrayBuffer) => void)[] = []
  private recordingInterval: number | null = null

  async startCapture(): Promise<void> {
    try {
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1, // Mono
          sampleRate: 16000, // 16kHz (common for voice)
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      // Try using MediaRecorder first (more modern approach)
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        try {
          this.mediaRecorder = new MediaRecorder(this.mediaStream, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 16000,
          })

          this.mediaRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0 && this.isRecording) {
              // Convert Blob to ArrayBuffer
              const arrayBuffer = await event.data.arrayBuffer()
              this.onAudioDataCallbacks.forEach(callback => callback(arrayBuffer))
            }
          }

          // Start recording with timeslice for chunked data
          this.mediaRecorder.start(100) // Get chunks every 100ms
          this.isRecording = true
          return
        } catch (error) {
          console.warn('MediaRecorder failed, falling back to ScriptProcessor:', error)
        }
      }

      // Fallback to ScriptProcessorNode (deprecated but widely supported)
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      })

      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream)

      const bufferSize = 4096
      this.processorNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1)

      this.processorNode.onaudioprocess = (event) => {
        if (!this.isRecording) return

        const inputBuffer = event.inputBuffer
        const inputData = inputBuffer.getChannelData(0)

        // Convert Float32Array to Int16Array (PCM format)
        const pcmData = new Int16Array(inputData.length)
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]))
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
        }

        const audioBuffer = pcmData.buffer
        this.onAudioDataCallbacks.forEach(callback => callback(audioBuffer))
      }

      this.sourceNode.connect(this.processorNode)
      this.processorNode.connect(this.audioContext.destination)

      this.isRecording = true
    } catch (error) {
      console.error('Error starting audio capture:', error)
      throw error
    }
  }

  stopCapture() {
    this.isRecording = false

    if (this.recordingInterval) {
      clearInterval(this.recordingInterval)
      this.recordingInterval = null
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
      this.mediaRecorder = null
    }

    if (this.processorNode) {
      this.processorNode.disconnect()
      this.processorNode = null
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect()
      this.sourceNode = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop())
      this.mediaStream = null
    }

    if (this.audioContext) {
      this.audioContext.close().catch(console.error)
      this.audioContext = null
    }
  }

  onAudioData(callback: (audioData: ArrayBuffer) => void) {
    this.onAudioDataCallbacks.push(callback)
  }

  removeAudioDataCallback(callback: (audioData: ArrayBuffer) => void) {
    const index = this.onAudioDataCallbacks.indexOf(callback)
    if (index > -1) {
      this.onAudioDataCallbacks.splice(index, 1)
    }
  }

  isCapturing(): boolean {
    return this.isRecording && this.mediaStream !== null
  }
}

export class AudioPlayback {
  private audioContext: AudioContext | null = null
  private audioQueue: ArrayBuffer[] = []
  private isPlaying = false
  private currentSource: AudioBufferSourceNode | null = null

  constructor() {
    // Initialize AudioContext on first user interaction (browser requirement)
  }

  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  async playAudio(audioData: ArrayBuffer, sampleRate: number = 22050) {
    try {
      await this.ensureAudioContext()

      if (!this.audioContext) {
        throw new Error('AudioContext not available')
      }

      console.log('playAudio called, data size:', audioData.byteLength, 'sampleRate:', sampleRate)

      // Try different audio formats
      // First, try to decode as standard audio format (MP3, WAV, etc.)
      try {
        const audioBuffer = await this.audioContext.decodeAudioData(audioData.slice(0))
        console.log('Successfully decoded audio:', {
          duration: audioBuffer.duration,
          sampleRate: audioBuffer.sampleRate,
          channels: audioBuffer.numberOfChannels
        })
        await this.playAudioBuffer(audioBuffer)
        return
      } catch (decodeError) {
        console.log('decodeAudioData failed, trying PCM format:', decodeError)
      }

      // If decode fails, try as PCM data
      // ElevenLabs typically sends PCM 16-bit mono audio
      try {
        // Try Int16 PCM first (most common)
        if (audioData.byteLength % 2 === 0) {
          const pcmData = new Int16Array(audioData)
          const floatData = new Float32Array(pcmData.length)
          
          for (let i = 0; i < pcmData.length; i++) {
            floatData[i] = Math.max(-1, Math.min(1, pcmData[i] / 32768.0))
          }

          const audioBuffer = this.audioContext.createBuffer(1, floatData.length, sampleRate)
          audioBuffer.getChannelData(0).set(floatData)
          
          console.log('Created PCM audio buffer:', {
            length: audioBuffer.length,
            duration: audioBuffer.duration,
            sampleRate: audioBuffer.sampleRate
          })
          
          await this.playAudioBuffer(audioBuffer)
          return
        }
      } catch (pcmError) {
        console.error('PCM conversion failed:', pcmError)
      }

      // Last resort: try as Float32
      try {
        if (audioData.byteLength % 4 === 0) {
          const floatData = new Float32Array(audioData)
          const audioBuffer = this.audioContext.createBuffer(1, floatData.length, sampleRate)
          audioBuffer.getChannelData(0).set(floatData)
          await this.playAudioBuffer(audioBuffer)
          return
        }
      } catch (floatError) {
        console.error('Float32 conversion failed:', floatError)
      }

      throw new Error('Unable to decode audio data in any known format')
    } catch (error) {
      console.error('Error playing audio:', error)
      throw error
    }
  }

  private async playAudioBuffer(audioBuffer: AudioBuffer) {
    if (!this.audioContext) return

    const source = this.audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(this.audioContext.destination)

    return new Promise<void>((resolve) => {
      source.onended = () => resolve()
      source.start(0)
    })
  }

  async setVolume(volume: number) {
    // Volume control would be implemented with a GainNode
    // Future enhancement: implement volume control using Web Audio API GainNode
  }

  stop() {
    if (this.currentSource) {
      this.currentSource.stop()
      this.currentSource = null
    }
    this.isPlaying = false
  }

  cleanup() {
    this.stop()
    if (this.audioContext) {
      this.audioContext.close().catch(console.error)
      this.audioContext = null
    }
  }
}

