import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const posts = [
    { title: t("blog.p1.title"), excerpt: t("blog.p1.excerpt"), tag: "Lead System", readTime: "4 min" },
    { title: t("blog.p2.title"), excerpt: t("blog.p2.excerpt"), tag: "AI Philosophy", readTime: "3 min" },
    { title: t("blog.p3.title"), excerpt: t("blog.p3.excerpt"), tag: "Operations", readTime: "5 min" },
    { title: t("blog.p4.title"), excerpt: t("blog.p4.excerpt"), tag: "Automation", readTime: "6 min" },
  ];

  return (
    <section id="blog" className="section-gap relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("blog.label")}
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]"
          >
            {t("blog.title1")}
            <br />
            <span className="gradient-text">{t("blog.title2")}</span>
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="label-tech text-muted-foreground"
          >
            {t("blog.subtitle")}
          </motion.span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group glass-panel p-8 cursor-pointer transition-all duration-500 hover:bg-surface-container-high/80"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="label-tech text-primary">{post.tag}</span>
                <span className="label-tech text-muted-foreground/50">·</span>
                <span className="label-tech text-muted-foreground/60">{post.readTime}</span>
              </div>

              <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-2 text-primary">
                <span className="label-tech text-[11px]">{t("blog.readArticle")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
