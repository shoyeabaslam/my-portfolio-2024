import React, { ReactNode } from 'react'
import ButtonUI from '../ButtonUI'

const NavbarConfig = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/"
    },
    {
        name: "Projects",
        link: "/"
    },
    {
        name: "Contact",
        link: "/"
    }
]

const Navbar = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex items-center justify-center p-2 z-[2000]">
                <div className='md:w-[70%] lg:w-[50%] flex items-center bg-cardColor/50 rounded-xl p-2 backdrop-blur-xl shadow-md border border-white/15  justify-between'>
                    <div>
                        <nav className="w-full  flex items-center space-x-4 px-2">
                            {
                                NavbarConfig.map((config) => (
                                    <li key={config.name} className="list-none text-textColor hover:text-primaryColor cursor-pointer font-medium transition-all ease-in-out text-sm ">{config.name}</li>
                                ))
                            }

                        </nav>
                    </div>
                    <div className='cursor-pointer font-medium transition-all ease-in-out text-sm '>
                        <button style={{
                            background: 'linear-gradient(359deg, hsl(296deg 70.76% 29.44%), hsl(296 95% 30% / 1))',
                            boxShadow: '5px 5px 10px rgb(0 0 0 / 30%), inset 5px 5px 8px hsl(296deg 80% 82% / 20%)',
                        }} className='text-xs px-3 py-2 rounded-md'>Let's Build Together</button>
                    </div>
                </div>
            </header>


            {children}
        </>
    )
}

export default Navbar