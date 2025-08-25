import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

// Detect if we're building a user site (owner.github.io) vs a project site (owner.github.io/repo)
const [owner, repo] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserSite =
  owner && repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Required for GitHub Pages (static HTML export)
  output: "export",

  // If you use next/image anywhere
  images: { unoptimized: true },

  // ✅ Helpful on GitHub Pages so deep links resolve to index.html
  trailingSlash: true,

  // ✅ Only for project sites (username.github.io/<repo>)
  ...(owner && repo && !isUserSite
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),

  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
