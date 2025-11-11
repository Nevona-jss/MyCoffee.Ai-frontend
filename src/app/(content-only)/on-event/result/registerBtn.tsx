import ActionSheet from "@/components/ActionSheet";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-responsive-modal"

const RegisterBtn = ({
    onOpenModal,
    onCloseModal,
    open,
    setOpen,
}) => {

    const [openActionSheet, setOpenActionSheet] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        agreements: {
            personalInfo: false,
            marketing: false,
        },
    });

    const [orderData, setOrderData] = useState({
        option: '',
        caffeine: '카페인',
        grind: '분쇄 그라인딩',
        packaging: '스틱',
        weight: '',
        quantity: 1,
        price: 36000,
        deliveryAddress: '',
        agreements: {
            personalInfo: false,
            marketing: false,
        },
    });

    return (
        <>
            <button onClick={onOpenModal} className="btn-primary w-full text-center block">
                My Coffee 시음요청
            </button>

            <Modal
                open={open}
                onClose={onCloseModal}
                center
                showCloseIcon={false}
                styles={{
                    modal: {
                        width: '361px',
                        padding: '12px',
                        borderRadius: '16px',
                    }
                }}
            >
                <div className="mb-3">
                    <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                        이름
                    </label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="이름을 입력해주세요."
                        className="input-default"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                        휴대폰 번호
                    </label>
                    <input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="휴대폰 번호를 입력해주세요."
                        className="input-default"
                    />
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-[18px] border-t border-border-default pt-4">
                    <input
                        type="checkbox"
                        checked={formData.agreements.personalInfo}
                        onChange={() => setFormData({ ...formData, agreements: { ...formData.agreements, personalInfo: !formData.agreements.personalInfo } })}
                        className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                    />
                    <span className="text-xs leading-[16px] font-normal ">
                        개인정보 수집 동의 (필수)
                    </span>
                    <ChevronRight size={20} className="ml-auto text-icon-default" />
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.agreements.marketing}
                        onChange={() => setFormData({ ...formData, agreements: { ...formData.agreements, marketing: !formData.agreements.marketing } })}
                        className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                    />
                    <span className="text-xs leading-[16px] font-normal ">
                        앱 출시 알림 동의 (선택)
                    </span>
                    <ChevronRight size={20} className="ml-auto text-icon-default" />
                </label>
                <button className="btn-primary w-full mb-2 mt-[28px]" onClick={() => { setOpenActionSheet('success'); onCloseModal(); }}>요청</button>
                <button className="btn-primary-empty !py-0.5 w-full !font-normal">취소</button>
            </Modal>

            {/* Success Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'success'}
                onClose={() => setOpenActionSheet(null)}
            >
                <div>
                    <div className="mt-3 mb-[27px] text-center">
                        <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                        </svg>
                    </div>
                    <p className="text-center text-base leading-[20px] font-bold text-gray-0 mb-3">시음 번호 : A0001</p>
                    <p className="text-center text-sm leading-[20px] font-bold text-text-secondary mb-6 underline">* 부스에서 번호를 보여주시면 시음 커피를 만들어드려요!</p>
                    <button className="btn-primary w-full mb-2" onClick={() => setOpenActionSheet('detail')}>상세 화면</button>
                    <Link href="/on-event/analysis" className="btn-primary-outline w-full inline-block text-center" >메인으로</Link>
                </div>
            </ActionSheet>

            {/* Detail Information Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'detail'}
                onClose={() => setOpenActionSheet(null)}
                title="상세 정보"
            >
                <div className="mt-3">
                    <div className="space-y-2 border border-border-default rounded-2xl p-3 text-gray-0 mb-6">
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">시음번호</span>
                            <span className="text-xs leading-[16px] font-bold">A0001</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">요청 일자</span>
                            <span className="text-xs leading-[16px] font-bold">2025-08-14 15:34</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">이름</span>
                            <span className="text-xs leading-[16px] font-bold">{formData.name || '이기홍'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">전화번호</span>
                            <span className="text-xs leading-[16px] font-bold">{formData.phone || '010-1234-1234'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">요청 커피</span>
                            <span className="text-xs leading-[16px] font-bold">클래식 하모니 블랜드</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs leading-[18px]">상태</span>
                            <span className="text-xs leading-[16px] font-bold">대기</span>
                        </div>
                    </div>
                    <button className="btn-primary w-full mb-2" onClick={() => setOpenActionSheet('order')}>원두 예약 주문</button>
                    <button className="btn-primary-outline w-full" onClick={() => setOpenActionSheet(null)}>닫기</button>
                </div>
            </ActionSheet>

            {/* Coffee Bean Reservation Order Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'order'}
                onClose={() => setOpenActionSheet(null)}
                title="원두 예약 주문"
            >
                <div className="space-y-6 mt-4">
                    <div className="relative cursor-pointer">
                        <p
                            onClick={() => setOpenActionSheet('option')}
                            className="w-full h-[40px] leading-[40px] text-xs text-gray-0 pl-4 pr-2 border border-border-default rounded-lg bg-white"
                        >
                            {'옵션(필수)'}
                        </p>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {orderData.option && (
                        <div className="border border-border-default rounded-lg py-3 px-4 relative">
                            <button
                                onClick={() => setOrderData({ ...orderData, option: '' })}
                                className="absolute top-2 right-2 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12 4L4 12" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 4L12 12" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <p className="text-xs font-bold text-gray-0 mb-2 leading-[16px]">클래식 하모니 블랜드</p>
                            <p className="text-xs text-text-secondary mb-6">{orderData.caffeine} • {orderData.grind} • {orderData.packaging} • 500g • 라벨</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-[22px]">
                                    <button
                                        onClick={() => setOrderData({ ...orderData, quantity: Math.max(1, orderData.quantity - 1), price: 36000 * Math.max(1, orderData.quantity - 1) })}
                                        className="w-6 h-6 cursor-pointer rounded hover:bg-gray-100 flex items-center justify-center text-xs"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                                            <path d="M0.833252 0.833008H12.4999" stroke="#4E2A18" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <span className="text-base font-bold text-gray-0">{orderData.quantity}</span>
                                    <button
                                        onClick={() => setOrderData({ ...orderData, quantity: orderData.quantity + 1, price: 36000 * (orderData.quantity + 1) })}
                                        className="w-6 h-6 cursor-pointer rounded bg-action-primary text-white flex items-center justify-center text-xs"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4.16675 10H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 4.16699V15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="text-sm font-bold text-gray-0 leading-[20px]">{orderData.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <span className="text-sm leading-[20px] font-bold text-gray-0">최종 결제금액</span>
                        <span className="text-sm leading-[20px] font-bold text-gray-0">{orderData.price.toLocaleString()}원</span>
                    </div>

                    <button
                        className="btn-primary w-full mb-2"
                        onClick={() => {
                            if (orderData.option) {
                                setOpenActionSheet('delivery');
                            } else {
                                setOpenActionSheet('option');
                            }
                        }}
                    >
                        다음으로
                    </button>
                    <button className="btn-primary-outline w-full" onClick={() => setOpenActionSheet(null)}>닫기</button>
                </div>
            </ActionSheet>

            {/* Option Selection Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'option'}
                onClose={() => setOpenActionSheet(null)}
                title="옵션선택"
            >
                <div className="space-y-4 mt-4 text-text-primary">
                    <div>
                        <p className="text-xs font-bold text-gray-0 mb-2">카페인 강도</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOrderData({ ...orderData, caffeine: '카페인' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.caffeine === '카페인'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                카페인
                            </button>
                            <button
                                onClick={() => setOrderData({ ...orderData, caffeine: '디카페인' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.caffeine === '디카페인'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                디카페인
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-0 mb-2">분쇄 정도</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOrderData({ ...orderData, grind: '홀빈' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.grind === '홀빈'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                홀빈
                            </button>
                            <button
                                onClick={() => setOrderData({ ...orderData, grind: '분쇄 그라인딩' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.grind === '분쇄 그라인딩'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                분쇄 그라인딩
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-0 mb-2 leading-[20px]">포장 방법</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOrderData({ ...orderData, packaging: '스틱' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.packaging === '스틱'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                스틱
                            </button>
                            <button
                                onClick={() => setOrderData({ ...orderData, packaging: '벌크' })}
                                className={`flex-1 h-[40px] rounded-lg border text-xs cursor-pointer ${orderData.packaging === '벌크'
                                    ? 'border-[#A45F37] font-bold'
                                    : 'border-border-default font-normal'
                                    }`}
                            >
                                벌크
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-0 mb-2 leading-[20px]">중량</p>
                        <div className="relative">
                            <p className="w-full h-[40px] leading-[40px] text-xs text-gray-0 cursor-pointer pl-4 pr-2 border border-border-default rounded-lg bg-white">
                                {orderData.weight || '중량을 선택해주세요.'}
                            </p>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="var(--icon-default)" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn-primary w-full mb-2"
                        onClick={() => {
                            setOrderData({ ...orderData, option: `${orderData.caffeine} • ${orderData.grind} • ${orderData.packaging} • 500g` });
                            setOpenActionSheet('order');
                        }}
                    >
                        선택 완료
                    </button>
                    <button className="btn-primary-outline w-full" onClick={() => setOpenActionSheet(null)}>닫기</button>
                </div>
            </ActionSheet>

            {/* Delivery Address Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'delivery'}
                onClose={() => setOpenActionSheet(null)}
                title="배송지 주소"
            >
                <div className="space-y-4 mt-4">
                    <div>
                        <input
                            type="text"
                            value={orderData.deliveryAddress}
                            onChange={(e) => setOrderData({ ...orderData, deliveryAddress: e.target.value })}
                            placeholder="배송지를 입력해주세요."
                            className="input-default w-full"
                        />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer border-t border-border-default pt-5 mb-[18px]">
                        <input
                            type="checkbox"
                            checked={orderData.agreements.personalInfo}
                            onChange={() => setOrderData({ ...orderData, agreements: { ...orderData.agreements, personalInfo: !orderData.agreements.personalInfo } })}
                            className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                        />
                        <span className="text-xs leading-[18px] text-gray-0 font-normal">
                            개인정보 수집 동의 (필수)
                        </span>
                        <ChevronRight size={20} className="ml-auto text-icon-default" />
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer mb-6">
                        <input
                            type="checkbox"
                            checked={orderData.agreements.marketing}
                            onChange={() => setOrderData({ ...orderData, agreements: { ...orderData.agreements, marketing: !orderData.agreements.marketing } })}
                            className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                        />
                        <span className="text-xs leading-[18px] text-gray-0 font-normal">
                            앱 출시 알림 동의 (선택)
                        </span>
                        <ChevronRight size={20} className="ml-auto text-icon-default" />
                    </label>

                    <button
                        className="btn-primary w-full mb-2"
                        onClick={() => setOpenActionSheet('order-confirm')}
                    >
                        주문 접수
                    </button>
                    <button
                        className="btn-primary-outline w-full"
                        onClick={() => setOpenActionSheet('order')}
                    >
                        이전으로
                    </button>
                </div>
            </ActionSheet>

            {/* Order Confirmation Action Sheet */}
            <ActionSheet
                isOpen={openActionSheet === 'order-confirm'}
                onClose={() => setOpenActionSheet(null)}
            >
                <div className="space-y-3 mt-4">
                    <div className="text-center mb-8">
                        <div className="mt-3 mb-[27px] text-center">
                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                            </svg>
                        </div>
                        <p className="text-base font-bold text-gray-0 mb-3">주문번호 : BO001</p>
                        <p className="text-sm text-text-secondary font-normal mb-6">주문 요청이 완료되었습니다.</p>
                        <p className="text-sm text-text-secondary font-bold underline ">* 부스에서 결제를 진행하여 주문을 확정해주세요.</p>
                    </div>

                    <div className="border border-border-default rounded-2xl py-3 px-4">
                        <p className="text-sm font-bold text-gray-0 mb-3 leading-[20px]">클래식 하모니 블랜드</p>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-text-secondary leading-[16px]">{orderData.caffeine} • {orderData.grind} • {orderData.packaging} • 500g • 1개</p>
                            <p className="text-sm font-bold text-gray-0 leading-[20px]">{orderData.price.toLocaleString()}원</p>
                        </div>
                    </div>

                    <div className="border border-border-default rounded-2xl py-3 px-4 text-gray-0">
                        <p className="text-sm font-bold mb-3 leading-[20px]">주문정보</p>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">주문번호</span>
                                <span className="font-bold leading-[16px]">B0001</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">요청 일자</span>
                                <span className="font-bold leading-[16px]">2025-08-14 15:34</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">요청 커피</span>
                                <span className="font-bold leading-[16px]">클래식 하모니 블랜드</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">상태</span>
                                <span className="font-bold leading-[16px]">결제 대기</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-border-default rounded-2xl py-3 px-4 text-gray-0 mb-6">
                        <p className="text-sm font-bold mb-3 leading-[20px]">기본 정보</p>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">이름</span>
                                <span className="font-bold leading-[16px]">{formData.name || '이기홍'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">전화번호</span>
                                <span className="font-bold leading-[16px]">{formData.phone || '010-1234-1234'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="leading-[18px] font-normal">배송지 주소</span>
                                <span className="font-bold leading-[16px]">{orderData.deliveryAddress || '서울시 강동구 암사동 ○○아파트 102동 1002호'}</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/on-event/analysis" className="btn-primary-outline w-full inline-block text-center">메인으로</Link>
                </div>
            </ActionSheet>
        </>
    )
}

export default RegisterBtn;