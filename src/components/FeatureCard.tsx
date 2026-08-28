import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export function FeatureCard({
  icon: Icon,
  title,
  text,
  index
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  index: number;
}) {
  return (
    <motion.article
      className="feature-card spotlight-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <span className="feature-accent" aria-hidden="true" />
      <div className="feature-icon">
        <Icon size={22} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}
