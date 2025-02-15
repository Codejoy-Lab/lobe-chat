import nextPWA from '@ducanh2912/next-pwa';
import analyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';
const buildWithDocker = process.env.DOCKER === 'true';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  workboxOptions: {
    skipWaiting: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: isProd,
  env: {
    AGENTS_INDEX_URL: process.env.AGENTS_INDEX_URL ?? '',
    PLUGINS_INDEX_URL: process.env.PLUGINS_INDEX_URL ?? '',
  },
  experimental: {
    forceSwcTransforms: true,
    optimizePackageImports: [
      'modern-screenshot',
      'emoji-mart',
      '@emoji-mart/react',
      '@emoji-mart/data',
      '@icons-pack/react-simple-icons',
      'gpt-tokenizer',
      'chroma-js',
    ],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'registry.npmmirror.com',
        pathname: '/@lobehub/**',
        port: '',
        protocol: 'https',
      },
    ],
    unoptimized: !isProd,
  },
  output: buildWithDocker ? 'standalone' : undefined,

  reactStrictMode: true,

  transpilePackages: ['antd-style', '@lobehub/ui', '@lobehub/tts'],

  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // to fix shikiji compile error
    // refs: https://github.com/antfu/shikiji/issues/23
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },

  env: {
    AGENTS_INDEX_URL: process.env.AGENTS_INDEX_URL,
    PLUGINS_INDEX_URL: process.env.PLUGINS_INDEX_URL,
  },

  output: buildWithDocker ? 'standalone' : undefined,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default isProd ? withBundleAnalyzer(withPWA(nextConfig)) : nextConfig;
