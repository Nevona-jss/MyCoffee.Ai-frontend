import { CoffeePreferences } from "@/types/coffee";
import { useCallback, useEffect, useRef, useState } from "react";

const SpiderChart = ({ ratings, setRatings }: { ratings: CoffeePreferences, setRatings: (ratings: CoffeePreferences) => void }) => {

    const [isDragging, setIsDragging] = useState(false);
    const activeTasteIndexRef = useRef<number | null>(null);
    const [userId] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const pendingUpdateRef = useRef<{ tasteKey: keyof CoffeePreferences; value: number } | null>(null);
    const dragStartPos = useRef<{ x: number; y: number } | null>(null);
    const hasMoved = useRef(false);
    // const { setPreferences } = useRecommendationStore();

    const tasteLabels = [
        { key: 'aroma', label: '향', position: 'top' },
        { key: 'acidity', label: '단맛', position: 'top-left' },
        { key: 'sweetness', label: '바디', position: 'top-right' },
        { key: 'nutty', label: '고소함', position: 'bottom-left' },
        { key: 'body', label: '산미', position: 'bottom-right' },
    ];

    const updateRating = useCallback((taste: keyof CoffeePreferences, value: number) => {
        const clampedValue = Math.max(1, Math.min(5, value));
        setRatings({
            ...ratings,
            [taste]: clampedValue
        });
    }, [ratings]);

    const smoothUpdateRating = useCallback((taste: keyof CoffeePreferences, value: number) => {
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

    const startHandleMouseDrag = (event: React.MouseEvent, tasteIndex: number) => {
        event.preventDefault();
        event.stopPropagation();
        const svg = event.currentTarget.closest('svg');
        if (!svg) return;

        hasMoved.current = false;
        activeTasteIndexRef.current = tasteIndex;

        const rect = svg.getBoundingClientRect();
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            if (activeTasteIndexRef.current === null) return;

            hasMoved.current = true;
            if (!isDragging) setIsDragging(true);

            const svgWidth = rect.width;
            const svgHeight = rect.height;
            const viewBoxWidth = 400;
            const viewBoxHeight = 415;

            const x = ((e.clientX - rect.left) / svgWidth) * viewBoxWidth - centerX;
            const y = ((e.clientY - rect.top) / svgHeight) * viewBoxHeight - centerY;

            const distance = Math.sqrt(x * x + y * y);
            const normalizedDistance = Math.max(0, Math.min(1, distance / maxRadius));
            const newValue = Math.round(normalizedDistance * 4) + 1;
            const clampedValue = Math.max(1, Math.min(5, newValue));
            const tasteKey = tasteLabels[activeTasteIndexRef.current].key as keyof CoffeePreferences;

            // Batch updates for smooth dragging
            pendingUpdateRef.current = { tasteKey, value: clampedValue };
            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(() => {
                    animationFrameRef.current = null;
                    if (pendingUpdateRef.current) {
                        const { tasteKey, value } = pendingUpdateRef.current;
                        pendingUpdateRef.current = null;
                        updateRating(tasteKey, value);
                    }
                });
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            setIsDragging(false);
            activeTasteIndexRef.current = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp, { passive: false });
    };

    const startHandleTouchDrag = (event: React.TouchEvent, tasteIndex: number) => {
        event.preventDefault();
        event.stopPropagation();
        const svg = event.currentTarget.closest('svg');
        if (!svg || event.touches.length === 0) return;

        hasMoved.current = false;
        activeTasteIndexRef.current = tasteIndex;

        const rect = svg.getBoundingClientRect();
        const centerX = 200;
        const centerY = 210;
        const maxRadius = 130;

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (activeTasteIndexRef.current === null || e.touches.length === 0) return;

            const touch = e.touches[0];
            hasMoved.current = true;
            if (!isDragging) setIsDragging(true);

            const svgWidth = rect.width;
            const svgHeight = rect.height;
            const viewBoxWidth = 400;
            const viewBoxHeight = 415;

            const x = ((touch.clientX - rect.left) / svgWidth) * viewBoxWidth - centerX;
            const y = ((touch.clientY - rect.top) / svgHeight) * viewBoxHeight - centerY;

            const distance = Math.sqrt(x * x + y * y);
            const normalizedDistance = Math.max(0, Math.min(1, distance / maxRadius));
            const newValue = Math.round(normalizedDistance * 4) + 1;
            const clampedValue = Math.max(1, Math.min(5, newValue));
            const tasteKey = tasteLabels[activeTasteIndexRef.current].key as keyof CoffeePreferences;

            // Batch updates for smooth dragging
            pendingUpdateRef.current = { tasteKey, value: clampedValue };
            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(() => {
                    animationFrameRef.current = null;
                    if (pendingUpdateRef.current) {
                        const { tasteKey, value } = pendingUpdateRef.current;
                        pendingUpdateRef.current = null;
                        updateRating(tasteKey, value);
                    }
                });
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            setIsDragging(false);
            activeTasteIndexRef.current = null;
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
            const radius = (ratings[taste.key as keyof CoffeePreferences] / 5) * maxRadius;
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
        <div 
            className="relative mb-8 swiper-no-swiping"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
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
                    const strokeWidth = level / 2.2; // 1, 2, 3, 4, 5

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

                {/* Grid corner hotspots (all rings x all corners) */}
                {[0, 1, 2, 3, 4].map((axisIndex) => {
                    const centerX = 200;
                    const centerY = 210;
                    const maxRadius = 130;
                    const angle = (axisIndex * 72 - 90) * (Math.PI / 180);
                    const tasteKey = tasteLabels[axisIndex].key as keyof CoffeePreferences;
                    return (
                        <g key={`grid-hotspots-axis-${axisIndex}`}>
                            {[1, 2, 3, 4, 5].map((level) => {
                                const radius = (level / 5) * maxRadius;
                                const hx = centerX + radius * Math.cos(angle);
                                const hy = centerY + radius * Math.sin(angle);
                                return (
                                    <circle
                                        key={`hotspot-${axisIndex}-${level}`}
                                        cx={hx}
                                        cy={hy}
                                        r={10}
                                        fill="transparent"
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateRating(tasteKey, level);
                                        }}
                                        style={{ pointerEvents: 'auto' }}
                                    />
                                );
                            })}
                        </g>
                    );
                })}

                {/* Corner hotspots: allow click/touch on each corner to change the corresponding taste */}
                {tasteLabels.map((taste, index) => {
                    const centerX = 200;
                    const centerY = 210;
                    const maxRadius = 130;
                    const angle = (index * 72 - 90) * (Math.PI / 180);
                    const cornerX = centerX + maxRadius * Math.cos(angle);
                    const cornerY = centerY + maxRadius * Math.sin(angle);

                    return (
                        <circle
                            key={`corner-hotspot-${taste.key}`}
                            cx={cornerX}
                            cy={cornerY}
                            r={18}
                            fill="transparent"
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Outer corner should set max (5) directly
                                updateRating(taste.key as keyof CoffeePreferences, 5);
                            }}
                            onMouseDown={(e) => startHandleMouseDrag(e, index)}
                            onTouchStart={(e) => startHandleTouchDrag(e, index)}
                            style={{ pointerEvents: 'auto' }}
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
                    const currentRadius = (ratings[taste.key as keyof CoffeePreferences] / 5) * 130;
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
                                pointerEvents: 'auto',
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
                    const currentRadius = (ratings[taste.key as keyof CoffeePreferences] / 5) * 130;
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
                                {ratings[taste.key as keyof CoffeePreferences]}
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
                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasMoved.current) {
                                        hasMoved.current = false;
                                        return;
                                    }
                                    const currentValue = ratings[taste.key as keyof CoffeePreferences];
                                    const newValue = currentValue >= 5 ? 1 : currentValue + 1;
                                    updateRating(taste.key as keyof CoffeePreferences, newValue);
                                }}
                                onMouseDown={(e) => startHandleMouseDrag(e, index)}
                                onTouchStart={(e) => startHandleTouchDrag(e, index)}
                                style={{
                                    transition: 'all 0.1s ease-out',
                                    pointerEvents: 'auto'
                                }}
                                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                            />

                        </g>
                    );
                })}

                {/* Removed large overlay interaction to restrict drag to small handles */}
            </svg>
        </div>
    )
}
export default SpiderChart;