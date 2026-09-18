import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence
} from "motion/react";
import {
  Link2,
  Sliders,
  Zap,
  Activity,
  BarChart3,
  CheckCircle2,
  Server,
  Shield,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Globe
} from "lucide-react";

interface StepData {
  num: string;
  title: string;
  desc: string;
  tag: string;
  icon: typeof Link2;
  stageTitle: string;
}

const STEPS: StepData[] = [
  {
    num: "01",
    title: "Connect",
    desc: "Link brokers, market data feeds and strategy code through one integration layer.",
    tag: "CONNECTIVITY LAYER",
    icon: Link2,
    stageTitle: "Multi-Broker Socket & FIX Bridge"
  },
  {
    num: "02",
    title: "Configure",
    desc: "Set allocation rules, risk limits and execution parameters for each strategy.",
    tag: "CONFIGURATION MATRIX",
    icon: Sliders,
    stageTitle: "Risk Controls & Dynamic Allocation"
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Push strategies live as managed processes — no manual scripts to babysit.",
    tag: "DEPLOYMENT PIPELINE",
    icon: Zap,
    stageTitle: "Managed Low-Latency Production Cluster"
  },
  {
    num: "04",
    title: "Monitor",
    desc: "Watch positions, exposure and system health in real time from a single view.",
    tag: "REAL-TIME TELEMETRY",
    icon: Activity,
    stageTitle: "Live Order Book, Exposure & Health"
  },
  {
    num: "05",
    title: "Analyze",
    desc: "Review performance, attribution and risk with consistent, structured data.",
    tag: "INTELLIGENT ANALYTICS",
    icon: BarChart3,
    stageTitle: "P&L Attribution & Alpha Breakdown"
  }
];

export function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [manualOverride, setManualOverride] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 50%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.3
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (manualOverride === null) {
      const calculated = Math.min(
        STEPS.length - 1,
        Math.max(0, Math.floor(v * STEPS.length))
      );
      setActiveStep(calculated);
    }
  });

  // Release manual override after a short timeout
  useEffect(() => {
    if (manualOverride !== null) {
      const timer = setTimeout(() => setManualOverride(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [manualOverride]);

  const currentIdx = manualOverride !== null ? manualOverride : activeStep;
  const currentStep = STEPS[currentIdx] || STEPS[0];

  return (
    <div className="how-flow-outer-wrapper" ref={containerRef}>
      <div className="how-interactive-container">
        {/* Left Column: Sticky Header & Transforming Visual */}
        <div className="how-sticky-col">
        <motion.div
          className="how-header-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="how-eyebrow">HOW IT WORKS</span>
          <h2 className="how-main-title">
            From integration to <span className="text-cyan-gradient">insight</span>.
          </h2>
          <p className="how-main-desc">
            A clear path from integration to insight. Each stage feeds the
            next, so the operation runs as one continuous loop rather than a
            set of disconnected steps.
          </p>

          <div className="how-active-stage-indicator">
            <span className="stage-pulse-dot" />
            <span className="stage-label">
              STAGE {currentStep.num} / 05 — <b>{currentStep.title.toUpperCase()}</b>
            </span>
          </div>
        </motion.div>

        {/* Dynamic Transforming Dashboard Visual */}
        <motion.div
          className="how-terminal-window"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {/* Terminal Topbar */}
          <div className="how-term-header">
            <div className="how-term-dots">
              <span className="term-dot red" />
              <span className="term-dot yellow" />
              <span className="term-dot green" />
            </div>
            <div className="how-term-title-tag">
              <span>{currentStep.tag}</span>
            </div>
            <div className="how-term-status">
              <span className="term-status-live">LIVE</span>
            </div>
          </div>

          {/* Dynamic Content Panel per Step */}
          <div className="how-term-body">
            <AnimatePresence mode="wait">
              {currentIdx === 0 && (
                <motion.div
                  key="step-0-connect"
                  className="how-visual-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="panel-subhead">
                    <Server size={14} className="icon-cyan" />
                    <span>Active Gateway Sockets</span>
                    <span className="badge-pill">3 Connected</span>
                  </div>

                  <div className="connect-nodes-list">
                    <div className="connect-node-item active">
                      <div className="node-status-dot online" />
                      <div className="node-info">
                        <b>Interactive Brokers</b>
                        <small>FIX 4.4 Protocol · Direct Market Access</small>
                      </div>
                      <span className="node-latency">0.32 ms</span>
                    </div>

                    <div className="connect-node-item active">
                      <div className="node-status-dot online" />
                      <div className="node-info">
                        <b>Binance Futures</b>
                        <small>WebSocket Stream · Level-2 Book Feed</small>
                      </div>
                      <span className="node-latency">0.45 ms</span>
                    </div>

                    <div className="connect-node-item active">
                      <div className="node-status-dot online" />
                      <div className="node-info">
                        <b>LMAX Exchange</b>
                        <small>Institutional Liquidity Feed · Sub-ms</small>
                      </div>
                      <span className="node-latency">0.28 ms</span>
                    </div>
                  </div>

                  <div className="connect-throughput-bar">
                    <div className="throughput-stat">
                      <small>THROUGHPUT</small>
                      <b>14,850 msg/s</b>
                    </div>
                    <div className="throughput-stat">
                      <small>PACKET LOSS</small>
                      <b className="emerald">0.00%</b>
                    </div>
                    <div className="throughput-stat">
                      <small>SECURITY</small>
                      <b>TLS 1.3 / mTLS</b>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentIdx === 1 && (
                <motion.div
                  key="step-1-configure"
                  className="how-visual-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="panel-subhead">
                    <Shield size={14} className="icon-cyan" />
                    <span>Risk & Allocation Matrix</span>
                    <span className="badge-pill">Rules Enforced</span>
                  </div>

                  <div className="config-sliders-group">
                    <div className="config-row">
                      <div className="config-meta">
                        <span>Max Capital Allocation</span>
                        <b>$2,500,000</b>
                      </div>
                      <div className="config-track-bar">
                        <div className="config-fill-bar" style={{ width: "72%" }} />
                      </div>
                    </div>

                    <div className="config-row">
                      <div className="config-meta">
                        <span>Hard Stop Max Drawdown</span>
                        <b className="amber">1.50% ($37,500)</b>
                      </div>
                      <div className="config-track-bar">
                        <div className="config-fill-bar bar-amber" style={{ width: "35%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="config-badges-grid">
                    <div className="config-mini-badge">
                      <small>SIZING MODEL</small>
                      <b>Dynamic Kelly</b>
                    </div>
                    <div className="config-mini-badge">
                      <small>SLIPPAGE CAP</small>
                      <b>&lt; 1.2 bps</b>
                    </div>
                    <div className="config-mini-badge">
                      <small>CIRCUIT BREAKER</small>
                      <b className="emerald">Auto-Halt</b>
                    </div>
                    <div className="config-mini-badge">
                      <small>ORDER ROUTING</small>
                      <b>Smart SOR</b>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentIdx === 2 && (
                <motion.div
                  key="step-2-deploy"
                  className="how-visual-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="panel-subhead">
                    <Zap size={14} className="icon-cyan" />
                    <span>Managed Strategy Cluster</span>
                    <span className="badge-pill emerald-pill">Production LIVE</span>
                  </div>

                  <div className="deploy-processes-list">
                    <div className="deploy-proc-card live">
                      <div className="proc-header">
                        <b>Trend Alpha Core v3.2</b>
                        <span className="proc-tag-live">● LIVE</span>
                      </div>
                      <div className="proc-specs">
                        <span>Memory: 142 MB</span>
                        <span>CPU: 4.2%</span>
                        <span>Worker Threads: 16</span>
                      </div>
                    </div>

                    <div className="deploy-proc-card live">
                      <div className="proc-header">
                        <b>Multi-Exchange Arbitrage L2</b>
                        <span className="proc-tag-live">● LIVE</span>
                      </div>
                      <div className="proc-specs">
                        <span>Memory: 98 MB</span>
                        <span>CPU: 2.8%</span>
                        <span>Worker Threads: 8</span>
                      </div>
                    </div>

                    <div className="deploy-proc-card standby">
                      <div className="proc-header">
                        <b>Mean Reversion FX Delta</b>
                        <span className="proc-tag-standby">STANDBY</span>
                      </div>
                      <div className="proc-specs">
                        <span>Hot-Reload Ready</span>
                        <span>Pre-allocated Memory</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentIdx === 3 && (
                <motion.div
                  key="step-3-monitor"
                  className="how-visual-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="panel-subhead">
                    <Activity size={14} className="icon-cyan" />
                    <span>Real-Time Telemetry & Positions</span>
                    <span className="badge-pill">0 Position Drift</span>
                  </div>

                  {/* Realtime sparkline & metrics */}
                  <div className="monitor-chart-box">
                    <div className="monitor-chart-header">
                      <div>
                        <small>PORTFOLIO NET EXPOSURE</small>
                        <b>$4,824,190.00</b>
                      </div>
                      <span className="monitor-gain">+$28,450 (Today)</span>
                    </div>

                    <div className="monitor-mini-svg-wrap">
                      <svg viewBox="0 0 320 60" className="monitor-sparkline-svg">
                        <defs>
                          <linearGradient id="monGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,45 Q40,38 80,42 T160,25 T240,18 T320,10 L320,60 L0,60 Z"
                          fill="url(#monGrad)"
                        />
                        <path
                          d="M0,45 Q40,38 80,42 T160,25 T240,18 T320,10"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <circle cx="320" cy="10" r="4" fill="#34d399" />
                      </svg>
                    </div>
                  </div>

                  <div className="monitor-stats-strip">
                    <div>
                      <small>SYSTEM UPTIME</small>
                      <b className="emerald">99.998%</b>
                    </div>
                    <div>
                      <small>ACTIVE ORDERS</small>
                      <b>42 Working</b>
                    </div>
                    <div>
                      <small>MARGIN RATIO</small>
                      <b>28.4% Safe</b>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentIdx === 4 && (
                <motion.div
                  key="step-4-analyze"
                  className="how-visual-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="panel-subhead">
                    <BarChart3 size={14} className="icon-cyan" />
                    <span>Attribution & Risk Analytics</span>
                    <span className="badge-pill">Sharpe 2.84</span>
                  </div>

                  <div className="analytics-metrics-grid">
                    <div className="analytics-card">
                      <small>SHARPE RATIO</small>
                      <b className="cyan">2.84</b>
                      <span>Top decile</span>
                    </div>
                    <div className="analytics-card">
                      <small>SORTINO RATIO</small>
                      <b className="cyan">3.12</b>
                      <span>Downside risk capped</span>
                    </div>
                    <div className="analytics-card">
                      <small>WIN RATE</small>
                      <b className="emerald">68.4%</b>
                      <span>1,420 trades</span>
                    </div>
                    <div className="analytics-card">
                      <small>PROFIT FACTOR</small>
                      <b className="emerald">2.31</b>
                      <span>Gross P&L / Loss</span>
                    </div>
                  </div>

                  <div className="attribution-breakdown-row">
                    <div className="attr-item">
                      <span>Alpha Generation</span>
                      <b className="emerald">+$98,400</b>
                    </div>
                    <div className="attr-item">
                      <span>Execution Efficiency (Savings)</span>
                      <b className="emerald">+$16,250</b>
                    </div>
                    <div className="attr-item">
                      <span>Hedging Drag</span>
                      <b className="muted">-$14,200</b>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Progressive Scroll Timeline */}
      <div className="how-timeline-col">
        <div className="how-timeline-track-container">
          {/* Background Track Line */}
          <div className="how-track-line-bg" />

          {/* Glowing Animated Progress Fill */}
          <motion.div
            className="how-track-line-fill"
            style={{ scaleY: smoothProgress }}
          />

          {/* Moving Glowing Particle along the Progress Line */}
          <motion.div
            className="how-track-particle"
            style={{
              top: `${Math.min(95, Math.max(5, (currentIdx / (STEPS.length - 1)) * 90 + 5))}%`
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <span className="particle-pulse-glow" />
          </motion.div>
        </div>

        {/* 5 Step Cards */}
        <div className="how-steps-list">
          {STEPS.map((step, idx) => {
            const isReached = idx <= currentIdx;
            const isCurrent = idx === currentIdx;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                className={`how-step-card ${isReached ? "is-reached" : ""} ${
                  isCurrent ? "is-current" : ""
                }`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setManualOverride(idx)}
                onMouseEnter={() => setManualOverride(idx)}
              >
                {/* Step Marker Badge */}
                <div className="how-step-marker">
                  <div className={`step-badge-disc ${isCurrent ? "active-disc" : ""}`}>
                    {isReached && !isCurrent ? (
                      <CheckCircle2 size={16} className="step-check-icon" />
                    ) : (
                      <span className="step-num-text">{step.num}</span>
                    )}
                  </div>
                </div>

                {/* Step Card Content */}
                <div className="how-step-content">
                  <div className="step-content-header">
                    <div className="step-icon-box">
                      <Icon size={16} />
                    </div>
                    <h3 className="step-title-text">{step.title}</h3>
                    {isCurrent && (
                      <span className="step-live-indicator">ACTIVE</span>
                    )}
                  </div>
                  <p className="step-desc-text">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Subtle Bottom Section Transition */}
      <motion.div
        className="how-section-bottom-banner"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="how-banner-line line-left" aria-hidden="true" />
        <div className="how-banner-pill">
          <span className="transition-dot" />
          <span>One connected core. Every operation in sync.</span>
        </div>
        <span className="how-banner-line line-right" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
