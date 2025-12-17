"use client";

import useMousePosition from "@/utils/useMousePosition";
import {motion} from 'framer-motion';
import "./HoverComponent.css"
import { useState, useEffect, useRef } from "react";
import CircleText from "./ui/CircleText";


const HoverComponent = () => {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isInComponent, setIsInComponent] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1200);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const checkIfInComponent = () => {
            if (!componentRef.current || x === null || y === null) return;

            const rect = componentRef.current.getBoundingClientRect();
            const inBounds =
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom;

            setIsInComponent(inBounds);
        };

        checkIfInComponent();
    }, [x, y]);

    // On mobile, when pressed, cover full viewport. On desktop, use hover size
    const size = isMobile
        ? (isPressed ? Math.max(window.innerWidth, window.innerHeight) * 1.5 : 40)
        : (isHovered ? 400 : 40);


    const handleHover = (hovered: boolean) => {
        if (!isMobile) {
            setIsHovered(hovered);
        }
    };

    const handlePressStart = () => {
        if (isMobile) {
            setIsPressed(true);
        }
    };

    const handlePressEnd = () => {
        if (isMobile) {
            setIsPressed(false);
        }
    };

    // On mobile when pressed, center the mask. On desktop, follow cursor only if in component
    const maskX = isMobile && isPressed
        ? window.innerWidth / 2
        : (isInComponent ? (x ?? 0) : -9999);
    const maskY = isMobile && isPressed
        ? window.innerHeight / 2
        : (isInComponent ? (y ?? 0) : -9999);

  return (
    <>
      <div ref={componentRef} className="hover-component font-barlow">
        <h2 className="hover-component-header">What We Do</h2>
        <motion.div className="mask"
        animate={{
            maskPosition: `${maskX - size/2}px ${maskY - size/2}px`,
            maskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: isMobile && isPressed ? 0.3 : 0.5}}
        >
            <div className="mask-img" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <img src="/assets/card-1.jpeg" alt="" />
            </div>
            <p onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                We&apos;re the kind of crazy that mixes spreadsheets with sparks,where passion, energy, and wild ideas fuel every project we touch.
            </p>
        </motion.div>
        <div className="view">
            <div className="view-img">
                <img src="/assets/card-2.jpeg" alt="" />
            </div>
            <p>
                We dive deep, strategize smart, and build systems that turn creative chaos into scalable, repeatable success stories - with precision.
            </p>
        </div>
        <div
            className="press-icon"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
        >
            <CircleText text="PRESS-PRESS-PRESS-" spinDuration={20} onHover="pause"/>
        </div>
      </div>
    </>
  )
}
export default HoverComponent