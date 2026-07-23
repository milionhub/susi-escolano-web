import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Next.js sirve las imágenes optimizadas con Content-Disposition: attachment
    // por defecto, lo que hace que Safari (iOS/mobile) no las renderice inline.
    contentDispositionType: "inline",
  },
  // Permite acceder al servidor de desarrollo desde otros dispositivos
  // de la misma red local (p. ej. para probar en el móvil).
  allowedDevOrigins: ["192.168.100.94"],
};

export default nextConfig;
