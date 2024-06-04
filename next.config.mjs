/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/luzel",
    output: "export",  // <=== enables static exports
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
};

export default nextConfig;
