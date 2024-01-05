module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tvrestaurant.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};
