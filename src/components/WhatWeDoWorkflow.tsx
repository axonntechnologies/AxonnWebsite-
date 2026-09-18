import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useTransform
} from "motion/react";
import { Link2, Workflow, Activity, BarChart3, ArrowRight } from "lucide-react";

interface WorkflowStep {
  id: string;
  num: string;
  title: string;
  text: string;
  badge: string;
  icon: typeof Link2;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "connect",
    num: "01",
    title: "Connect",
    text: "Link brokers, market data feeds and strategy code through one integration layer.",
    badge: "Multi-Broker APIs",
    icon: Link2
  },
  {
    id: "automate",
    num: "02",
    title: "Automate",
    text: "Turn strategy logic into deployed, running processes without manual intervention.",
    badge: "Event Engine",
    icon: Workflow
  },
  {
    id: "monitor",
    num: "03",
    title: "Monitor",
    text: "Track positions, risk and system health in real time from a single dashboard.",
    badge: "Live Telemetry",
    icon: Activity
  },
  {
    id: "analyze",
    num: "04",
    title: "Analyze",
    text: "Review performance, attribution and risk with consistent, structured data.",
    badge: "P&L Attribution",
    icon: BarChart3
  }
];

export function WhatWeDoWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35
  });

  // Background parallax offset
  const bgParallaxX = useTransform(smoothProgress, [0, 1], [0, 60]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const calculated = Math.min(
      WORKFLOW_STEPS.length - 1,
      Math.max(0, Math.floor(v * WORKFLOW_STEPS.length))
    );
    setActiveStep(calculated);
  });

  const currentActive = hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <div className="workflow-section-container" ref={containerRef}>
      {/* Background Animated Data-Flow Curves (Subtle Parallax) */}
      <motion.div
        className="workflow-bg-canvas-wrapper"
        style={{ x: bgParallaxX }}
        aria-hidden="true"
      >
        <svg
          className="workflow-bg-curves-svg"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.0" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>

            <filter id="flowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flow curve 1 */}
          <path
            d="M 0,160 C 300,100 600,220 900,140 C 1050,100 1150,160 1200,160"
            fill="none"
            stroke="url(#curveGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="flow-curve-line"
          />

          {/* Flow curve 2 */}
          <path
            d="M 0,200 C 250,260 550,120 850,210 C 1000,250 1120,180 1200,180"
            fill="none"
            stroke="url(#curveGrad2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="flow-curve-line reverse"
          />

          {/* Floating animated data particles moving left to right */}
          <circle r="3" fill="#38bdf8" filter="url(#flowGlow)" opacity="0.8">
            <animateMotion
              path="M 0,160 C 300,100 600,220 900,140 C 1050,100 1150,160 1200,160"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="2.5" fill="#0284c7" opacity="0.7">
            <animateMotion
              path="M 0,200 C 250,260 550,120 850,210 C 1000,250 1120,180 1200,180"
              dur="15s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </motion.div>

      {/* Connected 4-Step Cards Workflow Grid */}
      <div className="workflow-cards-grid">
        {/* Desktop Connecting SVG Bridge Line with Progress Fill */}
        <div className="desktop-connection-bridge" aria-hidden="true">
          <div className="bridge-track-bg" />
          <motion.div
            className="bridge-track-fill"
            style={{ scaleX: smoothProgress }}
          />

          {/* Flowing animated data particle along the bridge */}
          <motion.div
            className="bridge-particle-dot"
            style={{
              left: `${Math.min(96, Math.max(4, (currentActive / (WORKFLOW_STEPS.length - 1)) * 92 + 4))}%`
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <span className="bridge-particle-pulse" />
          </motion.div>
        </div>

        {/* 4 Connected Cards */}
        {WORKFLOW_STEPS.map((step, idx) => {
          const isReached = idx <= currentActive;
          const isCurrent = idx === currentActive;
          const Icon = step.icon;

          return (
            <motion.article
              key={step.id}
              className={`workflow-card ${isReached ? "is-reached" : ""} ${
                isCurrent ? "is-current" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.25 }
              }}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Subtle light sweep shimmer */}
              <div className="card-sweep-light" />

              {/* Card Top Header */}
              <div className="workflow-card-top">
                <div className="workflow-icon-box">
                  <Icon size={20} />
                </div>
                <span className="workflow-num-pill">{step.num}</span>
              </div>

              {/* Card Body Content */}
              <div className="workflow-card-body">
                <div className="workflow-title-row">
                  <h3 className="workflow-card-title">{step.title}</h3>
                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <span className="workflow-arrow-indicator" aria-hidden="true">
                      <ArrowRight size={13} />
                    </span>
                  )}
                </div>
                <p className="workflow-card-text">{step.text}</p>
              </div>

              {/* Card Bottom Meta Tag */}
              <div className="workflow-card-footer">
                <span className="workflow-badge-tag">{step.badge}</span>
                {isCurrent && <span className="workflow-active-dot" />}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
