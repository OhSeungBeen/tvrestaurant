import BaseLayout from '@components/BaseLayout';

type Props = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
