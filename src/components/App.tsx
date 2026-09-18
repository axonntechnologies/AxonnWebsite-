import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
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
import { HeroConnectedElements } from "./HeroConnectedElements";
import { DataFlow } from "./DataFlow";
import { SectionHeading } from "./SectionHeading";
import { WhatWeDoWorkflow } from "./WhatWeDoWorkflow";
import { ProcessFlow } from "./ProcessFlow";
import { TechnologyOrbit } from "./TechnologyOrbit";
import { WhyAxonn } from "./WhyAxonn";
import { StatsCards } from "./StatsCards";
import { BentoGrid } from "./BentoGrid";
import { Contact } from "./Contact";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroActiveStage, setHeroActiveStage] = useState(0);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end 80%"]
  });

  useMotionValueEvent(heroScrollProgress, "change", (v) => {
    const stage = Math.min(4, Math.max(0, Math.floor(v * 5)));
    setHeroActiveStage(stage);
  });

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
            HERO — IMMERSIVE CLOUD + FINTECH TRADING PLATFORM
        ====================================================== */}
        <section id="home" className="hero hero-immersive-section" ref={heroRef}>
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

            {/* Interactive Process Navigation */}
            <DataFlow
              activeStage={heroActiveStage}
              onSelectStage={setHeroActiveStage}
            />

            {/* Central Floating Dashboard + Left/Right Connected Elements */}
            <motion.div
              className="hero-dashboard-viewport-wrap"
              initial={{
                opacity: 0,
                y: 28,
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
              <HeroConnectedElements activeStage={heroActiveStage} />
              <HeroDashboard activeStage={heroActiveStage} />
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            WHAT WE DO
        ====================================================== */}
        <section
          id="what-we-do"
          className="section standard-section what-we-do-section"
        >
          <SectionHeading title="What we do">
            Axonn brings the four core functions of a modern trading desk into
            one environment — so connecting, automating, monitoring and
            analysing are part of the same system rather than separate tools.
          </SectionHeading>

          <WhatWeDoWorkflow />
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-we-do"
          className="section how-section-wrapper"
        >
          <ProcessFlow />
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
          <div className="why-axonn-heading-block">
            <h2 className="why-main-title">
              Why <span className="text-cyan-gradient">Axonn</span>
            </h2>
            <p className="why-main-desc">
              Technology with a purpose: less fragmentation, more visibility and
              better control over how your operation runs.
            </p>
          </div>

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
                connected environment.
              </h2>
            </div>

            <div>
              <p>
                Platform capabilities built for automation and designed to
                scale as you add strategies, accounts and data sources.
              </p>
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
          className="section faq-section-wrapper"
        >
          <FAQ />
        </section>

        {/* =====================================================
            FINAL CTA SECTION (CONNECTED OPERATIONS & BOOK A DEMO)
        ====================================================== */}
        <FinalCTA onScrollTo={scrollTo} />
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="footer-bottom-bar">
        <span>© 2026 All rights reserved</span>
      </footer>
    </div>
  );
}

export default App;
