import { motion } from "motion/react";

export function CloudBackground() {
  return (
    <div className="cloud-bg-container" aria-hidden="true">
      {/* Sky atmospheric base gradient */}
      <div className="sky-gradient-base" />

      {/* Layer 1: Background Soft Atmospheric Hazes */}
      <motion.div
        className="cloud-depth-layer layer-bg"
        animate={{ opacity: [0.75, 0.9, 0.75] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="cloud-haze haze-one" />
        <div className="cloud-haze haze-two" />
        <div className="cloud-haze haze-three" />
      </motion.div>

      {/* Layer 2: Midground Realistic Soft Cloud Formations */}
      <motion.div
        className="cloud-depth-layer layer-mid"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="cloud-shape cloud-top-left" />
        <div className="cloud-shape cloud-top-right" />
        <div className="cloud-shape cloud-center-mist" />
      </motion.div>

      {/* Layer 3: Foreground Soft Side Wisps & Ambient Depth */}
      <motion.div
        className="cloud-depth-layer layer-fg"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="cloud-shape cloud-wisp-left" />
        <div className="cloud-shape cloud-wisp-right" />
        <div className="cloud-shape cloud-bottom-floor" />
      </motion.div>

      {/* Ambient floating sky data particles */}
      <div className="sky-particles-wrap">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={`sky-particle particle-${i + 1}`}
            style={{
              left: `${(i * 8.5 + 4) % 96}%`,
              top: `${(i * 7.2 + 10) % 85}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${14 + (i % 5) * 3}s`
            }}
          />
        ))}
      </div>

      {/* Subtle Sky Grain Texture */}
      <div className="sky-grain" />
    </div>
  );
}
