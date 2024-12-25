'use client'

import React, { useEffect, useRef } from 'react'
import './Home.css'
import ButtonUI from '../ButtonUI';
import HeroSectionSVG from '../SVGWrappers/HeroSectionSVG';
import { LuGithub, LuTwitter } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

import { BiLogoGmail } from "react-icons/bi";

const Home = () => {
  useEffect(() => {

  }, [])
  return (
    <section className='home-container relative lg:p-10 p-4'>
      <div className='hero-gradient-1' />
      <div className='flex items-center flex-col md:flex-row'>
        <div className='flex-1 w-full order-2  md:order-1 flex flex-col items-center sm:items-start justify-center font-concertOne space-y-2'>
          <div className='flex space-x-4 md:flex-col md:space-x-0'>
            <h1 className='text-[2.4rem]  sm:text-6xl text-center  md:text-[14vw] text-textColor font-light '>HI, I'M </h1>
            <h1 className='text-[2.4rem] sm:text-6xl text-center  md:text-[11.2vw] text-primaryColor font-light'>SHOYEAB</h1>
          </div>
          <h3 className='text-center sm:text-start text-[3.5vw] md:text-[1.8vw] text-textColor font-semibold font-Poppins md:ml-3'>I bring ideas to life through impactful web solutions.</h3>
          <div className="flex flex-row justify-start space-x-2 sm:space-x-3 space-y-0 md:ml-3 py-2">
            <ButtonUI name="Know About Me!" variant="outlined" />
            <ButtonUI name="Explore Projects" variant="contained" endIcon={<FaChevronRight />} />
          </div>


          <div className='flex justify-start space-x-6  ml-3 py-2 items-center'>
            <LuGithub className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
            <FaLinkedin className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
            <LuTwitter className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
            <BiLogoGmail className='w-5 h-5 text-white/40 cursor-pointer hover:text-white/80 transition-all ease-in' />
          </div>
        </div>
        <div className='flex-1  order-1 md:order-2 flex justify-center items-center'>
          <div className='w-[70%] sm:w-[90%] md:w-[40vw] p-4 box-border'>
            <HeroSectionSVG />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home