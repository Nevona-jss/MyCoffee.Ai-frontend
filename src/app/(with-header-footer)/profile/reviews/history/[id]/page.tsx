"use client";

import { MoreVertical, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const reviews = [
    {
        id: 1,
        user: "이**",
        rating: 3.5,
        date: "2일전",
        product: "벨벳 터치 블렌드",
        images: ["/images/coffee.png", "/images/coffee-story.png"],
        text: "제 취향에 맞는 커피라서 너무 행복해용ㅎㅎ",
        likes: 0,
    }
];

const ReviewWrite = () => {

    const [likedReviews, setLikedReviews] = useState<number[]>([]);
    const [showReviewOption, setShowReviewOption] = useState(false);

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg
                    key="half"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                >
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#E5E5E5" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill="url(#half)"
                    />
                </svg>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg
                    key={`empty-${i}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#E5E5E5"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }

        return stars;
    };

    const isUserLiked = (id: number) => {
        return likedReviews.includes(id);
      };

    const handleUserLike = (id: number) => {
        const isLiked = isUserLiked(id);
        if (isLiked) {
          setLikedReviews(likedReviews.filter((review) => review !== id));
        } else {
          setLikedReviews([...likedReviews, id]);
        }
      };

    return (
        <div>
            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-lg px-3 py-2.5 border border-border-default"
                    >
                        {/* User Info and Rating */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center border border-border-default">
                                    <img
                                        src={"/images/review-avatar.svg"}
                                        alt="user"
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] leading-[16px] font-bold">
                                        {review.user}
                                    </p>
                                    <div className="flex items-center">
                                        {renderStars(review.rating)}
                                        <span className="text-[10px] leading-[16px] font-normal text-text-secondary ml-1">
                                            | {review.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    onClick={() => handleUserLike(review.id)}
                                    className={`size-8 border border-border-default rounded-sm flex items-center justify-center transition-all duration-300 ${isUserLiked(review.id) &&
                                        "bg-action-secondary border-transparent text-white"
                                        }`}
                                >
                                    <ThumbsUp
                                        size={16}
                                        className={`transition-all duration-300 ${isUserLiked(review.id)
                                            ? "text-white"
                                            : "text-icon-default"
                                            }`}
                                    />
                                </span>
                                <span className="text-sm leading-[20px] font-bold">
                                    {review.likes}
                                </span>
                            </div>
                        </div>

                        {/* Product Name */}
                        <span className="text-[10px] leading-[16px] text-text-secondary mb-3 rounded-[10px] inline-block bg-[#0000000D] px-2 py-0.5">
                            {review.product}
                        </span>

                        {/* Review Image */}
                        <div
                            className="mb-3 rounded-lg overflow-hidden"
                        >
                            <Image
                                src={review.images[0]}
                                alt="Coffee review"
                                width={337}
                                height={357}
                                className="w-full h-[357px] object-cover rounded-lg"
                            />
                        </div>

                        {/* Review Text */}
                        <p className="text-[10px] leading-4 mb-3">{review.text}</p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-2">
                            <button 
                                className="btn-action text-center"
                            >
                                이 추천 커피로 바로 주문하기
                            </button>

                            <button
                                onClick={() => setShowReviewOption(true)}
                                className="size-8 border border-action-primary rounded-sm flex items-center justify-center"
                            >
                                <MoreVertical size={16} className="text-action-primary" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ReviewWrite;