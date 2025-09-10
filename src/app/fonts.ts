import localFont from 'next/font/local'

export const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
})

export const suite = localFont({
  src: [
    {
      path: './fonts/static/otf/SUIT-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/static/otf/SUIT-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-suite',
  display: 'swap',
  preload: true,
})
