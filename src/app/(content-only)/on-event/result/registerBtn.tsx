import ActionSheet from "@/components/ActionSheet";
import { usePost } from "@/hooks/useApi";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal"
import ActionFlow from "../components/ActionFlow";

const RegisterBtn = ({
    coffeeBlendId,
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

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const name = localStorage.getItem('tst_usr_nm');
    //         const phone = localStorage.getItem('hphn_no');
    //         if (name && phone) {
    //             setFormData({ name, phone, agreements: { personalInfo: false, marketing: false } });
    //         }
    //     }
    // }, []);

    const { mutate: createTasteRequest, isPending: isCreatingTasteRequest, data: tasteRequestData } = usePost('/mycoffee/tstuser', {
        onSuccess: (data) => {
            setOpenActionSheet('success'); onCloseModal();
            setFormData({
                name: '',
                phone: '',
                agreements: {
                    personalInfo: false,
                    marketing: false,
                }
            })
        },
    });

    const handleCreateTasteRequest = () => {
        // setOpenActionSheet('success'); onCloseModal();
        localStorage.setItem('tst_usr_nm', formData.name);
        localStorage.setItem('hphn_no', formData.phone);
        createTasteRequest({
            tst_blnd_id: coffeeBlendId,
            tst_usr_nm: formData.name,
            hphn_no: formData.phone,
            n1st_apro_flg: formData.agreements.personalInfo ? 'Y' : 'N',
            n2nd_apro_flg: formData.agreements.marketing ? 'Y' : 'N',
            tst_end_flg: 'N'
        });
    }

    const { mutate: getDescription, isPending: isGettingDescription, data: descriptionData } = usePost('/mycoffee/tstreqget', {
        onSuccess: (data) => {
            setOpenActionSheet(null);
            setOpenActionSheet('detail');
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
                        minLength={1}
                        maxLength={20}
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
                        minLength={5}
                        maxLength={11}
                        max={99999999999}
                        type="number"
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
                <button disabled={formData.name === '' || formData.phone === '' || formData.agreements.personalInfo === false || isCreatingTasteRequest} className="btn-primary w-full mb-2 mt-[28px]" onClick={() => handleCreateTasteRequest()}>요청</button>
                <button className="btn-primary-empty !py-0.5 w-full !font-normal" onClick={() => setOpen(false)}>취소</button>
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
                    <p className="text-center text-base leading-[20px] font-bold text-gray-0 mb-3">시음 번호 : {tasteRequestData?.tst_id}</p>
                    <p className="text-center text-sm leading-[20px] font-bold text-text-secondary mb-6 underline">* 부스에서 번호를 보여주시면 시음 커피를 만들어드려요!</p>
                    <button 
                        className="btn-primary w-full mb-2" 
                        onClick={() => getDescription({ tst_id: tasteRequestData?.tst_id })}
                        disabled={isGettingDescription}
                    >
                        상세 화면
                    </button>
                    
                    <Link href="/on-event" className="btn-primary-outline w-full inline-block text-center" >메인으로</Link>
                </div>
            </ActionSheet>

            <ActionFlow 
                openActionSheet={openActionSheet} 
                setOpenActionSheet={setOpenActionSheet} 
                descriptionData={descriptionData?.item}
            />
        </>
    )
}

export default RegisterBtn;