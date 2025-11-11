'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import MyCollection from '@/components/MyCollection';
import TodaysCoffeePick from '@/components/TodaysCoffeePick';
import UserReviews from '@/components/UserReviews';
import CoffeeStories from '@/components/CoffeeStories';
import Footer from '@/components/Footer';

function HomePageContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = searchParams.get('token');
            if (token) {
                localStorage.setItem('token', token);
            }
        }
    }, [searchParams]);

    return (
        <div className="bg-background w-full">
            <div className="z-10 py-[18px] flex justify-center bg-white">
                <Image
                    src="/images/logo.svg"
                    alt="My Coffee.Ai"
                    className="w-[137.5px] h-[20px] my-auto"
                    width={137.5}
                    height={20}
                />
            </div>

            {/* Main Content */}
            <div className='bg-background'>
                {/* Today's Coffee Pick */}
                <TodaysCoffeePick />

                {/* My Coffee Collection */}
                <MyCollection />

                {/* User Reviews */}
                <UserReviews />

                {/* Coffee Stories */}
                <CoffeeStories />

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={
            <div className="bg-background w-full">
                <div className="z-10 py-[18px] flex justify-center bg-white">
                    <Image
                        src="/images/logo.svg"
                        alt="My Coffee.Ai"
                        className="w-[137.5px] h-[20px] my-auto"
                        width={137.5}
                        height={20}
                    />
                </div>
                <div className='bg-background'>
                    <TodaysCoffeePick />
                    <MyCollection />
                    <UserReviews />
                    <CoffeeStories />
                    <Footer />
                </div>
            </div>
        }>
            <HomePageContent />
        </Suspense>
    );
}
