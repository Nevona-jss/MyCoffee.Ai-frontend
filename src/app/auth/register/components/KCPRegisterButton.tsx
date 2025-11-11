'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  birthDate: string;
  gender: string;
  phone: string;
};

interface KCPRegisterButtonProps {
  onRegisterError?: (error: string) => void;
  kcpUrl?: string;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setVerifiedData: Dispatch<SetStateAction<any>>;
}


export default function KCPRegisterButton({
  onRegisterError,
  kcpUrl = 'https://dev.mycoffeeai.com/auth/kcp',
  setFormData,
  setVerifiedData,
}: KCPRegisterButtonProps) {

  const [hasVerificationError, setHasVerificationError] = useState(false);

  // KCP postMessage listener
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data;
      if (!data?.type) return;

      if (data.type === 'KCP_DONE') {
        setVerifiedData(data);
        setFormData((prev: FormData) => ({
          ...prev,
          phone: data?.phone_number,
          name: data?.user_name,
          birthDate: data?.birth_day,
          gender: data?.sex_code === '01' ? 'M' : 'F',
        }));
      } else if (data.type === 'KCP_FAIL') {
        const errorMsg = data.message || 'Oops! Something went wrong';
        setHasVerificationError(true);
        setVerifiedData(null);
        if (onRegisterError) {
          onRegisterError(errorMsg);
        }
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [onRegisterError, setFormData, setVerifiedData]);

  const openKcpAuth = () => {
    const width = 480;
    const height = 720;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      kcpUrl,
      'kcpAuth',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
    );
  };

  const handleClick = () => {
    openKcpAuth()
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-primary-empty w-full bg-action-secondary text-action-primary 
        ${false ?
          '!cursor-not-allowed !text-icon-disabled !bg-action-disabled' :
          'cursor-pointer bg-action-secondary text-action-primary'}
        `}
    >
      {'인증 요청'}
    </button>
  );
}

