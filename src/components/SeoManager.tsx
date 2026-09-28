import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, metaFor } from "@/data/seo";

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// Keeps <title>, description, canonical and social tags in step with the current route.
// Unknown routes (the 404 page) get noindex.
const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      document.title = "404 — Mohamed Waheed";
      setMeta("name", "robots", "noindex");
      return;
    }
    robots?.remove();

    const url = `${SITE_URL}${meta.path === "/" ? "" : meta.path}`;
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
};

export default SeoManager;
