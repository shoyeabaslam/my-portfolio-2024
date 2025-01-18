import React, { useState, useRef, useEffect, ReactNode, SetStateAction } from 'react';
import gsap from 'gsap';

import { BsFillInfoCircleFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { MessageType } from './Chatbot';
import XMLToHTMLComponent, { parseXML } from '../XMLToHTMLComponent';

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
    "API error-No worries! Leave a message, and I’ll get back to you.",
    "Having trouble? Drop a message and I'll respond ASAP!",
    "Oops! Seems like there's an issue. Leave a message and I'll get back to you soon."
];



const ContactForm: React.FC<{ setBotMessages?: React.Dispatch<SetStateAction<MessageType[]>> }> = ({ setBotMessages }) => {
    const heading = useState(ContactHeadings[Math.floor(Math.random() * ContactHeadings.length)])[0];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        try {
            const response = await axios.post(`${baseURL}/api/send-email`, { name, email, message });
            if (response.status === 200) {
                setName('');
                setEmail('');
                setMessage('');
                if (setBotMessages) {
                    setBotMessages(prev => {
                        const botResponse = `<response><message>Thank you, ${name}! Your message has been received. I'll get back to you at ${email} as soon as possible.</message></response>`;
                        const messages: MessageType[] = [
                            ...prev,
                            { text: <XMLToHTMLComponent parsedData={parseXML(botResponse)} />, sender: 'bot' }
                        ]
                        return messages
                    })
                }
            }
        } catch (error) {
            console.log(error);
            if (setBotMessages) {
                setBotMessages(prev => {
                    const botResponse = `<response><message>Sorry, ${name}. There was an error sending your message. Please try again later.</message></response>`;
                    const messages: MessageType[] = [
                        ...prev,
                        { text: <XMLToHTMLComponent parsedData={parseXML(botResponse)} />, sender: 'bot' }
                    ]
                    return messages
                })
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-sm ">
            <p className='my-4  text-center  text-primaryColor font-semibold text-sm break-words space-x-4 flex flex-col items-center space-y-2'>
                <BsFillInfoCircleFill className='text-2xl' />
                <span>{heading}</span>
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
                    <button className='bg-primaryColor/80 w-full text-white rounded-md px-4 py-2 flex items-center justify-center'>
                        {
                            loading ? <ClipLoader size={20} color='#fff' /> : <span>Contact Me!</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export { Message, ContactForm };