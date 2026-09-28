import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { ALL_PAGES, SITE_URL, PageMeta } from "./src/data/seo";

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The site is a SPA, so crawlers and link previews only see index.html. After the build this
// writes a copy of index.html per public page with that page's title, description, canonical
// and social tags (dist/<path>/index.html), plus sitemap.xml.
const pageMeta = (): Plugin => ({
  name: "page-meta",
  apply: "build",
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
    const render = (page: PageMeta) => {
      const url = `${SITE_URL}${page.path === "/" ? "" : page.path}`;
      const title = escapeAttr(page.title);
      const desc = escapeAttr(page.description);
      return template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
        .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${desc}$2`);
    };

    for (const page of ALL_PAGES) {
      const file = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, page.path, "index.html");
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, render(page));
    }

    // Unknown /services/<slug> paths have no file to rewrite to, so Vercel answers 404 with this page;
    // the SPA then renders its own not-found screen.
    fs.writeFileSync(
      path.join(dist, "404.html"),
      template.replace("<title>", '<meta name="robots" content="noindex" />\n    <title>'),
    );

    const today = new Date().toISOString().slice(0, 10);
    const urls = ALL_PAGES.map(
      (p) => `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod></url>`,
    ).join("\n");
    fs.writeFileSync(
      path.join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
  },
});

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), pageMeta()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
