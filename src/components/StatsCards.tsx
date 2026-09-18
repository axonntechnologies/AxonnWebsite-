import { motion } from "motion/react";
import { Headphones, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const cardReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 }
};

export function StatsCards() {
  return (
    <div className="why-stats-cards-grid">
      {/* CARD 1: 24/7 SUPPORT (DARK BLUE GLASS) */}
      <motion.div
        className="why-stat-card dark-featured"
        {...cardReveal}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <div className="stat-card-left">
          <div className="stat-icon-circle navy-glow">
            <Headphones size={20} />
          </div>

          <div className="stat-card-text">
            <div className="stat-highlight-row">
              <strong className="stat-big-num text-white">24/7</strong>
              <span className="stat-big-label text-white">Support</span>
            </div>
            <p className="stat-desc text-white-muted">Always here when you need us.</p>
          </div>
        </div>

        <div className="stat-arrow-btn dark">
          <ArrowRight size={15} />
        </div>
      </motion.div>

      {/* CARD 2: SECURE & RELIABLE */}
      <motion.div
        className="why-stat-card light-glass"
        {...cardReveal}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <div className="stat-card-left">
          <div className="stat-icon-circle sky">
            <ShieldCheck size={20} />
          </div>

          <div className="stat-card-text">
            <h4 className="stat-card-title">Secure & Reliable</h4>
            <p className="stat-desc">Enterprise-grade security for your data and operations.</p>
          </div>
        </div>

        <div className="stat-arrow-btn light">
          <ArrowRight size={15} />
        </div>
      </motion.div>

      {/* CARD 3: BUILT FOR PERFORMANCE */}
      <motion.div
        className="why-stat-card light-glass"
        {...cardReveal}
        transition={{ duration: 0.5, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <div className="stat-card-left">
          <div className="stat-icon-circle cyan">
            <Zap size={20} />
          </div>

          <div className="stat-card-text">
            <h4 className="stat-card-title">Built for Performance</h4>
            <p className="stat-desc">Low latency. High uptime. Maximum efficiency.</p>
          </div>
        </div>

        <div className="stat-arrow-btn light">
          <ArrowRight size={15} />
        </div>
      </motion.div>
    </div>
  );
}
