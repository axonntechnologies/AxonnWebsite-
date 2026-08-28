import { useEffect } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  Link2,
  Workflow,
  ArrowRight,
} from "lucide-react";

import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { CloudBackground } from "./CloudBackground";
import { HeroDashboard } from "./HeroDashboard";
import { DataFlow } from "./DataFlow";
import { SectionHeading } from "./SectionHeading";
import { FeatureCard } from "./FeatureCard";
import { ProcessFlow } from "./ProcessFlow";
import { TechnologyOrbit } from "./TechnologyOrbit";
import { WhyAxonn } from "./WhyAxonn";
import { StatsCards } from "./StatsCards";
import { BentoGrid } from "./BentoGrid";
import { Contact } from "./Contact";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="site">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section id="home" className="hero">
          <CloudBackground />

          <div className="hero-content">
            <motion.h1
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              One connected trading infrastructure
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.9,
              }}
            >
              from live data to execution to review
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.23,
                duration: 0.7,
              }}
            >
              Axonn links market data, strategies, brokers, risk and analytics
              into a single operating layer. Information moves cleanly from
              signal to order to analysis — no fragmented tools and no manual
              hand-offs between them.
            </motion.p>

            <motion.button
              className="primary-btn hero-btn cta-arrow-btn"
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.34,
                duration: 0.65,
              }}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => scrollTo("contact")}
            >
              Explore the Platform
              <ArrowRight size={17} />
            </motion.button>

            <DataFlow />

            <motion.div
              initial={{
                opacity: 0,
                y: 26,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="dashboard-float">
                <HeroDashboard />
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            WHAT WE DO
        ====================================================== */}
        <section
          id="what-we-do"
          className="section standard-section"
        >
          <SectionHeading title="What we do">
            Axonn brings the four core functions of a modern trading desk into
            one environment — so connecting, automating, monitoring and
            analysing are part of the same system rather than separate tools.
          </SectionHeading>

          <div className="feature-grid">
            <FeatureCard
              index={0}
              icon={Link2}
              title="Connect"
              text="Link brokers, market data feeds and strategy code through one integration layer."
            />

            <FeatureCard
              index={1}
              icon={Workflow}
              title="Automate"
              text="Turn strategy logic into deployed, running processes without manual intervention."
            />

            <FeatureCard
              index={2}
              icon={Activity}
              title="Monitor"
              text="Track positions, risk and system health in real time from a single dashboard."
            />

            <FeatureCard
              index={3}
              icon={BarChart3}
              title="Analyze"
              text="Review performance, attribution and risk with consistent, structured data."
            />
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-we-do"
          className="section how-section"
        >
          <div className="how-copy">
            <SectionHeading
              align="left"
              title="How it works"
            >
              A clear path from integration to insight. Each stage feeds the
              next, so the operation runs as one continuous loop rather than a
              set of disconnected steps.
            </SectionHeading>
          </div>

          <div className="process-area">
            <div className="ambient-blue" />
            <ProcessFlow />
          </div>
        </section>

        {/* =====================================================
            AXONN CORE
        ====================================================== */}
        <section
          id="technologies"
          className="section technologies-section framed-section"
        >
          <SectionHeading title="Axonn Core">
            Axonn Core sits at the centre of the stack. Every broker, strategy,
            data source and risk check connects through it, and analytics flow
            back out to the dashboard.
          </SectionHeading>

          <TechnologyOrbit />
        </section>

        {/* =====================================================
            WHY AXONN
        ====================================================== */}
        <section
          id="motto"
          className="section motto-section"
        >
          <SectionHeading
            align="left"
            title="Why Axonn"
          >
            Technology with a purpose: less fragmentation, more visibility and
            better control over how your operation runs.
          </SectionHeading>

          <WhyAxonn />

          <StatsCards />

          <div className="features-title-row">
            <div>
              <span className="small-pill">
                Core features
              </span>

              <h2>
                Everything in one
                <br />
                connected environment
              </h2>
            </div>

            <div>
              <p>
                Platform capabilities built for automation and designed to
                scale as you add strategies, accounts and data sources.
              </p>

              <button
                className="dark-pill cta-arrow-btn"
                onClick={() => scrollTo("contact")}
              >
                View all features
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <BentoGrid />
        </section>

        {/* =====================================================
            CONTACT
        ====================================================== */}
        <section
          id="contact"
          className="section contact-section"
        >
          <Contact />
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}
        <section
          id="faq"
          className="section faq-section"
        >
          <SectionHeading title="Frequently Asked Questions">
            How Axonn connects to what you already use, how risk is enforced and
            what the dashboard shows.
          </SectionHeading>

          <div className="faq-tags">
            <span>Platform</span>
            <span>Integrations</span>
            <span>Risk</span>
            <span>Data</span>
            <span className="active">All</span>
          </div>

          <FAQ />
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <FinalCTA onCta={() => scrollTo("contact")} />
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo dark />
          </div>

          <div className="footer-message">
            <h2>
              One environment for the
              <br />
              whole trading operation.
            </h2>

            <p>
              Axonn connects data, strategy, execution, risk and analytics so
              teams spend less time moving information between tools and more
              time on the decisions that matter.
            </p>

            <div className="footer-links">
              <button
                onClick={() => scrollTo("home")}
              >
                About us
              </button>

              <button
                onClick={() => scrollTo("what-we-do")}
              >
                Know More
              </button>

              <button
                onClick={() => scrollTo("technologies")}
              >
                Services
              </button>
            </div>
          </div>

          <div className="footer-demo">
            <label>
              Email address

              <input
                type="email"
                placeholder="Email address"
              />
            </label>

            <button
              className="blue-small"
              onClick={() => scrollTo("contact")}
            >
              Book a Demo
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
