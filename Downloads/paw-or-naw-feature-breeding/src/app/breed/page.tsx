'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_MY_DOG } from '@/lib/mock-data'
import { generateBabyDog } from './actions'
import { ArrowLeft, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'

const LOADING_MESSAGES = [
    "Analyzing DNA sequences...",
    "Extracting cuteness genes...",
    "Mixing fur patterns...",
    "Calculating ear floppiness...",
    "Consulting the doggy stork...",
    "Simulating puppy playtime...",
    "Measuring tail wag velocity...",
    "Optimizing for maximum boopability..."
]

export default function BreedPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const partnerImage = searchParams.get('partnerImage')
    const partnerName = searchParams.get('partnerName') || 'Partner'

    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isGenerating) {
            interval = setInterval(() => {
                setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
            }, 2000)
        }
        return () => clearInterval(interval)
    }, [isGenerating])

    const handleBreed = async () => {
        if (!partnerImage) return

        setIsGenerating(true)
        setError(null)

        try {
            const result = await generateBabyDog(MOCK_MY_DOG.photos[0], partnerImage)

            if (result.success && result.imageUrl) {
                // Encode the URL to pass it safely
                const encodedUrl = encodeURIComponent(result.imageUrl)
                router.push(`/breed/result?image=${encodedUrl}`)
            } else {
                setError(result.error || 'Something went wrong')
                setIsGenerating(false)
            }
        } catch {
            setError('Failed to generate')
            setIsGenerating(false)
        }
    }

    if (!partnerImage) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-pink-50">
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-4 text-pink-600">No partner selected</h1>
                    <Link href="/" className="text-pink-500 hover:underline">Go back to feed</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 to-white p-4 flex flex-col">
            <header className="mb-8 flex items-center">
                <Link href="/" className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-pink-600" />
                </Link>
                <h1 className="ml-4 text-2xl font-bold text-pink-600">Breeding Lab</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-12">

                {/* Parents Display */}
                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-pink-300 shadow-lg overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={MOCK_MY_DOG.photos[0]} alt={MOCK_MY_DOG.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="mt-2 font-bold text-pink-600">{MOCK_MY_DOG.name}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
                        </motion.div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-pink-300 shadow-lg overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={partnerImage} alt={partnerName} className="w-full h-full object-cover" />
                        </div>
                        <span className="mt-2 font-bold text-pink-600">{partnerName}</span>
                    </div>
                </div>

                {/* Action Area */}
                <div className="w-full flex flex-col items-center space-y-6 min-h-[200px] justify-center">
                    {isGenerating ? (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Outer spinning ring */}
                                <motion.div
                                    className="absolute inset-0 border-4 border-pink-200 rounded-full border-t-pink-500"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                                
                                {/* Middle reverse spinning ring */}
                                <motion.div
                                    className="absolute inset-4 border-4 border-pink-100 rounded-full border-b-pink-400"
                                    animate={{ rotate: -360 }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                />

                                {/* Inner pulsing circle */}
                                <motion.div
                                    className="absolute inset-8 bg-pink-50 rounded-full flex items-center justify-center border-2 border-pink-200"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <span className="text-6xl">🧬</span>
                                </motion.div>

                                {/* Floating particles */}
                                <motion.div 
                                    className="absolute top-0 right-4 text-2xl"
                                    animate={{ y: [0, -20, 0], opacity: [0, 1, 0], rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                    ✨
                                </motion.div>
                                <motion.div 
                                    className="absolute bottom-4 left-4 text-2xl"
                                    animate={{ y: [0, 20, 0], opacity: [0, 1, 0], rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                                >
                                    ❤️
                                </motion.div>
                                <motion.div 
                                    className="absolute top-4 left-4 text-2xl"
                                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                                >
                                    🐶
                                </motion.div>
                            </div>
                            
                            <div className="h-12 overflow-hidden relative w-full text-center px-4">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={loadingMessageIndex}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="text-pink-600 font-bold text-xl"
                                    >
                                        {LOADING_MESSAGES[loadingMessageIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleBreed}
                            className="w-full py-4 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-pink-300/50 transform transition-all active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                            Generate Baby
                        </button>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}
                </div>

                <div className="text-center text-pink-400 text-sm max-w-xs font-medium">
                    AI will analyze both parents to predict what their puppy might look like.
                </div>
            </div>
        </div>
    )
}
