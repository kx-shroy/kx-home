"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const footer = footerRef.current;
    const whatWeDoSection = document.querySelector('.what-we-do-section');

    if (!whatWeDoSection) return;

    // Create a scroll trigger that animates the footer as the last section scrolls up
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        {
          yPercent: 100,
          scale: 0.8,
          opacity: 0,
        },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.what-we-do-section',
            start: "center top", // Start when section center reaches top
            end: "bottom top+=100px", // End when section bottom is near top
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer ref={footerRef} className="fixed-footer font-barlow">
        <div className="footer-content">
            <div className="footer-row">
                <div className="footer-col">
                    <h2>You Create, </h2>
                    <h2>We Scale... </h2>
                </div>
                <div className="footer-col">
                    <div className="footer-nav">
                        <li>Menu</li>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/team">Team</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </div>
                    <div className="footer-nav">
                        <li>Discover</li>
                        <li><Link href="https://www.linkedin.com/company/kraftedx" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
                        <li><Link href="https://www.instagram.com/kraftedx.club" target="_blank" rel="noopener noreferrer">Instagram</Link></li>
                    </div>
                    <div className="footer-nav">
                        <li>Learn</li>
                        <li>Blog</li>
                        <li>Resources</li>
                        <li>Careers</li>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>hello@kraftedx.com</p>
                <p>© 2025 KraftedX. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </>
  )
}
export default Footer