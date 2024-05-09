/** @type {import('next').NextConfig} */

// const withTM= require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk']);


const nextConfig = {
  experimental:{
    esmExternal:'loose'
  },
  reactStrictMode: true,
    images: {
        remotePatterns: [
          {protocol:'https', hostname:'**'}
        ]
      },
};

export default nextConfig;
