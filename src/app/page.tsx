'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="h-[100dvh] flex-1 flex flex-col justify-center items-center px-4 pb-8">
        {/* Logo and Title */}
        <div className="my-auto text-center">  
          <Image
            src="/images/logo.svg"
            alt="My Coffee.Ai"
            className="w-[215.378px] h-[31.211px] mb-3
            "
            width={215.378}
            height={31.211}
          />
          <p className="mb-16 text-[14px]">
            나만의 커피 취향을 찾아볼까요?
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/analysis" className="btn-primary w-full text-center block">
          취향 분석 시작
        </Link>
      </div>
    </>
  );
}
