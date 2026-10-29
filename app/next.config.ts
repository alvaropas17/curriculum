import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El repo tiene dos package-lock.json (raíz y app/). Fijamos el root del
  // workspace a app/ para que Turbopack no lo infiera mal.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
