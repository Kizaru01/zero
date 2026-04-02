import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname:'covers.openlibrary.org'},
      { protocol: 'https', hostname: 'yptyonhxczb6w6go.public.blob.vercel-storage.com' },
    ]
  }
};

export default nextConfig;