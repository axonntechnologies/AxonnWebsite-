import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const particles = Array.from({ length: 16 });

export function FinalCTA({ onCta }: { onCta: () => void }) {
  return (
    <section className="final-cta">
      <div className="final-cta-bg" aria-hidden="true">
        {particles.map((_, i) => (
          <span
            key={i}
            className="cta-particle"
            style={{
              left: `${(i * 61) % 100}%`,
              top: `${(i * 43) % 100}%`,
              animationDelay: `${(i % 6) * 1.6}s`,
              animationDuration: `${18 + (i % 5) * 5}s`
            }}
          />
        ))}
      </div>

      <motion.div
        className="final-cta-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Build. Automate. Monitor. Improve.</h2>
        <p>
          Bring your brokers, strategies, market data and risk into one
          connected environment.
        </p>
        <button className="primary-btn cta-arrow-btn" onClick={onCta}>
          Start the Conversation
          <ArrowRight size={17} />
        </button>
      </motion.div>
    </section>
  );
}
