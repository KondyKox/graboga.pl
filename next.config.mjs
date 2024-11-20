/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGO_DB_URI,
        JWT_SECRET: 'OswiecNasPanieMucho',
    },
};

export default nextConfig;
