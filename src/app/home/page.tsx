import Image from 'next/image';
import Link from 'next/link';
import MyCollection from '@/components/MyCollection';
import TodaysCoffeePick from '@/components/TodaysCoffeePick';
import UserReviews from '@/components/UserReviews';
import CoffeeStories from '@/components/CoffeeStories';
import Footer from '@/components/Footer';
import BottomMenuBar from '@/components/BottomMenuBar';

export default function HomePage() {


    return (
        <div className="h-[100dvh] bg-background">
            {/* Header */}
            <div className="py-[18px] flex justify-center">
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
            <BottomMenuBar />
        </div>
    );
}
