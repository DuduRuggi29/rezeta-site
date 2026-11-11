// Static export: the page is pure HTML/CSS/JS, so it can be hosted anywhere
// (Vercel, Netlify, Hostinger, S3, Cloudflare Pages) with the fastest possible TTFB.
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
