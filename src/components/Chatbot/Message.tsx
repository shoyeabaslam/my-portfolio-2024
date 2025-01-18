import React, { useState, useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

import { BsFillInfoCircleFill } from "react-icons/bs";

interface MessageProps {
    component: ReactNode | null;
    sender: 'user' | 'bot';
    loading?: boolean;
}

const Message: React.FC<MessageProps> = ({ component, sender, loading = false }) => {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading && messageRef.current) {
            const dots = messageRef.current.querySelectorAll('.dot');
            gsap.to(dots, {
                opacity: 1,
                yoyo: true,
                repeat: -1,
                stagger: 0.2,
                duration: 0.5,
            });
        }
    }, [loading]);

    return (
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                ref={messageRef}
                className={`max-w-xs px-4 py-2 rounded-lg text-white ${sender === 'user' ? 'bg-primaryColor/80' : 'bg-[#212731]'}`}
            >
                {loading ? (
                    <div className="flex space-x-1">
                        <div className="dot w-2 h-2 opacity-0 bg-white rounded-full"></div>
                        <div className="dot w-2 h-2 opacity-0 bg-white rounded-full"></div>
                        <div className="dot w-2 h-2 opacity-0 bg-white rounded-full"></div>
                    </div>
                ) : (
                    <div className='w-full'>{component}</div>
                )}
            </div>
        </div>
    );
};

const ContactHeadings = [
    "Something went wrong, but leave a message and I’ll get back to you.",
    "API error—share your thoughts, and I’ll help right away!",
    "Whoops! Connection failed—leave a message, and I’ll reach out to you.",
    "API error-No worries! Leave a message, and I’ll get back to you."
];



const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="text-sm ">
            <p className='my-4  text-center  text-primaryColor font-semibold text-sm break-words space-x-4 flex flex-col items-center space-y-2'>
                <BsFillInfoCircleFill className='text-2xl' />
                <span>{ContactHeadings[Math.floor(Math.random() * ContactHeadings.length)]}</span>
            </p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="name" className=''>Name</label>
                    <input
                        type="text"
                        id="name"
                        className='bg-transparent border border-white/20 rounded-md p-2 text-white outline-none'
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col space-y-2 my-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                        className='bg-transparent border border-white/20 rounded-md p-2 text-white outline-none'
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        className='bg-transparent border border-white/20 rounded-md p-2 text-white outline-none'
                        rows={3}
                        id="message"
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div className='my-2 w-full'>
                    <button className='bg-primaryColor/80 w-full text-white rounded-md px-4 py-2'>Contact Me</button>
                </div>
            </form>
        </div>
    );
};

export { Message, ContactForm };