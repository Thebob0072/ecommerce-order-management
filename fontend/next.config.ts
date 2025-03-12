import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Set to a higher limit as needed
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        port: '',
        pathname: '**',
      },
    ],
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // ใช้ file-loader ในการจัดการกับไฟล์ font
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: `${isServer ? '../' : ''}static/fonts/`,
          name: '[name].[ext]',
        },
      },
    });

    // ปิดการเก็บ cache
    config.cache = false;

    // ปิดการเก็บ cache ในโหมด dev เท่านั้น
    // if (dev) {
    //   config.cache = false;
    // }

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
