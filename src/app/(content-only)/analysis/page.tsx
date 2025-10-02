'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TasteRating {
    aroma: number; // 향
    acidity: number; // 산미
    sweetness: number; // 단맛
    nutty: number; // 고소함
    body: number; // 바디
}

export default function AnalysisPage() {
    const [ratings, setRatings] = useState<TasteRating>({
        aroma: 1,
        acidity: 1,
        sweetness: 1,
        nutty: 1,
        body: 1,
    });
    const [isDragging, setIsDragging] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const lastUpdateTime = useRef<number>(0);
    const dragEndTime = useRef<number>(0);

    const tasteLabels = [
        { key: 'aroma', label: '향', position: 'top' },
        { key: 'acidity', label: '단맛', position: 'top-left' },
        { key: 'sweetness', label: '바디', position: 'top-right' },
        { key: 'nutty', label: '고소함', position: 'bottom-left' },
        { key: 'body', label: '산미', position: 'bottom-right' },
    ];

    const updateRating = useCallback((taste: keyof TasteRating, value: number) => {
        const clampedValue = Math.max(1, Math.min(5, value));
        setRatings(prev => ({
            ...prev,
            [taste]: clampedValue
        }));
    }, []);

    const smoothUpdateRating = useCallback((taste: keyof TasteRating, value: number) => {
        // Direct update for smoother dragging
        updateRating(taste, value);
    }, [updateRating]);

    // Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const handleClick = (event: React.MouseEvent) => {
        if (isDragging) return; // Don't handle click if we're dragging
        
        // Prevent clicks immediately after dragging
        const now = performance.now();
        if (now - dragEndTime.current < 100) return;
        
        const svg = event.currentTarget.closest('svg');
        if (!svg) return;

        const rect = svg.getBoundingClientRect();
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        // Calculate position relative to SVG viewBox
        const svgWidth = rect.width;
        const svgHeight = rect.height;
        const viewBoxWidth = 400;
        const viewBoxHeight = 400;
        
        const x = ((event.clientX - rect.left) / svgWidth) * viewBoxWidth - centerX;
        const y = ((event.clientY - rect.top) / svgHeight) * viewBoxHeight - centerY;
        
        // Calculate which taste point is closest using angle
        let closestTaste = 'aroma';
        let minAngleDiff = Infinity;
        
        const clickAngle = Math.atan2(y, x);
        tasteLabels.forEach((taste, index) => {
            const tasteAngle = (index * 72 - 90) * (Math.PI / 180);
            const angleDiff = Math.abs(clickAngle - tasteAngle);
            const normalizedAngleDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
            
            if (normalizedAngleDiff < minAngleDiff) {
                minAngleDiff = normalizedAngleDiff;
                closestTaste = taste.key;
            }
        });
        
        const distance = Math.sqrt(x * x + y * y);
        const normalizedDistance = Math.max(0, Math.min(1, distance / maxRadius));
        const newValue = Math.round(normalizedDistance * 4) + 1;

        // Set rating based on which ring was clicked (1-5)
        const clampedValue = Math.max(1, Math.min(5, newValue));
        updateRating(closestTaste as keyof TasteRating, clampedValue);
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        const svg = event.currentTarget.closest('svg');
        if (!svg) return;

        setIsDragging(true);
        const rect = svg.getBoundingClientRect();
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        // Store initial position to determine which taste we're dragging
        const startX = ((event.clientX - rect.left) / rect.width) * 400 - centerX;
        const startY = ((event.clientY - rect.top) / rect.height) * 400 - centerY;
        
        // Find which taste we're closest to at the start
        let initialTaste = 'aroma';
        let minAngleDiff = Infinity;
        
        const startAngle = Math.atan2(startY, startX);
        tasteLabels.forEach((taste, index) => {
            const tasteAngle = (index * 72 - 90) * (Math.PI / 180);
            const angleDiff = Math.abs(startAngle - tasteAngle);
            const normalizedAngleDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
            
            if (normalizedAngleDiff < minAngleDiff) {
                minAngleDiff = normalizedAngleDiff;
                initialTaste = taste.key;
            }
        });

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            
            const svgWidth = rect.width;
            const svgHeight = rect.height;
            const viewBoxWidth = 400;
            const viewBoxHeight = 400;
            
            // Calculate coordinates relative to SVG, even if mouse is outside SVG boundaries
            const x = ((e.clientX - rect.left) / svgWidth) * viewBoxWidth - centerX;
            const y = ((e.clientY - rect.top) / svgHeight) * viewBoxHeight - centerY;
            
            const distance = Math.sqrt(x * x + y * y);
            // Allow values beyond the max radius for more responsive dragging
            // Cap at 1.5x max radius for very far drags
            const normalizedDistance = Math.max(0, Math.min(1.5, distance / maxRadius));
            const newValue = Math.round(Math.min(normalizedDistance, 1) * 4) + 1;

            // Always update the initial taste we started dragging
            updateRating(initialTaste as keyof TasteRating, newValue);
        };

        const handleMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            setIsDragging(false);
            dragEndTime.current = performance.now();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp, { passive: false });
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        event.preventDefault(); // Prevent scrolling
        const svg = event.currentTarget.closest('svg');
        if (!svg || event.touches.length === 0) return;

        setIsDragging(true);
        const rect = svg.getBoundingClientRect();
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        // Store initial position to determine which taste we're dragging
        const startTouch = event.touches[0];
        const startX = ((startTouch.clientX - rect.left) / rect.width) * 400 - centerX;
        const startY = ((startTouch.clientY - rect.top) / rect.height) * 400 - centerY;
        
        // Find which taste we're closest to at the start
        let initialTaste = 'aroma';
        let minAngleDiff = Infinity;
        
        const startAngle = Math.atan2(startY, startX);
        tasteLabels.forEach((taste, index) => {
            const tasteAngle = (index * 72 - 90) * (Math.PI / 180);
            const angleDiff = Math.abs(startAngle - tasteAngle);
            const normalizedAngleDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
            
            if (normalizedAngleDiff < minAngleDiff) {
                minAngleDiff = normalizedAngleDiff;
                initialTaste = taste.key;
            }
        });

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault(); // Prevent scrolling
            if (e.touches.length === 0) return;
            
            const touch = e.touches[0];
            // SVG viewBox koordinatalariga o'tkazish, even if touch is outside SVG boundaries
            const svgWidth = rect.width;
            const svgHeight = rect.height;
            const viewBoxWidth = 400;
            const viewBoxHeight = 400;
            
            const x = ((touch.clientX - rect.left) / svgWidth) * viewBoxWidth - centerX;
            const y = ((touch.clientY - rect.top) / svgHeight) * viewBoxHeight - centerY;
            
            const distance = Math.sqrt(x * x + y * y);
            // Allow values beyond the max radius for more responsive dragging
            // Cap at 1.5x max radius for very far drags
            const normalizedDistance = Math.max(0, Math.min(1.5, distance / maxRadius));
            const newValue = Math.round(Math.min(normalizedDistance, 1) * 4) + 1;

            // Always update the initial taste we started dragging
            updateRating(initialTaste as keyof TasteRating, newValue);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            setIsDragging(false);
            dragEndTime.current = performance.now();
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
    };

    const generateRadarPath = () => {
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        const points = tasteLabels.map((taste, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees between each point
            const radius = (ratings[taste.key as keyof TasteRating] / 5) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return { x, y };
        });

        const pathData = points.map((point, index) =>
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        ).join(' ') + ' Z';

        return pathData;
    };

    return (
        <>
            <div className="h-[100dvh] flex-1 flex flex-col justify-center items-center px-4 pb-10">
                <div className="my-auto">
                    <div className="w-full sm:mx-auto px-4 py-4">
                        <Image
                            src="/images/logo.svg"
                            alt="My Coffee.Ai"
                            className="w-[220px] h-[32px] mx-auto"
                            width={220}
                            height={32}
                        />
                        <p className="text-gray-0 text-center mt-3 text-[14px]">
                            나만의 커피 취향을 찾아볼까요?
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center items-center px-6 pb-8 sm:mx-auto">
                        {/* Radar Chart */}
                        <div className="relative mb-8">
                            <svg 
                                className="mx-auto no-select w-[300px] h-[315px] sm:w-[325px] sm:h-[340px]" 
                                viewBox="0 0 400 415"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                {/* Grid - Concentric pentagons with varying stroke width */}
                                {[1, 2, 3, 4, 5].map((level) => {
                                    const centerX = 200;
                                    const centerY = 210;
                                    const maxRadius = 130;
                                    const radius = (level / 5) * maxRadius;
                                    const strokeWidth = level/2.2; // 1, 2, 3, 4, 5
                                    
                                    let pentagonPath = '';
                                    for (let i = 0; i < 5; i++) {
                                        const angle = (i * 72 - 90) * (Math.PI / 180);
                                        const x = centerX + radius * Math.cos(angle);
                                        const y = centerY + radius * Math.sin(angle);
                                        
                                        if (i === 0) {
                                            pentagonPath += `M ${x} ${y} `;
                                        } else {
                                            pentagonPath += `L ${x} ${y} `;
                                        }
                                    }
                                    pentagonPath += 'Z';
                                    
                                    return (
                                        <g key={level}>
                                            <path
                                                d={pentagonPath}
                                                fill="none"
                                                stroke="#B3B3B3"
                                                strokeWidth={strokeWidth}
                                                strokeDasharray="4,2"
                                                opacity="0.8"
                                            />
                                        </g>
                                    );
                                })}
                                
                                {/* Radial lines */}
                                {[0, 1, 2, 3, 4].map((i) => {
                                    const centerX = 200;
                                    const centerY = 210;
                                    const maxRadius = 130;
                                    const angle = (i * 72 - 90) * (Math.PI / 180);
                                    const x = centerX + maxRadius * Math.cos(angle);
                                    const y = centerY + maxRadius * Math.sin(angle);
                                    
                                    return (
                                        <line
                                            key={i}
                                            x1={centerX}
                                            y1={centerY}
                                            x2={x}
                                            y2={y}
                                            stroke="#B3B3B3"
                                            strokeWidth="1"
                                            strokeDasharray="4,2"
                                            opacity="0.8"
                                        />
                                    );
                                })}

                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                                        <stop offset="35.51%" stopColor="rgba(255, 224, 173, 0.20)" />
                                        <stop offset="74.3%" stopColor="rgba(255, 131, 54, 0.20)" />
                                        <stop offset="94.73%" stopColor="rgba(255, 117, 32, 0.20)" />
                                        <stop offset="100%" stopColor="rgba(255, 113, 26, 0.20)" />
                                    </linearGradient>
                                </defs>

                                {/* Large clickable area for the entire radar chart */}
                                <circle
                                    cx="200"
                                    cy="210"
                                    r="300"
                                    fill="transparent"
                                    className="cursor-pointer"
                                    onClick={handleClick}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    style={{ 
                                        cursor: isDragging ? 'grabbing' : 'grab', 
                                        touchAction: 'none',
                                        pointerEvents: 'auto'
                                    }}
                                />

                                {/* Filled area with rounded corners */}
                                <path
                                    d={generateRadarPath()}
                                    fill="url(#chartGradient)"
                                    stroke="#FF7927"
                                    strokeWidth="2.686"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ 
                                        pointerEvents: 'none',
                                        transition: 'all 0.1s ease-out'
                                    }}
                                />
                                
                                {/* Rounded corner circles at connection points */}
                                {tasteLabels.map((taste, index) => {
                                    const angle = (index * 72 - 90) * (Math.PI / 180);
                                    const currentRadius = (ratings[taste.key as keyof TasteRating] / 5) * 130;
                                    const pointX = 200 + currentRadius * Math.cos(angle);
                                    const pointY = 210 + currentRadius * Math.sin(angle);
                                    
                                    return (
                                        <circle
                                            key={`connection-${taste.key}`}
                                            cx={pointX}
                                            cy={pointY}
                                            r="5.75"
                                            fill="#FF7927"
                                            width="11.5"
                                            height="11.5"
                                            style={{ 
                                                pointerEvents: 'none',
                                                transition: 'all 0.1s ease-out'
                                            }}
                                        />
                                    );
                                })}


                                {/* Interactive taste points */}
                                {tasteLabels.map((taste, index) => {
                                    const angle = (index * 72 - 90) * (Math.PI / 180);
                                    
                                    // Custom label positioning based on taste
                                    let labelRadius = 160;
                                    if (taste.key === 'aroma') { // 향 - top
                                        labelRadius = 160 + 17; // 17px up
                                    } else if (taste.key === 'acidity' || taste.key === 'sweetness') { // 산미, 단맛 - sides
                                        labelRadius = 160 + 12; // 12px out
                                    } else if (taste.key === 'nutty' || taste.key === 'body') { // 고소함, 바디 - bottom
                                        labelRadius = 160 + 7; // 7px out
                                    }
                                    
                                    const labelX = 200 + labelRadius * Math.cos(angle);
                                    const labelY = 210 + labelRadius * Math.sin(angle);

                                    // Current rating position
                                    const currentRadius = (ratings[taste.key as keyof TasteRating] / 5) * 130;
                                    const pointX = 200 + currentRadius * Math.cos(angle);
                                    const pointY = 210 + currentRadius * Math.sin(angle);

                                    return (
                                        <g key={taste.key}>
                                            {/* Taste label */}
                                            <text
                                                x={labelX}
                                                y={labelY}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="text-[18px] font-normal fill-gray-0"
                                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                                            >
                                                {taste.label}
                                            </text>

                                            {/* Rating badge background */}
                                            <rect
                                                x={labelX - 26}
                                                y={labelY + 8}
                                                width="53"
                                                height="27"
                                                rx="13"
                                                fill="#FFF"
                                                stroke="#E6E6E6"
                                                strokeWidth="0.56"
                                            />
                                            
                                            {/* Rating number - only the number in orange */}
                                            <text
                                                x={labelX - 6}
                                                y={labelY + 23}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#FF7927"
                                                fontSize="16"
                                                fontWeight="400"
                                                letterSpacing="-0.13px"
                                                style={{ 
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.1s ease-out'
                                                }}
                                            >
                                                {ratings[taste.key as keyof TasteRating]}
                                            </text>
                                            
                                            {/* "/5" text in black */}
                                            <text
                                                x={labelX + 7}
                                                y={labelY + 23}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#1A1A1A"
                                                fontSize="16"
                                                fontWeight="400"
                                                letterSpacing="-0.13px"
                                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}
                                            >
                                                /5
                                            </text>

                                            {/* Visible draggable point indicator */}
                                            <circle
                                                cx={pointX}
                                                cy={pointY}
                                                r="5.75"
                                                fill="#FF7927"
                                                className="cursor-pointer transition-all"
                                                style={{ 
                                                    transition: 'all 0.1s ease-out',
                                                    pointerEvents: 'none'
                                                }}
                                                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                                            />

                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                    </div>
                </div>
                {/* CTA Button */}
                <Link href="/result" className="btn-primary w-full text-center block">
                    취향 분석 시작
                </Link>
            </div>
        </>
    );
}
