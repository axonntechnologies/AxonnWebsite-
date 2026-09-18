import { motion } from "motion/react";

const STAGES = [
  { id: "data", label: "Live data", desc: "Tick feeds & L2 books" },
  { id: "strategy", label: "Strategy", desc: "Algorithmic logic" },
  { id: "axonn", label: "Axonn", desc: "Connected Core" },
  { id: "execution", label: "Execution", desc: "Sub-ms smart routing" },
  { id: "analytics", label: "Analytics", desc: "Real-time P&L review" }
];

interface DataFlowProps {
  activeStage?: number;
  onSelectStage?: (idx: number) => void;
}

export function DataFlow({ activeStage = 0, onSelectStage }: DataFlowProps) {
  return (
    <motion.nav
      className="data-flow-nav"
      aria-label="Process Workflow Navigation"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="data-flow-track-wrapper">
        {STAGES.map((stage, i) => {
          const isActive = i === activeStage;
          const isPassed = i < activeStage;

          return (
            <div className="data-flow-stage-item" key={stage.id}>
              <button
                type="button"
                className={`data-node-button ${isActive ? "is-active" : ""} ${
                  isPassed ? "is-passed" : ""
                } ${stage.id === "axonn" ? "is-core" : ""}`}
                onClick={() => onSelectStage && onSelectStage(i)}
              >
                <span className="stage-num">0{i + 1}</span>
                <span className="stage-text">{stage.label}</span>
                {isActive && <span className="stage-active-glow" />}
              </button>

              {i < STAGES.length - 1 && (
                <div className="data-link-segment">
                  <span
                    className={`data-link-line ${
                      isPassed || isActive ? "link-active" : ""
                    }`}
                  />
                  <span
                    className="data-pulse-dot"
                    style={{ animationDelay: `${i * 0.9}s` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
