import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export async function GET() {
  return new ImageResponse(
    (
      <div tw="text-9xl text-center bg-white w-full h-full px-[50px] py-[200px] justify-center font-extrabold flex">
        <div>tv</div>
        <div tw="text-[#ec4899]">.</div>
        <div>restaurant</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
