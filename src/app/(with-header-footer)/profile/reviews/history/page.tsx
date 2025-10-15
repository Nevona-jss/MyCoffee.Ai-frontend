"use client";

import { ChevronDown, MoreVertical, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    },
    {
        id: 2,
        user: "이**",
        rating: 3.5,
        date: "2일전",
        product: "벨벳 터치 블렌드",
        images: ["/images/coffee.png"],
        text: "제 취향에 맞는 커피라서 너무 행복해용ㅎㅎ",
        likes: 24,
    },
];


const ReviewWrite = () => {

    const [showWarning, setShowWarning] = useState(true);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [sortBy, setSortBy] = useState("최신순");
    const sortOptions = ["최신순", "인기순", "별점 높은 순", "별점 낮은 순"];
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
            {showWarning && (
                <div className="bg-[#FFF3CD] rounded-lg py-3 px-4 mb-1">
                    <div className="flex items-center gap-2">
                        <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16H12.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-[12px] text-[#F59E0B] leading-[150%]">
                            포토 리뷰 작성 시, 확인 후 1000포인트를 드려요!<br /> 작성일로부터 48시간 이내 적립됩니다.
                        </p>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="flex-shrink-0 cursor-pointer ml-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-4">
                {/* Sort Dropdown */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        {/* write input chekcbox with label text */}
                        <input
                            type="checkbox"
                            id="photoReview"
                            className="auth-checkbox w-4 h-4"
                        />
                        <label
                            htmlFor="photoReview"
                            className="text-sm font-bold leading-[20px] "
                        >
                            포토리뷰
                        </label>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                            className="flex items-center gap-1 py-1 pl-2.5 pr-2  rounded-sm text-sm leading-[20px] font-bold border border-action-primary text-action-primary"
                        >
                            <span>{sortBy}</span>
                            <ChevronDown size={16} className="text-action-primary" />
                        </button>

                        {showSortDropdown && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-10 min-w-[140px]">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setSortBy(option);
                                            setShowSortDropdown(false);
                                        }}
                                        className={`w-full px-3 py-3.5 text-[12px] leading-[16px] font-bold text-left hover:bg-gray-50 ${sortBy === option && "text-action-secondary"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Link key={review.id} className="block" href={`/profile/reviews/history/${review.id}`}>
                    <div
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
                                    <p className="text-[12px] leading-[16px] font-bold">
                                        {review.user}
                                    </p>
                                    <div className="flex items-center">
                                        {renderStars(review.rating)}
                                        <span className="text-[12px] leading-[16px] font-normal text-text-secondary ml-1">
                                            | {review.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    onClick={(e) => {handleUserLike(review.id); e.preventDefault();}}
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
                        <span className="text-[12px] leading-[16px] text-text-secondary mb-3 rounded-[10px] inline-block bg-[#0000000D] px-2 py-0.5">
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
                        <p className="text-[12px] leading-4 mb-3">{review.text}</p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-2">
                            <button 
                                onClick={e => e.preventDefault()}
                                className="btn-action"
                            >
                                이 추천 커피로 바로 주문하기
                            </button>

                            <button
                                onClick={(e) => {setShowReviewOption(true); e.preventDefault();}}
                                className="size-8 border border-action-primary rounded-sm flex items-center justify-center"
                            >
                                <MoreVertical size={16} className="text-action-primary" />
                            </button>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default ReviewWrite;