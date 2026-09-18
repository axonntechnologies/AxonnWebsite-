import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Zap,
  Activity,
  Brain,
  Play,
  Rocket,
  PieChart,
  BellRing,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Sparkles,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { CountUp } from "./CountUp";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
};

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function BentoCard({ children, className = "", delay = 0 }: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card-v2 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      <div className="bento-glow-overlay" />
      {children}
    </motion.article>
  );
}

export function BentoGrid() {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M");
  const [hoveredAlert, setHoveredAlert] = useState<number | null>(null);

  return (
    <div className="bento-grid-v2">
      {/* =========================================================
          CARD 1: RISK VISIBILITY
      ========================================================== */}
      <BentoCard className="bento-risk" delay={0.05}>
        <div className="card-header-v2">
          <div className="card-icon-badge emerald">
            <ShieldCheck size={20} />
          </div>
          <div className="card-title-wrap">
            <h3>Risk Visibility</h3>
            <p>Monitor exposure and stay in control with real-time risk analytics.</p>
          </div>
          <span className="status-pill emerald">
            <span className="pulse-dot emerald" />
            Low Risk
          </span>
        </div>

        <div className="risk-metric-body">
          <div className="risk-score-col">
            <span className="metric-label-v2">Risk Score</span>
            <div className="risk-score-value">
              <strong><CountUp end={24} duration={1.2} /></strong>
              <div className="risk-change-pill">
                <ArrowDownRight size={13} />
                <span>12%</span>
              </div>
            </div>
            <small className="metric-subtext">vs last month</small>
          </div>

          <div className="risk-chart-area">
            <svg viewBox="0 0 160 60" className="mini-risk-svg">
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,35 Q 25,45 50,28 T 100,32 T 135,18 L 160,12 L 160,60 L 0,60 Z"
                fill="url(#riskGrad)"
              />
              <motion.path
                d="M 0,35 Q 25,45 50,28 T 100,32 T 135,18 L 160,12"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="160"
                cy="12"
                r="3.5"
                fill="#10b981"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
            </svg>
          </div>
        </div>

        <div className="risk-submetrics-row">
          <div className="submetric-col">
            <span className="submetric-name">VaR</span>
            <strong className="submetric-val">
              <CountUp end={2.4} decimals={1} suffix="%" duration={1.2} />
            </strong>
            <span className="submetric-trend down">↓ 0.8%</span>
          </div>

          <div className="submetric-col">
            <span className="submetric-name">Exposure</span>
            <strong className="submetric-val">
              $<CountUp end={42310} duration={1.3} />
            </strong>
            <span className="submetric-trend up">↑ 6.2%</span>
          </div>

          <div className="submetric-col">
            <span className="submetric-name">Drawdown</span>
            <strong className="submetric-val">
              <CountUp end={1.8} decimals={1} suffix="%" duration={1.2} />
            </strong>
            <span className="submetric-trend down">↓ 1.1%</span>
          </div>
        </div>
      </BentoCard>

      {/* =========================================================
          CARD 2: MARKET INTELLIGENCE
      ========================================================== */}
      <BentoCard className="bento-market" delay={0.12}>
        <div className="card-header-v2">
          <div className="card-icon-badge sky">
            <BarChart3 size={20} />
          </div>
          <div className="card-title-wrap">
            <h3>Market Intelligence</h3>
            <p>Real-time insights, trends and market opportunities at your fingertips.</p>
          </div>
          <span className="status-pill emerald">
            <span className="pulse-dot emerald" />
            Live
          </span>
        </div>

        <div className="market-chart-container">
          <div className="chart-y-axis">
            <span>72k</span>
            <span>68k</span>
            <span>64k</span>
            <span>60k</span>
          </div>

          <div className="market-svg-wrap">
            {/* Tooltip marker */}
            <motion.div
              className="market-tooltip"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <b>BTC $67,432</b>
              <em>+4.1%</em>
            </motion.div>

            <svg viewBox="0 0 320 130" preserveAspectRatio="none" className="market-main-svg">
              <defs>
                <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(226, 232, 240, 0.7)" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(226, 232, 240, 0.7)" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(226, 232, 240, 0.7)" strokeDasharray="3 3" />

              {/* Indicator vertical line */}
              <line x1="215" y1="15" x2="215" y2="120" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />

              {/* Area Fill */}
              <path
                d="M 0,95 Q 35,90 70,68 T 140,75 T 215,35 T 270,42 L 320,18 L 320,130 L 0,130 Z"
                fill="url(#marketGrad)"
              />

              {/* Animated Path */}
              <motion.path
                d="M 0,95 Q 35,90 70,68 T 140,75 T 215,35 T 270,42 L 320,18"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              {/* Active Dot */}
              <motion.circle
                cx="215"
                cy="35"
                r="4.5"
                fill="#0284c7"
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.3 }}
              />
            </svg>

            <div className="chart-x-axis">
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>00:00</span>
              <span>04:00</span>
            </div>
          </div>
        </div>

        <div className="market-ticker-row">
          <div className="ticker-pill">
            <span className="ticker-icon-dot btc">🪙</span>
            <b>BTC</b>
            <span className="ticker-change up">+2.4%</span>
          </div>

          <div className="ticker-pill">
            <span className="ticker-icon-dot eth">⧫</span>
            <b>ETH</b>
            <span className="ticker-change up">+1.8%</span>
          </div>

          <div className="ticker-pill">
            <span className="ticker-icon-dot sol">☀️</span>
            <b>SOL</b>
            <span className="ticker-change up">+3.2%</span>
          </div>

          <div className="ticker-pill">
            <span className="ticker-icon-dot sp500">📈</span>
            <b>S&P500</b>
            <span className="ticker-change up">+0.6%</span>
          </div>
        </div>
      </BentoCard>

      {/* =========================================================
          CARD 3: STRATEGY AUTOMATION (DARK CARD)
      ========================================================== */}
      <BentoCard className="bento-automation dark-card" delay={0.18}>
        <div className="card-header-v2">
          <div className="card-icon-badge purple-glow">
            <Zap size={20} />
          </div>
          <div className="card-title-wrap">
            <h3 className="text-white">Strategy Automation</h3>
            <p className="text-white-muted">Turn insights into action with intelligent automation.</p>
          </div>
          <span className="status-pill active-dark">
            <span className="pulse-dot emerald" />
            Active
          </span>
        </div>

        {/* Workflow pipeline: Signal -> Analysis -> Strategy -> Execution */}
        <div className="automation-workflow-wrap">
          <div className="workflow-track">
            {/* Animated data pulses moving along track */}
            <span className="workflow-pulse-particle" />
            <span className="workflow-pulse-particle delay-1" />
          </div>

          <div className="workflow-nodes">
            <div className="workflow-node-item">
              <div className="workflow-node-circle cyan">
                <Activity size={16} />
              </div>
              <span className="node-title">Signal</span>
            </div>

            <span className="workflow-arrow-sep">→</span>

            <div className="workflow-node-item">
              <div className="workflow-node-circle indigo">
                <Brain size={16} />
              </div>
              <span className="node-title">Analysis</span>
            </div>

            <span className="workflow-arrow-sep">→</span>

            <div className="workflow-node-item">
              <div className="workflow-node-circle blue">
                <Play size={15} />
              </div>
              <span className="node-title">Strategy</span>
            </div>

            <span className="workflow-arrow-sep">→</span>

            <div className="workflow-node-item">
              <div className="workflow-node-circle magenta">
                <Rocket size={16} />
              </div>
              <span className="node-title">Execution</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="automation-stats-row">
          <div className="auto-stat-col">
            <span className="auto-stat-label">Auto Strategies</span>
            <strong className="auto-stat-val">
              <CountUp end={12} duration={1.2} />
            </strong>
            <span className="auto-stat-sub emerald">↑ 2 new</span>
          </div>

          <div className="auto-stat-col">
            <span className="auto-stat-label">Success Rate</span>
            <strong className="auto-stat-val">
              <CountUp end={87} suffix="%" duration={1.3} />
            </strong>
            <span className="auto-stat-sub emerald">↑ 6%</span>
          </div>

          <div className="auto-stat-col">
            <span className="auto-stat-label">Total Trades</span>
            <strong className="auto-stat-val">
              <CountUp end={248} duration={1.4} />
            </strong>
            <span className="auto-stat-sub emerald">↑ 18%</span>
          </div>
        </div>
      </BentoCard>

      {/* =========================================================
          CARD 4: PORTFOLIO MONITORING (WIDE 2-COL CARD)
      ========================================================== */}
      <BentoCard className="bento-portfolio-wide" delay={0.24}>
        <div className="card-header-v2">
          <div className="card-icon-badge cyan">
            <PieChart size={20} />
          </div>
          <div className="card-title-wrap">
            <h3>Portfolio Monitoring</h3>
            <p>Track your portfolio performance, allocation and real-time value.</p>
          </div>

          {/* Time range switcher */}
          <div className="time-range-toggle">
            {(["1D", "1W", "1M", "3M", "1Y"] as const).map((range) => (
              <button
                key={range}
                type="button"
                className={`range-btn ${timeRange === range ? "active" : ""}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-content-split">
          {/* Donut Allocation & Legend */}
          <div className="portfolio-donut-section">
            <div className="donut-canvas-wrap">
              <svg viewBox="0 0 140 140" className="donut-svg">
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="14"
                />
                {/* Stocks: 45% -> 147deg (dasharray: 147 327) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="14"
                  strokeDasharray="147 327"
                  strokeDashoffset="0"
                  className="donut-segment"
                />
                {/* Crypto: 28% -> 91.5deg (dashoffset: -147) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="14"
                  strokeDasharray="91.5 327"
                  strokeDashoffset="-147"
                  className="donut-segment"
                />
                {/* Forex: 15% -> 49deg (dashoffset: -238.5) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="49 327"
                  strokeDashoffset="-238.5"
                  className="donut-segment"
                />
                {/* Commodities: 8% -> 26deg (dashoffset: -287.5) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="14"
                  strokeDasharray="26 327"
                  strokeDashoffset="-287.5"
                  className="donut-segment"
                />
                {/* Cash: 4% -> 13.5deg (dashoffset: -313.5) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="14"
                  strokeDasharray="13.5 327"
                  strokeDashoffset="-313.5"
                  className="donut-segment"
                />
              </svg>

              <div className="donut-center-info">
                <small>Total Value</small>
                <strong>
                  $<CountUp end={128450} duration={1.5} />
                </strong>
                <span className="donut-growth">↑ 12.4%</span>
              </div>
            </div>

            <div className="donut-legend-list">
              <span className="legend-title">Asset Allocation</span>
              <div className="legend-item">
                <span className="legend-dot stocks" />
                <span className="legend-label">Stocks</span>
                <b className="legend-pct">45%</b>
              </div>
              <div className="legend-item">
                <span className="legend-dot crypto" />
                <span className="legend-label">Crypto</span>
                <b className="legend-pct">28%</b>
              </div>
              <div className="legend-item">
                <span className="legend-dot forex" />
                <span className="legend-label">Forex</span>
                <b className="legend-pct">15%</b>
              </div>
              <div className="legend-item">
                <span className="legend-dot commodities" />
                <span className="legend-label">Commodities</span>
                <b className="legend-pct">8%</b>
              </div>
              <div className="legend-item">
                <span className="legend-dot cash" />
                <span className="legend-label">Cash</span>
                <b className="legend-pct">4%</b>
              </div>
            </div>
          </div>

          {/* Performance Line / Area Chart */}
          <div className="portfolio-trend-section">
            <div className="trend-badge-float">
              <b>$128,450</b>
            </div>

            <svg viewBox="0 0 380 140" preserveAspectRatio="none" className="portfolio-trend-svg">
              <defs>
                <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="380" y2="30" stroke="rgba(226, 232, 240, 0.6)" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="380" y2="70" stroke="rgba(226, 232, 240, 0.6)" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="380" y2="110" stroke="rgba(226, 232, 240, 0.6)" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path
                d="M 0,115 Q 40,105 80,92 T 160,84 T 240,55 T 310,48 L 380,22 L 380,140 L 0,140 Z"
                fill="url(#portGrad)"
              />

              {/* Animated Stroke */}
              <motion.path
                d="M 0,115 Q 40,105 80,92 T 160,84 T 240,55 T 310,48 L 380,22"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              <motion.circle
                cx="380"
                cy="22"
                r="4.5"
                fill="#0284c7"
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
              />
            </svg>

            <div className="portfolio-dates-axis">
              <span>Aug 15</span>
              <span>Aug 22</span>
              <span>Aug 29</span>
              <span>Sep 05</span>
              <span>Sep 12</span>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* =========================================================
          CARD 5: SMART ALERTS
      ========================================================== */}
      <BentoCard className="bento-alerts" delay={0.3}>
        <div className="card-header-v2">
          <div className="card-icon-badge sky">
            <BellRing size={20} />
          </div>
          <div className="card-title-wrap">
            <h3>Smart Alerts</h3>
            <p>Stay ahead with real-time notifications and updates.</p>
          </div>
          <span className="status-pill sky">
            <span className="pulse-dot sky" />
            5 latest
          </span>
        </div>

        <div className="alerts-stack-list">
          {[
            {
              id: 1,
              dotClass: "green",
              title: "BTC price moved up 2.4%",
              sub: "Now trading at $67,422",
              time: "12m ago"
            },
            {
              id: 2,
              dotClass: "blue",
              title: "Strategy execution completed",
              sub: "12 trades executed successfully",
              time: "34m ago"
            },
            {
              id: 3,
              dotClass: "amber",
              title: "Risk level adjusted",
              sub: "Portfolio risk back to normal",
              time: "1h ago"
            },
            {
              id: 4,
              dotClass: "purple",
              title: "Market update",
              sub: "Federal Reserve interest rate decision",
              time: "2h ago"
            },
            {
              id: 5,
              dotClass: "emerald",
              title: "New opportunity detected",
              sub: "Bullish signal on ETH",
              time: "3h ago"
            }
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              className={`alert-item-row ${hoveredAlert === idx ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredAlert(idx)}
              onMouseLeave={() => setHoveredAlert(null)}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
              whileHover={{ x: 3 }}
            >
              <div className={`alert-bullet-circle ${item.dotClass}`} />
              <div className="alert-text-body">
                <b>{item.title}</b>
                <small>{item.sub}</small>
              </div>
              <span className="alert-timestamp">{item.time}</span>
              <ChevronRight size={13} className="alert-chevron" />
            </motion.div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}
