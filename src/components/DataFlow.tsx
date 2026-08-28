import { motion } from "motion/react";

const stages = ["Live data", "Strategy", "Axonn", "Execution", "Analytics"];

/**
 * Hero infrastructure strip.
 * Communicates the core path: DATA -> STRATEGY -> AXONN -> EXECUTION -> ANALYTICS
 * with slow, continuous data particles moving along the connecting lines.
 */
export function DataFlow() {
  return (
    <motion.div
      className="data-flow"
      aria-hidden="true"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {stages.map((label, i) => (
        <div className="data-flow-item" key={label}>
          <motion.span
            className={`data-node ${label === "Axonn" ? "core" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 + i * 0.11, duration: 0.5 }}
          >
            {label}
          </motion.span>

          {i < stages.length - 1 && (
            <span className="data-link">
              <span
                className="data-pulse"
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
