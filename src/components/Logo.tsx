export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`} aria-label="Axonn Technologies">
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-arrow">▲</span>
      </div>
      <div className="logo-type">
        <strong>AXONN</strong>
        <small>TECHNOLOGIES</small>
      </div>
    </div>
  );
}
