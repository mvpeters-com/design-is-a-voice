"use client"

// Note: This implementation mimics Motion+ Ticker API
// Replace with actual Motion+ Ticker when you have access:
import { Ticker } from "motion-plus/react";

import { motion, useMotionValue, useMotionValueEvent, useAnimationFrame } from "motion/react"
import Image from "next/image"
import { useMemo, useRef, useState, useEffect } from "react"
import postersData from "../posters.json"
import { useAtom } from "jotai";
import { authorAtom } from "@/name";

interface Poster {
    path: string;
    name: string;
}

function PosterItem({ src, title, priority = false }: { src: string; title: string; priority?: boolean }) {
    return (
        <motion.div className="w-[95vw] md:w-[75vw] aspect-[2/1] max-w-[1200px] overflow-hidden relative">
            <Image
                src={src}
                alt={title}
                fill
                className="object-cover select-none"
                sizes="(max-width: 768px) 95vw, 75vw"
                priority={priority}
                draggable={false}
            />
            <div className="text-white text-sm absolute bottom-0 left-0 opacity-0">{title}</div>
        </motion.div>
    )
}

export default function InfiniteImageScroller() {
    const offset = useMotionValue(0)
    const isDragging = useRef(false)
    const lastOffset = useRef(0)
    const autoScrollSpeed = 30 // pixels per second
    const imageWidth = useRef(0);

    const [currentAuthor, setCurrentAuthor] = useAtom(authorAtom)

    // Randomized poster data (memoized to keep consistent order)
    const randomizedPosters = useMemo(() => {
        return [...postersData].sort(() => Math.random() - 0.5)
    }, [])

    useEffect(() => {
        function resize() {
            let width = document.querySelector(".ticker img:first-child")?.clientWidth;
            console.log("width", width);
            imageWidth.current = width || 0;//select an image and get its widtrh
        }
        if (typeof window !== 'undefined') {
            window.addEventListener("resize", resize);
            resize();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("resize", resize);
            }
        }
    }, [])

    // Calculate current author based on offset
    const calculateCurrentAuthor = (currentOffset: number) => {
        // Each image is approximately 95vw on mobile, 75vw on desktop
        // For calculation, let's use an average viewport width
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        let imageW = imageWidth.current;

        // Calculate which image index should be most visible
        // The offset is negative as images move left
        const centerPosition = Math.abs(currentOffset);

        // Add half the image width to switch when the next image becomes more visible
        // This makes it switch at the 50% point instead of waiting for full center
        const adjustedPosition = centerPosition + (imageW * 0.5)
        const imageIndex = Math.floor(adjustedPosition / imageW) % randomizedPosters.length

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
            <Ticker
                drag="x"
                _dragX={offset} // Currently a private, but stable Motion API
                offset={offset}
                items={posterItems}
                className="ticker bg-[#FFBDB5] touch-none select-none cursor-grab active:cursor-grabbing"
                velocity={0} // Disable built-in velocity, we'll handle it manually
                gap={0}
                hoverFactor={1} // No hover effect since we're managing it manually
            />
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
