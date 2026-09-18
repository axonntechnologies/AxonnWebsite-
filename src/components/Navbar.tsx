import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

const links = [
  ["Home", "home"],
  ["What we do", "what-we-do"],
  ["How it works", "how-we-do"],
  ["Axonn Core", "technologies"],
  ["Why Axonn", "motto"],
  ["Contact Us", "contact"]
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <motion.button
          className="nav-logo-button"
          onClick={() => go("home")}
          aria-label="Axonn Technologies"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Logo />
        </motion.button>

        <motion.nav
          className="desktop-nav"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
        >
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </motion.nav>

        <motion.div
          className="nav-actions"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
        >
          <button className="nav-login" onClick={() => go("contact")}>Log in</button>
          <button className="nav-register cta-arrow-btn" onClick={() => go("contact")}>
            Register
            <ArrowRight size={15} />
          </button>
        </motion.div>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {links.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
            <div className="mobile-actions">
              <button onClick={() => go("contact")}>Log in</button>
              <button className="primary-btn" onClick={() => go("contact")}>Register</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
