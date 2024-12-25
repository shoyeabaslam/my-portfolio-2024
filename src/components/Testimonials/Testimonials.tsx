import { account } from '@/assets/images'
import Image from 'next/image'
import React, { FC } from 'react'
import { RiDoubleQuotesR } from "react-icons/ri";
import './Testimonials.css'
import Arrow2SVGWrapper from '../SVGWrappers/Arrow2SVGWrapper';
const userTestimonials = [
    {
        "name": "Alice Johnson",
        "designation": "software engineer",
        "description": "This service is fantastic! It helped me quickly identify the safety of the ingredients in my skincare products. Highly recommended for anyone who wants to ensure they're using safe products."
    },
    {
        "name": "Michael Brown",
        "designation": "software engineer",
        "description": "Great tool for checking product safety. The detailed analysis and recommendations are very helpful. It would be even better with more health condition-specific advice."
    },
    {
        "name": "Sophia Lee",
        "designation": "software engineer",
        "description": "I'm very impressed with the accuracy and detail of the ingredient analysis. As someone with sensitive skin, this tool has been invaluable in helping me choose the right products."
    },
    {
        "name": "James Smith",
        "designation": "software engineer",
        "description": "Very useful for anyone conscious about what goes into their products. The overall safety percentage and ingredient breakdown are easy to understand. A must-have tool!"
    },
    {
        "name": "Emily Davis",
        "designation": "software engineer",
        "description": "I love how easy it is to use this service. Just upload the ingredient list and get an instant safety report. It has saved me a lot of time and worry. Highly recommended!"
    },
    {
        "name": "Daniel Garcia",
        "designation": "software engineer",
        "description": "A great tool for checking product safety, especially for people with allergies or specific health conditions. It would be nice to have more detailed health-specific advice, but overall it's excellent."
    },
    {
        "name": "Olivia Martinez",
        "designation": "software engineer",
        "description": "Amazing service! The safety evaluations are thorough and easy to understand. This has become my go-to tool for checking any new product I want to try."
    },
    {
        "name": "William Rodriguez",
        "designation": "software engineer",
        "description": "Very helpful for evaluating the safety of personal care products. The ingredient analysis is detailed and informative. A bit more customization for individual health conditions would be great."
    },
    {
        "name": "Isabella Wilson",
        "designation": "software engineer",
        "description": "As someone with multiple allergies, this tool has been a lifesaver. It gives me peace of mind knowing I can quickly check the safety of any product before using it."
    },
    {
        "name": "Henry Lopez",
        "designation": "software engineer",
        "description": "Excellent tool for anyone concerned about product safety. The detailed ingredient analysis and recommendations are very helpful. Would love to see more features in the future!"
    }
]
const TestimonialCard: FC<{ name: string, designation: string, description: string }> = ({ name, designation, description }) => {
    return (
        <div className='w-[350px] h-[180px] mr-4 bg-cardColor card-border py-2 px-4 rounded-md flex flex-col justify-between relative'>
            <p className='text-sm text-textColor'>{description}</p>
            <div className='flex space-x-2 items-center'>
                <div className='w-[40px]'>
                    <Image className='w-full h-full bg-contain' src={account} width={500} height={500} alt='account' />
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
    return (
        <div className='px-4 my-8'>
            <div className='flex items-start justify-center my-12 space-x-6'>
                <h1 className='text-5xl sm:text-7xl space-x-2 font-medium font-Inspiration relative'>
                    Some good words
                    <div className='hidden md:block w-[250px] absolute left-[320px] top-[20px]'>
                        <Arrow2SVGWrapper />
                    </div>
                </h1>
            </div>
            <div className="slider overflow-hidden py-8">
                <div className='inner-slider inline-block'>
                    <div className='flex'>
                        {userTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                name={testimonial.name}
                                designation={testimonial.designation}
                                description={testimonial.description}
                            />
                        ))}
                    </div>
                </div>
                <div className='inner-slider  inline-block'>
                    <div className='flex'>
                        {userTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                name={testimonial.name}
                                designation={testimonial.designation}
                                description={testimonial.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials