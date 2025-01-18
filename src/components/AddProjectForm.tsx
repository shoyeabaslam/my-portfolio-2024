"use client";
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const AddProjectForm = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [technologiesUsed, setTechnologiesUsed] = useState<string[]>([]);
    const [repoLink, setRepoLink] = useState("");
    const [siteLink, setSiteLink] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [checkBox, setCheckBox] = useState(false);
    const [newTechnology, setNewTechnology] = useState("");
    const [newTag, setNewTag] = useState("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const projectParam = searchParams.get('project');
        if (projectParam) {
            const project = JSON.parse(projectParam);
            setProjectTitle(project.project_title);
            setProjectDescription(project.project_description);
            setTechnologiesUsed(project.technologies_used);
            setRepoLink(project.repo_link);
            setSiteLink(project.site_link);
            setImagePreview(project.project_image_url);
            setTags(project.tags || []);
        }
    }, [searchParams]);

    const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTechnology.trim() !== "") {
            setTechnologiesUsed((prevTechnologies) => [...prevTechnologies, newTechnology.trim()]);
            setNewTechnology("");
            e.preventDefault();
        }
    };

    const handleRemoveTechnology = (technology: string) => {
        setTechnologiesUsed((prevTechnologies) => prevTechnologies.filter((t) => t !== technology));
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTag.trim() !== "") {
            setTags((prevTags) => [...prevTags, newTag.trim()]);
            setNewTag("");
            e.preventDefault();
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
    };

    const addToContext = async () => {
        const contextData = {
            context_type: "Project",
            context_name: projectTitle,
            context_description: `Project Title: ${projectTitle}. Project Description: ${projectDescription}. Technologies Used: ${technologiesUsed.join(', ')}. Repository Link: ${repoLink}. Site Link: ${siteLink}. Project Image: ${imagePreview}. Tags: [${tags.map(tag => `'${tag}'`).join(', ')}].`
        };
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
            const response = await axios.post(`${baseURL}/api/bot-context`, contextData);
            if (response.status === 200) {
                toast.success("Context added successfully");
            } else {
                toast.error("Failed to add context");
            }
        } catch (error) {
            console.error("Error adding context:", error);
            toast.error("An error occurred while adding the context");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const projectParam = searchParams.get('project');
        if (projectParam) {
            handleUpdate(projectParam);
            return;
        }
        if (!imagePreview) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }
        try {
            const imageFile = await fetch(imagePreview).then(res => res.blob());
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = async () => {
                const base64Image = reader.result?.toString().split(',')[1];
                const projectData = {
                    image: base64Image,
                    project_title: projectTitle,
                    project_description: projectDescription,
                    technologies_used: technologiesUsed,
                    repo_link: repoLink,
                    site_link: siteLink,
                    tags: tags
                };
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.post(`${baseURL}/api/projects`, projectData);
                if (checkBox) {
                    addToContext();
                }

                if (response.status === 200) {
                    toast.success("Project added successfully");
                    setProjectTitle("");
                    setProjectDescription("");
                    setTechnologiesUsed([]);
                    setRepoLink("");
                    setSiteLink("");
                    setImagePreview(null);
                    setTags([]);
                    setCheckBox(false)
                } else {
                    toast.error("Failed to add project");
                }
                setLoading(false);
            };
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while adding the project");
            setLoading(false);
        }

    };

    const handleUpdate = async (projectParam: string) => {
        const project = JSON.parse(projectParam);
        if (!imagePreview) {
            toast.error("Please upload an image");
            return;
        }

        setLoading(true);
        try {
            const imageFile = await fetch(imagePreview).then(res => res.blob());
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = async () => {
                const base64Image = reader.result?.toString().split(',')[1];
                const projectData = {
                    id: project?.id,
                    image: base64Image,
                    project_title: projectTitle,
                    project_description: projectDescription,
                    technologies_used: technologiesUsed,
                    repo_link: repoLink,
                    site_link: siteLink,
                    tags: tags
                };
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.put(`${baseURL}/api/projects`, projectData);
                if (response.status === 200) {
                    toast.success("Project updated successfully");
                    setProjectTitle("");
                    setProjectDescription("");
                    setTechnologiesUsed([]);
                    setRepoLink("");
                    setSiteLink("");
                    setImagePreview(null);
                    setTags([]);
                } else {
                    toast.error("Failed to update project");
                }
                setLoading(false);
            };
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while updating the project");
            setLoading(false);

        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center py-8">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 shadow-lg rounded-lg bg-[#1f1f1f] p-8 w-[90%] sm:w-[800px] mt-4"
            >
                <div>
                    <label htmlFor="projectTitle" className="block text-sm font-semibold text-white">
                        Project Title
                    </label>
                    <input
                        id="projectTitle"
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="projectDescription" className="block text-sm font-semibold text-white">
                        Project Description
                    </label>
                    <textarea
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-white">Technologies Used</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {technologiesUsed.map((tech, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTechnology(tech)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        onKeyDown={handleAddTechnology}
                        className="w-full mt-3 px-4 py-3 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add technology and press Enter"
                    />
                </div>

                <div>
                    <label htmlFor="repoLink" className="block text-sm font-semibold text-white">
                        Repository Link (Optional)
                    </label>
                    <input
                        id="repoLink"
                        type="url"
                        value={repoLink}
                        onChange={(e) => setRepoLink(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="siteLink" className="block text-sm font-semibold text-white">
                        Site Link (Optional)
                    </label>
                    <input
                        id="siteLink"
                        type="url"
                        value={siteLink}
                        onChange={(e) => setSiteLink(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-white">Project Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full mt-3 px-4 py-3 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none"
                    />
                    {imagePreview && (
                        <div className="mt-3 relative">
                            <Image
                                src={imagePreview}
                                alt="Image Preview"
                                className="w-full h-48 object-contain rounded-md"
                                width={500}
                                height={500}
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-1 right-1 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-white">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="w-full mt-3 px-4 py-3 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add tags and press Enter"
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <div className="flex items-center">
                        <input
                            checked={checkBox}
                            onChange={(e) => setCheckBox(e.target.checked)}
                            type="checkbox"
                            id="add-to-context"
                            className="mr-2"
                        />
                        <label htmlFor="add-to-context" className="text-white">Add To Context</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={24} color="#ffffff" /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectForm;
