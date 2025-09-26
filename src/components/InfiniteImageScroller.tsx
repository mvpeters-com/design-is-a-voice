"use client"

// Note: This implementation mimics Motion+ Ticker API
// Replace with actual Motion+ Ticker when you have access:
import { Ticker } from "motion-plus/react";

import { motion, useMotionValue, useMotionValueEvent, useAnimationFrame } from "motion/react"
import Image from "next/image"
import { useMemo, useRef, useState, useEffect } from "react"
import postersData from "../posters.json"

interface Poster {
    path: string;
    name: string;
}

function PosterItem({ src, title, priority = false }: { src: string; title: string; priority?: boolean }) {
    return (
        <motion.div className="w-[95vw] md:w-[75vw] aspect-[2/1] md:max-h-[600px] max-h-[calc(100vh-300px)] overflow-hidden relative">
            <Image
                src={src}
                alt={title}
                fill
                className="object-cover select-none"
                sizes="95vw"
                priority={priority}
                draggable={false}
            />
            <div className="text-white text-sm absolute bottom-0 left-0">{title}</div>
        </motion.div>
    )
}

export default function InfiniteImageScroller() {
    const offset = useMotionValue(0)
    const isDragging = useRef(false)
    const lastOffset = useRef(0)
    const autoScrollSpeed = 30 // pixels per second
    const [currentAuthor, setCurrentAuthor] = useState<string>("")

    // Randomized poster data (memoized to keep consistent order)
    const randomizedPosters = useMemo(() => {
        return [...postersData].sort(() => Math.random() - 0.5)
    }, [])

    // Calculate current author based on offset
    const calculateCurrentAuthor = (currentOffset: number) => {
        console.log(randomizedPosters);
        // Each image is approximately 95vw on mobile, 75vw on desktop
        // For calculation, let's use an average viewport width
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const imageWidth = viewportWidth < 768 ? viewportWidth * 0.95 : viewportWidth * 0.75

        // Calculate which image index should be most visible
        // The offset is negative as images move left
        const centerPosition = Math.abs(currentOffset);

        console.log("viewportWidth", viewportWidth, centerPosition);

        // Add half the image width to switch when the next image becomes more visible
        // This makes it switch at the 50% point instead of waiting for full center
        const adjustedPosition = centerPosition + (imageWidth * 0.5)
        const imageIndex = Math.floor(adjustedPosition / imageWidth) % randomizedPosters.length

        return randomizedPosters[imageIndex]?.name || ""
    }

    // Set initial author on mount
    useEffect(() => {
        const initialAuthor = calculateCurrentAuthor(offset.get())
        setCurrentAuthor(initialAuthor)
    }, [randomizedPosters])

    // Track when dragging starts/stops by monitoring offset changes
    useMotionValueEvent(offset, "change", (latest) => {
        const offsetDelta = Math.abs(latest - lastOffset.current)

        // If offset changed significantly, user is likely dragging
        if (offsetDelta > 1) {
            isDragging.current = true
            // Reset drag detection after a delay
            setTimeout(() => {
                isDragging.current = false
            }, 100)
        }

        // Update current author based on offset
        const newAuthor = calculateCurrentAuthor(latest)

        if (newAuthor !== currentAuthor) {
            setCurrentAuthor(newAuthor)
        }

        lastOffset.current = latest
    })

    // Auto-scroll when not dragging
    useAnimationFrame((time, delta) => {
        if (!isDragging.current) {
            const movement = (autoScrollSpeed * delta) / 1000
            offset.set(offset.get() - movement)
        }
    })

    // Create poster items with priority loading for first 3 and last item
    const posterItems = useMemo(() => {
        return randomizedPosters
            .map((poster: Poster, index: number) => {
                const isHighPriority = index < 3 || index === randomizedPosters.length - 1;

                return (
                    <PosterItem
                        key={poster.name}
                        src={poster.path}
                        title={poster.name}
                        priority={isHighPriority}
                    />
                )
            })
    }, [randomizedPosters])

    return (
        <>
            {/* Author name display in top right corner */}
            <motion.div
                className="fixed top-16 md:top-24 left-4 md:left-8 font-[16] text-[#E4230A]"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: currentAuthor ? 1 : 0,
                    y: currentAuthor ? 0 : -20
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <p className="text-sm font-medium whitespace-nowrap">
                    {currentAuthor}
                </p>
            </motion.div>

            <Ticker
                drag="x"
                _dragX={offset} // Currently a private, but stable Motion API
                offset={offset}
                items={posterItems}
                className="ticker bg-[#FFBDB5] touch-none select-none cursor-grab active:cursor-grabbing w-screen"
                velocity={0} // Disable built-in velocity, we'll handle it manually
                gap={0}
                hoverFactor={1} // No hover effect since we're managing it manually
            />
            <Stylesheet />
        </>
    )
}

/**
 * ==============   Styles   ================
 */
function Stylesheet() {
    return (
        <style jsx>{`
            .ticker {
                mask-image: linear-gradient(to right, transparent 5%, black 10%, black 90%, transparent 95%);
                touch-action: none;
                user-select: none;
                width: 100vw;
                cursor: grab;
            }

            .ticker:active {
                cursor: grabbing;
            }

        `}</style>
    )
}
