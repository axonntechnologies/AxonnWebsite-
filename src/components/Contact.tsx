import { FormEvent, useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { WorldDots } from "./WorldDots";
import { sendContact } from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const field = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
};

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
      window.setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      console.error("Contact form failed:", err);
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-form-side">
        <h2>Start the Conversation</h2>
        <form onSubmit={submit}>
          {[
            <label key="n">Name<input name="name" placeholder="John Doe" required /></label>,
            <label key="e">Email<input name="email" type="email" placeholder="Email" required /></label>,
            <div className="phone-row" key="p">
              <label>
                Code
                <input
                  name="countryCode"
                  placeholder="+91"
                  defaultValue="+91"
                  pattern="\+?[0-9]{1,4}"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  required
                />
              </label>
            </div>,
            <label key="s">Subject<input name="subject" placeholder="Subject" required /></label>,
            <label key="m">Message<textarea name="message" placeholder="Message" required /></label>
          ].map((node, i) => (
            <motion.div
              key={i}
              {...field}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {node}
            </motion.div>
          ))}

          <motion.button
            className="primary-btn send-btn cta-arrow-btn"
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" && <><Loader2 size={15} className="spin" /> Sending…</>}
            {status === "sent" && <><CheckCircle2 size={16} /> Message Sent</>}
            {status === "error" && <><AlertCircle size={15} /> Try Again</>}
            {status === "idle" && <>Start the Conversation <ArrowRight size={15} /></>}
          </motion.button>

          {status === "error" && (
            <p className="form-note error">
              Couldn&apos;t send right now. Please try again or email us directly.
            </p>
          )}
          {status === "sent" && (
            <p className="form-note ok">Thanks — we&apos;ll be in touch shortly.</p>
          )}
        </form>
      </div>
      <div className="contact-map-side">
        <WorldDots />
      </div>
    </div>
  );
}
