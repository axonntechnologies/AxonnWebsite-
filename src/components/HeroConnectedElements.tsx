import { motion } from "motion/react";
import {
  Database,
  Globe,
  Code2,
  Link2,
  Workflow,
  Activity,
  BarChart3,
  CheckCircle2,
  Zap,
  TrendingUp
} from "lucide-react";

interface HeroConnectedProps {
  activeStage: number;
}

export function HeroConnectedElements({ activeStage }: HeroConnectedProps) {
  return (
    <div className="hero-connected-elements-overlay" aria-hidden="true">
      {/* =====================================================
          LEFT-SIDE FLOATING GLASS CARDS
      ====================================================== */}
      <div className="hero-left-floating-cards">
        {/* Card 1: Real-time Market Data */}
        <motion.div
          className={`hero-glass-node-card left-card-1 ${
            activeStage === 0 ? "highlighted" : ""
          }`}
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            x: { duration: 0.8, delay: 0.6 },
            y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="node-card-icon cyan">
            <Database size={15} />
          </div>
          <div className="node-card-content">
            <b>Real-time Market Data</b>
            <small>Tick Feeds · L2 Order Books · 0.32ms</small>
          </div>
          <span className="live-status-dot online" />
        </motion.div>

        {/* Card 2: Connected Brokers */}
        <motion.div
          className={`hero-glass-node-card left-card-2 ${
            activeStage === 0 || activeStage === 1 ? "highlighted" : ""
          }`}
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.7 },
            x: { duration: 0.8, delay: 0.7 },
            y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        >
          <div className="node-card-icon blue">
            <Globe size={15} />
          </div>
          <div className="node-card-content">
            <b>Connected Brokers</b>
            <small>Multi-Exchange FIX Sockets Active</small>
          </div>
          <span className="live-status-dot online" />
        </motion.div>

        {/* Card 3: Strategy Code */}
        <motion.div
          className={`hero-glass-node-card left-card-3 ${
            activeStage === 1 ? "highlighted" : ""
          }`}
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.8 },
            x: { duration: 0.8, delay: 0.8 },
            y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <div className="node-card-icon indigo">
            <Code2 size={15} />
          </div>
          <div className="node-card-content">
            <b>Strategy Code</b>
            <small>Python & C++ Signal Models LIVE</small>
          </div>
          <span className="live-status-dot online" />
        </motion.div>

        {/* Italic handwritten/italic accent text */}
        <motion.div
          className="hero-italic-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <span>“Smarter data. Stronger decisions.”</span>
        </motion.div>
      </div>

      {/* =====================================================
          RIGHT-SIDE FLOATING WORKFLOW GLASS CARDS
      ====================================================== */}
      <div className="hero-right-floating-cards">
        {/* Step 1: Connect */}
        <motion.div
          className={`hero-workflow-glass-card step-card-1 ${
            activeStage >= 0 ? "is-active" : ""
          }`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.65 },
            x: { duration: 0.7, delay: 0.65 },
            y: { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="wf-card-header">
            <span className="wf-step-pill">01 Connect</span>
            <Link2 size={13} className="wf-icon" />
          </div>
          <p>Link brokers, market data feeds and strategy code through one integration layer.</p>
        </motion.div>

        {/* Step 2: Automate */}
        <motion.div
          className={`hero-workflow-glass-card step-card-2 ${
            activeStage >= 1 ? "is-active" : ""
          }`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.75 },
            x: { duration: 0.7, delay: 0.75 },
            y: { duration: 4.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
          }}
        >
          <div className="wf-card-header">
            <span className="wf-step-pill">02 Automate</span>
            <Workflow size={13} className="wf-icon" />
          </div>
          <p>Turn strategy logic into deployed, running processes without manual intervention.</p>
        </motion.div>

        {/* Step 3: Monitor */}
        <motion.div
          className={`hero-workflow-glass-card step-card-3 ${
            activeStage >= 3 ? "is-active" : ""
          }`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.85 },
            x: { duration: 0.7, delay: 0.85 },
            y: { duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
          }}
        >
          <div className="wf-card-header">
            <span className="wf-step-pill">03 Monitor</span>
            <Activity size={13} className="wf-icon" />
          </div>
          <p>Track positions, risk and system health in real time from a single dashboard.</p>
        </motion.div>

        {/* Step 4: Analyze */}
        <motion.div
          className={`hero-workflow-glass-card step-card-4 ${
            activeStage >= 4 ? "is-active" : ""
          }`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: [0, 3, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.95 },
            x: { duration: 0.7, delay: 0.95 },
            y: { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
          }}
        >
          <div className="wf-card-header">
            <span className="wf-step-pill">04 Analyze</span>
            <BarChart3 size={13} className="wf-icon" />
          </div>
          <p>Review performance, attribution and risk with consistent, structured data.</p>
        </motion.div>
      </div>
    </div>
  );
}
