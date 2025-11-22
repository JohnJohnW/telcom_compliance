'use server'

import Replicate from 'replicate'
import fs from 'fs/promises'
import path from 'path'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

async function getImageDataUrl(imagePath: string): Promise<string> {
  if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
    return imagePath
  }

  // Remove leading slash if present to join correctly
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  const fullPath = path.join(process.cwd(), 'public', cleanPath)

  try {
    const imageBuffer = await fs.readFile(fullPath)
    const base64Image = imageBuffer.toString('base64')
    // Determine mime type based on extension
    const ext = path.extname(fullPath).toLowerCase()
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'
    return `data:${mimeType};base64,${base64Image}`
  } catch (error) {
    console.error(`Error reading image file: ${fullPath}`, error)
    // Fallback to placeholder if local file fails (e.g. in some environments)
    return imagePath
  }
}

export async function generateBabyDog(userDogImage: string, partnerDogImage: string) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      console.warn('REPLICATE_API_TOKEN is missing!');
      // Simulate delay for mock
      await new Promise(resolve => setTimeout(resolve, 3000))
      return {
        success: true,
        imageUrl: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=800&q=80' // A cute puppy
      }
    }

    const userImageUrl = await getImageDataUrl(userDogImage)
    const partnerImageUrl = await getImageDataUrl(partnerDogImage)

    // Revised prompt to emphasize biological blending rather than "combining" which can be interpreted as stitching.
    const prompt = "A photo of a single puppy that is a biological offspring of the two input dogs. The puppy naturally blends the breed characteristics, fur texture, and facial features of both parents. It should look like a real living animal, not a photoshop. High quality, photorealistic, 4k.";

    const input = {
        prompt: prompt,
        image_input: [userImageUrl, partnerImageUrl],
        size: "2K", 
        enhance_prompt: true, 
        sequential_image_generation: "disabled",
        max_images: 1,
        aspect_ratio: "1:1" 
    };
    
    console.log('Sending to Replicate bytedance/seedream-4 with refined prompt:', prompt);

    // @ts-ignore - types might not match exactly with the specific model output
    const output = await replicate.run("bytedance/seedream-4", { input });

    console.log('Replicate Output:', output);

    let imageUrl: string;
    // Handle various output formats from Replicate
    if (output && typeof output === 'object' && 'url' in output && typeof (output as any).url === 'function') {
        const urlVal = (output as any).url();
        imageUrl = String(urlVal);
    } else if (Array.isArray(output) && output.length > 0) {
        // If it returns an array of output objects/URLs, take the first one
        const firstItem = output[0];
        if (typeof firstItem === 'string') {
             imageUrl = firstItem;
        } else if (firstItem && typeof firstItem === 'object' && 'url' in firstItem) {
             const urlVal = typeof firstItem.url === 'function' ? firstItem.url() : firstItem.url;
             imageUrl = String(urlVal);
        } else {
             imageUrl = String(firstItem);
        }
    } else if (typeof output === 'string') {
        imageUrl = output;
    } else {
        console.error('Unexpected output format from Replicate:', output);
        throw new Error('Unexpected output format from Replicate');
    }

    return { success: true, imageUrl }

  } catch (error) {
    console.error('Error generating baby dog:', error)
    return { success: false, error: 'Failed to generate image' }
  }
}
