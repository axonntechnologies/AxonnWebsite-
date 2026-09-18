import { motion } from "motion/react";
import {
  ArrowUpRight,
  Bell,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings2,
  TrendingUp,
  Cpu,
  Shield,
  Activity,
  Zap
} from "lucide-react";
import sidebarLogoImg from "../assets/axonn-sidebar-logo.png";

interface HeroDashboardProps {
  activeStage?: number;
}

export function HeroDashboard({ activeStage = 0 }: HeroDashboardProps) {
  const rows = [
    ["🇪🇺 EUR/USD", "50,000", "1.0890", "+₹25,537.50", "+0.69%"],
    ["🇬🇧 GBP/USD", "40,000", "1.2710", "+₹20,324.00", "+0.46%"],
    ["🇯🇵 USD/JPY", "60,000", "151.20", "+₹43,470.00", "+0.76%"],
    ["🇦🇺 AUD/USD", "50,000", "0.6580", "+₹18,123.00", "+0.79%"]
  ];

  return (
    <div className="hero-dashboard-anchor-wrapper">
      {/* Underlying Ambient Soft Cyan Glow Pool */}
      <div className="hero-dashboard-glow-pool" aria-hidden="true" />

      {/* Contained Orbit Data Network - Locked to Exact Mathematical Center of Dashboard */}
      <div className="hero-orbital-ring-container" aria-hidden="true">
        <div className="hero-orbit-rotator">
          <svg viewBox="0 0 1000 600" className="hero-orbit-svg">
            <defs>
              <radialGradient id="heroOrbitGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.03" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <filter id="heroNodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient Center Glow */}
            <ellipse cx="500" cy="300" rx="460" ry="260" fill="url(#heroOrbitGlow)" />

            {/* Outer Orbit Path - Dotted Ring */}
            <ellipse
              cx="500"
              cy="300"
              rx="470"
              ry="260"
              fill="none"
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="hero-orbit-ring"
            />

            {/* Inner Secondary Ring */}
            <ellipse
              cx="500"
              cy="300"
              rx="430"
              ry="235"
              fill="none"
              stroke="rgba(2, 132, 199, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="hero-orbit-ring-inner"
            />

            {/* Fixed Ambient Data Nodes on Orbit */}
            <g className="hero-orbit-nodes">
              {/* Top Node */}
              <circle cx="500" cy="40" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2" filter="url(#heroNodeGlow)" />
              {/* Bottom Node */}
              <circle cx="500" cy="560" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2" filter="url(#heroNodeGlow)" />
              {/* Left Node */}
              <circle cx="30" cy="300" r="4.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" filter="url(#heroNodeGlow)" />
              {/* Right Node */}
              <circle cx="970" cy="300" r="4.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" filter="url(#heroNodeGlow)" />
            </g>

            {/* Travelling Glowing Data Particles along Orbit */}
            <circle r="4" fill="#38bdf8" filter="url(#heroNodeGlow)">
              <animateMotion
                path="M 30 300 a 470 260 0 1 0 940 0 a 470 260 0 1 0 -940 0"
                dur="28s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#0284c7" opacity="0.8">
              <animateMotion
                path="M 970 300 a 470 260 0 1 1 -940 0 a 470 260 0 1 1 940 0"
                dur="22s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="2.5" fill="#7dd3fc" opacity="0.9">
              <animateMotion
                path="M 500 40 a 470 260 0 1 0 0 520 a 470 260 0 1 0 0 -520"
                dur="34s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Main Trading Dashboard Window Shell */}
      <motion.div
        className={`dashboard-shell ${
          activeStage === 2 ? "stage-core-glow" : ""
        }`}
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="dashboard-window">
          {/* Left-side Navigation Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="mini-logo" aria-label="Axonn Technologies">
              <img
                src={sidebarLogoImg}
                alt="Axonn Technologies"
                className="sidebar-logo-img"
              />
            </div>
            <span className="dash-label">OVERVIEW</span>
            <div className="dash-active">
              <LayoutDashboard size={15} /> Dashboard
            </div>
            <div className="dash-spacer" />
            <div className="dash-user">
              <span>AX</span>
              <div>
                <b>Trading Desk</b>
                <small>Institutional Active</small>
              </div>
            </div>
            <button type="button" className="dash-logout">
              <LogOut size={13} /> Log out
            </button>
          </aside>

          {/* Dashboard Main Area */}
          <main className="dashboard-main">
            <div className="dash-topbar">
              <span>
                <span className="hamburger-lines">☰</span> <b>Dashboard</b>
              </span>
              <span className="top-icons">
                <Settings2 size={15} />
                <Bell size={15} />
              </span>
            </div>

            {/* Branding / Content Header */}
            <div
              className={`welcome-banner ${
                activeStage === 2 ? "core-highlighted" : ""
              }`}
            >
              <small>AXONN PLATFORM</small>
              <strong>One environment for the whole trading operation.</strong>
              <span>
                Axonn connects data, strategy, execution, risk and analytics so
                teams spend less time moving information between tools and more
                time on the decisions that matter.
              </span>
              <em>● MARKETS OPEN</em>
            </div>

            {/* Metric KPI Row */}
            <div className="metric-grid">
              {[
                ["Total Portfolio Value", "₹5,12,650", "+ 2.53%", "blue"],
                ["Total P&L", "+₹12,650", "+ 2.53%", "green"],
                ["Today's P&L", "+₹3,240", "+ 0.64%", "mint"],
                ["Invested Amount", "₹5,00,000", "6 Aug, 2026", "purple"]
              ].map(([a, b, c, color]) => (
                <div
                  className={`metric ${
                    activeStage === 4 ? "analytics-glow" : ""
                  }`}
                  key={a}
                >
                  <div className={`metric-icon ${color}`} />
                  <div>
                    <small>{a}</small>
                    <strong>{b}</strong>
                    <em>{c}</em>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Panels: Portfolio Growth Chart & Allocation */}
            <div className="dashboard-panels">
              <div
                className={`chart-panel ${
                  activeStage === 4 ? "chart-highlighted" : ""
                }`}
              >
                <div className="panel-title">
                  <div>
                    <b>Portfolio Growth</b>
                    <small>Investment started on 6 Aug, 2026</small>
                  </div>
                  <span>↑ 2.53% (₹12,650)</span>
                </div>
                <svg
                  viewBox="0 0 600 180"
                  className="line-chart"
                  role="img"
                  aria-label="Portfolio growth chart"
                >
                  <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#55aef4"
                        stopOpacity=".28"
                      />
                      <stop
                        offset="100%"
                        stopColor="#55aef4"
                        stopOpacity=".02"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 150 L90 125 L180 116 L280 100 L380 80 L475 72 L590 48 L590 170 L10 170Z"
                    fill="url(#area)"
                  />
                  <motion.path
                    d="M10 150 L90 125 L180 116 L280 100 L380 80 L475 72 L590 48"
                    fill="none"
                    stroke="#187adf"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  />
                  {[10, 90, 180, 280, 380, 475, 590].map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={[150, 125, 116, 100, 80, 72, 48][i]}
                      r="4"
                      fill="#187adf"
                    />
                  ))}
                </svg>
              </div>

              <div className="allocation-panel">
                <b>Allocation</b>
                <div className="donut">
                  <span>
                    100%<small>Forex</small>
                  </span>
                </div>
                <div className="legend">
                  <span>
                    ● Forex <b>100%</b>
                  </span>
                  <span>
                    ● Cash <b>0%</b>
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Panels: Holdings & Recent Activity */}
            <div className="lower-panels">
              <div
                className={`holdings ${
                  activeStage === 0 || activeStage === 3
                    ? "holdings-highlighted"
                    : ""
                }`}
              >
                <b>Forex Holdings</b>
                <div className="table-head">
                  <span>Symbol</span>
                  <span>Pair</span>
                  <span>Quantity</span>
                  <span>Avg. Price</span>
                  <span>Current Price</span>
                  <span>P&L</span>
                </div>
                {rows.map((r) => (
                  <div className="table-row" key={r[0]}>
                    {r.map((x, i) => (
                      <span
                        key={i}
                        className={i === 4 || i === 5 ? "positive" : ""}
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                ))}
                <a href="#motto">
                  View all forex holdings <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="activity">
                <b>Recent Activity</b>
                {[
                  ["7 Aug, 2026", "Today's Gain", "+₹3,240.00"],
                  ["7 Aug, 2026", "Portfolio Update", "₹5,12,650.00"],
                  ["6 Aug, 2026", "Initial Investment", "-₹5,00,000.00"],
                  ["6 Aug, 2026", "Account Created", "Welcome to Forex Advisor"]
                ].map(([date, label, value]) => (
                  <div className="activity-row" key={label}>
                    <span>{date}</span>
                    <b>{label}</b>
                    <em>{value}</em>
                  </div>
                ))}
                <a href="#motto">
                  View all activity <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className="help-bubble">
              <CircleHelp size={18} />
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}
