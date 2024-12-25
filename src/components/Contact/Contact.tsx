import React from 'react'
import { BiSolidCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoMdMail, IoIosSend } from "react-icons/io";
import { LuGithub, LuTwitter } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
    return (
        <section id='contact' className='h-full sm:h-screen flex justify-start sm:justify-center items-center p-4 flex-col space-y-3'>
            <div className='w-full md:w-[60%] rounded-lg bg-cardColor flex flex-col card-border shadow-sm'>
                <div className='border-b border-[#121212] h-[40px] flex items-center'>
                    <div className='h-full flex items-center justify-start px-2 space-x-2'>
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #F63636)' }} className='text-[#F63636] text-xs' />
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #F6C136)' }} className='text-[#F6C136] text-xs' />
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #68F636)' }} className='text-[#68F636] text-xs' />
                    </div>
                    <div style={{ width: 'calc(100% - 180px)' }} className='flex justify-center items-center font-medium'>Let's talk</div>
                </div>
                <div className='flex justify-center py-5'>
                    <form className='w-[90%] md:w-[75%] flex flex-col space-y-4'>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-2 text-xs sm:text-sm text-textColor font-medium'>
                            <label><FaUser /></label>
                            <input type='text' placeholder='Name' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-2 text-xs sm:text-sm text-textColor font-medium'>
                            <label><IoMdMail /></label>
                            <input type='email' placeholder='Email' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-2 text-xs sm:text-sm text-textColor font-medium'>
                            <textarea rows={4} placeholder='Say hi or let’s discuss something awesome!' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='flex justify-end w-full'>
                            <button className='py-2 px-4 rounded-md text-textColor text-xs sm:text-sm card-border flex items-center space-x-2' style={{
                                background: 'linear-gradient(359deg, #0d0d0d, #171717)',
                                boxShadow: '#5a5a5a2b 1px 1px 5px inset',
                            }}>
                                <span>Send Message</span>
                                <IoIosSend className='text-lg' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex justify-start space-x-6  ml-3 py-2 items-center'>
                <LuGithub className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
                <FaLinkedin className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
                <LuTwitter className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
                <BiLogoGmail className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
            </div>
        </section>
    )
}

export default Contact