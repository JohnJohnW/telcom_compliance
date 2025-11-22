'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BreedResultPage() {
    const searchParams = useSearchParams()
    const imageUrl = searchParams.get('image')

    if (!imageUrl) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-4">No image found</h1>
                    <Link href="/" className="text-blue-500 hover:underline">Go back to feed</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-purple-50 to-white p-4 flex flex-col">
            <header className="mb-6 flex items-center justify-between">
                <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">It&apos;s a Match!</h1>
                <div className="w-10" /> {/* Spacer */}
            </header>

            <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full space-y-8">

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Generated Baby Dog" className="w-full h-full object-cover" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6 pt-20"
                    >
                        <h2 className="text-white text-2xl font-bold">Your Future Puppy</h2>
                        <p className="text-white/90">Isn&apos;t it adorable?</p>
                    </motion.div>
                </motion.div>                <div className="flex gap-4 w-full">
                    <button className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share
                    </button>
                    <button className="flex-1 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Save
                    </button>
                </div>

                <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 font-medium"
                >
                    Find another match
                </Link>
            </div>
        </div>
    )
}
