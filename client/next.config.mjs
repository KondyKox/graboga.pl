/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: 'mongodb://localhost:27017/graboga',
        JWT_SECRET: 'Your-JWT-Secret',
    },
};

export default nextConfig;
