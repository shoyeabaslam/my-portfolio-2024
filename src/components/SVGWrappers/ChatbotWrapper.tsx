'use client'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const ChatbotWrapper = () => {
    const eyeBalls = useRef<(SVGCircleElement | null)[]>([])

    useEffect(() => {
        const eyeBallAnimation = () => {
            // Move left and right
            gsap.to(eyeBalls.current, {
                x: 5,
                duration: 1, // Slow down the animation
                ease: 'power1.inOut',
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Move up and down
                    gsap.to(eyeBalls.current, {
                        y: 5,
                        duration: 1, // Slow down the animation
                        ease: 'power1.inOut',
                        yoyo: true,
                        repeat: 1,
                        onComplete: () => {
                            gsap.to(eyeBalls.current, {
                                x: -5,
                                duration: 1,
                                ease: 'power1.inOut',
                                yoyo: true,
                                repeat: 1,
                                onComplete: () => {
                                    eyeBallAnimation()
                                }
                            })
                        }
                    })
                }
            })
        }

        eyeBallAnimation()
    }, [])

    return (
        <div>
            <svg width="100%" height="100%" viewBox="0 0 124 139" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
                <g id="Group 69">
                    <circle id="Ellipse 77" cx="62" cy="85" r="54" fill="#C335CD" />
                    <rect id="Rectangle 75" x="3" y="54" width="118" height="56" rx="28" fill="#FFFFFF" stroke="#C335CD" strokeWidth="6" />
                    <g id="Group 68">
                        <line id="Line 6" x1="64" y1="39" x2="64" y2="12" stroke="#C335CD" strokeWidth="4" />
                        <circle id="Ellipse 78" cx="64" cy="8" r="8" fill="#C335CD" />
                    </g>
                    <circle ref={(el) => { if (el) { eyeBalls.current[0] = el } }} id="Ellipse 79" cx="31" cy="83" r="7" fill="#FFFFFF" stroke='#C335CD' strokeWidth={6} />
                    <circle ref={(el) => { if (el) { eyeBalls.current[1] = el } }} id="Ellipse 80" cx="95" cy="83" r="7" fill="#FFFFFF" stroke='#C335CD' strokeWidth={6} />
                    <path id="Vector 5" d="M7.75761 136.926C21.9363 136.535 27.5636 133.988 36.7668 128.614L12.8029 104.82C17.5153 119.003 15.0141 125.688 7.75761 136.926Z" fill="#C335CD" />
                </g>
            </svg>
        </div>
    )
}

export default ChatbotWrapper
