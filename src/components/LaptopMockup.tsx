import { motion } from "motion/react";

export function LaptopMockup() {
  return (
    <motion.div
      className="laptop-wrap"
      animate={{ y: [0, -13, 0], rotateZ: [0, 0.25, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="laptop-screen">
        <div className="screen-reflection" />
      </div>
      <div className="laptop-base"><div className="trackpad" /></div>
    </motion.div>
  );
}
