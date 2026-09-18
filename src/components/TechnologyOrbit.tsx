import React, { useState } from "react";
import { motion } from "motion/react";
import { Database, Cpu, Globe, ShieldCheck, Zap } from "lucide-react";
import logoImg from "../assets/axonn-logo.png";

interface OrbitNodeData {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  tip: string;
}

const CX = 400;
const CY = 240;

const NODES: OrbitNodeData[] = [
  {
    id: "data",
    label: "DATA",
    subtitle: "Market & Historical Feeds",
    icon: Database,
    x: 180,
    y: 100,
    color: "#0284c7",
    glowColor: "rgba(2, 132, 199, 0.35)",
    badgeBg: "rgba(240, 249, 255, 0.95)",
    badgeBorder: "#bae6fd",
    badgeText: "#0369a1",
    tip: "Live tick data, level-2 order books & historic feeds"
  },
  {
    id: "strategy",
    label: "STRATEGY",
    subtitle: "Logic & Alpha Signals",
    icon: Cpu,
    x: 620,
    y: 100,
    color: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.35)",
    badgeBg: "rgba(239, 246, 255, 0.95)",
    badgeBorder: "#bfdbfe",
    badgeText: "#1d4ed8",
    tip: "Automated algorithmic logic & live execution signals"
  },
  {
    id: "brokers",
    label: "BROKERS",
    subtitle: "Multi-Broker Routing",
    icon: Globe,
    x: 130,
    y: 290,
    color: "#0891b2",
    glowColor: "rgba(8, 145, 178, 0.35)",
    badgeBg: "rgba(236, 254, 255, 0.95)",
    badgeBorder: "#a5f3fc",
    badgeText: "#0e7490",
    tip: "Unified FIX & REST connectivity across broker accounts"
  },
  {
    id: "risk",
    label: "RISK",
    subtitle: "Pre & Post-Trade Checks",
    icon: ShieldCheck,
    x: 670,
    y: 290,
    color: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    badgeBg: "rgba(254, 243, 199, 0.95)",
    badgeBorder: "#fde68a",
    badgeText: "#b45309",
    tip: "Real-time position limits, max drawdowns & kill-switches"
  },
  {
    id: "execution",
    label: "EXECUTION",
    subtitle: "Smart Order Routing",
    icon: Zap,
    x: 400,
    y: 410,
    color: "#059669",
    glowColor: "rgba(5, 150, 105, 0.35)",
    badgeBg: "rgba(236, 253, 245, 0.95)",
    badgeBorder: "#a7f3d0",
    badgeText: "#047857",
    tip: "Sub-millisecond smart order routing and fill tracking"
  }
];

export function TechnologyOrbit() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="orbit-system-wrapper">
      <div className="orbit-stage-v2">
        {/* SVG Visualization Layer */}
        <svg
          className="orbit-svg-canvas"
          viewBox="0 0 800 480"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Ambient gradients */}
            <radialGradient id="coreGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>

            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.22  0 0 0 0 0.74  0 0 0 0 0.97  0 0 0 0.8 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Reusable arrow marker */}
            <marker
              id="flowArrow"
              viewBox="0 0 6 6"
              refX="3"
              refY="3"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <polygon points="0,1 5,3 0,5 1.5,3" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Core Ambient Radial Glow */}
          <circle cx={CX} cy={CY} r="180" fill="url(#coreGlowGrad)" />

          {/* Orbital Ellipses / Rings with pulsing glow */}
          <ellipse
            cx={CX}
            cy={CY}
            rx="170"
            ry="115"
            className="orbit-ring-svg ring-inner"
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx="300"
            ry="185"
            className="orbit-ring-svg ring-outer"
          />

          {/* Orbital moving dots along inner ring */}
          <circle r="3" fill="#38bdf8" opacity="0.85">
            <animateMotion
              path={`M ${CX - 170} ${CY} a 170 115 0 1 0 340 0 a 170 115 0 1 0 -340 0`}
              dur="22s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2.5" fill="#0284c7" opacity="0.75">
            <animateMotion
              path={`M ${CX + 170} ${CY} a 170 115 0 1 1 -340 0 a 170 115 0 1 1 340 0`}
              dur="18s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Orbital moving dots along outer ring */}
          <circle r="3.5" fill="#38bdf8" opacity="0.9" filter="url(#softGlow)">
            <animateMotion
              path={`M ${CX - 300} ${CY} a 300 185 0 1 0 600 0 a 300 185 0 1 0 -600 0`}
              dur="32s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#0284c7" opacity="0.8">
            <animateMotion
              path={`M ${CX + 300} ${CY} a 300 185 0 1 1 -600 0 a 300 185 0 1 1 600 0`}
              dur="26s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Connection Lines from Center to Each Node */}
          {NODES.map((node) => {
            const isHovered = hoveredNode === node.id;
            const pathId = `beam-path-${node.id}`;

            return (
              <g key={node.id} className="orbit-spoke-group">
                {/* Spoke Line Path */}
                <path
                  id={pathId}
                  d={`M ${CX} ${CY} L ${node.x} ${node.y}`}
                  stroke={isHovered ? node.color : "rgba(56, 189, 248, 0.35)"}
                  strokeWidth={isHovered ? "2.5" : "1.5"}
                  strokeDasharray={isHovered ? "none" : "4 4"}
                  filter={isHovered ? "url(#activeGlow)" : undefined}
                  className="spoke-line"
                />

                {/* Data Packet 1 (Flowing Outward: Center -> Node) */}
                <circle
                  r={isHovered ? "4" : "3"}
                  fill={isHovered ? node.color : "#38bdf8"}
                  filter="url(#softGlow)"
                >
                  <animateMotion
                    dur={isHovered ? "1.8s" : "3.2s"}
                    repeatCount="indefinite"
                    path={`M ${CX} ${CY} L ${node.x} ${node.y}`}
                  />
                </circle>

                {/* Data Packet 2 (Flowing Inward: Node -> Center) */}
                <circle
                  r="2.5"
                  fill={isHovered ? node.color : "#0284c7"}
                  opacity="0.8"
                >
                  <animateMotion
                    dur={isHovered ? "2.2s" : "3.8s"}
                    repeatCount="indefinite"
                    path={`M ${node.x} ${node.y} L ${CX} ${CY}`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Central Axonn Core (Centered at CX, CY) */}
        <motion.div
          className="orbit-center-core"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ scale: 0.75, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle breathing glow */}
          <motion.div
            className="core-pulse-ring"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="core-inner-disc">
            <img
              src={logoImg}
              alt="Axonn Core"
              className="core-symbol-img"
            />
            <span className="core-status-pill">
              <span className="core-status-dot" />
              CORE
            </span>
          </div>
        </motion.div>

        {/* Five Interactive Node Cards */}
        {NODES.map((node, i) => {
          const isHovered = hoveredNode === node.id;
          const Icon = node.icon;

          // Compute position percentage relative to 800x480 container
          const leftPercent = (node.x / 800) * 100;
          const topPercent = (node.y / 480) * 100;

          return (
            <motion.div
              key={node.id}
              className={`orbit-node-card node-${node.id} ${
                isHovered ? "is-hovered" : ""
              }`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                x: "-50%",
                y: "-50%"
              }}
              initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
              animate={{
                opacity: 1,
                scale: 1,
                x: "-50%",
                y: "-50%"
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.15 + i * 0.1 },
                scale: { duration: 0.5, delay: 0.15 + i * 0.1 }
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              data-tip={node.tip}
            >
              <div
                className="node-icon-wrapper"
                style={{
                  color: node.color,
                  backgroundColor: node.badgeBg,
                  borderColor: node.badgeBorder
                }}
              >
                <Icon size={18} />
              </div>

              <div className="node-content-body">
                <span className="node-title-label">{node.label}</span>
                <span className="node-subtitle-label">{node.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Bottom Caption */}
      <div className="orbit-bottom-caption">
        <span className="caption-dot" />
        <span>One connected core. Every operation in sync.</span>
      </div>
    </div>
  );
}
