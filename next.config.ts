import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.41.150", "localhost"],
  turbopack: {},
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\.pnpm\/(.*?)\/node_modules\/(.*)/,
        function (resource: any) {
          const match = resource.request.match(/\.pnpm\/(.*?)\/node_modules\/(.*)/);
          if (match) {
            let properPath = match[2];
            properPath = properPath.replace(/\.mjs$/, '.js');
            resource.request = properPath;
          }
        }
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^@phosphor-icons\/webcomponents\/(.*)/,
        function (resource: any) {
          const match = resource.request.match(/^@phosphor-icons\/webcomponents\/(.*)/);
          if (match && !match[1].startsWith('dist/')) {
            resource.request = `@phosphor-icons/webcomponents/dist/icons/${match[1]}.mjs`;
          }
        }
      )
    );
    return config;
  },
};

export default nextConfig;
