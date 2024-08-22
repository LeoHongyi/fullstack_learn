import createMDX from '@next/mdx';
import rehypePrism from 'rehype-prism-plus';

const withMDX = createMDX({
    options: {
        rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
    },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    // 启用react严格模式(可选)
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    swcMinify: true,
    experimental: {
        cpus: 8,
        // turbpack中启动mdx
        // mdxRs: true,
    },
    // turbpack中启动mdx-remote
    // transpilePackages: ['next-mdx-remote'],
};

export default withMDX(nextConfig);
