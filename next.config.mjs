/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGO_DB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https', // Dla wszystkich domen HTTPS
              hostname: '**',    // Oznacza dowolną domenę
            },
          ],
    },
};

export default nextConfig;
