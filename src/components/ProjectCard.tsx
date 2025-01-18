import { FaLink } from 'react-icons/fa';
import { LuGithub } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';

type ProjectProps = {
    title: string;
    description: string;
    tools: string[];
    repoLink: string;
    liveLink: string;
    imageUrl: string;
};

const ProjectCard: React.FC<ProjectProps> = ({ title, description, tools, repoLink, liveLink, imageUrl }) => {

    return (
        <div className="card p-4 bg-cardColor card-border rounded-md shadow flex flex-col sm:flex-row">
            <div className="flex-1 w-full flex flex-col justify-between order-2 sm:order-1">
                <div className="flex flex-col space-y-2 p-2">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <h1 className="text-textColor font-medium text-sm">{description}</h1>
                    <div className="text-textColor text-xs flex font-medium">
                        <h3 className="mr-2 py-[2px] mt-2">Tools:</h3>
                        <div className="w-full flex flex-wrap">
                            {tools.map((tool, index) => (
                                <p
                                    key={index}
                                    className="ml-1 bg-textColor text-cardColor mt-2 px-2 rounded-full text-center text-xs flex items-center"
                                >
                                    {tool}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-2">
                    <Link
                        className="text-xs font-light hover:underline decoration-1 transition-all ease-in flex space-x-1 items-center"
                        href={repoLink}
                        target="_blank"
                    >
                        <LuGithub /> <span>Repository</span>
                    </Link>
                    <Link
                        className="text-xs font-light hover:underline decoration-1 mx-2 transition-all ease-in flex space-x-1 items-center"
                        href={liveLink}
                        target="_blank"
                    >
                        <FaLink /> <span>Open Live</span>
                    </Link>
                </div>
            </div>
            <div className="w-full pb-4 rounded-lg sm:w-[250px] h-[300px] overflow-hidden order-1 sm:order-2 flex items-center justify-center">
                <div className="h-full">
                    <Image src={imageUrl} width={500} height={500} alt={title} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
