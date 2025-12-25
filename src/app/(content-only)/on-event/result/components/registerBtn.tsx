"use client";

import ActionSheet from "@/components/ActionSheet";
import { usePost } from "@/hooks/useApi";
import { useEffect, useState, useCallback, useRef } from "react";
import Modal from "react-responsive-modal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import KakaoLoginBtn from "./kakaoLoginBtn";
import OrderModalForm from "./orderModalForm";
import { useUserStore } from "@/stores/user-store";

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

    const { user } = useUserStore();
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

    const clearFormData = () => {
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
    };

    const clearUrlFormData = () => {
        isUpdatingURLRef.current = true;
        
        const params = new URLSearchParams();        
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl, { scroll: false });
        
        setTimeout(() => {
            isUpdatingURLRef.current = false;
        }, 100);
    };

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

            // Faqat state bo'sh bo'lganda yoki URL dagi ma'lumotlar state dan butunlay boshqacha bo'lganda yuklash
            if (hasURLData && isStateEmpty) {
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
                if (isUpdatingURLRef.current) return;

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
                }, 150);
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [formData, open, pathname, router]);

    useEffect(() => {
        if (!open) {
            // clearFormData();
            // clearUrlFormData();
        } else if (open && !isUpdatingURLRef.current) {
            const name = searchParams.get('name') || '';
            const phone = searchParams.get('phone') || '';
            const postalCode = searchParams.get('postalCode') || '';
            const address = searchParams.get('address') || '';
            const detailAddress = searchParams.get('detailAddress') || '';
            const personalInfo = searchParams.get('personalInfo') === 'true';
            const marketing = searchParams.get('marketing') === 'true';

            const hasURLData = name || phone || postalCode || address || detailAddress;
            if (hasURLData) {
                setFormData(prev => {
                    const isStateEmpty = !prev.name && !prev.phone && !prev.postalCode && !prev.address && !prev.detailAddress;
                    if (isStateEmpty) {
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
            }
        }
    }, [open, searchParams]);

    const handleCloseModal = useCallback(() => {
        isUpdatingURLRef.current = true;
        setOpen(false);
        onCloseModal();
        // router.replace('/on-event');
        setTimeout(() => {
            isUpdatingURLRef.current = false;
        }, 100);
    }, [router, onCloseModal, setOpen]);

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

    const { mutate: createPayment, isPending: isCreatingPayment } = usePost('/pg/payapp/pay', {
        onSuccess: (response: any) => {

            // clearFormData();
            // clearUrlFormData();

            // isUpdatingURLRef.current = true;
            // onCloseModal();
            // router.replace(pathname, { scroll: false });
            // setOpenActionSheet('success');

            if (response?.payUrl) {
                window.location.href = response?.payUrl;
            }
        },
        onError: (error: any) => {
            console.error('Payment error:', error);
        },
    });

    const { mutate: createTasteRequest, isPending: isCreatingTasteRequest, data: tasteRequestData } = usePost('/api/orders/taste-user', {
        onSuccess: (response: any) => {
            if (response?.ord_no) {
                createPayment({
                    ordNo: response?.ord_no,
                    goodName: "MyCoffee 시음 주문",
                    amount: 1000,
                    buyerPhone: formData?.phone,
                    buyerName: formData?.name,
                    // memo: "MyCoffee 시음 결제",
                    redirectUrl: `https://mycoffeeai.com/on-event/result/payment?ordNo=${response?.ord_no}`,
                    var1: response?.ord_no,
                    var2: "whatever"
                });
            }
        },
        onError: (error: any) => {
            setErrors({ ...errors, phone: error.response.data.detail });
        },
    });

    const handleCreateTasteRequest = useCallback(() => {
        if (!validateForm()) return;
        const obj = {
            p_tst_id: coffeeBlendId,
            p_user_aroma: 5,
            p_user_acidity: 5,
            p_user_sweetness: 5,
            p_user_nutty: 5,
            p_user_body: 5,
            p_cust_nm: formData.name,
            p_hp_no: formData.phone,
            p_post_no: formData.postalCode,
            p_addr1: formData.address,
            p_addr2: formData.detailAddress,
            p_agree_priv_flg: formData.agreements.personalInfo,
            p_agree_app_flg: formData.agreements.marketing
        }
        createTasteRequest(obj)
        // createTasteRequest({
        //     p_tst_id: coffeeBlendId,
        //     p_cust_nm: formData.name,
        //     p_hp_no: formData.phone,
        //     p_post_no: formData.postalCode,
        //     p_addr1: formData.address,
        //     p_addr2: formData.detailAddress,
        //     p_agree_priv_flg: formData.agreements.personalInfo,
        //     p_agree_app_flg: formData.agreements.marketing
        // });
    }, [formData, coffeeBlendId, createTasteRequest, validateForm]);

    return (
        <>
            <button 
                onClick={() => {
                    if (user.isAuthenticated) {
                        onOpenModal();
                    } else {
                        setOpenActionSheet('login');
                    }
                }} 
                className="btn-primary w-full text-center block"
            >
                My Coffee 주문하기
            </button>

            <Modal
                open={open}
                onClose={handleCloseModal}
                center
                showCloseIcon={false}
                closeOnOverlayClick={false}
                styles={{
                    modal: {
                        width: '361px',
                        padding: '12px',
                        borderRadius: '16px',
                    }
                }}
            >
                <OrderModalForm
                    setFormData={setFormData}
                    formData={formData}
                    setErrors={setErrors}
                    errors={errors}
                />

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
                isOpen={openActionSheet === 'login'}
                onClose={() => setOpenActionSheet(null)}
            >
                <div className="text-center">
                    <p className="text-sm leading-[20px] text-text-secondary mb-6">
                        이벤트 참여를 위해 카카오 간편 로그인하며, <br /> 추후 동일 계정으로 앱 서비스 이용이 가능합니다.
                    </p>
                    <KakaoLoginBtn />
                    <button
                        onClick={() => setOpenActionSheet(null)}
                        className="btn-primary-outline w-full"
                    >
                        닫기
                    </button>
                </div>
            </ActionSheet>
        </>
    );
};

export default RegisterBtn;
