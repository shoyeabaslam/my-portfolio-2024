import React from 'react';

type ButtonUIProps = {
    name: string;
    variant?: 'contained' | 'outlined';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    color?: 'primary' | 'secondary';
};

const ButtonUI: React.FC<ButtonUIProps> = ({
    name,
    variant = 'contained',
    startIcon,
    endIcon,
    color = 'primary'
}) => {
    const baseClasses = "font-medium py-3 px-6 rounded-lg transform transition-all duration-300 ease-in-out";

    const variantClasses = variant === 'contained'
        ? "bg-gray-800 text-gray-100 active:translate-y-1 active:shadow-md"
        : "bg-transparent text-primaryColor border-2 border-primaryColor active:bg-gray-700 active:border-gray-600";

    const gradientAndShadowStyles = color === 'primary'
        ? {
            background: 'linear-gradient(359deg, hsl(296deg 70.76% 29.44%), hsl(296 95% 30% / 1))',
            boxShadow: '5px 5px 10px rgb(0 0 0 / 30%), inset 5px 5px 8px hsl(296deg 80% 82% / 20%)',
        }
        : {
            background: 'linear-gradient(359deg, #0d0d0d, #171717)',
            boxShadow: '#5a5a5a2b 2px 2px 10px inset',
        };

    return (
        <button
            className={`${baseClasses} ${variantClasses} font-Poppins text-xs sm:text-sm font-medium flex items-center`}
            style={variant === 'contained' ? gradientAndShadowStyles : {}}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {name}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};

export default ButtonUI;
