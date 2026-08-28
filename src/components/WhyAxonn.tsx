import { motion } from "motion/react";

const points: [string, string][] = [
  [
    "One connected environment",
    "Brokers, data, strategies, risk and analytics live in the same system instead of scattered tools."
  ],
  [
    "Built for automation",
    "Strategy logic runs as managed processes, so routine execution no longer needs a person in the loop."
  ],
  [
    "More visibility",
    "Positions, exposure and system health are visible in real time, not reconstructed after the fact."
  ],
  [
    "Technology with purpose",
    "Every part of the platform maps to a real step in running a trading operation."
  ],
  [
    "Designed to scale",
    "Add strategies, accounts and data sources without rebuilding the way they connect."
  ]
];

/**
 * "Why Axonn" — each point reveals on scroll, joined by a subtle connecting line
 * that represents the evolution of the trading operation.
 */
export function WhyAxonn() {
  return (
    <ol className="why-axonn">
      {points.map(([title, text], i) => (
        <motion.li
          key={title}
          className="why-point"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: i * 0.06 }}
        >
          <span className="why-marker" />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
