import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const faqs: [string, string][] = [
  [
    "What exactly does Axonn connect?",
    "Axonn links your brokers, market data feeds, strategy logic, risk checks and analytics into one environment, so information moves between them without manual exports or custom glue code."
  ],
  [
    "Do I need to replace my existing brokers or strategies?",
    "No. Axonn sits on top of what you already use. You connect existing broker accounts and strategy code through the integration layer and keep working the way you do today."
  ],
  [
    "How are risk limits enforced?",
    "You configure allocation rules, exposure limits and execution parameters per strategy. Axonn applies those checks consistently before orders are sent and surfaces breaches on the monitoring dashboard."
  ],
  [
    "What does the dashboard show?",
    "Portfolio value, live positions, profit and loss, allocation and recent activity in one view. All figures shown in the product interface are example values for illustration."
  ],
  [
    "Can the team get support during market hours?",
    "Yes. Support and account information are designed to be available whenever markets are open."
  ]
];

export function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], i) => {
        const open = active === i;
        return (
          <div className={`faq-item ${open ? "open" : ""}`} key={question}>
            <button onClick={() => setActive(open ? -1 : i)} aria-expanded={open}>
              <span>{question}</span>
              <Plus size={18} className={open ? "rotated" : ""} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
