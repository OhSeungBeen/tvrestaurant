type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return (
    <div className="flex h-6 items-center justify-center font-semibold">
      {title}
    </div>
  );
}
