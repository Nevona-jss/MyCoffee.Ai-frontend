'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';

interface UserReview {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    product: string;
    date: string;
    images?: string[];
}

const UserReviews = () => {
    const userReviews: UserReview[] = [
        {
            name: "이**",
            avatar: "👤",
            rating: 3,
            comment: "제 취향에 맞는 커피라서 너무 행복해용 ㅎㅎ",
            product: "벨벳 터치 블렌드",
            date: "2일전",
            images: ["/images/coffee.png", "/images/coffee.png"]
        },
        {
            name: "김**",
            avatar: "👤",
            rating: 5,
            comment: "Deep Body Blend의 깊은 맛이 정말 인상적이었어요. 아침에 마시기 딱 좋은 커피입니다.",
            product: "딥 바디 블렌드",
            date: "1일전",
            images: ["/images/coffee.png"]
        },
        {
            name: "박**",
            avatar: "👤",
            rating: 4,
            comment: "가격 대비 품질이 훌륭해요. 자주 주문할 것 같습니다.",
            product: "아로마 블렌드",
            date: "3일전"
        }
    ];

    return (
        <div className="mb-4 bg-background-sub py-3 px-4 pr-0 text-gray-0">
            <div className="flex items-center justify-between mb-3 pr-4">
                <h2 className="text-base font-bold">모이면 더 맛있는 커피 리뷰</h2>
                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M1.5 10.5L6.5 6L1.5 1.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.57}
                loop={true}
                className="user-reviews-swiper"
            >
                {userReviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="rounded-lg px-3 py-2.5 border-[0.8px] border-line text-gray-0">
                            {/* User Info */}
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-[9px]">
                                    <div className="w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold leading-[150%]  mb-0.5">{review.name}</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                star <= review.rating ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                                        <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FFC107" stroke="#FFC107" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path d="M5 0L6.545 3.13L10 3.635L7.5 6.07L8.09 9.51L5 7.885L1.91 9.51L2.5 6.07L0 3.635L3.455 3.13L5 0Z" fill="#E6E6E6" />
                                                    </svg>)
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#999] font-normal">{review.date}</span>
                            </div>

                            {/* Product Tag */}
                            <div className="mb-1">
                                <span className="inline-block px-2 py-0.5 bg-[rgba(0,0,0,0.05)] rounded-4xl text-xs text-[#999] text-[10px]">
                                    {review.product}
                                </span>
                            </div>

                            {/* Comment */}
                            <p className="text-[10px] mb-2 font-normal">{review.comment}</p>

                            {/* Images - maksimal 2 ta */}
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 overflow-hidden">
                                    {review.images.slice(0, 2).map((image, imgIndex) => (
                                        <div key={imgIndex} className="w-[90px] h-[90px] shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Review image ${imgIndex + 1}`}
                                                width={90}
                                                height={90}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default UserReviews;
