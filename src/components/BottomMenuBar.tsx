'use client';

import Image from "next/image";

const homeIcon = (fill: string = '#B3B3B3') => <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <g clip-path="url(#clip0_1214_171)">
        <path d="M6.92864 0.713867H2.64293C1.85395 0.713867 1.21436 1.35346 1.21436 2.14244V6.42815C1.21436 7.21713 1.85395 7.85672 2.64293 7.85672H6.92864C7.71762 7.85672 8.35721 7.21713 8.35721 6.42815V2.14244C8.35721 1.35346 7.71762 0.713867 6.92864 0.713867Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.3574 0.713867H14.0716C13.2827 0.713867 12.6431 1.35346 12.6431 2.14244V6.42815C12.6431 7.21713 13.2827 7.85672 14.0716 7.85672H18.3574C19.1463 7.85672 19.7859 7.21713 19.7859 6.42815V2.14244C19.7859 1.35346 19.1463 0.713867 18.3574 0.713867Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.92864 12.1426H2.64293C1.85395 12.1426 1.21436 12.7822 1.21436 13.5711V17.8569C1.21436 18.6458 1.85395 19.2854 2.64293 19.2854H6.92864C7.71762 19.2854 8.35721 18.6458 8.35721 17.8569V13.5711C8.35721 12.7822 7.71762 12.1426 6.92864 12.1426Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.3574 12.1426H14.0716C13.2827 12.1426 12.6431 12.7822 12.6431 13.5711V17.8569C12.6431 18.6458 13.2827 19.2854 14.0716 19.2854H18.3574C19.1463 19.2854 19.7859 18.6458 19.7859 17.8569V13.5711C19.7859 12.7822 19.1463 12.1426 18.3574 12.1426Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
        <clipPath id="clip0_1214_171">
            <rect width="20" height="20" fill="white" transform="translate(0.5)" />
        </clipPath>
    </defs>
</svg>;

const editIcon = (fill: string = '#B3B3B3') => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_1214_180)">
        <path d="M10.0001 13.3572L5.71436 14.1286L6.42864 9.78577L14.6144 1.62862C14.7472 1.49473 14.9052 1.38845 15.0792 1.31592C15.2533 1.24339 15.4401 1.20605 15.6286 1.20605C15.8172 1.20605 16.004 1.24339 16.178 1.31592C16.3521 1.38845 16.5101 1.49473 16.6429 1.62862L18.1572 3.14291C18.2911 3.27571 18.3974 3.43372 18.4699 3.6078C18.5424 3.78188 18.5798 3.96861 18.5798 4.1572C18.5798 4.34578 18.5424 4.53251 18.4699 4.70659C18.3974 4.88067 18.2911 5.03868 18.1572 5.17148L10.0001 13.3572Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17.1429 14.0717V18.3574C17.1429 18.7363 16.9924 19.0997 16.7245 19.3676C16.4566 19.6355 16.0932 19.786 15.7144 19.786H2.14293C1.76405 19.786 1.40068 19.6355 1.13277 19.3676C0.864865 19.0997 0.714355 18.7363 0.714355 18.3574V4.78599C0.714355 4.40711 0.864865 4.04375 1.13277 3.77584C1.40068 3.50793 1.76405 3.35742 2.14293 3.35742H6.42864" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
        <clipPath id="clip0_1214_180">
            <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
        </clipPath>
    </defs>
</svg>

const globalIcon = (fill: string = '#B3B3B3') => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
    <path d="M11 21.5C16.5228 21.5 21 17.0228 21 11.5C21 5.97715 16.5228 1.5 11 1.5C5.47715 1.5 1 5.97715 1 11.5C1 17.0228 5.47715 21.5 11 21.5Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 11.5H21" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.8456 11.5C14.6567 15.1569 13.3098 18.659 10.9995 21.5C8.6892 18.659 7.34224 15.1569 7.15332 11.5C7.34224 7.84309 8.6892 4.341 10.9995 1.5C13.3098 4.341 14.6567 7.84309 14.8456 11.5V11.5Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const profileIcon = (fill: string = '#B3B3B3') => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 12.0986C11.4482 12.0987 12.8722 12.4714 14.1348 13.1807C15.3973 13.8899 16.4565 14.9117 17.21 16.1484C17.4255 16.5022 17.3127 16.9642 16.959 17.1797C16.6053 17.3949 16.1441 17.2823 15.9287 16.9287C15.3092 15.9119 14.4385 15.0715 13.4004 14.4883C12.3621 13.905 11.1909 13.5987 10 13.5986C8.80911 13.5986 7.6379 13.905 6.59961 14.4883C5.56151 15.0715 4.69083 15.9119 4.07129 16.9287C3.85578 17.2824 3.39378 17.3952 3.04004 17.1797C2.68642 16.9641 2.57457 16.5021 2.79004 16.1484C3.54348 14.9117 4.60266 13.8899 5.86523 13.1807C7.12786 12.4714 8.55179 12.0986 10 12.0986Z" fill={fill} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99902 2.09668C12.5373 2.09668 14.5955 4.1542 14.5957 6.69238C14.5957 9.23077 12.5374 11.2891 9.99902 11.2891C7.46084 11.2888 5.40332 9.23062 5.40332 6.69238C5.40356 4.15435 7.461 2.09692 9.99902 2.09668ZM9.99902 3.59668C8.28942 3.59692 6.90356 4.98278 6.90332 6.69238C6.90332 8.40219 8.28927 9.78882 9.99902 9.78906C11.709 9.78906 13.0957 8.40234 13.0957 6.69238C13.0955 4.98263 11.7088 3.59668 9.99902 3.59668Z" fill={fill} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 0C18.6569 0 20 1.34315 20 3V17C20 18.6051 18.7394 19.9158 17.1543 19.9961L17 20H3L2.8457 19.9961C1.31166 19.9184 0.0816253 18.6883 0.00390625 17.1543L0 17V3C0 1.34315 1.34315 6.44255e-08 3 0H17ZM3 1.5C2.17157 1.5 1.5 2.17157 1.5 3V17C1.5 17.8284 2.17157 18.5 3 18.5H17C17.8284 18.5 18.5 17.8284 18.5 17V3C18.5 2.17157 17.8284 1.5 17 1.5H3Z" fill={fill} />
</svg>

const BottomMenuBar = () => {
    return (
        <div className="bg-[#FAFAFA] sticky bottom-0 w-full rounded-tl-lg border-t border-line px-2 z-10">
            <div className="flex items-center justify-between pb-2">
                {/* Home */}
                <div className="p-3 flex flex-col items-center cursor-pointer">
                    {homeIcon("#4E2A18")}
                    <span className="text-[10px] text-primary mt-1">홈</span>
                </div>

                {/* edit */}
                <div className="p-3 flex flex-col items-center cursor-pointer mr-10">
                    {editIcon()}
                    <span className="text-[10px] text-[#999] mt-1">리뷰</span>
                </div>

                {/* Primary Icon */}
                <div className="absolute cursor-pointer right-[50%] translate-x-[50%] -translate-y-[36%] flex flex-col items-center justify-center bg-primary rounded-full w-[70px] h-[70px]">
                    <Image
                        src="/images/white-icon.svg"
                        alt="Primary"
                        width="24"
                        height="24"
                    />
                    <span className="text-[10px] text-[#fff] mt-1">내 커피</span>
                </div>

                {/* globus */}
                <div className="p-3 flex flex-col items-center cursor-pointer ml-10">
                    {globalIcon()}
                    <span className="text-[10px] text-[#999] mt-1">커뮤니티</span>
                </div>

                {/* Profile */}
                <div className="p-3 flex flex-col items-center cursor-pointer">
                    {profileIcon()}
                    <span className="text-[10px] text-[#999] mt-1">MY</span>
                </div>
            </div>
        </div>
    );
};

export default BottomMenuBar;
