'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
    title?: string;
    showBackButton?: boolean;
    backHref?: string;
}

const Header = ({ title, showBackButton = true, backHref }: HeaderProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        if (backHref) {
            router.push(backHref);
        } else {
            router.back();
        }
    };

    return (
        <div className="bg-white px-4 py-2.5 flex items-center justify-between w-full" style={{boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.08)"}}>
            {/* Left side - Back button */}
            <div className="flex items-center">
                {showBackButton && (
                    <button onClick={handleBackClick} className="flex items-center py-0 px-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>  
                    </button>
                )}
            </div>

            {/* Center - Title */}
            {
                title && (
                <div className="flex-1 flex justify-center">
                    <h1 className="text-[16px] font-bold text-gray-0">
                        {title}
                    </h1>
                </div>
            )}
            
            {/* Right side - Empty for now */}
            <div className="w-6"></div>
        </div>
    );
};

export default Header;