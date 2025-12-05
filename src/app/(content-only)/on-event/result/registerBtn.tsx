"use client";

import ActionSheet from "@/components/ActionSheet";
import { usePost } from "@/hooks/useApi";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import Modal from "react-responsive-modal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const WarningIcon = () => (
    <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clipPath="url(#clip0_1366_13821)">
            <path d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00001C14.6666 4.31811 11.6818 1.33334 7.99992 1.33334C4.31802 1.33334 1.33325 4.31811 1.33325 8.00001C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 5.33334V8.00001" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 10.6667H8.00667" stroke="#EF4444" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_1366_13821">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

interface RegisterBtnProps {
    coffeeBlendId: string;
    onOpenModal: () => void;
    onCloseModal: () => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const RegisterBtn = ({
    coffeeBlendId,
    onOpenModal,
    onCloseModal,
    open,
    setOpen,
}: RegisterBtnProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isUpdatingURLRef = useRef(false);

    const [openActionSheet, setOpenActionSheet] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        postalCode: '',
        address: '',
        detailAddress: '',
        agreements: {
            personalInfo: false,
            marketing: false,
        },
    });
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        postalCode: '',
        address: '',
        detailAddress: '',
    });

    useEffect(() => {
        if (isUpdatingURLRef.current) return;

        const name = searchParams.get('name') || '';
        const phone = searchParams.get('phone') || '';
        const postalCode = searchParams.get('postalCode') || '';
        const address = searchParams.get('address') || '';
        const detailAddress = searchParams.get('detailAddress') || '';
        const personalInfo = searchParams.get('personalInfo') === 'true';
        const marketing = searchParams.get('marketing') === 'true';

        setFormData(prev => {
            const hasURLData = name || phone || postalCode || address || detailAddress;
            const isStateEmpty = !prev.name && !prev.phone && !prev.postalCode && !prev.address && !prev.detailAddress;
            const urlDataDiffers = 
                prev.name !== name ||
                prev.phone !== phone ||
                prev.postalCode !== postalCode ||
                prev.address !== address ||
                prev.detailAddress !== detailAddress;

            if (hasURLData && (isStateEmpty || urlDataDiffers)) {
                return {
                    name,
                    phone,
                    postalCode,
                    address,
                    detailAddress,
                    agreements: { personalInfo, marketing },
                };
            }
            return prev;
        });

        const modalOpen = searchParams.get('modal') === 'open';
        if (modalOpen && !open) {
            onOpenModal();
        }
    }, [searchParams, open, onOpenModal]);

    useEffect(() => {
        if (open && !isUpdatingURLRef.current) {
            const timeoutId = setTimeout(() => {
                const params = new URLSearchParams();
                if (formData.name) params.set('name', formData.name);
                if (formData.phone) params.set('phone', formData.phone);
                if (formData.postalCode) params.set('postalCode', formData.postalCode);
                if (formData.address) params.set('address', formData.address);
                if (formData.detailAddress) params.set('detailAddress', formData.detailAddress);
                if (formData.agreements.personalInfo) params.set('personalInfo', 'true');
                if (formData.agreements.marketing) params.set('marketing', 'true');
                params.set('modal', 'open');

                isUpdatingURLRef.current = true;
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                setTimeout(() => {
                    isUpdatingURLRef.current = false;
                }, 0);
            }, 50);

            return () => clearTimeout(timeoutId);
        }
    }, [formData, open, pathname, router]);

    useEffect(() => {
        if (!open) {
            setFormData({
                name: '',
                phone: '',
                postalCode: '',
                address: '',
                detailAddress: '',
                agreements: {
                    personalInfo: false,
                    marketing: false,
                },
            });
            setErrors({
                name: '',
                phone: '',
                postalCode: '',
                address: '',
                detailAddress: '',
            });
        }
    }, [open]);

    const handleCloseModal = useCallback(() => {
        isUpdatingURLRef.current = true;
        router.replace(pathname, { scroll: false });
        setOpen(false);
        onCloseModal();
        setTimeout(() => {
            isUpdatingURLRef.current = false;
        }, 100);
    }, [pathname, router, onCloseModal, setOpen]);

    const handleOpenPostcode = useCallback(() => {
        if (typeof window === "undefined") return;

        new (window as any).daum.Postcode({
            oncomplete: (data: any) => {
                setFormData(prev => ({
                    ...prev,
                    postalCode: data.zonecode,
                    address: data.address,
                }));
                setErrors(prev => ({ ...prev, postalCode: '', address: '' }));
            },
        }).open();
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = { ...errors };
        let hasError = false;

        if (!formData.name?.trim()) {
            newErrors.name = '이름을 입력해주세요.';
            hasError = true;
        } else if (formData.name.length > 20) {
            newErrors.name = '이름은 20자 이하로 입력해주세요.';
            hasError = true;
        }

        if (!formData.phone?.trim()) {
            newErrors.phone = '휴대폰 번호를 입력해주세요.';
            hasError = true;
        } else if (formData.phone.length > 20) {
            newErrors.phone = '휴대폰 번호는 5~11자로 입력해주세요.';
            hasError = true;
        }

        if (!formData.postalCode?.trim()) {
            newErrors.postalCode = '우편번호를 입력해주세요.';
            hasError = true;
        }

        if (!formData.address?.trim()) {
            newErrors.address = '상세주소를 입력해주세요.';
            hasError = true;
        }

        if (!formData.detailAddress?.trim()) {
            newErrors.detailAddress = '상세주소를 입력해주세요.';
            hasError = true;
        }

        if (!formData.agreements.personalInfo) {
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }, [formData, errors]);

    const { mutate: createTasteRequest, isPending: isCreatingTasteRequest, data: tasteRequestData } = usePost('/api/orders/taste-user', {
        onSuccess: (response: any) => {
            setFormData({
                name: '',
                phone: '',
                postalCode: '',
                address: '',
                detailAddress: '',
                agreements: {
                    personalInfo: false,
                    marketing: false,
                },
            });
            setErrors({
                name: '',
                phone: "",
                postalCode: '',
                address: '',
                detailAddress: '',
            });
            isUpdatingURLRef.current = true;
            setOpen(false);
            onCloseModal();
            router.replace(pathname, { scroll: false });
            setOpenActionSheet('success');
            setTimeout(() => {
                isUpdatingURLRef.current = false;
            }, 100);
        },
        onError: (error: any) => {
            setErrors({...errors, phone: error.response.data.detail});
        },
    });

    const { mutate: getDescription, isPending: isGettingDescription, data: descriptionData } = usePost('/mycoffee/tstreqget', {
        onSuccess: () => {
            setOpenActionSheet(null);
            setOpenActionSheet('detail');
        },
    });

    const handleCreateTasteRequest = useCallback(() => {
        if (!validateForm()) return;

        localStorage.setItem('tst_usr_nm', formData.name);
        localStorage.setItem('hphn_no', formData.phone);
        createTasteRequest({
            p_tst_id: coffeeBlendId,
            p_cust_nm: formData.name,
            p_hp_no: formData.phone,
            p_post_no: formData.postalCode,
            p_addr1: formData.address,
            p_addr2: formData.detailAddress,
            p_agree_priv_flg: formData.agreements.personalInfo,
            p_agree_app_flg: formData.agreements.marketing          
        });
    }, [formData, coffeeBlendId, createTasteRequest, validateForm]);

    const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }, [errors]);

    const handleAgreementChange = useCallback((field: 'personalInfo' | 'marketing', value: boolean) => {
        setFormData(prev => ({
            ...prev,
            agreements: { ...prev.agreements, [field]: value }
        }));
    }, []);

    const handleAllAgreementChange = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            agreements: { marketing: true, personalInfo: true }
        }));
    }, []);

    const inputFields = useMemo(() => [
        {
            key: 'name' as const,
            label: '이름',
            placeholder: '이름을 입력해주세요.',
            value: formData.name ?? '',
            error: errors.name,
            minLength: 1,
            maxLength: 20,
        },
        {
            key: 'phone' as const,
            label: '휴대폰 번호',
            placeholder: '휴대폰 번호를 입력해주세요.',
            value: formData.phone ?? '',
            error: errors.phone,
            type: 'number' as const,
            minLength: 5,
            maxLength: 11,
            max: 99999999999,
        },
    ], [formData.name, formData.phone, errors.name, errors.phone]);

    return (
        <>
            <button onClick={onOpenModal} className="btn-primary w-full text-center block">
                My Coffee 주문하기
            </button>

            <Modal
                open={open}
                onClose={handleCloseModal}
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
                {inputFields.map((field) => (
                    <div key={field.key} className="mb-3">
                        <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                            {field.label}
                        </label>
                        <input
                            value={field.value}
                            type={field.type || 'text'}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            max={field.max}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className={`input-default ${field.error ? 'border-red-500' : ''}`}
                        />
                        {field.error && (
                            <div className="flex items-center gap-1 mt-1">
                                <WarningIcon />
                                <span className="text-[#EF4444] text-[12px] font-normal">{field.error}</span>
                            </div>
                        )}
                    </div>
                ))}

                <div className="mb-3">
                    <label className="block text-xs leading-[16px] font-bold text-gray-0 mb-2">
                        배송지
                    </label>
                    <div className="flex gap-2">
                        <input
                            value={formData.postalCode ?? ''}
                            type="text"
                            disabled
                            placeholder="우편번호"
                            className={`input-default ${errors.postalCode ? 'border-red-500' : ''}`}
                        />
                        <button onClick={handleOpenPostcode} className="btn-primary shrink-0 !text-xs !leading-[18px] !py-[11px]">
                            우편번호 찾기
                        </button>
                    </div>
                    {errors.postalCode && (
                        <div className="flex items-center gap-1 mt-1">
                            <WarningIcon />
                            <span className="text-[#EF4444] text-[12px] font-normal">{errors.postalCode}</span>
                        </div>
                    )}
                    <input
                        value={formData.address ?? ''}
                        type="text"
                        disabled
                        className={`input-default my-2 ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && (
                        <div className="flex items-center gap-1 mt-1 mb-2">
                            <WarningIcon />
                            <span className="text-[#EF4444] text-[12px] font-normal">{errors.address}</span>
                        </div>
                    )}
                    <input
                        value={formData.detailAddress ?? ''}
                        type="text"
                        onChange={(e) => handleInputChange('detailAddress', e.target.value)}
                        placeholder="상세주소를 입력해주세요."
                        className={`input-default ${errors.detailAddress ? 'border-red-500' : ''}`}
                    />
                    {errors.detailAddress && (
                        <div className="flex items-center gap-1 mt-1">
                            <WarningIcon />
                            <span className="text-[#EF4444] text-[12px] font-normal">{errors.detailAddress}</span>
                        </div>
                    )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-[18px] border-t border-border-default pt-4">
                    <input
                        type="checkbox"
                        checked={formData.agreements.personalInfo && formData.agreements.marketing}
                        onChange={handleAllAgreementChange}
                        className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                    />
                    <span className="text-xs leading-[16px] font-normal">
                        전체 동의
                    </span>
                </label>

                <div>
                    <label className="flex items-center gap-2 cursor-pointer mb-[18px]">
                        <input
                            type="checkbox"
                            checked={formData.agreements.personalInfo}
                            onChange={(e) => handleAgreementChange('personalInfo', e.target.checked)}
                            className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                        />
                        <span className="text-xs leading-[16px] font-normal">
                            개인정보 수집 및 약관 동의 (필수)
                        </span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push('/on-event/terms/privacy');
                            }}
                            className="ml-auto group cursor-pointer"
                        >
                            <ChevronRight size={20} className="text-icon-default group-hover:text-blue-500 transition-colors" />
                        </button>
                    </label>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.agreements.marketing}
                        onChange={(e) => handleAgreementChange('marketing', e.target.checked)}
                        className="auth-checkbox w-5 h-5 rounded-sm border border-border-default"
                    />
                    <span className="text-xs leading-[16px] font-normal">
                        앱 출시 알림 동의 (선택)
                    </span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/on-event/terms/marketing');
                        }}
                        className="ml-auto group cursor-pointer"
                    >
                        <ChevronRight size={20} className="text-icon-default group-hover:text-blue-500 transition-colors" />
                    </button>
                </label>

                <button
                    disabled={!formData.agreements.personalInfo || isCreatingTasteRequest}
                    className="btn-primary w-full mb-2 mt-[28px]"
                    onClick={handleCreateTasteRequest}
                >
                    주문
                </button>
                <button className="btn-primary-empty !py-0.5 w-full !font-normal" onClick={handleCloseModal}>
                    취소
                </button>
            </Modal>

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
                    <p className="text-center text-sm leading-[20px] font-bold text-text-secondary mb-6">
                        주문이 완료되었습니다.
                    </p>
                    <button
                        className="btn-primary w-full mb-2"
                        onClick={() => getDescription({ tst_id: tasteRequestData?.tst_id })}
                        disabled={isGettingDescription}
                    >
                        상세 화면
                    </button>
                    <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center">
                        메인으로
                    </Link>
                </div>
            </ActionSheet>

            <ActionSheet
                isOpen={openActionSheet === 'detail'}
                onClose={() => setOpenActionSheet(null)}
            >
                {
                    descriptionData?.item ? (
                        <div>
                            <div className="mt-3 mb-6 text-center">
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM51.2186 29.3436C52.9271 27.635 52.9271 24.865 51.2186 23.1564C49.51 21.4479 46.74 21.4479 45.0314 23.1564L30.625 37.5628L24.9686 31.9064C23.26 30.1979 20.49 30.1979 18.7814 31.9064C17.0729 33.615 17.0729 36.385 18.7814 38.0936L27.5314 46.8436C29.24 48.5521 32.01 48.5521 33.7186 46.8436L51.2186 29.3436Z" fill="#28A745" />
                                </svg>
                            </div>
                            
                            <p className="text-center text-base leading-[20px] font-bold text-gray-0 mb-3">
                                주문번호 : {descriptionData?.item?.tst_id || 'N/A'}
                            </p>

                            <div className="rounded-lg p-3 mb-3 border border-border-default">
                                <h3 className="text-sm leading-[18px] font-bold text-gray-0 mb-2">기본 정보</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">이름</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.item?.tst_usr_nm || localStorage.getItem('tst_usr_nm') || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">전화번호</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.item?.hphn_no || localStorage.getItem('hphn_no') || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">배송지 주소</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0 text-right flex-1 ml-2">
                                            {descriptionData?.item?.de_addr || 'Address'}
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
                                            {descriptionData?.item?.cre_dt 
                                                ? descriptionData.item.cre_dt.replace(/\.\d+/, '').replace('T', ' ').slice(0, 16)
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">요청 커피</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.item?.blnd_nm || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs leading-[18px] text-text-secondary">상태</span>
                                        <span className="text-xs leading-[18px] font-bold text-gray-0">
                                            {descriptionData?.item?.sts_nm || 'N/A'}
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
};

export default RegisterBtn;
