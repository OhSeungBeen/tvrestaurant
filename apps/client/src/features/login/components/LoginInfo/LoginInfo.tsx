import { MdKeyboardArrowDown } from 'react-icons/md';

export default function LoginInfo() {
  return (
    <div className="relative -mx-4 mb-10 flex flex-col items-center gap-1 bg-slate-50 py-8 text-[1.375rem] font-extrabold dark:bg-slate-800">
      <div>간편 로그인으로</div>
      <div className=" bg-gradient-to-b from-transparent via-transparent to-pink-300 px-1 text-pink-500 dark:to-pink-700 dark:text-pink-400">
        티비레스토랑을 빠르게
      </div>
      <div>시작해보세요!</div>
      <div className="absolute bottom-0 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
        <MdKeyboardArrowDown className="mt-2 text-2xl" />
      </div>
    </div>
  );
}
