'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGet, usePost } from '@/hooks/useApi';
import ActionSheet from '@/components/ActionSheet';
import Link from 'next/link';
import { useUserStore } from '@/stores/user-store';

function PaymentContent() {
    const searchParams = useSearchParams();
    const ordNo = searchParams.get('ordNo');
    const { user } = useUserStore();
    const [openActionSheet, setOpenActionSheet] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('recommendation');
        }
    }, []);

    const { data: paymentStatus, isLoading, isError, error } = useGet<any>(
        ["payment", "status", ordNo],
        `/pg/payapp/status/${ordNo}`,
        {},
        {
            enabled: !!ordNo,
            retry: 1,
        }
    );

    const { mutate: getDescription, isPending: isGettingDescription, data: descriptionData } = usePost('/api/orders/user-order', {
        onSuccess: (response: any) => {
            setOpenActionSheet('detail');
        },
    });
    
    const getStatusMessage = (status: string) => {
        switch (status) {
            case 'PAID':
                return '럭키박스 구매가 완료되었습니다.';
            case 'CANCELED':
            case 'FAILED':
                return '처리 중 문제가 발생하여 메인 홈으로 이동합니다.\n다시 진행해 주세요.';
            default:
                return paymentStatus?.result_message || '주문이 완료되었습니다.';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID':
                return (
                    <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                    </svg>
                );
            case 'CANCELED':
            case 'FAILED':
                return (
                    <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM47.0711 22.9289C48.8807 24.7386 48.8807 27.7614 47.0711 29.5711L39.6421 37L47.0711 44.4289C48.8807 46.2386 48.8807 49.2614 47.0711 51.0711C45.2614 52.8807 42.2386 52.8807 40.4289 51.0711L33 43.6421L25.5711 51.0711C23.7614 52.8807 20.7386 52.8807 18.9289 51.0711C17.1193 49.2614 17.1193 46.2386 18.9289 44.4289L26.3579 37L18.9289 29.5711C17.1193 27.7614 17.1193 24.7386 18.9289 22.9289C20.7386 21.1193 23.7614 21.1193 25.5711 22.9289L33 30.3579L40.4289 22.9289C42.2386 21.1193 45.2614 21.1193 47.0711 22.9289Z" fill="#DC3545" />
                    </svg>
                );
            case 'PENDING':
            case 'REQUESTED':
                return null;
            default:
                return (
                    <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                    </svg>
                );
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center px-4 min-h-screen">
                <div className="w-full">
                    {isLoading || paymentStatus?.status === 'PENDING' || paymentStatus?.status === 'REQUESTED' ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center">
                            <p className="text-sm leading-[20px] font-normal text-text-secondary">
                                결제가 진행중입니다..
                            </p>
                        </div>
                    ) : isError || !paymentStatus ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center pb-10">
                            <p className="text-sm leading-[20px] font-normal text-text-secondary my-auto">
                                결제 정보를 불러올 수 없습니다.
                            </p>
                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                메인으로
                            </Link>
                        </div>
                    ) : paymentStatus?.status === "NOT_FOUND" || !ordNo ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center pb-10">
                            <p className="text-sm leading-[20px] font-normal text-text-secondary my-auto">
                                해당 주문이 존재하지 않습니다.
                            </p>
                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                메인으로
                            </Link>
                        </div>
                    ) : paymentStatus?.status === 'CANCELED' || paymentStatus?.status === 'FAILED' ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center pb-10">
                            <p className="text-sm leading-[20px] font-normal text-text-secondary my-auto whitespace-pre-line text-center">
                                {getStatusMessage(paymentStatus?.status)}
                            </p>
                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                메인으로
                            </Link>
                        </div>
                    ) : paymentStatus?.status === 'PAID' ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center pb-10">
                            <div className="my-auto w-full">
                                <div className="mb-[27px] text-center ">
                                    {getStatusIcon(paymentStatus?.status)}
                                </div>
                                <p className="text-center text-sm leading-[20px] font-bold text-text-secondary mb-3">
                                    주문번호: {ordNo}
                                </p>
                                <p className="text-center text-sm leading-[20px] font-normal text-text-secondary mb-6">
                                    {getStatusMessage(paymentStatus?.status)}
                                </p>
                            </div>
                            <div className="w-full space-y-2">
                                <button
                                    className="btn-primary w-full"
                                    onClick={() => getDescription({ cust_nm: user?.data?.username, hp_no: user?.data?.phone })}
                                    disabled={isGettingDescription}
                                >
                                    상세 화면
                                </button>
                                <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                    메인으로
                                </Link>
                            </div>
                        </div>
                    ) : paymentStatus ? (
                        <div className="h-screen flex-1 flex flex-col justify-center items-center pb-10">
                            <div className="my-auto w-full">
                                {getStatusIcon(paymentStatus?.status) && (
                                    <div className="mb-[27px] text-center">
                                        {getStatusIcon(paymentStatus?.status)}
                                    </div>
                                )}
                                <p className="text-center text-sm leading-[20px] font-normal text-text-secondary mb-3">
                                    주문번호: {ordNo}
                                </p>
                                <p className="text-center text-sm leading-[20px] font-normal text-text-secondary mb-6">
                                    {getStatusMessage(paymentStatus?.status)}
                                </p>
                            </div>
                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                메인으로
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>


            <ActionSheet
                isOpen={openActionSheet === 'detail'}
                onClose={() => setOpenActionSheet(null)}
            >
                {
                    descriptionData?.orders?.[0]?.ord_no ? (
                        <div>
                            <div className="mt-3 mb-6 text-center">
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                                </svg>
                            </div>

                            <p className="text-center text-base leading-[20px] font-bold text-gray-0 mb-3">
                                주문번호 : {descriptionData?.orders?.[0]?.ord_no}
                            </p>

                            <div className="rounded-lg p-3 mb-3 border border-border-default">
                                <h3 className="text-sm leading-[18px] font-bold text-gray-0 mb-2">기본 정보</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">이름</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.orders?.[0]?.cust_nm}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">전화번호</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.orders?.[0]?.hp_no}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">배송지 주소</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0 text-right flex-1 ml-2">
                                            {descriptionData?.orders?.[0]?.de_addr}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg p-3 mb-6 border border-border-default">
                                <h3 className="text-sm leading-[18px] font-bold text-gray-0 mb-2">주문정보</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">요청 일자</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.orders?.[0]?.cre_dt
                                                ? descriptionData?.orders?.[0].cre_dt.replace(/\.\d+/, '').replace('T', ' ').slice(0, 16)
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">요청 커피</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.orders?.[0]?.cof_nm}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">상태</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.orders?.[0]?.ord_sts_cd === "1" ? '접수' : '배송'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                메인으로
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <p className="text-center text-sm leading-[20px] font-bold text-text-secondary mb-6">주문 내역이 없습니다.</p>
                            <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                                닫기
                            </Link>
                        </div>
                    )
                }
            </ActionSheet>
        </>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex-1 flex flex-col justify-center items-center">
                <p className="text-sm leading-[20px] font-normal text-text-secondary">
                    결제가 진행중입니다..
                </p>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}