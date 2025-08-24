import type { NextConfig } from "next";

// Obtener el base path desde la variable de entorno o usar un valor predeterminado
const BASE_PATH = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  // Configuración dinámica para desplegar en una subcarpeta o en la raíz
  basePath: BASE_PATH,
  
  // Asegura que todos los assets se carguen desde la ruta correcta
  assetPrefix: BASE_PATH,
  
  // Configuración para páginas dinámicas
  trailingSlash: true,
  
  // Optimización de imágenes habilitada
  images: {
    unoptimized: false,
  },
};

console.log(`Building with BASE_PATH: ${BASE_PATH || '/ (root directory)'}`);

export default nextConfig;
