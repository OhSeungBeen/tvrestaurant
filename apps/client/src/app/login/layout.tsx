import BaseLayout from '@components/BaseLayout';

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
