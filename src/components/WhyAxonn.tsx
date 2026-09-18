import { motion } from "motion/react";
import { Link2, Cpu, Eye, Monitor, Layers, ArrowUpRight, TrendingUp } from "lucide-react";

interface TimelinePoint {
  icon: typeof Link2;
  title: string;
  desc: string;
}

const timelinePoints: TimelinePoint[] = [
  {
    icon: Link2,
    title: "One connected environment",
    desc: "Brokers, data, strategies, risk and analytics live in the same system instead of scattered tools."
  },
  {
    icon: Cpu,
    title: "Built for automation",
    desc: "Strategy logic runs as managed processes, so routine execution no longer needs a person in the loop."
  },
  {
    icon: Eye,
    title: "More visibility",
    desc: "Positions, exposure and system health are visible in real time, not reconstructed after the fact."
  },
  {
    icon: Monitor,
    title: "Technology with purpose",
    desc: "Every part of the platform maps to a real step in running a trading operation."
  },
  {
    icon: Layers,
    title: "Designed to scale",
    desc: "Add strategies, accounts and data sources without rebuilding the way they connect."
  }
];

export function WhyAxonn() {
  return (
    <div className="why-axonn-split">
      {/* =========================================================
          LEFT COLUMN: FEATURE TIMELINE
      ========================================================== */}
      <div className="why-axonn-timeline-col">
        <div className="timeline-track-line" />

        <ol className="why-timeline-list">
          {timelinePoints.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <motion.li
                key={pt.title}
                className="why-timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="why-timeline-marker">
                  <div className="why-marker-circle">
                    <Icon size={14} />
                  </div>
                </div>

                <div className="why-timeline-content">
                  <h3>{pt.title}</h3>
                  <p>{pt.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* =========================================================
          RIGHT COLUMN: TRADING PLATFORM TERMINAL VISUAL
      ========================================================== */}
      <motion.div
        className="why-axonn-visual-col"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft cyan decorative ambient backdrop */}
        <div className="visual-ambient-backdrop" />

        {/* 3D Tilted Main Terminal Card */}
        <div className="trading-terminal-card">
          {/* Terminal Sidebar Icons */}
          <div className="terminal-mini-sidebar">
            <span className="term-icon active">▲</span>
            <span className="term-icon">⊞</span>
            <span className="term-icon">📈</span>
            <span className="term-icon">⚙</span>
            <span className="term-icon">⚡</span>
            <span className="term-icon">🔔</span>
          </div>

          {/* Terminal Main Canvas */}
          <div className="terminal-main-canvas">
            {/* Top Toolbar */}
            <div className="terminal-topbar">
              <div className="term-tabs">
                <span className="active">BTC/USD • 1H</span>
                <span>ETH/USD</span>
                <span>SOL/USD</span>
              </div>
              <div className="term-live-tag">
                <span className="term-pulse-dot" />
                Live Feed
              </div>
            </div>

            {/* Candlestick Chart Area */}
            <div className="terminal-chart-area">
              <svg viewBox="0 0 320 120" className="terminal-candlestick-svg">
                <defs>
                  <linearGradient id="termGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Background Grid */}
                <line x1="0" y1="30" x2="320" y2="30" stroke="rgba(255,255,255,0.06)" />
                <line x1="0" y1="65" x2="320" y2="65" stroke="rgba(255,255,255,0.06)" />
                <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.06)" />

                {/* Realistic Candlestick Bars */}
                {[
                  { x: 20, yTop: 60, yBot: 85, high: 50, low: 95, up: false },
                  { x: 38, yTop: 55, yBot: 78, high: 45, low: 88, up: true },
                  { x: 56, yTop: 45, yBot: 68, high: 38, low: 75, up: true },
                  { x: 74, yTop: 50, yBot: 72, high: 42, low: 80, up: false },
                  { x: 92, yTop: 35, yBot: 55, high: 28, low: 62, up: true },
                  { x: 110, yTop: 28, yBot: 48, high: 22, low: 56, up: true },
                  { x: 128, yTop: 40, yBot: 60, high: 32, low: 68, up: false },
                  { x: 146, yTop: 30, yBot: 52, high: 24, low: 58, up: true },
                  { x: 164, yTop: 22, yBot: 42, high: 16, low: 48, up: true },
                  { x: 182, yTop: 35, yBot: 50, high: 28, low: 58, up: false },
                  { x: 200, yTop: 20, yBot: 38, high: 14, low: 44, up: true },
                  { x: 218, yTop: 15, yBot: 32, high: 10, low: 38, up: true },
                  { x: 236, yTop: 25, yBot: 42, high: 18, low: 48, up: false },
                  { x: 254, yTop: 18, yBot: 34, high: 12, low: 40, up: true },
                  { x: 272, yTop: 10, yBot: 26, high: 6, low: 32, up: true },
                  { x: 290, yTop: 8, yBot: 22, high: 4, low: 28, up: true }
                ].map((candle, idx) => (
                  <g key={idx} opacity="0.9">
                    {/* Wick */}
                    <line
                      x1={candle.x + 3.5}
                      y1={candle.high}
                      x2={candle.x + 3.5}
                      y2={candle.low}
                      stroke={candle.up ? "#34d399" : "#f87171"}
                      strokeWidth="1"
                    />
                    {/* Body */}
                    <rect
                      x={candle.x}
                      y={candle.yTop}
                      width="7"
                      height={Math.max(4, candle.yBot - candle.yTop)}
                      rx="1"
                      fill={candle.up ? "#34d399" : "#f87171"}
                    />
                  </g>
                ))}

                {/* Moving Average Line */}
                <motion.path
                  d="M 15 80 Q 80 60 140 45 T 230 25 T 300 12"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* Bottom Mini Metrics Strip */}
            <div className="terminal-bottom-strip">
              <div className="term-metric">
                <small>24h High</small>
                <b>$68,920.00</b>
              </div>
              <div className="term-metric">
                <small>24h Vol</small>
                <b>$1.42B</b>
              </div>
              <div className="term-metric">
                <small>Execution</small>
                <b className="emerald">0.42ms</b>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glass P&L Card Overlay */}
        <motion.div
          className="floating-pnl-card"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="pnl-header">
            <span className="pnl-title">Total P&L</span>
            <span className="pnl-growth">
              <TrendingUp size={12} /> +4.8%
            </span>
          </div>

          <strong className="pnl-value">+$12,458.32</strong>

          <svg viewBox="0 0 140 40" className="pnl-sparkline">
            <path
              d="M 0 32 Q 25 28 50 18 T 95 16 T 140 4 L 140 40 L 0 40 Z"
              fill="rgba(52, 211, 153, 0.15)"
            />
            <path
              d="M 0 32 Q 25 28 50 18 T 95 16 T 140 4"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="140" cy="4" r="3.5" fill="#34d399" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
