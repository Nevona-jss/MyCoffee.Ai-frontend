"use client";
import React, { useEffect, useState } from "react";
import BottomMenuBar from "@/components/BottomMenuBar";
import {
  ChevronDown,
  ThumbsUp,
  MoreVertical,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import ActionSheet from "@/components/ActionSheet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useHeaderStore } from "@/stores/header-store";

const ReviewMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState("최신순");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [showReviewOption, setShowReviewOption] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedReviewImages, setSelectedReviewImages] = useState<string[]>(
    []
  );
  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "리뷰",
      showBackButton: false,
    });
  }, []);

  const [isToolTipOpen, setIsToolTipOpen] = useState(true);

  const sortOptions = ["최신순", "인기순", "별점 높은 순", "별점 낮은 순"];

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

  const handleImageClick = (images: string[]) => {
    setSelectedReviewImages(images);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentSlide(0);
    setSelectedReviewImages([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      <div className="px-4 pt-2.5">
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
                    className={`w-full px-3 py-3.5 text-[10px] leading-[16px] font-bold text-left hover:bg-gray-50 ${
                      sortBy === option && "text-action-secondary"
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
      <div className="px-4 pt-5.5 space-y-4">
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
                  className={`size-8 border border-border-default rounded-sm flex items-center justify-center transition-all duration-300 ${
                    isUserLiked(review.id) &&
                    "bg-action-secondary border-transparent text-white"
                  }`}
                >
                  <ThumbsUp
                    size={16}
                    className={`transition-all duration-300 ${
                      isUserLiked(review.id)
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
              className="mb-3 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(review.images)}
            >
              <img
                src={review.images[0]}
                alt="Coffee review"
                className="w-full h-48 max-h-[350px] object-cover rounded-lg"
              />
            </div>

            {/* Review Text */}
            <p className="text-[10px] leading-4 mb-3">{review.text}</p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <button className="btn-action">
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

        <div className="relative">
          {isToolTipOpen && (
            <div className="absolute bottom-full flex items-center gap-2 left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-100 transition-opacity duration-300 whitespace-nowrap">
              포토 내 커피 추천 작성시 포인트 +1,000
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              {/* X button */}
              <button
                onClick={() => setIsToolTipOpen(false)}
                className="size-4 cursor-pointer inline-flex items-center justify-center hover:bg-gray-700 rounded"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          )}

          <button className="py-4 bg-linear-gradient w-full text-white rounded-lg font-bold text-base ">
            내 커피 추천하기 111
          </button>
        </div>
      </div>

      <div className="bg-menu-bar h-[40px]"></div>

      {/* Bottom Menu Bar */}
      <BottomMenuBar />

      {/* Action Sheet */}
      <ActionSheet
        isOpen={showReviewOption}
        onClose={() => setShowReviewOption(false)}
      >
        <div className="flex flex-col gap-2">
          <button className="text-base leading-[24px] font-bold text-white bg-action-primary rounded-lg py-3">
            상세 보기
          </button>
          <button className="flex items-center justify-center gap-1 text-base leading-[24px] font-bold text-action-primary border border-action-primary rounded-lg py-3">
            <SquarePen size={16} className="text-action-primary" />
            수정
          </button>
          <button className="flex items-center justify-center gap-1 text-base leading-[24px] font-bold text-action-primary border border-action-primary rounded-lg py-3">
            <Trash size={16} className="text-action-primary" />
            삭제
          </button>
        </div>
      </ActionSheet>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-4xl max-h-[100vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-6 left-6 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center"
            >
              <X size={20} />
            </button>

            {/* Swiper */}
            <Swiper
              pagination={
                selectedReviewImages.length > 1 ? { clickable: true } : false
              }
              className="w-full h-full"
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              onPaginationRender={() => {}}
            >
              {selectedReviewImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center h-[100vh]">
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="max-w-full max-h-full object-contain w-full "
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-white px-2 py-0.5 rounded-full flex items-center">
                <span className="text-[12px] leading-[18px] font-bold text-action-secondary">
                  {String(currentSlide + 1)}
                  <span className="text-text-primary">
                    /{String(selectedReviewImages.length)}
                  </span>
                </span>
              </div>
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewMain;
