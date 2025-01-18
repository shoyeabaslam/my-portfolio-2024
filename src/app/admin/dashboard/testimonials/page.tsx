"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import { TestimonialCard } from "@/components/Testimonials/Testimonials";

const LoadingSpinner = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-700 mr-[200px]"></div>
        </div>
    );
};

type Testimonial = {
    id: string;
    name: string;
    feedback: string;
    designation: string;
    company: string;
    image_url: string;
};

const TestimonialList = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const response = await axios.get(`${baseURL}/api/testimonials`);
                if (response.status === 200) {
                    setTestimonials(response.data.testimonials);
                } else {
                    toast.error("Failed to fetch testimonials");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while fetching the testimonials");
            }
        };

        fetchTestimonials();
    }, []);

    const handleEdit = (testimonial: Testimonial) => {
        if (testimonial) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('testimonial', JSON.stringify(testimonial));
            window.location.href = `/admin/dashboard/add-testimonials?${params.toString()}`;
        } else {
            toast.error("Testimonial not found");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
            const response = await axios.delete(`${baseURL}/api/testimonials`, { data: { id } });
            if (response.status === 200) {
                toast.success("Testimonial deleted successfully");
                setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
            } else {
                toast.error("Failed to delete testimonial");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the testimonial");
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={`flex flex-wrap`}>
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="m-4 relative">
                        <TestimonialCard
                            name={testimonial.name}
                            designation={testimonial.designation}
                            feedback={testimonial.feedback}
                            image_url={testimonial.image_url}
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button onClick={() => handleEdit(testimonial)}>
                                <i className="text-blue-500"><MdEdit /></i>
                            </button>
                            <button onClick={() => handleDelete(testimonial.id)}>
                                <i className="text-red-500"><MdDelete /></i>
                            </button>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="text-4xl">No testimonials found!</div>
                )}
            </div>
        </Suspense>
    );
};

const Testimonials = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AdminSidebar>
                <TestimonialList />
            </AdminSidebar>
        </Suspense>
    );
};

export default Testimonials;
