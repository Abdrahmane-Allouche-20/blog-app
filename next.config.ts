import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs"; // ✅ Utilise `/` au lieu de `\`

const nextConfig: NextConfig = {
  /* config options here */
};

export default withFlowbiteReact(nextConfig);
