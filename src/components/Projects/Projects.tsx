'use client'
import React, { useEffect, useState, useRef } from 'react';
import ArrowSVGWrapper from '../SVGWrappers/ArrowSVGWrapper';
import Image from 'next/image';
import { ipad } from '@/assets/images';
import Link from 'next/link';
import { LuGithub } from "react-icons/lu";
import { FaLink, FaChevronRight } from "react-icons/fa6";
import axios from 'axios';
import gsap from 'gsap';

interface Project {
    id: number;
    project_title: string;
    project_description: string;
    technologies_used: string[];
    repo_link: string;
    site_link: string;
    project_image_url: string | null;
    created_at: string;
}
const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
    const [isInView, setIsInView] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentCardRef = cardRef.current;
        if (currentCardRef) {
            observer.observe(currentCardRef);
        }

        return () => {
            if (currentCardRef) {
                observer.unobserve(currentCardRef);
            }
        };
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

    useEffect(() => {
        if (isInView) {
            axios.get('/api/projects')
                .then((response) => {
                    const fetchedProjects = response.data.projects;
                    const sortedProjects = fetchedProjects.sort((a: Project, b: Project) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    setProjects(sortedProjects);
                    setDisplayedProjects(fetchedProjects.slice(0, 6));
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                    setIsLoading(false);
                });
        }
    }, [isInView]);

    useEffect(() => {
        if (displayedProjects.length > 0) {
            gsap.fromTo(
                '.project-card',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.4, duration: 0.5 }
            );
        }
    }, [displayedProjects]);

    const loadMoreProjects = () => {
        setDisplayedProjects(projects);
        setIsProjectsLoaded(true);
    };

    return (
        <section id='projects' className='p-4'>
            <div className='flex items-start my-12'>
                <h1 className='text-4xl sm:text-5xl space-x-2 font-medium'>
                    <span>Featured</span>
                    <span className='text-primaryColor underline underline-offset-4 decoration-1'>Projects</span>
                </h1>
                <div className='hidden sm:block sm:w-[200px] ml-4 mt-3'>
                    <ArrowSVGWrapper />
                </div>
            </div>
            <div className="my-10 grid grid-cols-1 xl:grid-cols-2 gap-4" ref={cardRef}>
                {displayedProjects.length > 0 && displayedProjects.map((project) => (
                    <div key={project.id} className="project-card card bg-[#121212] card-border rounded-md shadow-xl flex flex-col sm:flex-row overflow-hidden">
                        <div className="flex-1 px-2 w-full flex flex-col justify-between order-2 sm:order-1">
                            <div className='flex flex-col space-y-2 p-2'>
                                <h1 className='text-2xl font-semibold'>{project.project_title}</h1>
                                <h1 className='text-textColor font-medium text-sm'>{project.project_description}</h1>
                                <div className='text-textColor text-xs flex font-medium flex-col space-y-1'>
                                    <h3 className='mr-2 py-[2px] mt-2'>Tools:</h3>
                                    <div className='w-full flex flex-wrap'>
                                        {project.technologies_used.map((tech, index) => (
                                            <p key={index} className='ml-1 bg-textColor text-cardColor mt-2 px-2 py-1 rounded-lg text-center text-xs flex items-center'>{tech}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center space-x-4 px-2 py-4'>
                                <Link className='text-xs font-light hover:underline decoration-1 transition-all ease-in flex space-x-1 items-center' href={project.repo_link} target='_blank'>
                                    <LuGithub /> <span>Repository</span>
                                </Link>
                                <Link className='text-xs font-light hover:underline decoration-1 mx-2 transition-all ease-in flex space-x-1 items-center' href={project.site_link} target='_blank'>
                                    <FaLink /> <span>Open Live</span>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full sm:w-[300px] h-[250px] sm:h-[300px] overflow-hidden order-1 sm:order-2 flex items-center justify-center">
                            <div className="h-full">
                                <Image src={project.project_image_url || ipad} width={500} height={500} alt={project.project_title} className='w-full h-full bg-cover' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center text-textColor'>
                {isLoading ? (
                    <div className='flex items-center space-x-3'>
                        <span className='text-sm'>Fetching Projects</span>
                        <div ref={loadingRef} className='flex space-x-1'>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                            <div className='w-1 h-1 bg-textColor rounded-full'></div>
                        </div>
                    </div>
                ) : (
                    !isProjectsLoaded && (
                        <button onClick={loadMoreProjects} className='flex items-center space-x-1 text-sm'><span>See More Projects</span> <span style={{
                            background: 'linear-gradient(359deg, #0d0d0d, #171717)',
                            boxShadow: '#5a5a5a2b 2px 2px 10px inset',
                        }} className='text-xs rounded-full p-1 text-white'><FaChevronRight /></span></button>
                    )
                )}
            </div>
        </section>
    );
};

export default Projects;