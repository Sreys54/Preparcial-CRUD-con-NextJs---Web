import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static1.mujerhoy.com",
      },
      {
        protocol: "https",
        hostname: "imagessl.casadellibro.com",
      },
      {
        protocol: "https",
        hostname: "trabalibros.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.gr-assets.com",
      },
      {
        protocol: "https",
        hostname: "highclass.com.py",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname:"pictures.abebooks.com"
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      },
      {
        protocol: "https",
        hostname: "d28hgpri8am2if.cloudfront.net"
      }
    ],
  },
};

export default nextConfig;
