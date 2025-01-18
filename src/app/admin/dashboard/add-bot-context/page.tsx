"use client"

import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const Page = () => {
    const [formData, setFormData] = useState({
        context_type: 'personal_info',
        context_name: '',
        context_description: '',
    });
    const [loading, setLoading] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'context_description') {
            setCharCount(value.length);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (charCount > 2000) {
            toast.error("Context description exceeds the maximum character limit of 2000.");
            return;
        }
        setLoading(true);
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

            const response = await axios.post(`${baseURL}/api/bot-context`, formData);
            if (response.status === 200) {
                toast.success("Context added successfully");
                setFormData({
                    context_type: 'personal_info',
                    context_name: '',
                    context_description: '',
                });
                setCharCount(0);
            } else {
                toast.error("Failed to add context");
            }
        } catch (error) {
            console.error('Error processing request:', error);
            toast.error("An error occurred while adding the context");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminSidebar>
            <div className="w-full h-full flex justify-center items-center py-8">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 shadow-lg rounded-lg bg-[#1f1f1f] p-8 w-[90%] sm:w-[800px] mt-4"
                >
                    <div>
                        <label htmlFor="context_type" className="block text-sm font-semibold text-white">
                            Context Type
                        </label>
                        <select
                            name="context_type"
                            value={formData.context_type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="personal_info">Personal Information</option>
                            <option value="project">Project</option>
                            <option value="skills">Skills</option>
                            <option value="achievements">Achievements</option>
                            <option value="education">Education</option>
                            <option value="experience">Experience</option>
                            <option value="testimonials">Testimonials</option>
                            <option value="contact_info">Contact Information</option>
                            <option value="interests">Interests</option>
                            <option value="profile_summary">Profile Summary</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="context_name" className="block text-sm font-semibold text-white">
                            Context Name
                        </label>
                        <input
                            type="text"
                            name="context_name"
                            value={formData.context_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="context_description" className="block text-sm font-semibold text-white">
                            Context Description
                        </label>
                        <textarea
                            rows={4}
                            name="context_description"
                            value={formData.context_description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-2 bg-[#2c2c2c] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className={`text-right text-sm mt-1 ${charCount > 2000 ? 'text-red-500' : 'text-gray-400'}`}>
                            {charCount} / 2000
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            disabled={loading || charCount > 2000}
                        >
                            {loading ? <ClipLoader size={24} color="#ffffff" /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminSidebar>
    )
}

export default Page