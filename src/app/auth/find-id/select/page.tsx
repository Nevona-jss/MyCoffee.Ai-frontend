'use client';

import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHeaderStore } from "@/stores/header-store";
import { useEffect } from "react";

export default function SelectId() {
  const router = useRouter();
  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "아이디 찾기",
      showBackButton: true,
    });
  }, [setHeader]);

  const accountData = [
    {
      id: 'abcd12***',
      type: 'kakao',
      typeName: '카카오',
      lastLogin: '2024년 12월 12일',
      icon: (
        <Image src="/images/kakao.png" alt="kakao" className="w-4 h-4" width={16} height={16} />
      )
    },
    {
      id: 'abcd12***',
      type: 'naver',
      typeName: '네이버',
      lastLogin: '2024년 12월 12일',
      icon: (
        <Image src="/images/naver.png" alt="naver" className="w-4 h-4" width={16} height={16} />
      )
    },
    {
      id: 'abcd12***',
      type: 'apple',
      typeName: 'Apple',
      lastLogin: '2024년 12월 12일',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
          <path d="M11.7485 11.7689C11.5331 12.2667 11.278 12.7248 10.9826 13.146C10.5798 13.7203 10.25 14.1177 9.9959 14.3385C9.60193 14.7008 9.17983 14.8863 8.72783 14.8969C8.40334 14.8969 8.01202 14.8045 7.5565 14.6172C7.09949 14.4308 6.6795 14.3385 6.29547 14.3385C5.89272 14.3385 5.46077 14.4308 4.99874 14.6172C4.53601 14.8045 4.16324 14.9022 3.87824 14.9118C3.44479 14.9303 3.01275 14.7395 2.5815 14.3385C2.30626 14.0984 1.96198 13.6869 1.54955 13.1038C1.10705 12.4812 0.743251 11.7592 0.458244 10.9361C0.153012 10.0471 0 9.18618 0 8.35271C0 7.39796 0.206302 6.57451 0.619522 5.88446C0.944277 5.33019 1.37632 4.89296 1.91705 4.57199C2.45778 4.25101 3.04203 4.08745 3.67123 4.07698C4.01551 4.07698 4.46698 4.18348 5.02802 4.39277C5.58748 4.60276 5.94671 4.70926 6.10421 4.70926C6.22196 4.70926 6.62102 4.58474 7.29752 4.33649C7.93727 4.10627 8.47721 4.01094 8.91954 4.04849C10.1181 4.14522 11.0186 4.61771 11.6175 5.46895C10.5455 6.11846 10.0152 7.02818 10.0258 8.19521C10.0355 9.10422 10.3652 9.86067 11.0133 10.4613C11.307 10.74 11.6351 10.9555 12 11.1085C11.9209 11.338 11.8373 11.5579 11.7485 11.7689V11.7689ZM8.99956 0.951665C8.99956 1.66415 8.73926 2.32939 8.22043 2.94513C7.59431 3.67713 6.83699 4.10011 6.01574 4.03337C6.00528 3.94789 5.99921 3.85793 5.99921 3.7634C5.99921 3.07941 6.29697 2.34742 6.82574 1.74891C7.08973 1.44588 7.42547 1.19391 7.83263 0.992908C8.2389 0.794907 8.62319 0.685408 8.98461 0.666656C8.99516 0.761904 8.99956 0.857158 8.99956 0.951656V0.951665Z" fill="#111827" />
        </svg>
      )
    },
    {
      id: 'abcd****@gmail.com',
      type: 'email',
      typeName: '이메일',
      lastLogin: '2024년 12월 12일',
      icon: ""
      // icon: (
      //   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      //     <g clipPath="url(#clip0_1304_8236)">
      //       <path d="M13.5371 7.1536C13.5371 6.70041 13.5004 6.24478 13.422 5.79895H7.13379V8.36616H10.7348C10.5853 9.19414 10.1052 9.92658 9.40215 10.392V12.0578H11.5505C12.812 10.8966 13.5371 9.18189 13.5371 7.1536Z" fill="#4285F4" />
      //       <path d="M7.13328 13.6671C8.93131 13.6671 10.4476 13.0768 11.5524 12.0577L9.40409 10.392C8.80638 10.7986 8.03475 11.0289 7.13573 11.0289C5.39649 11.0289 3.92182 9.85552 3.3927 8.27795H1.17578V9.99514C2.30751 12.2464 4.61261 13.6671 7.13328 13.6671Z" fill="#34A853" />
      //       <path d="M3.39043 8.27788C3.11117 7.44991 3.11117 6.55334 3.39043 5.72537V4.00818H1.17596C0.230408 5.89194 0.230408 8.11131 1.17596 9.99507L3.39043 8.27788Z" fill="#FBBC04" />
      //       <path d="M7.13328 2.97201C8.08374 2.95732 9.00235 3.31496 9.69069 3.97146L11.5941 2.0681C10.3888 0.936371 8.78923 0.314165 7.13328 0.333762C4.61261 0.333762 2.30751 1.75455 1.17578 4.00821L3.39025 5.7254C3.91692 4.14539 5.39404 2.97201 7.13328 2.97201Z" fill="#EA4335" />
      //     </g>
      //     <defs>
      //       <clipPath id="clip0_1304_8236">
      //         <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333496 0.333313)" />
      //       </clipPath>
      //     </defs>
      //   </svg>
      // )
    }
  ];

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'kakao':
        return 'bg-[#FEE500] text-[#3C1E1E]';
      case 'naver':
        return 'bg-[#03C75A] text-white';
      case 'apple':
        return 'bg-[#F5F5F7] text-[#1D1D1F]';
      case 'email':
        return 'bg-[#F5F5F7] text-[#1D1D1F]';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <Header />

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-[14px]">
          {accountData.map((account, index) => (
            <div key={index} className="bg-white rounded-xl p-3 border border-[#E6E6E6]">
              <div className="flex justify-start items-center mb-2 gap-1">
                <span className="text-gray-0 font-bold text-sm">
                  {account.id}
                </span>
                <div className={`pr-3 pl-2 py-1 rounded-sm text-[10px] font-normal flex items-center gap-1.5 bg-[rgba(0,0,0,0.05)] ${getTypeBadgeStyle(account.type)}`}>
                  {account.icon}
                  <span className="text-gray-0">{account.typeName}</span>
                </div>
              </div>
              <div className="text-[#6E6E6E] text-xs font-normal leading-[150%] mb-0.5">
                최근 로그인: {account.lastLogin}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6">
        <button
          onClick={() => router.push('/auth/login-select')}
          className="w-full btn-primary"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
