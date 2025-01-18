"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import toast from "react-hot-toast";
import ProjectCard from "@/components/ProjectCard";
import { MdEdit, MdDelete } from "react-icons/md";
import { useSearchParams } from 'next/navigation';

const LoadingSpinner = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-700 mr-[200px]"></div>
        </div>
    );
};

type Project = {
    id: string;
    project_title: string;
    project_description: string;
    technologies_used: string[];
    repo_link: string;
    site_link: string;
    project_image_url: string;
};

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.get(`${baseURL}/api/projects`);
                if (response.status === 200) {
                    setProjects(response.data.projects);
                } else {
                    toast.error("Failed to fetch projects");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while fetching the projects");
            } finally {
            }
        };

        fetchProjects();
    }, []);

    const handleEdit = (project: Project) => {
        if (project) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('project', JSON.stringify(project));
            window.location.href = `/admin/dashboard/?${params.toString()}`;
        } else {
            toast.error("Project not found");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
            const response = await axios.delete(`${baseURL}/api/projects`, { data: { id } });
            if (response.status === 200) {
                toast.success("Project deleted successfully");
                setProjects(projects.filter(project => project.id !== id));
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the project");
        } finally {
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={`flex flex-wrap`}>
                {projects.map((project) => (
                    <div key={project.id} className="w-[650px] m-4 relative">
                        <ProjectCard
                            title={project.project_title}
                            description={project.project_description}
                            tools={project.technologies_used}
                            repoLink={project.repo_link}
                            liveLink={project.site_link}
                            imageUrl={project.project_image_url}
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button onClick={() => handleEdit(project)}>
                                <i className="text-blue-500"><MdEdit /></i>
                            </button>
                            <button onClick={() => handleDelete(project.id)}>
                                <i className="text-red-500"><MdDelete /></i>
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="text-4xl">No projects found!</div>
                )}
            </div>
        </Suspense>
    );
};

const Dashboard = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AdminSidebar>
                <ProjectList />
            </AdminSidebar>
        </Suspense>
    );
};

export default Dashboard;
