"use client";

import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import postersData from "../posters.json";

interface Poster {
    path: string;
    name: string;
}

export default function InfiniteImageScroller() {
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [viewportWidth, setViewportWidth] = useState(0);
    const x = useMotionValue(0);
    const animationRef = useRef<number>(0);

    // Duplicate the posters array to create seamless infinite scroll
    const duplicatedPosters = [...postersData, ...postersData, ...postersData];

    useEffect(() => {
        const updateViewportWidth = () => {
            setViewportWidth(window.innerWidth);
        };

        updateViewportWidth();
        window.addEventListener('resize', updateViewportWidth);
        return () => window.removeEventListener('resize', updateViewportWidth);
    }, []);

    const imageWidthPx = viewportWidth * 0.8; // 80vw in pixels
    const singleSetWidthPx = postersData.length * imageWidthPx;

    // Auto-scroll animation
    useAnimationFrame((time) => {
        if (!isAutoScrolling || singleSetWidthPx === 0) return;

        const speed = 0.5; // pixels per frame
        const currentX = x.get();
        let newX = currentX - speed;

        // Reset position when we've scrolled one full set
        if (newX <= -singleSetWidthPx) {
            newX = 0;
        }

        x.set(newX);
    });

    const handleDragStart = () => {
        setIsAutoScrolling(false);
    };

    const handleDragEnd = () => {
        // Resume auto-scrolling after a delay
        setTimeout(() => {
            setIsAutoScrolling(true);
        }, 2000);
    };

    const handleDrag = () => {
        // Ensure infinite loop during drag
        const currentX = x.get();
        if (currentX > singleSetWidthPx) {
            x.set(currentX - singleSetWidthPx);
        } else if (currentX < -singleSetWidthPx * 2) {
            x.set(currentX + singleSetWidthPx);
        }
    };

    if (viewportWidth === 0) return null; // Don't render until we have viewport width

    return (
        <div className="w-full overflow-hidden relative flex items-center">
            <motion.div
                className="flex"
                drag="x"
                dragConstraints={false}
                dragElastic={0}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                style={{
                    x,
                    width: `${duplicatedPosters.length * 80}vw`,
                }}
            >
                {duplicatedPosters.map((poster: Poster, index: number) => (
                    <div
                        key={`${poster.name}-${index}`}
                        className="flex-shrink-0"
                        style={{ width: "80vw" }}
                    >
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={poster.path}
                                alt={poster.name}
                                fill
                                className="object-cover select-none"
                                priority={index < 6} // Prioritize first few images
                                sizes="80vw"
                                draggable={false}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}