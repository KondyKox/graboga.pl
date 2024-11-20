/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGO_DB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
    },
};

export default nextConfig;
