import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent
} from "motion/react";

const steps: [string, string, string][] = [
  [
    "01",
    "Connect",
    "Link brokers, market data feeds and strategy code through one integration layer."
  ],
  [
    "02",
    "Configure",
    "Set allocation rules, risk limits and execution parameters for each strategy."
  ],
  [
    "03",
    "Deploy",
    "Push strategies live as managed processes — no manual scripts to babysit."
  ],
  [
    "04",
    "Monitor",
    "Watch positions, exposure and system health in real time from a single view."
  ],
  [
    "05",
    "Analyze",
    "Review performance, attribution and risk with consistent, structured data."
  ]
];

/**
 * How it works — a glowing line travels through the process as the user scrolls.
 * The step the line has reached is highlighted in Axonn blue.
 */
export function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"]
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4
  });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(fill, "change", (v) => {
    setActive(Math.floor(v * steps.length - 0.0001));
  });

  return (
    <div className="process-flow" ref={ref}>
      <div className="process-track">
        <motion.div
          className="process-track-fill"
          style={{ scaleY: fill }}
        />
      </div>

      <ol className="process-steps">
        {steps.map(([num, title, text], i) => (
          <motion.li
            key={num}
            className={`process-step ${i <= active ? "reached" : ""}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
          >
            <span className="process-dot" />
            <span className="process-num">{num}</span>
            <div className="process-body">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
