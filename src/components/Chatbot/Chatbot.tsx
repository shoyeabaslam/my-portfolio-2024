'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { IoSend, IoClose } from "react-icons/io5";
import ChatbotWrapper from '../SVGWrappers/ChatbotWrapper';
import gsap from 'gsap'
import Image from 'next/image';
import { sLogo } from '@/assets/images';
import './Chatbot.css';
import XMLToHTMLComponent, { parseXML } from '../XMLToHTMLComponent';
import { ContactForm, Message } from './Message';
import axios from 'axios';

export interface MessageType {
    text: ReactNode;
    sender: 'user' | 'bot';
    loading?: boolean;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        { text: 'Hi! How can I assist you today?', sender: 'bot' }
    ]);
    const [input, setInput] = useState<string>('');
    const [isClicked, setIsClicked] = useState(false)
    const botContainerRef = useRef<HTMLDivElement>(null)
    const botRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false)
    const fetchBotResponse = async (inputText: string) => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
            const similarityResponse = await axios.post(`${baseURL}/api/find-similarity-context`, {
                input: inputText
            });

            if (similarityResponse.status !== 200) {
                throw new Error('Error fetching similarity context');
            }

            const similarityData = await similarityResponse;
            const chatbotResponse = await axios.post(`${baseURL}/api/chatbot-response`, {
                inputText,
                data: similarityData.data
            });

            if (chatbotResponse.status !== 200) {
                throw new Error('Error fetching chatbot response');
            }

            const chatbotData = chatbotResponse.data;
            return chatbotData;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    /**
     * Handles the sending of a message in the chatbot.
     * 
     * This function performs the following steps:
     * 1. Checks if the input is not empty after trimming whitespace.
     * 2. If the input is valid, it creates a new array of messages that includes:
     *    - The user's message.
     *    - A placeholder bot message indicating it is loading.
     * 3. Updates the state with the new messages and clears the input field.
     * 4. Sets a timeout to simulate a bot response after 2 seconds. Once the timeout is complete:
     *    - Updates the bot's placeholder message with a predefined response.
     * 
     * @returns {void}
     */
    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const data = await fetchBotResponse(input);
        // const parsedData = parseXML(data);
        const userText = `<response><message>${input}</message></response>`;
        setLoading(true);
        if (input.trim()) {
            const newMessages: MessageType[] = [
                ...messages,
                { text: <XMLToHTMLComponent parsedData={parseXML(userText)} />, sender: 'user' },
                { text: <ContactForm />, sender: 'bot', loading: true },
            ];
            setMessages(newMessages);
            setInput('');
            const botResponse = await fetchBotResponse(input);
            if (botResponse) {
                const cleanedResponse = botResponse
                    .replace(/^```|```$/g, '').replace('xml', '')
                    .trim();
                try {
                    const parsedData = parseXML(`${cleanedResponse}`);
                    setMessages(prevMessages => prevMessages.map(msg =>
                        msg.loading ? { text: <XMLToHTMLComponent parsedData={parsedData} />, sender: 'bot' } : msg
                    ));
                } catch (error) {
                    setMessages(prevMessages => prevMessages.map(msg =>
                        msg.loading ? { text: <ContactForm setBotMessages={setMessages} />, sender: 'bot' } : msg
                    ));
                    console.error('Error parsing XML:', error);
                }

            } else {
                setMessages(prevMessages => prevMessages.map(msg =>
                    msg.loading ? { text: <ContactForm setBotMessages={setMessages} />, sender: 'bot' } : msg
                ));
            }

        }
        setLoading(false);
    };

    useEffect(() => {
        if (isClicked) {
            gsap.to(botContainerRef.current, {
                transform: 'scale(1)',
                transformOrigin: 'bottom right',
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut'
            })
            gsap.to(botRef.current, {
                scale: 0,
                pointerEvents: 'none',
                duration: 0.3,
                ease: 'power1.inOut'
            })
        }
        else {
            gsap.to(botContainerRef.current, {
                transform: 'scale(0)',
                transformOrigin: 'bottom right',
                opacity: 0,
                duration: 0.5,
                ease: 'power1.inOut'
            })
            gsap.to(botRef.current, {
                scale: 1,
                pointerEvents: 'auto',
                duration: 0.3,
                ease: 'power1.inOut'
            })
        }
    }, [isClicked]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div style={{ transform: 'scale(0)', transformOrigin: 'bottom right' }} ref={botContainerRef} className="fixed right-3 bottom-5 w-[90%] sm:w-[400px] h-[500px] md:h-[600px] overflow-hidden  bg-cardColor rounded-lg shadow-lg border border-white/5 shadow-shadowColor flex flex-col z-50">
                <div className="p-2 md:4 bg-primaryColor/60 text-white text-xl font-semibold rounded-t-lg flex justify-between items-center">
                    <div className='flex items-center space-x-2'>
                        <Image src={sLogo} width={200} height={200} className='w-5 md:w-7' alt='robot' />
                        <div>
                            <p className='text-sm md:text-lg font-bold'>Smart Assistant</p>
                            <p className='text-xs text-gray-200'>AI Chatbot</p>
                        </div>
                    </div>
                    <IoClose className='text-3xl cursor-pointer' onClick={() => setIsClicked(prev => !prev)} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <Message key={index} component={msg.text} sender={msg.sender} loading={msg.loading} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-2">
                    <form className="flex items-center space-x-2" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            className="w-full p-3 rounded-lg border card-border bg-transparent text-white focus:outline-none outline-none transition-all"
                        />
                        <button
                            disabled={loading}
                            className="w-[50px] bg-primaryColor p-3 h-full rounded-lg transition-all"
                        >
                            <IoSend className='text-2xl' />
                        </button>
                    </form>
                </div>

            </div>
            <div ref={botRef} onClick={() => setIsClicked(prev => !prev)} style={{ filter: "drop-shadow(0px 0px 2px #C335CD)" }} className='fixed right-3 bottom-8 w-[50px] h-[50px]  z-50 cursor-pointer'>
                <ChatbotWrapper />
            </div>
        </>
    );
}

export default Chatbot;
