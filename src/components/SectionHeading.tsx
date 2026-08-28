import { motion } from "motion/react";

export function SectionHeading({
  title,
  children,
  align = "center",
  eyebrow
}: {
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  eyebrow?: string;
}) {
  return (
    <motion.div
      className={`section-heading ${align === "left" ? "left" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}
