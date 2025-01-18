"use client"
import React, { useState } from 'react'
import { BiSolidCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import ContactLinks from '../ContactLinks';
import { IoSend } from "react-icons/io5";
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import toast from 'react-hot-toast';


const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        try {
            const response = await axios.post(`${baseURL}/api/send-email`, { name, email, message });
            if (response.status === 200) {
                toast.success('🎉 Email sent successfully! I will get back to you soon.');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                toast.error('😞 Oops! Failed to send email. Please try again.');
            }
        } catch (error) {
            toast.error('🚨 Error! Failed to send email. Please check your connection.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <section id='contact' className='h-full sm:h-screen flex justify-start sm:justify-center items-center p-4 flex-col space-y-3'>
            <div className='w-full md:w-[60%] rounded-lg bg-cardColor flex flex-col card-border shadow-md shadow-shadowColor h-[60vh]'>
                <div className='border-b border-[#121212] h-[50px] flex items-center'>
                    <div className='h-full flex items-center justify-start px-2 space-x-2'>
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #F63636)' }} className='text-[#F63636] text-xs' />
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #F6C136)' }} className='text-[#F6C136] text-xs' />
                        <BiSolidCircle style={{ filter: 'drop-shadow(0 0 5px #68F636)' }} className='text-[#68F636] text-xs' />
                    </div>
                    <div style={{ width: 'calc(100% - 180px)' }} className='flex justify-center items-center font-medium   sm:text-xl'>Let&apos;s talk</div>
                </div>
                <div className='flex justify-center py-8'>
                    <form onSubmit={handleSubmit} className='w-[90%] md:w-[75%] flex flex-col space-y-4 py-2 justify-center'>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-4 text-xs sm:text-lg text-textColor font-medium'>
                            <label><FaUser /></label>
                            <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Name' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-4 text-xs sm:text-lg text-textColor font-medium'>
                            <label><IoMdMail /></label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='card-border shadow-md flex items-center  p-2 rounded-lg space-x-2 text-sm sm:text-lg text-textColor font-medium'>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} placeholder='Say hi or let’s discuss something awesome!' className='bg-cardColor border-none outline-none w-full placeholder-textColor/50' />
                        </div>
                        <div className='flex justify-end w-full'>
                            <button disabled={loading} className=' py-2 px-4 mt-2 rounded-md  border border-[#171717] text-xs sm:text-lg flex items-center justify-center space-x-2' style={{
                                background: 'linear-gradient(359deg, #0a0a0a, #171717)',
                                boxShadow: '#5a5a5a2b 1px 1px 10px inset',
                            }}>
                                {
                                    loading ? <ClipLoader color='#fff' size={20} /> :
                                        <div className='flex items-center space-x-3'>
                                            <span>Send Message</span>
                                            <IoSend className='text-sm sm:text-lg' />
                                        </div>
                                }

                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ContactLinks />
        </section>
    )
}

export default Contact