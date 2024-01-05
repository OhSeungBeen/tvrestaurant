import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';

import { env } from '@/env';
import { router } from '@tvrestaurant/contracts';

export default function LoginSnsLogin() {
  const socials = [
    {
      id: 1,
      icon: (
        <SiKakaotalk className="h-8 w-8 rounded-full bg-black text-[#ffe813]" />
      ),
      href: `${env.appServerUrl}${router.auth.loginByKakao.path}`,
    },
    {
      id: 2,
      icon: (
        <svg
          className="h-6 w-6  bg-white text-[#1dc700]"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          role="img"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title></title>
          <path d="M1.6 0S0 0 0 1.6v20.8S0 24 1.6 24h20.8s1.6 0 1.6-1.6V1.6S24 0 22.4 0zm3.415 5.6h4.78l4.425 6.458V5.6h4.765v12.8h-4.78L9.78 11.943V18.4H5.015Z"></path>
        </svg>
      ),
      href: `${env.appServerUrl}${router.auth.loginByNaver.path}`,
    },
    {
      id: 3,
      icon: <FcGoogle className="h-6 w-6" />,
      href: `${env.appServerUrl}${router.auth.loginByGoogle.path}`,
    },
  ];

  return (
    <div className="mb-7">
      <div className="mb-3 text-center font-bold">SNS 계정으로 로그인</div>
      <div className="flex items-center justify-center gap-4">
        {socials.map((social) => (
          <a
            className="border-slate-2000 flex h-14 w-14 items-center justify-center rounded-full border-[1px] bg-slate-50 dark:border-slate-600 dark:bg-slate-800"
            key={social.id}
            href={social.href}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
