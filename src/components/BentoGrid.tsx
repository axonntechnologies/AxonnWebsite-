import { motion } from "motion/react";
import { ShieldCheck, BellRing } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
};

export function BentoGrid() {
  return (
    <div className="bento-grid">
      <motion.article className="bento-card risk" {...reveal} whileHover={{ y: -4 }}>
        <h3>Risk visibility</h3>
        <div className="shield-art"><ShieldCheck size={64} /></div>
        <div className="tag-row">
          <span>Risk scoring</span>
          <span>Exposure tracking</span>
          <span>Limit breaches</span>
        </div>
      </motion.article>

      <motion.article className="bento-card market" {...reveal} whileHover={{ y: -4 }}>
        <h3>Market intelligence</h3>
        <svg viewBox="0 0 420 220" className="market-chart">
          <path d="M0 190 C60 150 80 175 130 125 S190 185 235 100 S285 155 330 78 S370 120 420 55 L420 220 L0 220Z" />
          <motion.path
            d="M0 190 C60 150 80 175 130 125 S190 185 235 100 S285 155 330 78 S370 120 420 55"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>
        <div className="chart-marker">● <small>Example</small></div>
      </motion.article>

      <motion.article className="bento-card ai-card" {...reveal} whileHover={{ y: -4 }}>
        <h3>Strategy automation</h3>
        <strong>AUTO</strong>
        <p>Strategy logic deployed as managed, running processes.</p>
      </motion.article>

      <motion.article className="bento-card portfolio" {...reveal} whileHover={{ y: -4 }}>
        <h3>Portfolio monitoring</h3>
        <p>See the entire position picture in one place, with allocation and gain/loss attribution.</p>
        <div className="portfolio-visual">
          <div className="donut-small">Live</div>
          <div className="asset-stack">
            <span>Equities<br /><b>Example</b></span>
            <span>FX<br /><b>Example</b></span>
            <span>Cash<br /><b>Example</b></span>
          </div>
        </div>
      </motion.article>

      <motion.article className="bento-card alerts" {...reveal} whileHover={{ y: -4 }}>
        <h3>Smart alerts</h3>
        <div className="alert-box">
          <BellRing size={20} />
          <div>
            <small>Monitoring signal</small>
            <b>Exposure limit approaching</b>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
