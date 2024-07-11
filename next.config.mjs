/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: process.env.REMOTE_IMAGE_URL,
            port: '',
            pathname: '/**',
          },
        ],
      },
};




export default nextConfig;
