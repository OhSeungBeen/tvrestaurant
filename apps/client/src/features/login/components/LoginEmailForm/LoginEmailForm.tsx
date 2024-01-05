'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  disabled: boolean;
  onLogin: (email: string) => void;
};

export default function LoginEmailForm({ disabled, onLogin }: Props) {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onValidEmail = (errors) => {
    toast.error(errors.email.message);
  };

  return (
    <div className="mb-7">
      <div className="mb-2 text-center font-bold">이메일로 로그인</div>
      <form
        className="flex flex-col px-4"
        onSubmit={handleSubmit(
          (formData) => onLogin(formData.email),
          onValidEmail,
        )}
      >
        <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">
          이메일주소
        </div>
        <input
          {...register('email', {
            pattern: {
              message: '올바른 이메일 형식을 입력하세요.',
              value:
                /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
            },
          })}
          className="mb-4 h-12 rounded-xl border-[1px] border-slate-200 bg-slate-50 px-4 outline-pink-500 dark:border-slate-600 dark:bg-slate-800 dark:outline-pink-400"
          disabled={disabled}
        />
        <button
          className="h-12 rounded-xl bg-pink-500 font-bold text-slate-100 disabled:bg-pink-400 dark:bg-pink-400  dark:text-slate-700 dark:disabled:bg-pink-300"
          type="submit"
          disabled={disabled}
        >
          {disabled ? '이메일 발송 완료' : '로그인'}
        </button>
      </form>
    </div>
  );
}
