"use client";

import useMousePosition from "@/utils/useMousePosition";
import {motion} from 'framer-motion';
import "./page.css"
import { useState, useEffect, useRef } from "react";
import engageData from "../data/engage";
import serviceData from "../data/service";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Home2() {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const [isCtaHovered, setIsCtaHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const engagementRef = useRef<HTMLElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const cardsMaskWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1200);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Handle horizontal scroll for engagement cards (both regular and mask views)
            if (cardsWrapperRef.current && engagementRef.current) {
                const section = engagementRef.current;
                const wrapper = cardsWrapperRef.current;
                const maskWrapper = cardsMaskWrapperRef.current;
                const rect = section.getBoundingClientRect();

                // When section is stuck at the top
                if (rect.top <= 0 && rect.bottom > window.innerHeight) {
                    const scrollProgress = Math.abs(rect.top) / (rect.height - window.innerHeight);

                    // Calculate and apply scroll for regular wrapper
                    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
                    const scrollAmount = scrollProgress * maxScroll;
                    wrapper.scrollLeft = scrollAmount;

                    // Sync mask wrapper with same scroll amount
                    if (maskWrapper) {
                        maskWrapper.scrollLeft = scrollAmount;
                    }
                } else if (rect.top > 0) {
                    // Reset scroll when section hasn't reached top yet
                    wrapper.scrollLeft = 0;
                    if (maskWrapper) {
                        maskWrapper.scrollLeft = 0;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // On desktop, use hover size
    const size = isMobile ? 30 : (isCtaHovered ? 0 : (isHovered ? 400 : 30));

    const handleHover = (hovered: boolean) => {
        if (!isMobile) {
            setIsHovered(hovered);
        }
    };

    const handleCtaHover = (hovered: boolean) => {
        if (!isMobile) {
            setIsCtaHovered(hovered);
        }
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription logic
        console.log("Newsletter email:", newsletterEmail);
        setNewsletterEmail("");
    };

    // Follow cursor position
    const maskX = x ?? 0;
    const maskY = y ?? 0;

    // Connect Section ScrollTrigger
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const titleHeading = gsap.utils.toArray(".connect-title h1");
      const splits = [] as SplitText[];

      titleHeading.forEach((heading) => {
        const split = SplitText.create(heading as HTMLElement, {
          type: "chars",
          charsClass: "connect-char"
        });
        splits.push(split);

        split.chars.forEach((char, i) => {
          const charInitialY = i % 2 === 0 ? -150 : 150;
          gsap.set(char, { y: charInitialY });
        })
      });

      const titles = gsap.utils.toArray<HTMLElement>(".connect-title")

      titles.forEach((title , index) => {
        const titleContainer = title.querySelector(".connect-title-container") as HTMLElement;
        const titleContainerInitialX = index === 1 ? -100 : 100;
        const split = splits[index];
        const charCount = split.chars.length;

        ScrollTrigger.create({
          trigger: title,
          start: "top bottom",
          end: "top -5%",
          scrub: 1,
          onUpdate: (self) => {
            const titleContainerX = titleContainerInitialX - self.progress * titleContainerInitialX;
            gsap.set(titleContainer, { x: `${titleContainerX}%` });

            split.chars.forEach((char, i) => {
              let charStaggerIndex;
              if (index === 1) {
                charStaggerIndex = charCount - i - 1;
              } else {
                charStaggerIndex = i;
              }

              const charStartDelay = 0.1;
              const charTimelineSpan = 1 - charStartDelay;
              const staggerFactor = Math.min(0.75, charTimelineSpan * 0.75);
              const delay =
                charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
              const duration =
                charTimelineSpan -
                (staggerFactor * (charCount - 1)) / charCount;
              const start = delay;

              let charProgress = 0;
              if (self.progress >= start) {
                charProgress = Math.min(1, (self.progress - start) / duration);
              }

              const charInitialY = i % 2 === 0 ? -150 : 150;
              const charY = charInitialY - charProgress * charInitialY;
              gsap.set(char, { y: charY });

            })
          }
        })

      })

    }, {scope: containerRef});

  return (
    <main className="page-wrapper font-barlow">
      {/* Regular view - background layer */}
      <div className="page-view">
        <section className="hero-section">
          <div className="hero-view">
            <div className="hero-view-img" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              <img src="/assets/archive/sketch-1.gif" alt="" />
            </div>
            <div className="hero-text-content" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              <h1>We
                <div>
                  <img src="/assets/archive/sketch-1.gif" alt="" />
                </div>
              </h1>
              <h1>help</h1>
              <h1>creators</h1>
              <h1>grow with</h1>
              <h1>purpose</h1>
              <p className="hero-subtext">Where your vision meets our systems, and magic happens.</p>
              <div className="hero-cta-container" onMouseEnter={() => handleCtaHover(true)} onMouseLeave={() => handleCtaHover(false)}>
                <button className="hero-cta hero-cta-primary">Learn More</button>
                <button className="hero-cta hero-cta-secondary">Get in Touch</button>
              </div>
            </div>
          </div>
        </section>

        {/* We Are Section */}
        <section id="about" className="we-are-section">
          <div className="we-are-container">
            <h2 className="we-are-title" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>WE ARE KRAFTEDX</h2>
            <p className="we-are-text" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              less agency, <br />
              more accomplice <br />
              we build systems that let <br />
              creators stay wild and still win
            </p>
          </div>
          <div className="marquee-container">
            <div className="marquee-content" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              <span className="marquee-text">We chase ideas that matter</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase ideas that matter</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase ideas that matter</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase ideas that matter</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
            </div>
          </div>
        </section>

        {/* Engagement Section */}
        <section id="process" className="engagement-section" ref={engagementRef}>
          <div className="engagement-sticky-content">
            <div className="engagement-header">
              <h2 className="engagement-title">HOW WE ENGAGE</h2>
              <p className="engagement-hook">
                Every creator is different. That&apos;s why our engagement isn&apos;t a checklist, it&apos;s a collaboration built around your rhythm.
              </p>
            </div>
            <div className="engagement-cards-wrapper" ref={cardsWrapperRef}>
              <div className="engagement-cards">
                {engageData.map((item, index) => (
                  <div key={index} className="engagement-card">
                    <img src={item.icon} alt={item.title} className="engagement-card-icon" />
                    <h3 className="engagement-card-title">{item.title}</h3>
                    <p className="engagement-card-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section id="service" className="service-section">
          <div className="service-container">
            <h2 className="service-title" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>OUR SERVICE</h2>
            <h2 className="service-title-hook"><span onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>Innovation in every deliverable</span></h2>
            <div className="service-cards">
              {serviceData.map((item) => (
                <div key={item.id} className="service-card" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                  <div className="card-corner card-corner-top">
                    <span className="card-number">{item.id}</span>
                    <img src={item.cardImg} alt="" className="card-symbol" />
                  </div>
                  <div className="mask-card-content">
                    <img src={item.logo} alt={item.name} className="mask-card-logo" />
                    <h3 className="mask-card-name">{item.name}</h3>
                    <div className="mask-card-stats">
                      {item.stats.map((stat, idx) => (
                        <div key={idx} className="mask-stat-item">
                          <span className="mask-stat-label">
                            {'creator' in stat ? stat.creator : stat.metric}
                          </span>
                          <span className="mask-stat-value">
                            {'growth' in stat ? stat.growth : stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={item.link}
                      {...(item.link.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
                      className="mask-card-link"
                      onMouseEnter={() => handleCtaHover(true)}
                      onMouseLeave={() => handleCtaHover(false)}
                    >
                      {item.link.startsWith('/') ? 'View Case Study' : 'Know More'}
                    </a>
                  </div>
                  <div className="card-corner card-corner-bottom">
                    <span className="card-number">{item.id}</span>
                    <img src={item.cardImg} alt="" className="card-symbol" />
                  </div>
                </div>
              ))}
            </div>
            <p className="service-hook" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              strategic, sustainable, creator growth
            </p>
          </div>
        </section>

        {/* Connect Section */}
        <div id="why-us" ref={containerRef} className="connect-section">
          <div className="connect-container">
            <section className="connect-intro">
              <img src="/assets/archive/cards/gifs/align.gif" alt="Align" className="connect-intro-gif" />
              <h1>We Align with Ambitious Creators Who Are !</h1>
            </section>

            <section className="connect-animated-titles">
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Chaotic by nature</h1>
                  <p>Where creativity flows wild and free.</p>
                  <img src="/assets/archive/why-1.jpeg" alt="Chaotic" className="connect-title-gif" />
                </div>
              </div>
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Strategic by choice</h1>
                  <p>Turning that energy into purposeful growth.</p>
                  <img src="/assets/archive/why-2.jpeg" alt="Strategic" className="connect-title-gif" />
                </div>
              </div>
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Unstoppable by design</h1>
                  <p>Built to evolve, adapt, and scale endlessly.</p>
                  <img src="/assets/archive/why-3.jpeg" alt="Unstoppable" className="connect-title-gif" />
                </div>
              </div>
            </section>

            <section id="contact" className="connect-outro">
              <h1>Let&apos;s Work</h1>
              <img src="/assets/archive/cards/gifs/call.gif" alt="Call" className="connect-outro-gif" />
              <a href="mailto:hello@kraftedx.com" className="connect-outro-email">hello@kraftedx.com</a>
            </section>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="footer-wrapper">
            <div className="footer-sticky">
              <div className="footer-content">
                <div className="footer-top">
                  {/* GIF - Left Side */}
                  <div className="footer-gif-container">
                    <img src="/assets/archive/footer.gif" alt="Footer animation" className="footer-gif" />
                  </div>

                  {/* Newsletter - Center */}
                  <div className="footer-newsletter">
                    <h3 className="footer-newsletter-title">
                      Subscribe to our newsletter to receive a first look at new events & goods
                    </h3>
                    <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="footer-newsletter-input"
                      />
                      <button type="submit" className="footer-newsletter-button">
                        Subscribe
                      </button>
                    </form>
                  </div>

                  {/* Company & Discover - Right Side */}
                  <div className="footer-menus">
                    <div className="footer-menu">
                      <h3 className="footer-menu-title">Company</h3>
                      <p className="footer-menu-item">About Us</p>
                      <p className="footer-menu-item">Team</p>
                      <p className="footer-menu-item">Careers</p>
                      <p className="footer-menu-item">Contact Us</p>
                    </div>
                    <div className="footer-menu">
                      <h3 className="footer-menu-title">Discover</h3>
                      <p className="footer-menu-item">LinkedIn</p>
                      <p className="footer-menu-item">Instagram</p>
                      <p className="footer-menu-item">Blog</p>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <h1 className="footer-tagline">You Create, We Scale</h1>
                  <p className="footer-copyright">©kraftedx.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future sections will be added here */}
      </div>

      {/* Mask layer - overlays entire page */}
      <motion.div
        className="page-mask"
        animate={{
          maskPosition: `${maskX - size/2}px ${maskY - size/2}px`,
          maskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5}}
      >
        <div className="page-mask-content" style={{ transform: `translateY(-${scrollY}px)` }}>
        <section className="hero-section">
          <div className="hero-mask-content">
            <div className="hero-mask-img">
              <img src="/assets/archive/sketch-3.gif" alt="" />
            </div>
            <div className="hero-text-content">
              <h1>With
                <div>
                  <img src="/assets/archive/sketch-3.gif" alt="" />
                </div>
              </h1>
              <h1>coffee,</h1>
              <h1>chaos, and</h1>
              <h1>curiosity</h1>
              <h1>He he he...</h1>
              <p className="hero-subtext">Because great ideas rarely come from calm.</p>
              <div className="hero-cta-container">
                <button className="hero-cta hero-cta-primary">Learn More</button>
                <button className="hero-cta hero-cta-secondary">Get in Touch</button>
              </div>
            </div>
          </div>
        </section>

        {/* We Are Section */}
        <section id="about" className="we-are-section">
          <div className="we-are-container">
            <h2 className="we-are-title">NOT AN ORDINARY</h2>
            <p className="we-are-text">
              We break rules, <br />
              not workflows <br />
              fuel dream not deadline, <br />
              and make magic look methodical
            </p>
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-text">We chase dreams that last</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase dreams that last</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase dreams that last</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
              <span className="marquee-text">We chase dreams that last</span>
              <img src="/assets/archive/sketch-2.gif" alt="" className="marquee-gif" />
            </div>
          </div>
        </section>

        {/* Engagement Section */}
        <section id="process" className="engagement-section">
          <div className="engagement-sticky-content">
            <div className="engagement-header">
              <h2 className="engagement-title">HOW WE ENGAGE</h2>
              <p className="engagement-hook">
                Every creator is different. That&apos;s why our engagement isn&apos;t a checklist — it&apos;s a collaboration built around your rhythm.
              </p>
            </div>
            <div className="engagement-cards-wrapper" ref={cardsMaskWrapperRef}>
              <div className="engagement-cards">
                {engageData.map((item, index) => (
                  <div key={index} className="engagement-card">
                    <img src={item.icon} alt={item.title} className="engagement-card-icon" />
                    <h3 className="engagement-card-title">{item.title}</h3>
                    <p className="engagement-card-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section id="service" className="service-section">
          <div className="service-container">
            <h2 className="service-title">GROWTH ARSENAL</h2>
            <h2 className="service-title-hook"><span>Madness meets method, results meet reality</span></h2>
            <div className="service-cards">
              {serviceData.map((item) => (
                <div key={item.id} className="service-card">
                  <div className="card-corner card-corner-top">
                    <span className="card-number">{item.id}</span>
                    <img src={item.cardImg} alt="" className="card-symbol" />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <img src={item.iconGif} alt={item.title} className="card-gif" />
                  <p className="card-description">{item.description}</p>
                  <a
                    href={item.link}
                    {...(item.link.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
                    className="mask-card-link"
                  >
                    {item.link.startsWith('/') ? 'View Case Study' : 'Know More'}
                  </a>
                  <div className="card-corner card-corner-bottom">
                    <span className="card-number">{item.id}</span>
                    <img src={item.cardImg} alt="" className="card-symbol" />
                  </div>
                </div>
              ))}
            </div>
            <p className="service-hook" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
              krazy, madness, Konsistency, repeat
            </p>
          </div>
        </section>

        {/* Connect Section */}
        <div className="connect-section">
          <div className="connect-container">
            <section className="connect-intro">
              <img src="/assets/archive/cards/gifs/align.gif" alt="Align" className="connect-intro-gif" />
              <h1>We Align with Ambitious Creators Who Are !</h1>
            </section>

            <section className="connect-animated-titles">
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Chaotic by nature</h1>
                  <p>Where creativity flows wild and free.</p>
                  <img src="/assets/archive/why-1.jpeg" alt="Chaotic" className="connect-title-gif" />
                </div>
              </div>
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Strategic by choice</h1>
                  <p>Turning that energy into purposeful growth.</p>
                  <img src="/assets/archive/why-2.jpeg" alt="Strategic" className="connect-title-gif" />
                </div>
              </div>
              <div className="connect-title">
                <div className="connect-title-container">
                  <h1>Unstoppable by design</h1>
                  <p>Built to evolve, adapt, and scale endlessly.</p>
                  <img src="/assets/archive/why-3.jpeg" alt="Unstoppable" className="connect-title-gif" />
                </div>
              </div>
            </section>

            <section id="contact" className="connect-outro">
              <h1>Let&apos;s Work</h1>
              <img src="/assets/archive/cards/gifs/call.gif" alt="Call" className="connect-outro-gif" />
              <a href="mailto:hello@kraftedx.com" className="connect-outro-email">hello@kraftedx.com</a>
            </section>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="footer-wrapper">
            <div className="footer-sticky">
              <div className="footer-content">
                <div className="footer-top">
                  {/* GIF - Left Side */}
                  <div className="footer-gif-container">
                    <img src="/assets/archive/footer.gif" alt="Footer animation" className="footer-gif" />
                  </div>

                  {/* Newsletter - Center */}
                  <div className="footer-newsletter">
                    <h3 className="footer-newsletter-title">
                      Subscribe to our newsletter to receive a first look at new events & goods
                    </h3>
                    <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="footer-newsletter-input"
                      />
                      <button type="submit" className="footer-newsletter-button">
                        Subscribe
                      </button>
                    </form>
                  </div>

                  {/* Company & Discover - Right Side */}
                  <div className="footer-menus">
                    <div className="footer-menu">
                      <h3 className="footer-menu-title">Company</h3>
                      <p className="footer-menu-item">About Us</p>
                      <p className="footer-menu-item">Team</p>
                      <p className="footer-menu-item">Careers</p>
                      <p className="footer-menu-item">Contact Us</p>
                    </div>
                    <div className="footer-menu">
                      <h3 className="footer-menu-title">Discover</h3>
                      <p className="footer-menu-item">LinkedIn</p>
                      <p className="footer-menu-item">Instagram</p>
                      <p className="footer-menu-item">Blog</p>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <h1 className="footer-tagline">You Create, We Scale</h1>
                  <p className="footer-copyright">©kraftedx.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future sections will be added here */}
        </div>
      </motion.div>
    </main>
  );
}
