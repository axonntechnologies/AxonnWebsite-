import { useState, useMemo } from "react";
import { Plus, Minus, Search, Database, Shield, Zap, BarChart3, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Platform" | "Integrations" | "Risk" | "Data";
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "q1",
    category: "Integrations",
    question: "What exactly does Axonn connect?",
    answer:
      "Axonn links your brokers, market data feeds, strategy logic, risk checks and analytics into one environment, so information moves between them without manual exports or custom glue code."
  },
  {
    id: "q2",
    category: "Integrations",
    question: "Do I need to replace my existing brokers or strategies?",
    answer:
      "No. Axonn sits on top of what you already use. You connect existing broker accounts and strategy code through the integration layer and keep working the way you do today."
  },
  {
    id: "q3",
    category: "Risk",
    question: "How are risk limits enforced?",
    answer:
      "You configure allocation rules, exposure limits and execution parameters per strategy. Axonn applies those checks consistently before orders are sent and surfaces breaches on the monitoring dashboard."
  },
  {
    id: "q4",
    category: "Data",
    question: "What does the dashboard show?",
    answer:
      "Portfolio value, live positions, profit and loss, allocation and recent activity in one view. All figures shown in the product interface are example values for illustration."
  },
  {
    id: "q5",
    category: "Platform",
    question: "Can the team get support during market hours?",
    answer:
      "Yes. Support and account information are designed to be available whenever markets are open with enterprise-level dedicated response times."
  }
];

const CATEGORIES = ["All", "Platform", "Integrations", "Risk", "Data"] as const;

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>("q1");

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="faq-interactive-wrapper">
      {/* Background Soft Atmospheric Clouds & Parallax Elements */}
      <div className="faq-cloud-backdrop" aria-hidden="true">
        <div className="faq-cloud-haze haze-left" />
        <div className="faq-cloud-haze haze-right" />
        <div className="faq-ambient-curve-wrap">
          <svg viewBox="0 0 1200 400" className="faq-ambient-curve-svg">
            <path
              d="M 0,200 Q 300,120 600,240 T 1200,180"
              fill="none"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <circle r="3" fill="#38bdf8" opacity="0.8">
              <animateMotion
                path="M 0,200 Q 300,120 600,240 T 1200,180"
                dur="18s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Hero Header Block */}
      <motion.div
        className="faq-hero-header"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <span className="faq-eyebrow">HELP & KNOWLEDGE BASE</span>
        <h2 className="faq-main-heading">Frequently Asked Questions</h2>
        <p className="faq-sub-heading">
          How Axonn connects to what you already use, how risk is enforced and
          what the dashboard shows.
        </p>

        {/* Search FAQs Input */}
        <div className="faq-search-box-wrapper">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search questions, integrations, risk controls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="faq-search-clear"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="faq-category-pills">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`faq-cat-pill ${isSelected ? "is-selected" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                {isSelected && (
                  <motion.div
                    className="faq-pill-active-indicator"
                    layoutId="activeFaqPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Grid: Left Tagline, Center Accordion, Right Ecosystem Visual */}
      <div className="faq-content-layout">
        {/* Left Side Visual: Floating Tagline */}
        <div className="faq-side-col left-col" aria-hidden="true">
          <motion.div
            className="faq-floating-tagline"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="quote-mark">“</span>
            <b>Smarter data.</b>
            <b>Stronger decisions.</b>
            <small>Connected institutional infrastructure</small>
          </motion.div>
        </div>

        {/* Center: FAQ Accordion Cards */}
        <div className="faq-accordion-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="faq-cards-stack"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === faq.id;

                  return (
                    <motion.div
                      key={faq.id}
                      className={`faq-glass-card ${isOpen ? "is-open" : ""}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      {/* Subtle Light Sweep */}
                      <div className="faq-card-sweep" />

                      <button
                        type="button"
                        className="faq-card-toggle"
                        onClick={() => toggleAccordion(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-text">{faq.question}</span>
                        <div className="faq-icon-disc">
                          {isOpen ? (
                            <Minus size={16} className="faq-toggle-icon" />
                          ) : (
                            <Plus size={16} className="faq-toggle-icon" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="faq-answer-drawer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="faq-answer-inner">
                              <p>{faq.answer}</p>
                              <span className="faq-cat-badge">{faq.category}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="faq-empty-state">
                  <HelpCircle size={28} className="empty-icon" />
                  <b>No matching questions found</b>
                  <p>Try searching for different terms or selecting another category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Visual: Floating Axonn Ecosystem */}
        <div className="faq-side-col right-col" aria-hidden="true">
          <motion.div
            className="faq-ecosystem-visual-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="eco-header">
              <span className="eco-pulse-dot" />
              <span>AXONN ECOSYSTEM</span>
            </div>

            {/* Hub-and-Spoke Node Graphic */}
            <div className="eco-stage">
              <svg viewBox="0 0 200 180" className="eco-svg">
                {/* Connection lines from center (100, 90) */}
                <path d="M 100 90 L 40 40" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 100 90 L 160 40" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 100 90 L 40 140" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 100 90 L 160 140" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Traveling particle */}
                <circle r="2.5" fill="#38bdf8">
                  <animateMotion path="M 40 40 L 100 90 L 160 140" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Central Core */}
              <div className="eco-center-node">
                <b>AXONN</b>
              </div>

              {/* 4 Connected Nodes */}
              <div className="eco-outer-node node-data">
                <Database size={11} />
                <span>DATA</span>
              </div>
              <div className="eco-outer-node node-risk">
                <Shield size={11} />
                <span>RISK</span>
              </div>
              <div className="eco-outer-node node-exec">
                <Zap size={11} />
                <span>EXEC</span>
              </div>
              <div className="eco-outer-node node-analytics">
                <BarChart3 size={11} />
                <span>ANALYTICS</span>
              </div>
            </div>

            <div className="eco-footer-text">
              <span>Continuous Execution Loop</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Centered Platform Statement */}
      <div className="faq-bottom-banner">
        <span className="banner-line-left" />
        <div className="banner-core-tag">
          <span className="banner-pulse-dot" />
          <span>One connected core. Every operation in sync.</span>
        </div>
        <span className="banner-line-right" />
      </div>
    </div>
  );
}
