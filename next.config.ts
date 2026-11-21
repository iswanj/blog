import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    format: "mdx",
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "one-dark-pro",
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
