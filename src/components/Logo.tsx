import horizontalLogoImg from "../assets/axonn-sidebar-logo.png";
import stackedLogoImg from "../assets/axonn-logo.png";

interface LogoProps {
  className?: string;
  dark?: boolean;
  variant?: "horizontal" | "stacked";
}

export function Logo({ className = "", dark = false, variant = "horizontal" }: LogoProps) {
  const src = variant === "stacked" ? stackedLogoImg : horizontalLogoImg;
  return (
    <div className={`logo ${dark ? "logo-dark" : ""} ${className}`} aria-label="Axonn Technologies">
      <img
        src={src}
        alt="Axonn Technologies"
        className="logo-image"
        loading="eager"
      />
    </div>
  );
}
