/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/luzel",
    output: "export",  // <=== enables static exports
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
    assetPrefix: isProd ? '/luzel/' : '',
};

export default nextConfig;
