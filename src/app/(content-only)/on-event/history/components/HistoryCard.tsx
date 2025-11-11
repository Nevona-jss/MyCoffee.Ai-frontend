'use client';

type HistoryItem = {
    id: string;
    type: '시음' | '원두 주문';
    itemName: string;
    status: string;
    statusColor?: string;
    identifier: string;
    date: string;
    time: string;
    options?: string;
    price?: string;
};

interface HistoryCardProps {
    item: HistoryItem;
    onClick: () => void;
}

export default function HistoryCard({ item, onClick }: HistoryCardProps) {
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-2xl border border-border-default p-3 pt-4 text-gray-0 cursor-pointer"
        >
            <p className="text-[10px] font-bold leading-[16px] mb-4">{item.date} {item.time}</p>

            <div className='border border-border-default rounded-2xl px-4 py-3'>
                <div className="flex justify-between items-center mb-4">
                    <div className={`inline-block px-2 py-0 rounded-sm h-[24px] leading-[22px] ${item.type === '시음' ? 'bg-[#17A2B8]' : 'bg-[#28A745]'}`} >
                        <span className={`text-xs font-bold leading-[16px] text-white`} >
                            {item.type}
                        </span>
                    </div>
                    <span
                        className={`text-xs font-bold leading-[16px] ${item.statusColor ? 'text-white' : ''}`}
                        style={{ color: item.statusColor || undefined}}
                    >
                        {item.status}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-bold leading-[20px]">
                        {item.itemName}
                    </p>
                    <p className="text-sm font-bold leading-[20px]">
                        {item.identifier}
                    </p>
                </div>
                {
                    item.price && (
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-1">
                                <span className='text-xs leading-[16px] font-normal'>카페인</span>
                                <span className='text-[#FFE5BF]'>•</span>
                                <span className='text-xs leading-[16px] font-normal'>홀빈</span>
                                <span className='text-[#FFE5BF]'>•</span>
                                <span className='text-xs leading-[16px] font-normal'>벌크</span>
                                <span className='text-[#FFE5BF]'>•</span>
                                <span className='text-xs leading-[16px] font-normal'>500g</span>
                                <span className='text-[#FFE5BF]'>•</span>
                                <span className='text-xs leading-[16px] font-normal'>1개</span>
                            </div>
                            <p className="text-sm font-bold leading-[20px]">
                                {item.price}원
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

