"use client";
import { useRef, useEffect } from "react";

import "./GridContainer.css";

const GridContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) return;

    const gridItems = container.querySelectorAll<HTMLDivElement>(".grid-item");
    const firstItem = container.querySelector<HTMLDivElement>(".grid-item");

    const highlightColors = [
      "#E24E1B",
      "#4381C1",
      "#F79824",
      "#04A777",
      "#5B8C5A",
      "#2176FF",
      "#818D92",
      "#22AAA1",
    ];

    gridItems.forEach((item, index) => {
      item.dataset.color = highlightColors[index % highlightColors.length];
    });

    const moveToElement = (element: HTMLElement | null) => {
      if (!element || !container || !highlight) return;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
      highlight.style.backgroundColor = element.dataset.color || "";
    };

    const moveHighlight = (e: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;

      if (hoveredElement?.classList.contains("grid-item")) {
        moveToElement(hoveredElement);
      } else if (hoveredElement?.parentElement instanceof HTMLElement && hoveredElement.parentElement.classList.contains("grid-item")) {
        moveToElement(hoveredElement.parentElement);
      }
    };

    moveToElement(firstItem);

    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, [])

  return (
    <>
      <div className="grid-container" ref={containerRef}>
        <h2 className="grid-container-header">Growth, But Make It <span>Krafted</span></h2>
        <div className="grid">
          <div className="grid-row">
            <div className="grid-item">
                <h2>1000+ Pieces of Content</h2>
              <p>Produced Monthly</p>
            </div>
            <div className="grid-item">
                <h2>900+ Days</h2>
              <p>Powering Content Success</p>
            </div>
            <div className="grid-item">
                <h2>60+ Creatives</h2>
              <p>Trust Our Systems</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
                <h2>15+ Socials</h2>
              <p>Run Seamlessly Everyday</p>
            </div>
            <div className="grid-item">
                <h2>50+ Brands</h2>
              <p>Trust Our Systems</p>
            </div>
            <div className="grid-item">
                <h2>25+ Industries</h2>
              <p>Trust Our Systems</p>
            </div>
            <div className="grid-item">
                <h2>10+ Countries</h2>
              <p>Trust Our Systems</p>
            </div>
            <div className="grid-item">
                <h2>5+ Continents</h2>
              <p>Trust Our Systems</p>
            </div>
          </div>
        </div>
        <div className="highlight" ref={highlightRef}></div>
      </div>
    </>
  )
}
export default GridContainer