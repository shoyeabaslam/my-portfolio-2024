'use client'

import React, { useEffect } from 'react'
import './Home.css'
import ButtonUI from '../ButtonUI';
import HeroSectionSVG from '../SVGWrappers/HeroSectionSVG';
import { FaChevronRight } from "react-icons/fa6";
import ContactLinks from '../ContactLinks';
import Link from 'next/link';

const Home = () => {
  useEffect(() => {

  }, [])
  return (
    <section id='home' className='home-container relative md:px-8 md:py-16 p-4'>
      <div className='hero-gradient-1' />
      <div className='flex items-center flex-col md:flex-row'>
        <div className='flex-1 w-full order-2  md:order-1 flex flex-col items-center sm:items-start justify-center font-concertOne space-y-2'>
          <div className='flex space-x-4 md:flex-col md:space-x-0'>
            <h1 className='text-[2.4rem]  sm:text-6xl text-center  md:text-[14vw] text-textColor font-light '>HI, I&apos;M </h1>
            <h1 className='text-[2.4rem] sm:text-6xl text-center  md:text-[10vw] text-primaryColor font-light'>SHOYEAB!</h1>
          </div>
          <h3 className='text-center sm:text-start text-[4vw] md:text-[2vw] text-textColor font-semibold font-Poppins md:ml-3 md:pr-10'>Helping businesses grow with impactful web and mobile solutions.</h3>
          <div className="flex flex-row justify-start space-x-2 sm:space-x-3 space-y-0 md:ml-3 py-2">
            <Link href='#about'> <ButtonUI name="Know About Me!" variant="outlined" /></Link>
            <Link href="#projects"><ButtonUI name="Explore Projects" variant="contained" endIcon={<FaChevronRight />} /></Link>
          </div>

          <ContactLinks />
        </div>
        <div className=' flex-1  order-1 md:order-2 flex justify-center items-center'>
          <div className='w-[90%] md:w-[40vw] p-4 box-border'>
            <HeroSectionSVG />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home