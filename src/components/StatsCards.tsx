import { motion } from "motion/react";
import { Check, ShieldCheck, Sparkles, BellRing } from "lucide-react";
import { CountUp } from "./CountUp";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
};

export function StatsCards() {
  return (
    <div className="stats-row">
      <motion.div className="stat-big" {...reveal} whileHover={{ y: -4 }}>
        <strong><CountUp end={24} suffix="K+" /></strong>
        <span>users</span>
        <small>Active clients</small>
      </motion.div>

      <motion.div className="stat-alerts" {...reveal} whileHover={{ y: -4 }}>
        <div className="pill-row"><span>● Alerts</span><span>● Strategy</span></div>
        <div className="pill-row"><span>● Equal distribution</span><span>● AI/ML</span></div>
        <div className="pill-row"><span>● No manual intervention</span></div>
      </motion.div>

      <motion.div className="stat-mini-grid" {...reveal}>
        <div><Check size={13} /><b>24/7 support</b><small>Always available</small></div>
        <div><Sparkles size={13} /><b>User experience</b><small>Built for clarity</small></div>
        <div><ShieldCheck size={13} /><b>Safety by design</b><small>Secure by default</small></div>
        <div><BellRing size={13} /><b>Fewer tools</b><small>One environment</small></div>
      </motion.div>
    </div>
  );
}
