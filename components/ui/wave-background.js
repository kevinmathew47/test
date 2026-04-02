"use client";

import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

export function Waves({
    className = "",
    strokeColor = "#3cf91a",  // Brand Neon Green
    backgroundColor = "transparent",
    pointerSize = 0.5
}) {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const mouseRef = useRef({
        x: -1000, // Start off-screen
        y: -1000,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
        set: false,
    });
    const pathsRef = useRef([]);
    const linesRef = useRef([]); 
    const noiseRef = useRef(null); 
    const rafRef = useRef(null);

    // Set SVG size
    const setSize = () => {
        if (!containerRef.current || !svgRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        svgRef.current.style.width = `${width}px`;
        svgRef.current.style.height = `${height}px`;
    };

    // Setup lines
    const setLines = () => {
        if (!svgRef.current || !containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        linesRef.current = [];

        // Clear existing paths
        pathsRef.current.forEach(path => path.remove());
        pathsRef.current = [];

        const xGap = 12;
        const yGap = 12;

        const oWidth = width + 200;
        const oHeight = height + 30;

        const totalLines = Math.ceil(oWidth / xGap);
        const totalPoints = Math.ceil(oHeight / yGap);

        const xStart = (width - xGap * totalLines) / 2;
        const yStart = (height - yGap * totalPoints) / 2;

        for (let i = 0; i < totalLines; i++) {
            const points = [];
            for (let j = 0; j < totalPoints; j++) {
                points.push({
                    x: xStart + xGap * i,
                    y: yStart + yGap * j,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                });
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', '1');
            path.setAttribute('opacity', '0.4');

            svgRef.current.appendChild(path);
            pathsRef.current.push(path);
            linesRef.current.push(points);
        }
    };

    const updateMousePosition = (clientX, clientY) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        const mouse = mouseRef.current;
        
        mouse.x = clientX - left;
        mouse.y = clientY - top;

        if (!mouse.set) {
            mouse.sx = mouse.x;
            mouse.sy = mouse.y;
            mouse.lx = mouse.x;
            mouse.ly = mouse.y;
            mouse.set = true;
        }
    };

    const onResize = () => {
        setSize();
        setLines();
    };

    const onMouseMove = (e) => updateMousePosition(e.clientX, e.clientY);
    const onTouchMove = (e) => updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);

    const moved = (point, withCursorForce = true) => ({
        x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
        y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    });

    const drawLines = () => {
        const lines = linesRef.current;
        const paths = pathsRef.current;

        lines.forEach((points, lIndex) => {
            if (points.length < 2 || !paths[lIndex]) return;
            const firstPoint = moved(points[0], false);
            let d = `M ${firstPoint.x} ${firstPoint.y}`;
            for (let i = 1; i < points.length; i++) {
                const current = moved(points[i]);
                d += ` L ${current.x} ${current.y}`;
            }
            paths[lIndex].setAttribute('d', d);
        });
    };

    const movePoints = (time) => {
        const lines = linesRef.current;
        const mouse = mouseRef.current;
        const noise = noiseRef.current;

        if (!noise) return;

        lines.forEach((points) => {
            points.forEach((p) => {
                const move = noise(
                    (p.x + time * 0.008) * 0.003,
                    (p.y + time * 0.003) * 0.002
                ) * 8;

                p.wave.x = Math.cos(move) * 12;
                p.wave.y = Math.sin(move) * 6;

                const dx = p.x - mouse.sx;
                const dy = p.y - mouse.sy;
                const d = Math.hypot(dx, dy);
                
                // Influence radius
                const l = 200; 

                if (d < l) {
                    const s = 1 - d / l; // strength based on distance
                    const f = Math.cos(d * 0.001) * s;
                    
                    // Added a base force (0.5) so it reacts even when mouse is still
                    const forceMultiplier = (mouse.vs * 0.00035) + 0.1;

                    p.cursor.vx += Math.cos(mouse.a) * f * l * forceMultiplier;
                    p.cursor.vy += Math.sin(mouse.a) * f * l * forceMultiplier;
                }

                p.cursor.vx += (0 - p.cursor.x) * 0.015; // Restoration force
                p.cursor.vy += (0 - p.cursor.y) * 0.015;

                p.cursor.vx *= 0.92; // Friction
                p.cursor.vy *= 0.92;

                p.cursor.x += p.cursor.vx;
                p.cursor.y += p.cursor.vy;

                p.cursor.x = Math.min(60, Math.max(-60, p.cursor.x));
                p.cursor.y = Math.min(60, Math.max(-60, p.cursor.y));
            });
        });
    };

    const tick = (time) => {
        const mouse = mouseRef.current;

        // Smooth follow
        mouse.sx += (mouse.x - mouse.sx) * 0.15;
        mouse.sy += (mouse.y - mouse.sy) * 0.15;

        // Velocity
        const dx = mouse.x - mouse.lx;
        const dy = mouse.y - mouse.ly;
        const d = Math.hypot(dx, dy);

        mouse.v = d;
        mouse.vs += (d - mouse.vs) * 0.15;
        mouse.vs = Math.min(100, mouse.vs);

        // Previous tracking
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        
        // Angle tracking - handle zero movement
        if (d > 0.1) {
            mouse.a = Math.atan2(dy, dx);
        }

        if (containerRef.current) {
            containerRef.current.style.setProperty('--x', `${mouse.sx}px`);
            containerRef.current.style.setProperty('--y', `${mouse.sy}px`);
        }

        movePoints(time);
        drawLines();

        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return;

        noiseRef.current = createNoise2D();

        onResize();
        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false });

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            containerRef.current?.removeEventListener('touchmove', onTouchMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`waves-component relative overflow-hidden cursor-none pointer-events-auto ${className}`}
            style={{
                backgroundColor,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                '--x': '-1000px',
                '--y': '-1000px',
            }}
        >
            <svg
                ref={svgRef}
                className="block w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            />
            <div
                className="pointer-dot"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${pointerSize}rem`,
                    height: `${pointerSize}rem`,
                    background: strokeColor,
                    borderRadius: '50%',
                    transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                    pointerEvents: 'none',
                    willChange: 'transform',
                    boxShadow: `0 0 10px ${strokeColor}`,
                }}
            />
        </div>
    );
}
