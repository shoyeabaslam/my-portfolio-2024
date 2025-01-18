"use client";

import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-cardColor p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-3 right-3 text-textColor hover:text-red-500"
                    onClick={onClose}
                >
                    <FaTimes size={18} />
                </button>
                <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
