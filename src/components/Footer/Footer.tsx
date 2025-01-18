import { sLogo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

const NavbarConfig = [
    {
        name: "Home",
        link: "#home"
    },
    {
        name: "About",
        link: "#about"
    },
    {
        name: "Projects",
        link: "#projects"
    },
    {
        name: "Contact",
        link: "#contact"
    }
]
const Footer = () => {
    return (
        <footer className="bg-[#250727] text-white/70 py-4">
            <div className="container mx-auto text-center flex flex-col items-center space-y-2">
                <Image src={sLogo} width={200} height={200} className="w-5 md:w-7" alt="robot" />
                <h3 className="text-2xl font-semibold mb-4">Let&apos;s Connect</h3>
                <p className="mb-6 text-gray-300 text-sm md:text-lg">
                    Have a project in mind? Feel free to reach out!
                </p>
                <nav className="flex text-sm space-x-4 md:space-x-6">
                    {
                        NavbarConfig.map((item, index) => (
                            <Link key={index} href={item.link} className="hover:underline hover:text-white/90 text-xs md:text-lg">{item.name}</Link>
                        ))
                    }
                </nav>
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Shoyeab Aslam. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
