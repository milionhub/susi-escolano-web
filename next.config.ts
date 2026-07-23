import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Permite acceder al servidor de desarrollo desde otros dispositivos
  // de la misma red local (p. ej. para probar en el móvil).
  allowedDevOrigins: ["192.168.100.94"],
};

export default nextConfig;
