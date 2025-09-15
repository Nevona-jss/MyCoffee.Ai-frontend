'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSuccess() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animation trigger
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const handleContinue = () => {
        router.push('/home');
    };

    return (
        <div className="h-[100dvh] flex flex-col px-4 pb-2">
            {/* Success Content */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto">
                {/* Success Icon with Animation */}
                <div
                    className={`mb-8 transition-all duration-1000 ease-out ${isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-50'
                        }`}
                >
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Text with Animation */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ease-out delay-300 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h1 className="text-[20px] font-bold text-gray-0 mb-2">
                        회원가입이 완료되었습니다.
                    </h1>
                    <p className="text-[12px] text-[#6E6E6E] font-normal">
                        이제 당신만의 커피 여정을 시작해보세요.
                    </p>
                </div>

            </div>
            {/* Continue Button with Animation */}
            <div
                className={`w-full transition-all duration-1000 ease-out delay-500 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
            >
                <button
                    onClick={handleContinue}
                    className="w-full btn-primary duration-200"
                >
                    가입하기
                </button>
            </div>
        </div>
    );
}
