'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'



const NavbarConfig = [
    {
        name: "Home",
        link: "#home"
    },
    {
        name: "About",
        link: "#about"
    },
    {
        name: "Projects",
        link: "#projects"
    },
    {
        name: "Contact",
        link: "#contact"
    }
]


const HorizontalNav = () => {
    return (
        <header className="fixed top-0 left-0 right-0 flex items-center justify-center p-3 z-[2000]">
            <div className='md:w-[90%] lg:w-[60%] flex items-center bg-cardColor/40 rounded-xl p-3 backdrop-blur-lg shadow-md border border-white/5  justify-between'>
                <div>
                    <nav className="w-full  flex items-center space-x-8 px-2">
                        {
                            NavbarConfig.map((config) => (
                                <Link key={config.name} href={config.link}><li className="list-none text-textColor hover:text-primaryColor cursor-pointer font-medium transition-all ease-in-out text-lg ">{config.name}</li></Link>
                            ))
                        }

                    </nav>
                </div>
                <div className='cursor-pointer font-medium transition-all ease-in-out '>
                    <Link href="mailto:shoyeab07@gmail.com" target='_blank'>
                        <button style={{
                            background: 'linear-gradient(359deg, hsl(296deg 70.76% 29.44%), hsl(296 95% 30% / 1))',
                            boxShadow: '5px 5px 10px rgb(0 0 0 / 30%), inset 5px 5px 8px hsl(296deg 80% 82% / 20%)',
                        }} className='text-lg px-3 py-2 rounded-md'>Let&apos;s Build Together</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}



const VerticalNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null)
    const handburgeLines = useRef<(HTMLDivElement | null)[]>([])
    useEffect(() => {

    }, [isOpen])
    const toggleHamburger = () => {
        setIsOpen(prev => {
            if (prev) {
                gsap.to(navRef.current, {
                    opacity: 1,
                    transform: 'scale(1)',
                    transformOrigin: 'top right',
                    duration: 0.5,
                    ease: 'power1.inOut',
                })

                gsap.to(handburgeLines.current[0],
                    {
                        transform: 'translateY(10px) rotate(45deg)',
                        transformOrigin: 'center',
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
                gsap.to(handburgeLines.current[1],
                    {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
                gsap.to(handburgeLines.current[2],
                    {
                        transform: 'translateY(-10px) rotate(-45deg)',
                        transformOrigin: 'center',
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
            } else {
                gsap.to(navRef.current, {
                    opacity: 0,
                    transform: 'scale(0)',
                    transformOrigin: 'top right',
                    duration: 0.4,
                    ease: 'power1.inOut',
                })


                gsap.to(handburgeLines.current[0],
                    {
                        transform: 'translateY(0) rotate(0)',
                        transformOrigin: 'center',
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
                gsap.to(handburgeLines.current[1],
                    {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
                gsap.to(handburgeLines.current[2],
                    {
                        transform: 'translateY(0) rotate(0)',
                        transformOrigin: 'center',
                        duration: 0.5,
                        ease: 'power1.inOut'
                    }
                )
            }
            return !prev
        });

    };

    return (
        <header className='fixed flex flex-col z-[2000] right-0 top-0'>
            <div className='flex flex-col items-end space-y-2 px-4 pt-4'>
                <div
                    onClick={toggleHamburger}
                    className='cursor-pointer flex flex-col  items-end space-y-2'
                >
                    <div ref={(e) => { if (e) handburgeLines.current[0] = e }} className='hamburger-line1 w-[30px] h-[3px] bg-white/80 rounded-full' />
                    <div ref={(e) => { if (e) handburgeLines.current[1] = e }} className='hamburger-line2 w-[20px] h-[3px] bg-white/80 rounded-full' />
                    <div ref={(e) => { if (e) handburgeLines.current[2] = e }} className='hamburger-line3 w-[30px] h-[3px] bg-white/80 rounded-full' />
                </div>
            </div>
            {
                <nav ref={navRef} className="scale-0 w-screen h-screen opacity-0 z-[-1] absolute top-0 right-0 bottom-0 flex flex-col items-end text-3xl space-y-8 px-4 bg-black  justify-center overflow-hidden ">
                    {
                        NavbarConfig.map((config) => (
                            <li key={config.name} className="list-none w-full text-center text-textColor hover:text-primaryColor cursor-pointer font-medium transition-all ease-in-out">{config.name}</li>
                        ))
                    }
                    <li className="list-none w-full text-center text-textColor  cursor-pointer font-medium transition-all ease-in-out">
                        <button style={{
                            background: 'linear-gradient(359deg, hsl(296deg 70.76% 29.44%), hsl(296 95% 30% / 1))',
                            boxShadow: '5px 5px 10px rgb(0 0 0 / 30%), inset 5px 5px 8px hsl(296deg 80% 82% / 20%)',
                        }} className='text-xl px-3 py-2 rounded-md'>Let&apos;s Build Together</button>
                    </li>
                </nav>
            }
        </header>
    );
}
const Navbar = ({ children }: { children: ReactNode }) => {

    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobileView = windowWidth < 768;

    return (
        <>
            {isMobileView ? <VerticalNav /> : <HorizontalNav />}
            {children}
        </>
    )
}

export default Navbar