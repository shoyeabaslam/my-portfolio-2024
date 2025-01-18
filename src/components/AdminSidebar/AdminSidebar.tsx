"use client"

import { ReactNode, useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { FaRobot } from "react-icons/fa";

const menuItems = [
    {
        name: "Add Projects",
        link: '/admin/dashboard',
        icon: <FaProjectDiagram />
    },
    {
        name: "Add Testimonials",
        link: '/admin/dashboard/add-testimonials',
        icon: <FaPeopleRoof />
    },
    {
        name: "Testimonials",
        link: '/admin/dashboard/testimonials',
        icon: <FaPeopleRoof />
    },
    {
        name: "Projects",
        link: '/admin/dashboard/projects',
        icon: <FaProjectDiagram />
    },
    {
        name: "Add Bot Context",
        link: '/admin/dashboard/add-bot-context',
        icon: <FaRobot />
    },
]

const AdminSidebar = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [selectedItem, setSelectedItem] = useState<string>(pathname);

    useEffect(() => {
        setSelectedItem(pathname);
    }, [pathname]);

    return (
        <div className="relative">
            <div className="fixed flex flex-col justify-between left-0 top-0 bottom-0 h-full w-[230px] py-4 px-2 bg-lighterCardColor shadow-lg">
                <div>
                    <h4 className="font-concertOne text-3xl text-center pt-4 pb-8">Dashboard</h4>
                    <ul className="flex flex-col space-y-8">
                        {menuItems.map((item, index) => (
                            <Link key={index} href={item.link}>
                                <li
                                    className={`text-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer
                  ${selectedItem === item.link ? 'bg-[#4f4f4f] text-white' : 'bg-[#292929] text-gray-300'}
                  hover:bg-[#313131] transition-all`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <button className="text-lg py-2 px-4 mt-8 bg-[#292929] shadow-lg rounded-lg cursor-pointer flex items-center space-x-2">
                    <IoIosLogOut />
                    <span>Logout</span>
                </button>
            </div>
            <div className="w-full h-full ml-[230px] p-4">
                {children}
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default AdminSidebar;
