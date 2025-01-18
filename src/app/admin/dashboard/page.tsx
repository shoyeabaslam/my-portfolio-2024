"use client";
import AddProjectForm from '@/components/AddProjectForm'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import React, { Suspense } from 'react'

const AddProject = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminSidebar>
                <AddProjectForm />
            </AdminSidebar>
        </Suspense>
    )
}

export default AddProject