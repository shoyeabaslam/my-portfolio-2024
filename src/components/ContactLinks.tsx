import React from 'react'
import Link from 'next/link'
import { LuGithub, LuTwitter } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const ContactLinks = () => {
    return (
        <div className='flex justify-start space-x-6 ml-3 py-2 items-center'>
            <Link href="https://github.com/shoyeabaslam" passHref target='_blank'>
                <LuGithub className='w-5 h-5 text-white/40 cursor-pointer hover:scale-[1.2] hover:text-white/80 transition-all ease-in-out' />
            </Link>
            <Link href="https://www.linkedin.com/in/shoyeab" passHref target='_blank'>
                <FaLinkedin className='w-5 h-5 text-white/40 cursor-pointer hover:scale-[1.2] hover:text-white/80 transition-all ease-in-out' />
            </Link>
            <Link href="https://x.com/itsmeshoyeab" passHref target='_blank'>
                <LuTwitter className='w-5 h-5 text-white/40 cursor-pointer hover:scale-[1.2] hover:text-white/80 transition-all ease-in-out' />
            </Link>
            <Link href="mailto:shoyeab07@gmail.com" passHref target='_blank'>
                <BiLogoGmail className='w-5 h-5 text-white/40 cursor-pointer hover:scale-[1.2] hover:text-white/80 transition-all ease-in-out' />
            </Link>
        </div>
    )
}

export default ContactLinks