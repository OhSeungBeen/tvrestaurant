import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

type Props = {
  name: string;
  href: string;
};

export default function MypageMenu({ name, href }: Props) {
  return (
    <Link
      className="mb-4 flex items-center justify-between border-b-[1px] border-b-slate-200 pb-4 text-slate-600 dark:border-b-slate-600 dark:text-slate-300"
      href={href}
    >
      <div>{name}</div>
      <div>
        <MdChevronRight className="text-xl" />
      </div>
    </Link>
  );
}
