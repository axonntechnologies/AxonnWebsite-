import { ArrowUpRight, Bell, ChevronDown, CircleHelp, LayoutDashboard, LogOut, Settings2 } from "lucide-react";

export function HeroDashboard() {
  const rows = [
    ["🇪🇺 EUR/USD", "50,000", "1.0890", "+₹25,537.50", "+0.69%"],
    ["🇬🇧 GBP/USD", "40,000", "1.2710", "+₹20,324.00", "+0.46%"],
    ["🇯🇵 USD/JPY", "60,000", "151.20", "+₹43,470.00", "+0.76%"],
    ["🇦🇺 AUD/USD", "50,000", "0.6580", "+₹18,123.00", "+0.79%"]
  ];

  return (
    <div className="dashboard-shell">
      <div className="dashboard-window">
        <aside className="dashboard-sidebar">
          <div className="mini-logo">
            <div className="mini-arrow">▲</div>
            <div><b>AXONN</b><small>TECHNOLOGIES</small></div>
          </div>
          <span className="dash-label">OVERVIEW</span>
          <div className="dash-active"><LayoutDashboard size={15} /> Dashboard</div>
          <div className="dash-spacer" />
          <div className="dash-user"><span>MV</span><div><b>Manish Verma</b><small>manish.verma@example.com</small></div></div>
          <button className="dash-logout"><LogOut size={13}/> Log out</button>
        </aside>

        <main className="dashboard-main">
          <div className="dash-topbar">
            <span><span className="hamburger-lines">☰</span> <b>Dashboard</b></span>
            <span className="top-icons"><Settings2 size={15}/><Bell size={15}/></span>
          </div>

          <div className="welcome-banner">
            <small>GOOD MORNING</small>
            <strong>Manish Verma 🔥</strong>
            <span>Invested ₹5,00,000 • Since 6 Aug, 2026</span>
            <em>● MARKETS OPEN</em>
          </div>

          <div className="metric-grid">
            {[
              ["Total Portfolio Value", "₹5,12,650", "+ 2.53%", "blue"],
              ["Total P&L", "+₹12,650", "+ 2.53%", "green"],
              ["Today's P&L", "+₹3,240", "+ 0.64%", "mint"],
              ["Invested Amount", "₹5,00,000", "6 Aug, 2026", "purple"]
            ].map(([a,b,c,color]) => (
              <div className="metric" key={a}>
                <div className={`metric-icon ${color}`} />
                <div><small>{a}</small><strong>{b}</strong><em>{c}</em></div>
              </div>
            ))}
          </div>

          <div className="dashboard-panels">
            <div className="chart-panel">
              <div className="panel-title"><div><b>Portfolio Growth</b><small>Investment started on 6 Aug, 2026</small></div><span>↑ 2.53% (₹12,650)</span></div>
              <svg viewBox="0 0 600 180" className="line-chart" role="img" aria-label="Portfolio growth chart">
                <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55aef4" stopOpacity=".28"/><stop offset="100%" stopColor="#55aef4" stopOpacity=".02"/></linearGradient></defs>
                <path d="M10 150 L90 125 L180 116 L280 100 L380 80 L475 72 L590 48 L590 170 L10 170Z" fill="url(#area)"/>
                <path d="M10 150 L90 125 L180 116 L280 100 L380 80 L475 72 L590 48" fill="none" stroke="#187adf" strokeWidth="3"/>
                {[10,90,180,280,380,475,590].map((x,i) => <circle key={i} cx={x} cy={[150,125,116,100,80,72,48][i]} r="4" fill="#187adf"/>)}
              </svg>
            </div>

            <div className="allocation-panel">
              <b>Allocation</b>
              <div className="donut"><span>100%<small>Forex</small></span></div>
              <div className="legend"><span>● Forex <b>100%</b></span><span>● Cash <b>0%</b></span></div>
            </div>
          </div>

          <div className="lower-panels">
            <div className="holdings">
              <b>Forex Holdings</b>
              <div className="table-head"><span>Symbol</span><span>Pair</span><span>Quantity</span><span>Avg. Price</span><span>Current Price</span><span>P&L</span></div>
              {rows.map((r) => <div className="table-row" key={r[0]}>{r.map((x,i)=><span key={i} className={i===4 || i===5 ? "positive" : ""}>{x}</span>)}</div>)}
              <a href="#motto">View all forex holdings <ArrowUpRight size={12}/></a>
            </div>
            <div className="activity">
              <b>Recent Activity</b>
              {[
                ["7 Aug, 2026","Today's Gain","+₹3,240.00"],
                ["7 Aug, 2026","Portfolio Update","₹5,12,650.00"],
                ["6 Aug, 2026","Initial Investment","-₹5,00,000.00"],
                ["6 Aug, 2026","Account Created","Welcome to Forex Advisor"]
              ].map(([date, label, value]) => <div className="activity-row" key={label}><span>{date}</span><b>{label}</b><em>{value}</em></div>)}
              <a href="#motto">View all activity <ArrowUpRight size={12}/></a>
            </div>
          </div>

          <div className="help-bubble"><CircleHelp size={18}/></div>
        </main>
      </div>
    </div>
  );
}
