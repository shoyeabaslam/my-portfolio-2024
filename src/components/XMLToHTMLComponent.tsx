import Link from 'next/link';
import React from 'react';
import { parseString } from 'xml2js';

export const xmlData = `
<response>
    <message>I offer custom AI model development, integration of AI systems into existing applications, and conversational AI solution development using Python and the GPT API.</message>
    <skills>["Python", "GPT API"]</skills>
    <experience></experience>
    <links>["https://google.com/","https://google.com/"]</links>
    <action>view projects</action>
</response>
`;

export const parseXML = (xml: string) => {
    let result: { response: { message: string; action: string; skills: string[]; experience: string; links: string[] } } = { response: { message: '', action: '', skills: [], experience: '', links: [] } };
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, res) => {
        if (err) throw err;
        // Ensure skills and links are always arrays
        res.response.skills = res.response.skills ? (Array.isArray(res.response.skills) ? res.response.skills : JSON.parse(res.response.skills)) : [];
        res.response.links = res.response.links ? (Array.isArray(res.response.links) ? res.response.links : JSON.parse(res.response.links)) : [];
        result = res;
    });
    return result;
};

const renderElement = (element: string | string[], key: string) => {
    if (!element || (Array.isArray(element) && element.length === 0)) {
        return null;
    }

    switch (key) {
        case 'message':
            return <p>{element}</p>;
        case 'skills':
            return (
                <div>
                    <p>Here are some of my skills:</p>
                    <ul className='flex flex-wrap'>
                        {Array.isArray(element) && element.map((skill: string, index: number) => (
                            <li key={index} className='my-2 mr-2 bg-[#384d5b] rounded-lg px-4 py-1 shadow-md'>{skill}</li>
                        ))}
                    </ul>
                </div>
            );
        case 'experience':
            return <p>{element} years of experience</p>;
        case 'links':
            return (
                <div>
                    <p>Here are some relevant links:</p>
                    <ul className='flex flex-wrap flex-col space-y-1'>
                        {Array.isArray(element) && element.map((link: string, index: number) => (
                            <li key={index} className='w-full overflow-hidden'>
                                <Link href={link} className="underline text-blue-500 break-words text-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-blue-700" target='_blank' rel="noopener noreferrer">
                                    {link.length > 35 ? `${link.substring(0, 35)}...` : link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'action':
            switch (typeof element === 'string' ? element.toLowerCase() : '') {
                case 'hire me':
                    return <Link href='#contact'><button className="btn-hire my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">Hire Me</button></Link>;
                case "let's build":
                    return <Link href="#contact"><button className="btn-build my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">Let&apos;s Build</button></Link>;
                case 'view projects':
                    return <Link href="#projects"><button className="btn-projects my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">View Projects</button></Link>;
                case 'contact me':
                    return <Link href="#contact"><button className="btn-contact my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">Contact Me</button></Link>;
                case 'book a consultation':
                    return <Link href="#contact"><button className="btn-consultation my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">Book a Consultation</button></Link>;
                case 'see testimonials':
                    return <Link href="#testimonials"><button className="btn-testimonials my-2 py-2 px-6 bg-primaryColor/85 text-white shadow-lg rounded-lg">See Testimonials</button></Link>;
                default:
                    return null;
            }
        default:
            return null;
    }
};

interface Type {
    parsedData: {
        response: {
            message: string;
            action: string;
            skills: string[];
            experience: string;
            links: string[];
        };
    }
}

const XMLToHTMLComponent: React.FC<Type> = ({ parsedData }) => {
    return (
        <div>
            {Object.entries(parsedData.response).map(([key, value]) => {
                const element = renderElement(value, key);
                return element ? <div key={key}>{element}</div> : null;
            })}
        </div>
    );
};

export default XMLToHTMLComponent;
