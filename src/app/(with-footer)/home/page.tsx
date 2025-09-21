import Image from 'next/image';
import MyCollection from '@/components/MyCollection';
import TodaysCoffeePick from '@/components/TodaysCoffeePick';
import UserReviews from '@/components/UserReviews';
import CoffeeStories from '@/components/CoffeeStories';
import Footer from '@/components/Footer';

export default function HomePage() {

    return (
        <div className="bg-background">
            <div className="py-[18px] flex justify-center bg-white">
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
