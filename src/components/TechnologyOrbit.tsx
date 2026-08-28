import { motion } from "motion/react";

const nodes = [
  { label: "DATA", tip: "Live market & historical data", className: "node-gear" },
  { label: "STRATEGY", tip: "Strategy logic & signals", className: "node-python" },
  { label: "BROKERS", tip: "Connected broker accounts", className: "node-cpp" },
  { label: "RISK", tip: "Limits & exposure checks", className: "node-ml" },
  { label: "EXECUTION", tip: "Order routing & fills", className: "node-ai" }
];

export function TechnologyOrbit() {
  return (
    <div className="orbit-stage">
      <motion.div
        className="orbit-ring ring-one"
        animate={{ rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbit-ring ring-two"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />

      <div className="orbit-center">
        <div className="orbit-logo">▲</div>
        <strong>AXONN</strong>
        <small>CORE</small>
      </div>

      {nodes.map((node, i) => (
        <motion.div
          key={node.className}
          className={`orbit-node ${node.className}`}
          data-tip={node.tip}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.06 }}
        >
          <span>{node.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
