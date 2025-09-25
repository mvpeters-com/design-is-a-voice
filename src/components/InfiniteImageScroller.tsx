"use client"

// Note: This implementation mimics Motion+ Ticker API
// Replace with actual Motion+ Ticker when you have access:
import { Ticker } from "motion-plus/react";

import { motion, useMotionValue, useMotionValueEvent, useAnimationFrame } from "motion/react"
import Image from "next/image"
import { useRef } from "react"
import postersData from "../posters.json"

interface Poster {
    path: string;
    name: string;
}

function PosterItem({ src, title }: { src: string; title: string }) {
    return (
        <motion.div className="w-[75vw] aspect-[2/1] overflow-hidden relative">
            <Image
                src={src}
                alt={title}
                fill
                className="object-cover select-none"
                sizes="75vw"
                draggable={false}
            />
        </motion.div>
    )
}

export default function InfiniteImageScroller() {
    const offset = useMotionValue(0)
    const isDragging = useRef(false)
    const lastOffset = useRef(0)
    const autoScrollSpeed = 30 // pixels per second

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

        lastOffset.current = latest
    })

    // Auto-scroll when not dragging
    useAnimationFrame((time, delta) => {
        if (!isDragging.current) {
            const movement = (autoScrollSpeed * delta) / 1000
            offset.set(offset.get() - movement)
        }
    })

    // Create poster items from your data
    const posterItems = postersData.map((poster: Poster) => (
        <PosterItem
            key={poster.name}
            src={poster.path}
            title={poster.name}
        />
    ))

    return (
        <>
            <Ticker
                drag="x"
                _dragX={offset} // Currently a private, but stable Motion API
                offset={offset}
                items={posterItems}
                className="ticker touch-none select-none cursor-grab active:cursor-grabbing w-screen"
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
