"use client";

import { FC, useRef } from "react";
import Image from "next/image";
import "./About.css";
import ServicesOffer from "../SVGWrappers/ServicesOffer";
import SkillsWrapper from "../SVGWrappers/SkillsWrapper";
import CollaborateSVGWrapper from "../SVGWrappers/CollaborateSVGWrapper";
import { character } from "@/assets/images";
import gsap from "gsap";
import { PiHandshake } from "react-icons/pi";
import Link from "next/link";


interface WorldLineType {
  top: string;
  left: string;
  rotate: string;
}

const WorldLine: FC<WorldLineType> = ({ top, left, rotate }) => {
  return (
    <div
      style={{ top, left, transform: `rotate(${rotate})` }}
      className="world-line"
    >
      <div />
    </div>
  );
};

const About = () => {
  const characterRef = useRef(null)
  const t1 = gsap.timeline({ repeat: 1, yoyo: true });

  const onCharacterHoverEnter = () => {
    t1.to(characterRef.current, {
      rotation: 4,
      duration: 1,
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut'
    }).play();
  };
  const onCharacterHoverLeave = () => {
    gsap.set(characterRef.current, { rotation: 0 });
  };

  return (
    <section className="c-space p-4" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div onMouseEnter={onCharacterHoverEnter} onMouseLeave={onCharacterHoverLeave} className="col-span-1 xl:row-span-3 card-border shadow-sm rounded-lg p-4 flex flex-col justify-between overflow-hidden">
          <div ref={characterRef} className="w-full flex justify-center items-center h-full">
            <Image style={{ filter: "drop-shadow(10px 8px 15px rgba(0, 0, 0, 0.7)) brightness(0.7)" }} src={character} width={500} height={500} alt="character" className="w-[50%]" />
          </div>
          <div className="">
            <h2 className="font-semibold text-2xl">Hi, I&apos;m Shoyeab Aslam</h2>
            <p className="font-normal text-textColor text-sm sm:text-base">
              I build seamless, reliable web applications, ensuring smooth user interfaces and robust server-side solutions. My focus is on delivering real value through flawless performance and an exceptional user experience.
            </p>
          </div>
        </div>

        <div
          className="col-span-1 xl:row-span-3 card-border shadow-sm rounded-lg p-4 overflow-hidden "
        >
          <div className="grid-container flex flex-col h-full  items-center ">
            <div className="w-full">
              <ServicesOffer />
            </div>
            <div className="w-full">
              <p className=" font-semibold text-2xl">What I Can Offer</p>
              <p className="font-normal text-textColor  text-sm sm:text-base">
                Creating scalable web and mobile apps with full-stack expertise, problem-solving, and collaboration. I work with you to build solutions that drive success.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 card-border  rounded-lg p-4 globe-box h-[400px] md:h-full">
          <WorldLine top="162px" left="-50px" rotate="20deg" />
          <WorldLine top="125px" left="225px" rotate="0deg" />
          <WorldLine top="300px" left="150px" rotate="70deg" />
          <div className="grid-container flex flex-col justify-end items-start w-full h-full">
            <div className="z-10">
              <h2 className="font-semibold text-2xl"> Time Zone Flexibility</h2>
              <p className="font-normal text-textColor  text-sm sm:text-base">
                Based in Hyderabad, India, I’m open to working with teams and clients across the globe. I’m highly flexible with time zones and locations, ensuring smooth communication no matter where you are.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3 card-border flex flex-col justify-between shadow-sm rounded-lg p-4 relative overflow-hidden">
          <div className="w-full">
            <SkillsWrapper />
          </div>
          <div className="grid-container h-fit w-full ">
            <p className="font-semibold text-2xl">Tech Stack</p>
            <p className="font-normal text-textColor  text-sm sm:text-base">
              I work with a variety of tools and technologies to build scalable applications that help businesses grow. Whether you&apos;re looking to improve an existing product or build something new.
              I&apos;m here to turn your ideas into reality with the right solution.</p>
          </div>
        </div>

        <div className=" xl:col-span-1 xl:row-span-3 card-border shadow-sm rounded-lg overflow-hidden h-full relative">
          <div className="grid-container flex flex-col  h-full">
            <div className="flex-grow flex justify-center items-center w-full">
              <CollaborateSVGWrapper />
            </div>
            <div className="flex-1 flex flex-col items-start justify-end p-4 box-border  h-full">
              <div>
                <h2 className="font-semibold text-2xl">Let’s Collaborate</h2>
                <p className="font-normal text-textColor text-sm sm:text-base">Have a project in mind? I’d love to collaborate and bring your ideas to life. Get in touch, and let’s get started!</p>
              </div>
              <Link href={'#contact'} style={{
                background: 'linear-gradient(359deg, hsl(296deg 70.76% 29.44%), hsl(296 95% 30% / 1))',
                boxShadow: '5px 5px 10px rgb(0 0 0 / 30%), inset 5px 5px 8px hsl(296deg 80% 82% / 20%)',
              }} className='flex items-center space-x-4 text-lg px-3 py-2 rounded-md mt-4'>
                <span>Let&apos;s talk</span>
                <PiHandshake className="text-2xl" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
