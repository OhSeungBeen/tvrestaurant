'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { BsPersonFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import ReactS3Uploader, { S3Response } from 'react-s3-uploader';
import { toast } from 'react-toastify';

import { env } from '@/env';
import PageTitle from '@components/PageTitle';
import { apiClient } from '@lib/api/apiClient';
import { useUser } from '@stores/useUserStore';
import { useBooleanState } from '@toss/react';
import { useTsRestQueryClient } from '@ts-rest/react-query';
import { router } from '@tvrestaurant/contracts';

function Profile() {
  const user = useUser();
  const queryClient = useTsRestQueryClient(apiClient);

  const { mutate: updateThumbnail } =
    apiClient.user.updateUserThumbnail.useMutation({
      onSuccess: () => {
        queryClient.user.getUser.fetchQuery(['user']);
      },
    });
  const onUpdateThumbnail = (s3Response: S3Response, file: File) => {
    updateThumbnail({ body: { thumbnail: s3Response.fileKey } });
  };

  const [isEdit, setTrue, setFalse, toggleEdit] = useBooleanState();
  const { register, handleSubmit, getValues } = useForm({
    mode: 'onSubmit',
    values: {
      nickName: user?.nickName,
    },
  });
  const { mutate: updateNickName } =
    apiClient.user.updateUserNickName.useMutation({
      onSuccess: () => {
        queryClient.user.getUser.fetchQuery(['user']);
        toggleEdit();
      },
    });
  const onUpdateNickName = (nickName) => {
    updateNickName({ body: { nickName } });
  };
  const onValidNickName = (errors) => {
    toast.error(errors.nickName.message);
  };

  return (
    <>
      <PageTitle title="프로필" />
      <div className="mt-2 mb-2 flex items-center justify-center ">
        <label>
          <div className="relative flex h-16 w-16 cursor-pointer flex-col items-center justify-end overflow-hidden rounded-full bg-slate-200 xs:h-20 xs:w-20">
            {user?.thumbnail ? (
              <Image
                src={user.thumbnail}
                alt="프로필 이미지"
                fill
                className="object-cover"
              />
            ) : (
              <>
                <BsPersonFill className=" h-10 w-10 text-slate-400 xs:h-14 xs:w-14" />
              </>
            )}
            <div className="font-[0.35rem] z-10 w-full justify-self-end bg-slate-800 text-center text-xs text-slate-300">
              수정
            </div>
          </div>
          <ReactS3Uploader
            className="hidden"
            signingUrl={`${env.appServerUrl}${router.s3.getSignUrl.path}`}
            signingUrlMethod="GET"
            accept="image/*"
            s3path="images/profile"
            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/gi, '')}
            signingUrlWithCredentials={true}
            uploadRequestHeaders={{}}
            onFinish={onUpdateThumbnail}
          />
        </label>
      </div>
      <div className="mb-4 border-b-[1px] border-b-slate-200 pb-4 text-slate-600 dark:border-b-slate-600 dark:text-slate-300">
        <div>닉네임</div>
        {isEdit ? (
          <>
            <form
              className="mb-2 flex items-center justify-between gap-2"
              onSubmit={handleSubmit(
                (formData) => onUpdateNickName(formData.nickName),
                onValidNickName,
              )}
            >
              <input
                {...register('nickName', {
                  required: {
                    message: '이메일을 입력하세요.',
                    value: true,
                  },
                  pattern: {
                    message:
                      '닉네임은 공백 또는 특수문자가 포함될 수 없습니다.',
                    value: /^[가-힣a-zA-Z0-9]*$/,
                  },
                  maxLength: {
                    message: '닉네임 글자수는 최대 12자이내 입니다.',
                    value: 12,
                  },
                })}
                className="h-8 flex-grow rounded-md border-[1px] border-slate-200 bg-slate-50 p-1 outline-none dark:border-slate-600 dark:bg-slate-800"
              />
              <button
                type="submit"
                className="h-8 w-12 flex-shrink-0 rounded-md bg-pink-500 text-sm text-slate-100 disabled:bg-pink-300 dark:bg-pink-400 dark:text-slate-700"
              >
                저장
              </button>
            </form>
            <ul className="text-sm">
              <li>• 글자수 최대 12자 이내</li>
              <li>• 중복 닉네임 불가</li>
              <li>• 공백 및 특수문자 사용 불가</li>
            </ul>
          </>
        ) : (
          <div className="flex w-full items-center justify-between ">
            <div>{getValues().nickName}</div>
            <button
              onClick={toggleEdit}
              className="h-8 w-12 rounded-md bg-pink-500 text-sm text-slate-100 disabled:bg-pink-300 dark:bg-pink-400 dark:text-slate-700"
            >
              수정
            </button>
          </div>
        )}
      </div>
      <div className="mb-4 border-b-[1px] border-b-slate-200 pb-4 text-slate-600 dark:border-b-slate-600 dark:text-slate-300">
        <div>이메일</div>
        <div className="flex items-center gap-1">
          <div>
            {user?.provider === 'NAVER' && (
              <SiNaver className="h-3 w-3 bg-transparent text-[#1dc700]" />
            )}
            {user?.provider === 'GOOGLE' && <FcGoogle className="h-5 w-5 " />}
            {user?.provider === 'KAKAO' && (
              <SiKakaotalk className="h-5 w-5 rounded-full bg-black text-[#ffe813]" />
            )}
          </div>
          <div>{user?.email}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
