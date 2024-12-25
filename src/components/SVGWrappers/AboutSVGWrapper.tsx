import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import GearSvgWrapper from '../SVGWrappers/GearSvgWrapper';

gsap.registerPlugin(MotionPathPlugin);


const AboutSVGWrapper = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        console.log('e')
        gsap.to(containerRef.current, {
            filter: "drop-shadow(0 0 100px rgba(145, 112, 240, 0.5)) drop-shadow(0 0 45px #9170f070)",
            duration: 0.2,
            scale: 1.1,
            delay: 1.5,
            repeat: 0,
            ease: 'power1.in',
        });

        gsap.to('.entry-label textPath', {
            duration: 3,
            attr: { startOffset: '120%' },
            repeat: -1,
            ease: 'linear',
        });
        gsap.to('.exit-label textPath', {
            duration: 3,
            attr: { startOffset: '120%' },
            repeat: -1,
            ease: 'linear',
            delay: 2,
        });

    }, []);


    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div ref={containerRef} className='w-[100%]'>
                <svg width="100%" height="100%" viewBox="0 0 203 112" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
                    <mask id="mask0_115_1393" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="93" width="216" height="19">
                        <path d="M0 93.5L105.194 94.623C118.843 94.623 132.465 95.924 145.909 98.5114L216 112" fill="black" />
                    </mask>
                    <g mask="url(#mask0_115_1393)">
                        <path d="M0 93.5L105.194 94.623C118.843 94.623 132.465 95.924 145.909 98.5114L216 112" stroke="url(#paint0_radial_115_1393)" stroke-width="1.2" />
                    </g>
                    <defs>
                        <radialGradient id="paint0_radial_115_1393" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 93.5) scale(0)">
                            <stop stop-color="#FFE358" />
                            <stop offset="1" stop-color="#FFE358" stop-opacity="0" />
                        </radialGradient>
                    </defs>
                </svg>

            </div>
        </div>
    );
};

export default AboutSVGWrapper;
