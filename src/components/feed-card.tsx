'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import Script from 'next/script'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
        }
    }
}

export function FeedCard({ dog, onSwipe }: { dog: any, onSwipe: (dir: 'paw' | 'naw') => void }) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-30, 30])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

    const isScooby = dog.name === 'Scooby Doo'

    const handleDragEnd = (e: any, info: any) => {
        // Disable swipe if interacting with widget? No, maybe just let them swipe.
        if (info.offset.x > 100) {
            onSwipe('paw')
        } else if (info.offset.x < -100) {
            onSwipe('naw')
        }
    }

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className="absolute top-0 left-0 w-full h-[500px] glass-card rounded-[32px] overflow-hidden cursor-grab touch-none ring-1 ring-black/5"
        >
            <div className="h-[60%] relative pointer-events-none transition-[height] duration-300">
                <img src={dog.photos[0] || '/placeholder-dog.png'} alt={dog.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-24">
                    <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{dog.name}, {dog.age}</h2>
                    <p className="text-white/90 text-lg font-medium drop-shadow-sm tracking-wide">{dog.breed}</p>
                </div>
            </div>
            <div className={`px-6 py-4 h-[40%] transition-[height] duration-300 bg-white/50 backdrop-blur-sm pointer-events-none flex flex-col justify-center`}>
                <p className="text-gray-600 line-clamp-3">{dog.bio}</p>
            </div>
            
            {isScooby && (
                <>
                     <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
                        <elevenlabs-convai agent-id="agent_9801kam9pardfedb3kbhmbx7cb1n"></elevenlabs-convai>
                     </div>
                     <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
                </>
            )}
            
            {/* Visual indicators for swipe */}
             <motion.div style={{ opacity: useTransform(x, [0, 100], [0, 1]) }} className="absolute top-10 left-10 border-4 border-green-500 text-green-500 font-bold text-4xl p-2 rounded transform -rotate-12 pointer-events-none">
                PAW
            </motion.div>
            <motion.div style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }} className="absolute top-10 right-10 border-4 border-red-500 text-red-500 font-bold text-4xl p-2 rounded transform rotate-12 pointer-events-none">
                NAW
            </motion.div>
        </motion.div>
    )
}

