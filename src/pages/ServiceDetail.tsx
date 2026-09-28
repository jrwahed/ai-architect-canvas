import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, MessageCircle, Plus, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/home/MobileCTABar";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import CursorFollower from "@/components/motion/CursorFollower";
import Magnetic from "@/components/motion/Magnetic";
import AnimatedWords from "@/components/motion/AnimatedWords";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES, SERVICE_GROUPS, serviceBySlug } from "@/data/services";
import { whatsappWithText } from "@/lib/contact";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { slug } = useParams();
  const { t, lang, isAr } = useLanguage();
  const service = serviceBySlug(slug);
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const Back = isAr ? ArrowRight : ArrowLeft;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (service) document.title = `${service.title[lang]} | Mohamed Waheed`;
  }, [service, lang]);

  if (!service) return <NotFound />;

  const bookUrl = whatsappWithText(`${t("offer.msg")} (${service.title[lang]})`);
  const stages = [1, 2, 3, 4, 5].map((n) => ({ label: t(`process.s${n}.label`), desc: t(`process.s${n}.desc`) }));
  const related = SERVICES.filter((s) => s.group === service.group && s.slug !== service.slug);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background text-foreground min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
            <div className="mx-auto max-w-6xl">
              <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Back size={16} />
                {t("svc.all")}
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="flex w-11 h-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <service.icon size={20} />
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-sm text-foreground/75">{SERVICE_GROUPS[service.group][lang]}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-sm text-foreground/75">
                  <Clock size={14} />
                  {service.timeline[lang]}
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl font-headline text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-balance">
                <AnimatedWords text={service.title[lang]} delay={0.1} />
              </h1>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">{service.short[lang]}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 ps-6 pe-2 font-semibold text-primary-foreground"
                    >
                      {t("offer.cta")}
                      <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-[-12deg]">
                        <MessageCircle size={18} />
                      </span>
                    </a>
                  </Magnetic>
                  {service.proof && (
                    <Link
                      to={service.proof.to}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-foreground"
                    >
                      {service.proof.label[lang]}
                      <Arrow size={16} />
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Problem + what gets built */}
          <section className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-leak">{t("svc.problem")}</p>
                <Reveal>
                  <p className="mt-3 font-headline text-2xl md:text-3xl font-medium leading-snug">{service.problem[lang]}</p>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm font-medium text-primary">{t("svc.build")}</p>
                <ol className="mt-3 border-t border-ink/15">
                  {service.build.map((b, i) => (
                    <Reveal key={b.en} delay={i * 0.05}>
                      <li className="flex gap-5 border-b border-ink/15 py-5">
                        <span className="font-mono text-sm text-ink/45 pt-1" dir="ltr">
                          0{i + 1}
                        </span>
                        <span className="text-lg leading-relaxed">{b[lang]}</span>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Deliverables + use cases */}
          <section className="bg-cream text-ink px-5 pb-20 md:px-8 md:pb-28">
            <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-4">
              <Reveal>
                <div className="h-full rounded-[1.75rem] bg-ink text-cream p-7 md:p-9">
                  <h2 className="font-headline text-2xl md:text-3xl font-semibold">{t("svc.deliverables")}</h2>
                  <ul className="mt-6 space-y-3">
                    {service.deliverables.map((d) => (
                      <li key={d.en} className="flex gap-3">
                        <Check size={18} className="mt-1 shrink-0 text-primary" />
                        <span className="leading-relaxed">{d[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="h-full rounded-[1.75rem] bg-white border border-ink/10 p-7 md:p-9">
                  <h2 className="font-headline text-2xl md:text-3xl font-semibold">{t("svc.useCases")}</h2>
                  <ul className="mt-6 space-y-3">
                    {service.useCases.map((u) => (
                      <li key={u.en} className="flex gap-3">
                        <Sparkles size={18} className="mt-1 shrink-0 text-primary" />
                        <span className="leading-relaxed text-ink/85">{u[lang]}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm text-ink-muted">{t("svc.tools")}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {service.tools.map((tool) => (
                      <span key={tool} dir="ltr" className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/75">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Framework */}
          <section className="bg-background px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <SectionHeader label={t("process.label")} title={t("process.heading")} sub={t("process.sub")} />
              <ol className="grid gap-3 md:grid-cols-5">
                {stages.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.06} className="h-full">
                    <li className="h-full rounded-2xl border border-border bg-surface-container p-5">
                      <span className="flex w-9 h-9 items-center justify-center rounded-full bg-primary font-mono text-sm text-primary-foreground" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-headline text-lg font-semibold">{s.label}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-background px-5 pb-20 md:px-8 md:pb-28">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-headline text-3xl md:text-4xl font-semibold">{t("svc.faq")}</h2>
              <div className="mt-6 border-t border-border">
                {service.faq.map((f) => (
                  <details key={f.q.en} className="group border-b border-border py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q[lang]}
                      <Plus size={20} className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{f.a[lang]}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-background px-5 pb-20 md:px-8 md:pb-28">
            <div className="mx-auto max-w-6xl rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-14">
              <h2 className="max-w-2xl font-headline text-3xl md:text-5xl font-semibold leading-tight">{t("svc.ctaTitle")}</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/75 leading-relaxed">{t("offer.sub")}</p>
              <div className="mt-8">
                <Magnetic>
                  <a
                    href={bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-primary-foreground py-2 ps-6 pe-2 font-semibold text-primary"
                  >
                    {t("offer.cta")}
                    <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <MessageCircle size={18} />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </section>

          {/* Related services */}
          {related.length > 0 && (
            <section className="bg-background px-5 pb-24 md:px-8 md:pb-32">
              <div className="mx-auto max-w-6xl">
                <h2 className="font-headline text-2xl md:text-3xl font-semibold">{t("svc.related")}</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/services/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-surface-container p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50"
                    >
                      <r.icon size={20} className="text-primary" />
                      <span className="mt-4 font-semibold leading-snug">{r.title[lang]}</span>
                      <span className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{r.short[lang]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
        <MobileCTABar />
        <CursorFollower />
      </div>
    </MotionConfig>
  );
};

export default ServiceDetail;
