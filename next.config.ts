import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next',
  /* config options here */
  transpilePackages: ["@emailjs/nodejs"],
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
  // Настройка для серверного рендеринга
  output: 'standalone',
  // Перемещаем serverComponentsExternalPackages на верхний уровень
  serverExternalPackages: ['openai'],
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false
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
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
