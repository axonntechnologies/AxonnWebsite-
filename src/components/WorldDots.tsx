import { useRef, MouseEvent, useState } from "react";
import { motion } from "motion/react";
import { Globe, Radio, Shield, Zap, Sparkles } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  role: string;
  latency: string;
  x: number; // percentage in SVG (0-100)
  y: number;
  color: string;
}

const hubs: Hub[] = [
  { id: "ny", name: "New York", role: "Americas Hub", latency: "0.8ms", x: 27, y: 36, color: "#0284c7" },
  { id: "ldn", name: "London", role: "EMEA Gateway", latency: "0.6ms", x: 48, y: 28, color: "#38bdf8" },
  { id: "mum", name: "Mumbai", role: "Execution Desk", latency: "1.2ms", x: 68, y: 46, color: "#10b981" },
  { id: "sg", name: "Singapore", role: "APAC Routing", latency: "0.9ms", x: 79, y: 55, color: "#a855f7" }
];

// Arcs between trading hubs
const connections = [
  { from: hubs[0], to: hubs[1], d: "M 135 108 Q 185 65 240 84", dur: 2.8 },
  { from: hubs[1], to: hubs[2], d: "M 240 84 Q 295 100 340 138", dur: 3.2 },
  { from: hubs[2], to: hubs[3], d: "M 340 138 Q 370 155 395 165", dur: 2.4 },
  { from: hubs[0], to: hubs[3], d: "M 135 108 Q 260 210 395 165", dur: 4.2 }
];

// Dot matrix pattern representing continents
const continentDots: { cx: number; cy: number; r: number; opacity: number }[] = [];

// Generate deterministic dot matrix for continents
const seedDots = () => {
  if (continentDots.length > 0) return;
  // North America
  for (let x = 18; x <= 36; x += 3.2) {
    for (let y = 20; y <= 46; y += 3.8) {
      if ((x < 22 && y > 38) || (x > 32 && y < 24)) continue;
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.45 + ((x + y) % 3) * 0.15 });
    }
  }
  // South America
  for (let x = 28; x <= 38; x += 3.2) {
    for (let y = 52; y <= 80; y += 4.2) {
      if (x > 34 && y > 72) continue;
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.4 + ((x * y) % 4) * 0.12 });
    }
  }
  // Europe
  for (let x = 45; x <= 58; x += 3.0) {
    for (let y = 20; y <= 38; y += 3.5) {
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.5 + ((x + y) % 2) * 0.2 });
    }
  }
  // Africa
  for (let x = 46; x <= 60; x += 3.2) {
    for (let y = 42; y <= 72; y += 4.0) {
      if (x > 56 && y > 62) continue;
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.4 + ((x * y) % 3) * 0.15 });
    }
  }
  // Asia
  for (let x = 60; x <= 88; x += 3.2) {
    for (let y = 20; y <= 58; y += 3.8) {
      if (x > 80 && y > 52 && x < 84) continue;
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.48 + ((x + y) % 3) * 0.16 });
    }
  }
  // Australia
  for (let x = 78; x <= 92; x += 3.5) {
    for (let y = 66; y <= 84; y += 4.2) {
      continentDots.push({ cx: x * 5, cy: y * 3, r: 1.4, opacity: 0.42 + ((x + y) % 2) * 0.2 });
    }
  }
};
seedDots();

export function WorldDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    containerRef.current.style.setProperty("--globe-rx", `${-y}deg`);
    containerRef.current.style.setProperty("--globe-ry", `${x}deg`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--globe-rx", `0deg`);
    containerRef.current.style.setProperty("--globe-ry", `0deg`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="network-globe-container"
      aria-label="Interactive Global Trading Network"
    >
      {/* Ambient background glow */}
      <div className="network-ambient-glow" />

      {/* Floating particles */}
      <div className="network-particles-layer">
        <span className="net-particle p1" />
        <span className="net-particle p2" />
        <span className="net-particle p3" />
        <span className="net-particle p4" />
      </div>

      {/* Main interactive SVG Matrix */}
      <div className="network-3d-stage">
        <svg viewBox="0 0 500 300" className="network-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Gradients */}
            <radialGradient id="hubBeaconGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
            {/* Filter for glowing nodes */}
            <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Latitude / longitude subtle grid rings */}
          <g className="network-grid-rings" stroke="rgba(67, 183, 220, 0.12)" strokeWidth="1" fill="none">
            <ellipse cx="250" cy="150" rx="230" ry="120" strokeDasharray="3 4" />
            <ellipse cx="250" cy="150" rx="160" ry="85" strokeDasharray="3 4" />
            <line x1="20" y1="150" x2="480" y2="150" strokeDasharray="4 4" />
          </g>

          {/* Continent dots */}
          <g className="network-dots-group">
            {continentDots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#38bdf8"
                opacity={dot.opacity * 0.75}
                className="matrix-dot"
              />
            ))}
          </g>

          {/* Connecting Geodesic Arcs */}
          {connections.map((conn, idx) => (
            <g key={idx} className="connection-arc-group">
              {/* Background trace line */}
              <path
                d={conn.d}
                fill="none"
                stroke={`url(#arcGrad${(idx % 2) + 1})`}
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.85"
              />
              {/* Solid subtle glow arc */}
              <path
                d={conn.d}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                opacity="0.55"
              />
              {/* Animated data packet traveling on arc */}
              <circle r="3" fill="#ffffff" filter="url(#hubGlow)">
                <animateMotion
                  path={conn.d}
                  dur={`${conn.dur}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>
              <circle r="5" fill="#38bdf8" opacity="0.6">
                <animateMotion
                  path={conn.d}
                  dur={`${conn.dur}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>
            </g>
          ))}

          {/* Trading Hub Points */}
          {hubs.map((hub) => {
            const cx = (hub.x / 100) * 500;
            const cy = (hub.y / 100) * 300;
            const isActive = activeHub === hub.id;

            return (
              <g
                key={hub.id}
                className="trading-hub-marker"
                onMouseEnter={() => setActiveHub(hub.id)}
                onMouseLeave={() => setActiveHub(null)}
              >
                {/* Radar pulse rings */}
                <circle cx={cx} cy={cy} r="14" fill="none" stroke={hub.color} opacity="0.3" className="hub-radar-ring" />
                <circle cx={cx} cy={cy} r="22" fill="none" stroke={hub.color} opacity="0.15" className="hub-radar-ring delay" />

                {/* Hub beacon base */}
                <circle cx={cx} cy={cy} r="6" fill={hub.color} filter="url(#hubGlow)" />
                <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
              </g>
            );
          })}
        </svg>

        {/* Floating HTML Location Cards */}
        {hubs.map((hub) => (
          <motion.div
            key={hub.id}
            className={`floating-hub-pill ${hub.id} ${activeHub === hub.id ? "highlighted" : ""}`}
            style={{
              left: `${hub.x}%`,
              top: `${hub.y}%`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.08 }}
            onMouseEnter={() => setActiveHub(hub.id)}
            onMouseLeave={() => setActiveHub(null)}
          >
            <span className="hub-ping-dot" style={{ backgroundColor: hub.color }} />
            <div className="hub-pill-text">
              <b>{hub.name}</b>
              <small>{hub.role}</small>
            </div>
            <span className="hub-pill-latency">{hub.latency}</span>
          </motion.div>
        ))}
      </div>

      {/* Global Status Banner at bottom of graphic */}
      <div className="network-bottom-status">
        <div className="net-status-item">
          <span className="net-status-dot green" />
          <span>Institutional Fiber Backbone</span>
        </div>
        <div className="net-status-item">
          <span className="net-status-dot blue" />
          <span>Sub-Millisecond Routing</span>
        </div>
      </div>
    </div>
  );
}
