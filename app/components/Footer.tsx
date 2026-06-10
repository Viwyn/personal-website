import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center py-2 float-left">
            <div className="w-full py-2 flex justify-center items-center">
                <a href="https://github.com/Viwyn" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <FaGithub className="text-5xl text-black dark:text-white hover:text-gray-400 transition duration-150 hover:scale-110"/>
                </a>
            </div>
            <p className="w-full text-center text-lg text-black dark:text-white">
                &copy; {new Date().getFullYear()} Riaru. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
