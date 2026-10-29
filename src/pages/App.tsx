import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Fan,
  Headphones,
  Menu,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import BookingModal from "../components/BookingModal";
import Reveal from "../components/Reveal";
import WhatsAppIcon from "../components/WhatsAppIcon";

export default function App() {
  const [booking, setBooking] = useState(false);
  const [mode, setMode] = useState<"whatsapp" | "request">("request");
  const [selected, setSelected] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  useEffect(() => {
    const sectionIds = [
      ...siteConfig.navigation.map((item) => item.href.slice(1)),
      "contact",
    ];
    const fn = () => {
      setScrolled(window.scrollY > 16);
      const readingLine =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 82;
      const visibleSections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .filter(
          (section) => section.getBoundingClientRect().top <= readingLine + 48,
        );
      const currentSection = visibleSections[visibleSections.length - 1];
      setActiveSection(currentSection?.id ?? null);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--navy",
      siteConfig.theme.colors.primary,
    );
    document.documentElement.style.setProperty(
      "--navy-2",
      siteConfig.theme.colors.secondary,
    );
    document.documentElement.style.setProperty(
      "--gold",
      siteConfig.theme.colors.accent,
    );
    document.documentElement.style.setProperty(
      "--paper",
      siteConfig.theme.colors.background,
    );
    document.documentElement.style.setProperty(
      "--ink",
      siteConfig.theme.colors.text,
    );
    document.documentElement.style.setProperty(
      "--muted",
      siteConfig.theme.colors.muted,
    );
    document.documentElement.style.setProperty(
      "--line",
      siteConfig.theme.colors.border,
    );
    document.title = siteConfig.seo.title;
  }, []);
  const openBooking = (
    bookingMode: "whatsapp" | "request",
    service?: string,
  ) => {
    setMode(bookingMode);
    setSelected(service);
    setBooking(true);
    setMenuOpen(false);
  };
  const isLegal =
    location.pathname === "/terms-and-conditions" ||
    location.pathname === "/privacy-policy";
  if (isLegal) {
    const terms = location.pathname === "/terms-and-conditions";
    const doc = terms ? siteConfig.legal.terms : siteConfig.legal.privacy;
    return (
      <main className="legal-page">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Fan size={22} />
          </span>
          <span>
            <strong>{siteConfig.business.name}</strong>
            <small>HOME SERVICES</small>
          </span>
        </a>
        <Reveal className="legal-content" variant="fade">
          <span className="eyebrow">NORTHSTAR · CUSTOMER INFORMATION</span>
          <h1>{doc.title}</h1>
          <p className="legal-intro">{doc.intro}</p>
          <p className="updated">
            Last updated: {siteConfig.legal.lastUpdated}
          </p>
          <aside className="legal-toc">
            <strong>On this page</strong>
            {doc.sections.map((s, i) => (
              <a key={s.heading} href={`#section-${i}`}>
                {s.heading}
              </a>
            ))}
          </aside>
          {doc.sections.map((s, i) => (
            <section
              id={`section-${i}`}
              className="legal-section"
              key={s.heading}
            >
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <a className="button button-dark" href="/">
            Back to home <ArrowRight size={16} />
          </a>
        </Reveal>
      </main>
    );
  }
  return (
    <>
      <div className="topline">
        <span>
          <span className="live-dot" /> Serving homes with care
        </span>
        <span className="topline-right">
          <Clock3 size={14} />
          {siteConfig.business.workingHours}
          <i />{" "}
          <a href={`tel:${siteConfig.business.phone.replace(/\s/g, "")}`}>
            {siteConfig.business.phone}
          </a>
        </span>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          className="brand"
          href="#home"
          aria-label={`${siteConfig.business.name} home`}
        >
          <span className="brand-mark">
            <Fan size={23} />
          </span>
          <span>
            <strong>{siteConfig.business.name}</strong>
            <small>HOME SERVICES</small>
          </span>
        </a>
        <nav
          className={menuOpen ? "nav-open" : ""}
          aria-label="Main navigation"
        >
          {siteConfig.navigation.map((n) => {
            const isActive = activeSection === n.href.slice(1);
            return (
              <a
                key={n.href}
                onClick={() => setMenuOpen(false)}
                href={n.href}
                aria-current={isActive ? "location" : undefined}
              >
                {n.label}
              </a>
            );
          })}
          <a
            className="mobile-only"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            aria-current={activeSection === "contact" ? "location" : undefined}
          >
            Contact
          </a>
          <button
            className="button button-dark nav-mobile-cta"
            onClick={() => openBooking("request")}
          >
            Book a service <ArrowUpRight size={16} />
          </button>
        </nav>
        <div className="header-actions">
          <a
            className="whatsapp-link"
            href={`https://wa.me/${siteConfig.business.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={20} />
          </a>
          <button
            className="button button-dark header-cta"
            onClick={() => openBooking("request")}
          >
            Book a service <ArrowUpRight size={16} />
          </button>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="home">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              {siteConfig.hero.eyebrow}
            </div>
            <h1>
              {siteConfig.hero.headline.split("\n").map((line, i) => (
                <span key={line}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero-body">{siteConfig.hero.body}</p>
            <div className="hero-actions">
              <button
                className="button button-gold"
                onClick={() => openBooking("request")}
              >
                {siteConfig.hero.primaryCta}
                <ArrowUpRight size={18} />
              </button>
              <button
                className="button button-light"
                onClick={() => openBooking("whatsapp")}
              >
                <WhatsAppIcon size={20} />
                {siteConfig.hero.secondaryCta}
              </button>
            </div>
            <div className="hero-proof">
              <div className="proof-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong>Care you can feel good about</strong>
                <span>Clear communication, considered service</span>
              </div>
              <div className="proof-stars" aria-hidden="true">
                ✳ ✳ ✳
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={siteConfig.hero.image} alt={siteConfig.hero.imageAlt} />
            <div className="image-shade" />
            <div className="hero-image-caption">
              <span className="caption-icon">
                <Sparkles size={18} />
              </span>
              <span>
                <small>THE NORTHSTAR STANDARD</small>
                <strong>{siteConfig.hero.note}</strong>
              </span>
              <ArrowUpRight size={19} />
            </div>
            <div className="hero-index">
              <span>01</span>
              <i /> <span>HOME COMFORT</span>
            </div>
          </div>
          <a href="#services" className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDownRight size={17} />
          </a>
        </section>
        <section className="trust-strip">
          <Reveal className="trust-intro" variant="fade">
            A little more care.
            <br />
            <em>A lot more comfort.</em>
          </Reveal>
          {[
            {
              icon: <Wrench size={20} />,
              title: "Thoughtful workmanship",
              sub: "Attention in every detail",
            },
            {
              icon: <ShieldCheck size={20} />,
              title: "Clear, honest process",
              sub: "Know before we proceed",
            },
            {
              icon: <Headphones size={20} />,
              title: "Human support",
              sub: "Here to help you plan",
            },
          ].map((item, i) => (
            <Reveal key={item.title} className="trust-item" delay={i * 90}>
              <span className="trust-icon">{item.icon}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.sub}</small>
              </span>
            </Reveal>
          ))}
        </section>
        <section
          id="services"
          className="section section-wrap services-section"
        >
          <div className="section-heading">
            <Reveal>
              <span className="eyebrow">
                <span className="eyebrow-line" />
                WHAT WE CAN HELP WITH
              </span>
              <h2>
                Comfort starts with
                <br />
                <em>the right care.</em>
              </h2>
            </Reveal>
            <Reveal
              className="section-heading-aside"
              delay={120}
              variant="fade"
            >
              <p>...</p>
              <a href="#contact" className="text-link">
                ...
              </a>
            </Reveal>
          </div>
          <div className="services-grid">
            {siteConfig.services
              .filter((s) => s.enabled)
              .map((s, i) => (
                <Reveal
                  as="article"
                  key={s.id}
                  className={`service-card service-card-${i + 1}`}
                  variant="up"
                >
                  <div className="service-image">
                    <img src={s.image} alt={s.name} loading="lazy" />
                    <span className="service-number">0{i + 1}</span>
                    <span className="service-image-icon">
                      {s.icon === "wrench" ? (
                        <Wrench />
                      ) : s.icon === "wind" ? (
                        <Fan />
                      ) : s.icon === "settings" ? (
                        <Zap />
                      ) : (
                        <ShieldCheck />
                      )}
                    </span>
                  </div>
                  <div className="service-content">
                    <div className="service-meta">
                      <span>{s.durationLabel}</span>
                      <span>{s.priceLabel}</span>
                    </div>
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <ul>
                      {s.benefits.map((b) => (
                        <li key={b}>
                          <Check size={14} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="service-book"
                      onClick={() => openBooking("request", s.id)}
                    >
                      Book this service{" "}
                      <span>
                        <ArrowUpRight size={17} />
                      </span>
                    </button>
                  </div>
                </Reveal>
              ))}
          </div>
        </section>
        <section id="approach" className="approach-section">
          <div className="section-wrap approach-layout">
            <Reveal className="approach-sticky">
              <span className="eyebrow eyebrow-on-dark">
                <span className="eyebrow-line" />A BETTER WAY TO GET IT DONE
              </span>
              <h2>
                Good service
                <br />
                should feel
                <br />
                <em>effortless.</em>
              </h2>
              <p>
                We keep the process clear, the communication human, and the
                focus where it belongs: on your home and your comfort.
              </p>
              <button
                className="button button-gold"
                onClick={() => openBooking("request")}
              >
                Let’s get started <ArrowUpRight size={17} />
              </button>
              <div className="approach-decoration">
                N<span>✳</span>S
              </div>
            </Reveal>
            <div className="process-list">
              {siteConfig.process.map((p, i) => (
                <Reveal as="article" className="process-step" key={p.number}>
                  <div className="process-number">
                    {p.number}
                    <span />
                  </div>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  <span className="process-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section
          id="standards"
          className="section section-wrap standards-section"
        >
          <Reveal className="standards-image">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=85"
              alt="Technician working carefully with professional tools"
              loading="lazy"
            />
            <div className="standards-image-note">
              <span>✳</span>
              <p>
                Care is not an extra.
                <br />
                <strong>It’s the standard.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal className="standards-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {siteConfig.standards.eyebrow}
            </span>
            <h2>{siteConfig.standards.title}</h2>
            <p className="standards-lead">{siteConfig.standards.body}</p>
            <div className="standard-list">
              {siteConfig.standards.items.map((item, i) => (
                <div className="standard-item" key={item}>
                  <span>0{i + 1}</span>
                  <p>{item}</p>
                  <Check size={17} />
                </div>
              ))}
            </div>
            <button
              className="text-link"
              onClick={() => openBooking("request")}
            >
              Experience the difference <ArrowUpRight size={17} />
            </button>
          </Reveal>
        </section>
        {siteConfig.features.testimonials &&
          siteConfig.testimonials.items.length > 0 && (
            <section className="section section-wrap">
              <Reveal className="section-heading">
                <div>
                  <span className="eyebrow">KIND WORDS</span>
                  <h2>
                    Good work speaks
                    <br />
                    <em>for itself.</em>
                  </h2>
                </div>
              </Reveal>
              <div className="testimonials-grid">
                {siteConfig.testimonials.items.map((t: any) => (
                  <Reveal as="blockquote" key={t.name}>
                    “{t.quote}”<footer>{t.name}</footer>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        <section id="faq" className="faq-section">
          <div className="section-wrap faq-layout">
            <Reveal className="faq-intro">
              <span className="eyebrow">
                <span className="eyebrow-line" />A FEW HELPFUL ANSWERS
              </span>
              <h2>
                Questions?
                <br />
                <em>We’re here.</em>
              </h2>
              <p>
                Can’t find what you’re looking for? Reach out and we’ll help you
                figure out the next step.
              </p>
              <a
                href={`mailto:${siteConfig.business.email}`}
                className="text-link"
              >
                Email our team <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <div className="faq-list">
              {siteConfig.faq.map((f, i) => (
                <article
                  className={`faq-item ${faqOpen === i ? "faq-active" : ""}`}
                  key={f.question}
                >
                  <button
                    aria-expanded={faqOpen === i}
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  >
                    <span className="faq-index">0{i + 1}</span>
                    <strong>{f.question}</strong>
                    <ChevronDown size={19} />
                  </button>
                  <div className="faq-answer">
                    <p>{f.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="final-cta section-wrap">
          <Reveal className="cta-spark" variant="fade">
            ✳
          </Reveal>
          <Reveal className="cta-copy">
            <span className="eyebrow eyebrow-on-dark">
              YOUR COMFORT, OUR PRIORITY
            </span>
            <h2>
              Let’s make home
              <br />
              <em>feel right again.</em>
            </h2>
            <p>Tell us what you need. We’ll help you take it from there.</p>
          </Reveal>
          <Reveal className="cta-actions">
            <button
              className="button button-gold"
              onClick={() => openBooking("request")}
            >
              Book a service <ArrowUpRight size={18} />
            </button>
            <button
              className="button button-outline-dark"
              onClick={() => openBooking("whatsapp")}
            >
              <WhatsAppIcon size={20} />
              Book through WhatsApp
            </button>
            <span>Requests are confirmed by our team.</span>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <Reveal className="footer-brand">
            <a className="brand brand-footer" href="#home">
              <span className="brand-mark">
                <Fan size={23} />
              </span>
              <span>
                <strong>{siteConfig.business.name}</strong>
                <small>HOME SERVICES</small>
              </span>
            </a>
            <p>{siteConfig.footer.note}</p>
            <a
              className="footer-email"
              href={`mailto:${siteConfig.business.email}`}
            >
              {siteConfig.business.email}
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal className="footer-col">
            <span>EXPLORE</span>
            {siteConfig.navigation.map((n) => (
              <a href={n.href} key={n.href}>
                {n.label}
              </a>
            ))}
            <a href="#contact">Contact</a>
          </Reveal>
          <Reveal className="footer-col">
            <span>OUR SERVICES</span>
            {siteConfig.services
              .filter((s) => s.enabled)
              .map((s) => (
                <a href="#services" key={s.id}>
                  {s.name}
                </a>
              ))}
          </Reveal>
          <Reveal className="footer-col footer-contact">
            <span>LET’S TALK</span>
            <a href={`tel:${siteConfig.business.phone.replace(/\s/g, "")}`}>
              {siteConfig.business.phone}
            </a>
            <p>{siteConfig.business.workingHours}</p>
            <p>{siteConfig.business.serviceAreas.join(" · ")}</p>
            <button
              onClick={() => openBooking("whatsapp")}
              className="footer-whatsapp"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp{" "}
              <ArrowUpRight size={15} />
            </button>
          </Reveal>
        </div>
        <Reveal className="footer-bottom section-wrap" variant="fade">
          <span>
            {siteConfig.footer.copyright.replace(
              "{year}",
              String(new Date().getFullYear()),
            )}
          </span>
          <div>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <span>
            Made with care <span className="gold-star">✳</span>
          </span>
        </Reveal>
      </footer>
      {siteConfig.features.mobileStickyCta && (
        <div className="mobile-sticky-cta">
          <button
            onClick={() => openBooking("request")}
            className="button button-dark"
          >
            Book a service <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => openBooking("whatsapp")}
            className="button button-whatsapp"
          >
            <WhatsAppIcon size={20} />
          </button>
        </div>
      )}
      <BookingModal
        open={booking}
        onClose={() => setBooking(false)}
        initialService={selected}
        mode={mode}
      />
    </>
  );
}
