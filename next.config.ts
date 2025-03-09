import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  swcMinify: true,
  transpilePackages: ["@emailjs/nodejs"],
  // Игнорируем ошибки сборки, связанные с ESM/CJS
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    // Оптимизация размера бандла
    if (config.mode === 'production') {
      // Оптимизация сплиттинга чанков
      if (config.optimization) {
        if (config.optimization.splitChunks) {
          config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            cacheGroups: {
              ...config.optimization.splitChunks.cacheGroups,
              framework: {
                test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
                name: 'framework',
                priority: 40,
                chunks: 'all',
              },
              lib: {
                test: /[\\/]node_modules[\\/]/,
                name: 'lib',
                priority: 30,
                chunks: 'all',
              },
              commons: {
                name: 'commons',
                minChunks: 2,
                priority: 20,
                chunks: 'all',
              },
            },
          };
        }
      }
    }
    
    return config;
  },
  // Включаем оптимизацию изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    // Включаем оптимизацию для внешних изображений
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Включаем экспериментальные функции для улучшения производительности
  experimental: {
    // Оптимизация для уменьшения размера бандла
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      '@radix-ui/react-icons',
    ],
    // Включаем оптимизацию для серверных компонентов
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Настройки для оптимизации производительности
  poweredByHeader: false, // Отключаем заголовок X-Powered-By
  compress: true, // Включаем сжатие
};

export default nextConfig;
