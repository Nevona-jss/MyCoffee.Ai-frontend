'use client';

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function SelectId() {
  const router = useRouter();

  const accountData = [
    {
      id: 'abcd12***',
      type: 'kakao',
      typeName: '카카오',
      lastLogin: '2024년 12월 12일',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.5 2 1.73 4.11 1.73 6.83C1.73 8.24 2.5 9.5 3.7 10.3L3.1 12.1C3.05 12.25 3.1 12.4 3.2 12.5C3.3 12.6 3.45 12.65 3.6 12.6L5.4 12C6.1 12.2 6.8 12.3 7.5 12.3C8.2 12.3 8.9 12.2 9.6 12L11.4 12.6C11.55 12.65 11.7 12.6 11.8 12.5C11.9 12.4 11.95 12.25 11.9 12.1L11.3 10.3C12.5 9.5 13.27 8.24 13.27 6.83C13.27 4.11 10.5 2 8 2Z" fill="#3C1E1E"/>
        </svg>
      )
    },
    {
      id: 'abcd12***',
      type: 'naver',
      typeName: '네이버',
      lastLogin: '2024년 12월 12일',
      icon: (
        <div className="w-4 h-4 bg-[#03C75A] rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      )
    },
    {
      id: 'abcd12***',
      type: 'apple',
      typeName: 'Apple',
      lastLogin: '2024년 12월 12일',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12.152 8.384c-.023-1.77.144-3.2.5-4.27.18-.54.39-.99.63-1.35-.17-.22-.42-.4-.72-.54-.3-.14-.63-.21-.99-.21-.36 0-.69.07-.99.21-.3.14-.55.32-.72.54.24.36.45.81.63 1.35.356 1.07.523 2.5.5 4.27 0 0 .023.18.07.54.05.36.12.78.22 1.26.1.48.24.95.42 1.41.18.46.4.87.66 1.23.26.36.56.66.9.9.34.24.72.42 1.14.54.42.12.88.18 1.38.18.5 0 .96-.06 1.38-.18.42-.12.8-.3 1.14-.54.34-.24.64-.54.9-.9.26-.36.48-.77.66-1.23.18-.46.32-.93.42-1.41.1-.48.17-.9.22-1.26.047-.36.07-.54.07-.54z" fill="#000000"/>
        </svg>
      )
    },
    {
      id: 'abcd****@gmail.com',
      type: 'email',
      typeName: '이메일',
      lastLogin: '2024년 12월 12일',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#4285F4"/>
          <path d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#EA4335"/>
          <path d="M8 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#FBBC05"/>
          <path d="M8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#34A853"/>
        </svg>
      )
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
      <Header title="아이디 찾기" />
      
      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-3">
          {accountData.map((account, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900 font-medium text-sm">
                  {account.id}
                </span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeBadgeStyle(account.type)}`}>
                  {account.icon}
                  {account.typeName}
                </div>
              </div>
              <div className="text-gray-500 text-xs">
                최근 로그인 : {account.lastLogin}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6">
        <button
          onClick={() => router.push('/auth/login')}
          className="w-full bg-[#6B3F2B] text-white text-lg font-medium py-4 rounded-lg hover:bg-[#5A3524] transition-colors duration-200"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
