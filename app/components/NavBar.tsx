"use client";

import "./NavBar.css";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Logo section at left */}
      <div className="navbar-logo-container">
        <a href="#top">
          <img src="/kx-logo.png" alt="KraftedX Logo" className="navbar-logo" />
        </a>
      </div>

      {/* Menu section at right */}
      <div className="navbar-menu">
        <a
          href="#about"
          className={`navbar-menu-item ${activeSection === "about" ? "active" : ""}`}
        >
          About
        </a>
        <a
          href="#process"
          className={`navbar-menu-item ${activeSection === "process" ? "active" : ""}`}
        >
          Process
        </a>
        <a
          href="#service"
          className={`navbar-menu-item ${activeSection === "service" ? "active" : ""}`}
        >
          Service
        </a>
        <a
          href="#why-us"
          className={`navbar-menu-item ${activeSection === "why-us" ? "active" : ""}`}
        >
          Why Us
        </a>
        <a
          href="#contact"
          className={`navbar-menu-item ${activeSection === "contact" ? "active" : ""}`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
