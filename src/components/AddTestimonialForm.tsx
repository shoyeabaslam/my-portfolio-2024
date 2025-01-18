"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const AddTestimonialForm = () => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [feedback, setFeedback] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [checkBox, setCheckBox] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const testimonialParam = searchParams.get('testimonial');
        if (testimonialParam) {
            const testimonial = JSON.parse(testimonialParam);
            setName(testimonial.name);
            setDesignation(testimonial.designation);
            setFeedback(testimonial.feedback);
            setImagePreview(testimonial.image_url);
        }
    }, [searchParams]);

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
            context_type: "Testimonial",
            context_name: name,
            context_description: `Name: ${name}. Designation: ${designation}. Feedback: ${feedback}.`
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
        const testimonialParam = searchParams.get('testimonial');
        if (testimonialParam) {
            handleUpdate(testimonialParam);
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
                const testimonialData = {
                    image: base64Image,
                    name,
                    designation,
                    feedback
                };
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.post(`${baseURL}/api/testimonials`, testimonialData);
                if (checkBox) {
                    addToContext();
                }

                if (response.status === 200) {
                    toast.success("Testimonial added successfully");
                    setName("");
                    setDesignation("");
                    setFeedback("");
                    setImagePreview(null);
                    setCheckBox(false);
                } else {
                    toast.error("Failed to add testimonial");
                }
            };
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while adding the testimonial");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (testimonialParam: string) => {
        const testimonial = JSON.parse(testimonialParam);
        setLoading(true);
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
                const testimonialData = {
                    id: testimonial?.id,
                    image: base64Image,
                    name,
                    designation,
                    feedback
                };
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.put(`${baseURL}/api/testimonials`, testimonialData);
                if (response.status === 200) {
                    toast.success("Testimonial updated successfully");
                    setName("");
                    setDesignation("");
                    setFeedback("");
                    setImagePreview(null);
                } else {
                    toast.error("Failed to update testimonial");
                }
            };
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while updating the testimonial");
        } finally {
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
                    <label htmlFor="name" className="block text-sm font-semibold text-white">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="designation" className="block text-sm font-semibold text-white">
                        Designation
                    </label>
                    <input
                        id="designation"
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="feedback" className="block text-sm font-semibold text-white">
                        Feedback
                    </label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-white">Testimonial Image</label>
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
                                height={300}
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

export default AddTestimonialForm;
