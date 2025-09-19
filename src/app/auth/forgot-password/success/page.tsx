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
        router.push('/auth/login-select');
    };

    return (
        <div className="h-[100dvh] flex flex-col px-4 pb-10">
            {/* Success Content */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto">
                {/* Success Icon with Animation */}
                <svg className='mb-9' xmlns="http://www.w3.org/2000/svg" width="169" height="168" viewBox="0 0 169 168" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M84.5015 168.002C130.893 168.002 168.501 130.394 168.501 84.0019C168.501 37.61 130.893 0.00195312 84.5015 0.00195312C38.1095 0.00195312 0.501465 37.61 0.501465 84.0019C0.501465 130.394 38.1095 168.002 84.5015 168.002ZM123.426 70.4266C127.527 66.3261 127.527 59.6778 123.426 55.5773C119.326 51.4768 112.677 51.4768 108.577 55.5773L74.0015 90.1527L60.4261 76.5773C56.3256 72.4768 49.6773 72.4768 45.5768 76.5773C41.4763 80.6778 41.4763 87.3261 45.5768 91.4266L66.5768 112.427C70.6773 116.527 77.3256 116.527 81.4261 112.427L123.426 70.4266Z" fill="#28A745" />
                </svg>
                {/* <Image src={'/images/success.gif'} className='w-[500px] h-[500px]' alt='success animation' width={500} height={500}  /> */}

                {/* Success Text with Animation */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ease-out delay-300 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h1 className="text-[20px] font-bold text-gray-0 mb-2">
                        비밀번호 재설정이 완료되었습니다.
                    </h1>
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
                    로그인
                </button>
            </div>
        </div>
    );
}
