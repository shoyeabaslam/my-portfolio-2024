"use client"
import { account } from '@/assets/images'
import Image, { StaticImageData } from 'next/image'
import React, { FC, useEffect, useState, useRef } from 'react'
import { RiDoubleQuotesR } from "react-icons/ri";
import './Testimonials.css'
import Arrow2SVGWrapper from '../SVGWrappers/Arrow2SVGWrapper';
import axios from 'axios';
import gsap from 'gsap';

interface Testimonial {
    id?: string;
    name: string;
    designation: string;
    feedback: string;
    image_url?: string | StaticImageData;
}

const dummyTestimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        designation: 'Technical Project Manager',
        feedback: 'Shoyeab is an exceptional developer with a deep understanding of frontend and backend technologies. His work on projects like "Kashimirizon" demonstrates his ability to deliver robust and scalable solutions.',
        image_url: account,
    },
    {
        id: '2',
        name: 'Aditi Sharma',
        designation: 'Software Engineer',
        feedback: 'I had the pleasure of collaborating with Shoyeab on several projects. His expertise in Next.js, React Native, and Firebase is evident in the high-quality applications he develops.',
        image_url: account,
    },
    {
        id: '3',
        name: 'Priya Singh',
        designation: 'Senior Developer',
        feedback: 'Shoyeab’s dedication to learning and growth is unmatched. His certifications and hands-on projects showcase his commitment to mastering the latest tools and frameworks.',
        image_url: account,
    },

    {
        id: '4',
        name: 'Neha Gupta',
        designation: 'UX Designer',
        feedback: 'Shoyeab is a brilliant collaborator. His skills in React and animation libraries like GSAP make his projects visually engaging and functionally sound.',
        image_url: account,
    },
    {
        id: '5',
        name: 'Swati Mishra',
        designation: 'Internship Supervisor',
        feedback: 'During his internship, Shoyeab displayed exceptional problem-solving skills and a strong grasp of the SDLC process. His contributions to the Leave Management System project were instrumental in its success.',
        image_url: account,
    },
    {
        id: '6',
        name: 'Arjun Nair',
        designation: 'Full-Stack Developer',
        feedback: 'Shoyeab’s knowledge of technologies like ASP.NET, MSSQL, and React is impressive. He consistently delivers high-quality solutions tailored to project requirements.',
        image_url: account,
    },
];

export const TestimonialCard: FC<Testimonial> = ({ name, designation, feedback, image_url }) => {
    return (
        <div className='w-[400px] h-[180px] mr-4 bg-cardColor card-border py-2 px-4 rounded-md flex flex-col justify-between relative'>
            <p className='text-sm text-textColor'>{feedback}</p>
            <div className='flex space-x-5 items-center'>
                <div className='w-[40px] overflow-hidden'>
                    <Image className='w-[40px] h-[40px] object-cover border border-gray-400 rounded-full' src={image_url ? image_url : account} width={500} height={500} alt='account' />
                </div>
                <div className='flex flex-col'>
                    <p className='text-xs font-medium'>{name}</p>
                    <p className='text-xs text-textColor'>{designation}</p>
                </div>
            </div>
            <RiDoubleQuotesR className='text-4xl absolute right-[-6px] top-[-23px] opacity-50' />
        </div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('/api/testimonials', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setTestimonials([...response.data.testimonials, ...dummyTestimonials]);
            } catch (error) {
                console.log(error)
                setTestimonials(dummyTestimonials);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (isLoading && loadingRef.current) {
            gsap.to(loadingRef.current.children, {
                opacity: 0,
                yoyo: true,
                repeat: -1,
                stagger: 0.3,
                duration: 0.5,
            });
        }
    }, [isLoading]);

    return (
        <section id='testimonials' className='px-4 my-8'>
            <div className='flex items-start justify-center my-12 space-x-6'>
                <h1 className='text-5xl sm:text-7xl space-x-2 font-medium font-Inspiration relative'>
                    Some good words
                    <div className='hidden md:block w-[250px] absolute left-[320px] top-[20px]'>
                        <Arrow2SVGWrapper />
                    </div>
                </h1>
            </div>
            {isLoading ? (
                <div className='flex justify-center items-center text-textColor'>
                    <div className='flex items-center space-x-3'>
                        <span className='text-sm'>Fetching Testimonials</span>
                        <div ref={loadingRef} className='flex space-x-1'>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="slider overflow-hidden pt-8">
                    <div className='inner-slider inline-block'>
                        <div className='flex'>
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index + 1}
                                    {...testimonial}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='inner-slider inline-block'>
                        <div className='flex'>
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index + 2}
                                    {...testimonial}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Testimonials
