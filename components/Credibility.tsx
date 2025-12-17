'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesCopy } from './services.js';
import './Credibility.css';

const Credibility = () => {
  const stickySectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const currentCountRef = useRef<HTMLSpanElement>(null);
  const serviceImgRef = useRef<HTMLDivElement>(null);
  const serviceCopyRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stickySection = stickySectionRef.current;
    const indicator = indicatorRef.current;
    const currentCount = currentCountRef.current;
    const serviceImg = serviceImgRef.current;
    const serviceCopy = serviceCopyRef.current;

    if (!stickySection || !indicator || !currentCount || !serviceImg || !serviceCopy) return;

    // Wait a bit for hero ScrollTrigger to initialize first
    const timeout = setTimeout(() => {
      setupAnimation();
    }, 100);

    const setupAnimation = () => {

    const stickyHeight = window.innerHeight * 4;
    const services = stickySection.querySelectorAll('.service');
    const serviceHeight = window.innerWidth <= 1200 ? 35 : 52;
    const imgHeight = 250;

    // Initialize first service stats
    const statTitles = serviceCopy.querySelectorAll('.stat-title');
    const statValues = serviceCopy.querySelectorAll('.stat-value');
    statTitles[0].textContent = servicesCopy[0].stat1.title;
    statValues[0].textContent = servicesCopy[0].stat1.value;
    statTitles[1].textContent = servicesCopy[0].stat2.title;
    statValues[1].textContent = servicesCopy[0].stat2.value;
    statTitles[2].textContent = servicesCopy[0].stat3.title;
    statValues[2].textContent = servicesCopy[0].stat3.value;

    const measureContainer = document.createElement('div');
    measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      white-space: nowrap;
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
    `;
    document.body.appendChild(measureContainer);

    const serviceWidths = Array.from(services).map((service) => {
      measureContainer.textContent = service.querySelector('p')?.textContent || '';
      return measureContainer.offsetWidth + 8;
    });

    document.body.removeChild(measureContainer);

    gsap.set(indicator, {
      width: serviceWidths[0],
      xPercent: -50,
      left: '50%',
    });

    const animateTextChange = (index: number) => {
      return new Promise<void>((resolve) => {
        if (!serviceCopy) {
          resolve();
          return;
        }

        const statTitles = serviceCopy.querySelectorAll('.stat-title');
        const statValues = serviceCopy.querySelectorAll('.stat-value');
        const allStats = serviceCopy.querySelectorAll('.stat-title, .stat-value');

        gsap.to(allStats, {
          opacity: 0,
          y: -20,
          duration: 0.25,
          stagger: 0.05,
          ease: 'power3.inOut',
          onComplete: () => {
            // Update stat titles and values
            statTitles[0].textContent = servicesCopy[index].stat1.title;
            statValues[0].textContent = servicesCopy[index].stat1.value;
            statTitles[1].textContent = servicesCopy[index].stat2.title;
            statValues[1].textContent = servicesCopy[index].stat2.value;
            statTitles[2].textContent = servicesCopy[index].stat3.title;
            statValues[2].textContent = servicesCopy[index].stat3.value;

            gsap.to(allStats, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              stagger: 0.05,
              ease: 'power3.out',
              onComplete: resolve,
            });
          },
        });
      });
    };

    // Refresh ScrollTrigger to recalculate positions after hero is set up
    ScrollTrigger.refresh();

    ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: `+=${stickyHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: async (self) => {
        const progress = self.progress;
        gsap.set('.progress', { scaleY: progress });

        // Calculate active index based on progress through this section (0 to 1)
        // progress 0 = service 0, progress 1 = service 7
        const activeIndex = Math.min(
          Math.floor(progress * services.length),
          services.length - 1
        );

        if (
          activeIndex >= 0 &&
          activeIndex < services.length &&
          currentIndexRef.current !== activeIndex
        ) {
          currentIndexRef.current = activeIndex;

          services.forEach((service) => service.classList.remove('active'));
          services[activeIndex].classList.add('active');

          await Promise.all([
            gsap.to(indicator, {
              y: activeIndex * serviceHeight,
              width: serviceWidths[activeIndex],
              duration: 0.3,
              ease: 'power3.inOut',
              overwrite: true,
            }),

            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.3,
              ease: 'power3.inOut',
              overwrite: true,
            }),

            gsap.to(currentCount, {
              innerText: activeIndex + 1,
              snap: { innerText: 1 },
              duration: 0.3,
              ease: 'power3.out',
            }),

            animateTextChange(activeIndex),
          ]);
        }
      },
    });

    };

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === stickySection) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <section className="sticky font-barlow" ref={stickySectionRef}>
        <h2 className="credibility-title">Growth isn&apos;t luck. It&apos;s <span className="crayon-text">design.</span></h2>
        <div className="col">
          <div className="services">
            <div className="indicator" ref={indicatorRef}></div>
            <div className="service active">
              <p>Sourabh Bothra (YT)</p>
            </div>
            <div className="service">
              <p>Anita Bokepalli (YT)</p>
            </div>
            <div className="service">
              <p>Sourabh Bothra (IG)</p>
            </div>
            <div className="service">
              <p>Habuild (IG)</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="service-img-wrapper">
            <div className="service-img" ref={serviceImgRef}>
              <div className="img">
                <img src="/assets/SB-yt.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/assets/AB-yt.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/assets/SB-ig.jpeg" alt="" />
              </div>
              <div className="img">
                <img src="/assets/habuild-ig.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="service-copy">
            <div className="stats" ref={serviceCopyRef}>
              <div className="stat-item">
                <span className="stat-title">Gained: </span>
                <span className="stat-value">40k to 2.5M</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Growth: </span>
                <span className="stat-value">6150%</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">In: </span>
                <span className="stat-value">2.5 y</span>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <div className="index">
          <span ref={currentCountRef}>1</span>
          <span className="separator"></span>
          <span className="total-count">4</span>
        </div>
      </section>

    </>
  );
};

export default Credibility;