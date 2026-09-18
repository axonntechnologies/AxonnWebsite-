import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Tag,
  MessageSquare,
  Globe2,
  Zap,
  Headphones
} from "lucide-react";
import { motion } from "motion/react";
import { WorldDots } from "./WorldDots";
import { sendContact } from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus("sending");
    try {
      await sendContact({
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        countryCode: String(fd.get("countryCode") || ""),
        phone: String(fd.get("phone") || ""),
        subject: String(fd.get("subject") || ""),
        message: String(fd.get("message") || "")
      });
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Contact form failed:", err);
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div className="contact-card-v2">
      {/* Decorative ambient background glows */}
      <div className="contact-ambient-light left" />
      <div className="contact-ambient-light right" />

      {/* =========================================================
          LEFT SIDE: CONTACT FORM (Fade + translateY reveal)
      ========================================================== */}
      <motion.div
        className="contact-form-side-v2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-heading-group">
          <span className="contact-eyebrow">Get in touch</span>
          <h2>Let’s build something smarter.</h2>
          <p>
            Connect with our trading technology specialists to explore custom algorithmic
            workflows, enterprise API integrations, or institutional deployments.
          </p>
        </div>

        <form onSubmit={submit} className="contact-form-grid">
          {/* Name Field */}
          <div className="input-field-wrap">
            <label htmlFor="contact-name">
              <span className="field-label-text">
                <User size={13} /> Name
              </span>
              <input
                id="contact-name"
                name="name"
                placeholder="John Doe"
                autoComplete="name"
                required
              />
            </label>
          </div>

          {/* Email Field */}
          <div className="input-field-wrap">
            <label htmlFor="contact-email">
              <span className="field-label-text">
                <Mail size={13} /> Work Email
              </span>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="john@firm.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          {/* Phone Field with Code */}
          <div className="input-field-wrap phone-split-row">
            <label className="code-field">
              <span className="field-label-text">Code</span>
              <input
                name="countryCode"
                placeholder="+1"
                defaultValue="+1"
                pattern="\+?[0-9]{1,4}"
                required
              />
            </label>
            <label className="phone-field">
              <span className="field-label-text">
                <Phone size={13} /> Phone Number
              </span>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="(555) 000-0000"
                autoComplete="tel"
                required
              />
            </label>
          </div>

          {/* Subject Field */}
          <div className="input-field-wrap">
            <label htmlFor="contact-subject">
              <span className="field-label-text">
                <Tag size={13} /> Subject
              </span>
              <input
                id="contact-subject"
                name="subject"
                placeholder="Institutional Strategy Integration"
                required
              />
            </label>
          </div>

          {/* Message Field */}
          <div className="input-field-wrap">
            <label htmlFor="contact-message">
              <span className="field-label-text">
                <MessageSquare size={13} /> How can we help?
              </span>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                placeholder="Tell us about your trading volume, current stack, or specific requirements..."
                required
              />
            </label>
          </div>

          {/* Action Row */}
          <div className="form-submit-row">
            <motion.button
              className="primary-btn contact-submit-btn cta-arrow-btn"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Sending message…</span>
                </>
              )}
              {status === "sent" && (
                <>
                  <CheckCircle2 size={16} />
                  <span>Message Sent Successfully</span>
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle size={16} />
                  <span>Try Again</span>
                </>
              )}
              {status === "idle" && (
                <>
                  <span>Start the Conversation</span>
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </div>

          {/* Status Feedback Notes */}
          {status === "error" && (
            <motion.p
              className="form-note error"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              We encountered an issue submitting your message. Please try again or reach out directly.
            </motion.p>
          )}
          {status === "sent" && (
            <motion.p
              className="form-note ok"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you! Your inquiry has been routed to our technical desk. We will respond promptly.
            </motion.p>
          )}
        </form>
      </motion.div>

      {/* =========================================================
          RIGHT SIDE: GLOBAL NETWORK VISUALIZATION + 3 FEATURE CARDS
          (Fade + translateX reveal)
      ========================================================== */}
      <motion.div
        className="contact-network-side"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="network-visual-wrapper">
          <WorldDots />
        </div>

        {/* Three Feature Cards in one clean aligned row */}
        <div className="network-info-grid">
          <motion.div
            className="net-info-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="net-info-icon-badge sky">
              <Headphones size={15} />
            </div>
            <div className="net-info-copy">
              <b>24/7 Support</b>
              <small>Dedicated coverage across all major market sessions.</small>
            </div>
          </motion.div>

          <motion.div
            className="net-info-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div className="net-info-icon-badge emerald">
              <Globe2 size={15} />
            </div>
            <div className="net-info-copy">
              <b>Global Operations</b>
              <small>Tier-1 colocation in NY4, LD4, and SG1 data centers.</small>
            </div>
          </motion.div>

          <motion.div
            className="net-info-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <div className="net-info-icon-badge indigo">
              <Zap size={15} />
            </div>
            <div className="net-info-copy">
              <b>Quick Response</b>
              <small>Direct engineering review within 15 minutes.</small>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
