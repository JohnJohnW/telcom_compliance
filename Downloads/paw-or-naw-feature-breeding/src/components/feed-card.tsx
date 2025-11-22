'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
        }
    }
}

export function FeedCard({ dog, onSwipe, isTopCard }: { dog: any, onSwipe: (dir: 'paw' | 'naw') => void, isTopCard: boolean }) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-30, 30])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

    const isScooby = dog.name === 'Scooby Doo'
    
    // Only show the widget if we are actively viewing Scooby
    const shouldShowWidget = isScooby && isTopCard

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
            style={{ x: isTopCard ? x : 0, rotate: isTopCard ? rotate : 0, opacity: isTopCard ? opacity : 1, scale: isTopCard ? 1 : 0.95, zIndex: isTopCard ? 10 : 0 }}
            drag={isTopCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className="absolute top-0 left-0 w-full h-[500px] glass-card rounded-[32px] overflow-hidden cursor-grab touch-none ring-1 ring-black/5 shadow-xl border-white/40"
        >
            <div className="h-[60%] relative pointer-events-none transition-[height] duration-300">
                <img src={dog.photos[0] || '/placeholder-dog.png'} alt={dog.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-24">
                    <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{dog.name}</h2>
                    <p className="text-white/90 text-lg font-medium drop-shadow-sm tracking-wide">{dog.breed}</p>
                </div>
                
                {/* Breeding Button - Only interactable on top card */}
                <Link 
                    href={`/breed?partnerImage=${encodeURIComponent(dog.photos[0])}&partnerName=${dog.name}`}
                    className={`absolute top-4 right-4 bg-pink-500/30 hover:bg-pink-500/50 backdrop-blur-md p-3 rounded-full transition-all pointer-events-auto z-20 border border-pink-200/30 ${isTopCard ? '' : 'pointer-events-none opacity-0'}`}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                >
                    <Sparkles className="text-white w-6 h-6 drop-shadow-md" />
                </Link>
            </div>
            <div className={`px-6 py-4 h-[40%] transition-[height] duration-300 bg-white/50 backdrop-blur-sm pointer-events-none flex flex-col justify-center`}>
                <p className="text-gray-600 line-clamp-3">{dog.bio}</p>
            </div>
            
            {shouldShowWidget && (
                <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
                    <elevenlabs-convai agent-id="agent_9801kam9pardfedb3kbhmbx7cb1n"></elevenlabs-convai>
                </div>
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
