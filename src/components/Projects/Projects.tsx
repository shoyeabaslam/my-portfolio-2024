import React from 'react'
import ArrowSVGWrapper from '../SVGWrappers/ArrowSVGWrapper'
import Image from 'next/image'
import { character, ipad, iphone14 } from '@/assets/images'
import Link from 'next/link'
import { LuGithub, LuTwitter } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import ButtonUI from '../ButtonUI'

const Projects = () => {
    return (
        <div className='p-4'>
            <div className='flex items-start my-12'>
                <h1 className='text-4xl sm:text-5xl space-x-2 font-medium'>
                    <span>Featured</span>
                    <span className='text-primaryColor underline underline-offset-4 decoration-1'>Projects</span>
                </h1>
                <div className='hidden sm:block sm:w-[200px] ml-4 mt-3'>
                    <ArrowSVGWrapper />
                </div>
            </div>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card p-4 bg-cardColor card-border rounded-md shadow flex  flex-col sm:flex-row">
                    <div className="flex-1 w-full flex flex-col justify-between order-2 sm:order-1">
                        <div className='flex flex-col space-y-2  p-2'>
                            <h1 className='text-2xl font-semibold '>Project Title</h1>
                            <h1 className='text-textColor font-medium text-sm'>Project Sub-Title</h1>
                            <div className='text-textColor text-xs flex  font-medium'>
                                <h3 className='mr-2 py-[2px] mt-2'>Tools:</h3>
                                <div className='w-full flex flex-wrap'>
                                    <p className='ml-1 bg-textColor text-cardColor mt-2 px-2 rounded-full text-center text-xs flex items-center'>NextJS</p>
                                    <p className='ml-1 bg-textColor text-cardColor mt-2 px-2 rounded-full text-center text-xs flex items-center'>NodeJS</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4 p-2'>
                            <Link className='text-xs font-light hover:underline decoration-1 transition-all ease-in flex space-x-1 items-center' href={'/'} target='_blank'>
                                <LuGithub /> <span>Repository</span>
                            </Link>
                            <Link className='text-xs font-light hover:underline decoration-1 mx-2 transition-all ease-in flex space-x-1 items-center' href={'/'} target='_blank'>
                                <FaLink /> <span>Open Live</span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full py-4 rounded-lg sm:w-[250px] h-[300px] overflow-hidden  order-1 sm:order-2 flex items-center justify-center">
                        <div className="h-full">
                            <Image src={iphone14} width={500} height={500} alt="character" className='w-full h-full bg-cover' />
                        </div>
                    </div>
                </div>
                <div className="card p-4 bg-cardColor card-border rounded-md shadow flex  flex-col sm:flex-row">
                    <div className="flex-1 w-full flex flex-col justify-between order-2 sm:order-1">
                        <div className='flex flex-col space-y-2  p-2'>
                            <h1 className='text-2xl font-semibold '>Project Title</h1>
                            <h1 className='text-textColor font-medium text-sm'>Project Sub-Title</h1>
                            <div className='text-textColor text-xs flex  font-medium'>
                                <h3 className='mr-2 py-[2px] mt-2'>Tools:</h3>
                                <div className='w-full flex flex-wrap'>
                                    <p className='ml-1 bg-textColor text-cardColor mt-2 px-2 rounded-full text-center text-xs flex items-center'>NextJS</p>
                                    <p className='ml-1 bg-textColor text-cardColor mt-2 px-2 rounded-full text-center text-xs flex items-center'>NodeJS</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4 p-2'>
                            <Link className='text-xs font-light hover:underline decoration-1 transition-all ease-in flex space-x-1 items-center' href={'/'} target='_blank'>
                                <LuGithub /> <span>Repository</span>
                            </Link>
                            <Link className='text-xs font-light hover:underline decoration-1 mx-2 transition-all ease-in flex space-x-1 items-center' href={'/'} target='_blank'>
                                <FaLink /> <span>Open Live</span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full py-4 rounded-lg sm:w-[250px] h-[300px] overflow-hidden  order-1 sm:order-2 flex items-center justify-center">
                        <div className="h-full">
                            <Image src={ipad} width={500} height={500} alt="character" className='w-full h-full bg-cover' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center text-textColor'>
                <button className='flex items-center space-x-1 text-sm'><span>See More Project</span> <span style={{
                    background: 'linear-gradient(359deg, #0d0d0d, #171717)',
                    boxShadow: '#5a5a5a2b 2px 2px 10px inset',
                }} className='text-xs rounded-full p-1 text-white'><FaChevronRight /></span></button>
            </div>
        </div>
    )
}

export default Projects