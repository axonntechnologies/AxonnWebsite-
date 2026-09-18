import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import logoImg from "../assets/axonn-sidebar-logo.png";

interface FinalCTAProps {
  onScrollTo: (id: string) => void;
}

export function FinalCTA({ onScrollTo }: FinalCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        onScrollTo("contact");
      }, 1200);
    }
  };

  return (
    <section className="final-section-wrapper" aria-label="Connected Operations">
      <div className="final-section-container">
        {/* Left Column: Brand + Content */}
        <motion.div
          className="final-left-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Axonn Technologies Logo */}
          <div className="final-logo-wrap">
            <img
              src={logoImg}
              alt="Axonn Technologies"
              className="final-logo-img"
            />
          </div>

          {/* Eyebrow */}
          <span className="final-eyebrow">CONNECTED OPERATIONS</span>

          {/* Main Heading */}
          <h2 className="final-main-heading">
            One environment for the
            <br />
            whole trading operation.
          </h2>

          {/* Supporting Text */}
          <p className="final-supporting-desc">
            Axonn connects data, strategy, execution, risk and analytics so
            teams spend less time moving information between tools and more time
            on the decisions that matter.
          </p>

          {/* Three Action Buttons */}
          <div className="final-action-buttons">
            <button
              type="button"
              className="final-action-pill"
              onClick={() => onScrollTo("home")}
            >
              About us
            </button>
            <button
              type="button"
              className="final-action-pill"
              onClick={() => onScrollTo("what-we-do")}
            >
              Know More
            </button>
            <button
              type="button"
              className="final-action-pill"
              onClick={() => onScrollTo("technologies")}
            >
              Services
            </button>
          </div>
        </motion.div>

        {/* Right Column: Book a Demo Card */}
        <motion.div
          className="final-right-col"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="final-demo-card"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="demo-card-header">
              <span className="demo-card-badge">GET STARTED</span>
              <h3 className="demo-card-title">Book a Demo</h3>
              <p className="demo-card-desc">
                See how Axonn can help your team work smarter, faster and more
                connected.
              </p>
            </div>

            {submitted ? (
              <div className="demo-submitted-state">
                <CheckCircle2 size={18} />
                <span>Redirecting to consultation...</span>
              </div>
            ) : (
              <form className="demo-card-form" onSubmit={handleSubmit}>
                <div className="demo-input-group">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="demo-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="demo-submit-btn cta-arrow-btn">
                    Book a Demo
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
