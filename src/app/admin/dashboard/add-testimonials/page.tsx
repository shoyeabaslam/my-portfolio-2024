"use client";

import AddTestimonialForm from '@/components/AddTestimonialForm'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import React, { Suspense } from 'react'

const AddTestimonials = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminSidebar>
                <AddTestimonialForm />
            </AdminSidebar>
        </Suspense>
    )
}

export default AddTestimonials