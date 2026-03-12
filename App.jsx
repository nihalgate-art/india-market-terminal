import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────
// STOCK DATA — 40 stocks (20 LT Conviction + 20 Trading)
// ─────────────────────────────────────────────────────────────────────
const STOCKS = [
  // ── LT Conviction (20) ──────────────────────────────────────────
  { id:1,  name:"Bajaj Finance",     ticker:"BAJFINANCE", sector:"NBFC",          list:"conviction", basePrice:6840,  mktCap:"4,23,000", pe:28,  roce:11, roe:22, de:"3.8x", high52:7800, low52:5900, support:6400, resistance:7200, setup:"BUY",      conviction:"HIGH", target:"30–40%" },
  { id:2,  name:"Titan Company",     ticker:"TITAN",      sector:"Consumer",      list:"conviction", basePrice:3420,  mktCap:"3,04,000", pe:68,  roce:31, roe:32, de:"0.1x", high52:3900, low52:2800, support:3200, resistance:3700, setup:"BUY",      conviction:"HIGH", target:"20–30%" },
  { id:3,  name:"Zomato",            ticker:"ZOMATO",     sector:"Internet",      list:"conviction", basePrice:218,   mktCap:"1,92,000", pe:180, roce:9,  roe:8,  de:"0.0x", high52:290,  low52:140,  support:195,  resistance:245,  setup:"BUY",      conviction:"HIGH", target:"40–60%" },
  { id:4,  name:"SBI Life",          ticker:"SBILIFE",    sector:"Insurance",     list:"conviction", basePrice:1480,  mktCap:"1,48,000", pe:65,  roce:15, roe:16, de:"0.0x", high52:1700, low52:1200, support:1380, resistance:1580, setup:"BUY",      conviction:"HIGH", target:"25–35%" },
  { id:5,  name:"TCS",               ticker:"TCS",        sector:"IT Services",   list:"conviction", basePrice:3960,  mktCap:"14,35,000",pe:26,  roce:72, roe:53, de:"0.0x", high52:4400, low52:3400, support:3750, resistance:4100, setup:"BUY",      conviction:"HIGH", target:"20–25%" },
  { id:6,  name:"Polycab India",     ticker:"POLYCAB",    sector:"Cables",        list:"conviction", basePrice:6120,  mktCap:"92,000",   pe:38,  roce:24, roe:24, de:"0.1x", high52:7400, low52:4800, support:5800, resistance:6500, setup:"BUY",      conviction:"HIGH", target:"30–35%" },
  { id:7,  name:"Divi's Labs",       ticker:"DIVISLAB",   sector:"Pharma",        list:"conviction", basePrice:5180,  mktCap:"1,38,000", pe:58,  roce:21, roe:19, de:"0.0x", high52:5800, low52:3800, support:4900, resistance:5500, setup:"BUY",      conviction:"HIGH", target:"25–35%" },
  { id:8,  name:"Cholamandalam",     ticker:"CHOLAFIN",   sector:"NBFC",          list:"conviction", basePrice:1240,  mktCap:"1,02,000", pe:25,  roce:10, roe:21, de:"5.2x", high52:1500, low52:900,  support:1150, resistance:1320, setup:"BUY",      conviction:"HIGH", target:"30–40%" },
  { id:9,  name:"HAL",               ticker:"HAL",        sector:"Defence",       list:"conviction", basePrice:4150,  mktCap:"2,77,000", pe:32,  roce:40, roe:29, de:"0.0x", high52:5000, low52:3200, support:3900, resistance:4500, setup:"BUY",      conviction:"HIGH", target:"30–40%" },
  { id:10, name:"APL Apollo",        ticker:"APLAPOLLO",  sector:"Steel Tubes",   list:"conviction", basePrice:1520,  mktCap:"42,000",   pe:44,  roce:27, roe:28, de:"0.2x", high52:1900, low52:1200, support:1400, resistance:1650, setup:"BUY",      conviction:"HIGH", target:"25–35%" },
  { id:11, name:"Persistent Sys",    ticker:"PERSISTENT", sector:"Mid IT",        list:"conviction", basePrice:5240,  mktCap:"80,000",   pe:55,  roce:33, roe:27, de:"0.0x", high52:6000, low52:3800, support:4900, resistance:5600, setup:"BUY",      conviction:"HIGH", target:"25–30%" },
  { id:12, name:"Cummins India",     ticker:"CUMMINSIND", sector:"Industrial",    list:"conviction", basePrice:3080,  mktCap:"85,000",   pe:42,  roce:32, roe:28, de:"0.0x", high52:3600, low52:2400, support:2850, resistance:3250, setup:"BUY",      conviction:"MED",  target:"20–25%" },
  { id:13, name:"Kaynes Tech",       ticker:"KAYNES",     sector:"EMS",           list:"conviction", basePrice:4680,  mktCap:"25,000",   pe:75,  roce:22, roe:18, de:"0.4x", high52:5500, low52:3000, support:4300, resistance:5000, setup:"BUY",      conviction:"HIGH", target:"40–50%" },
  { id:14, name:"M&M",               ticker:"M&M",        sector:"Auto",          list:"conviction", basePrice:2380,  mktCap:"2,96,000", pe:26,  roce:17, roe:18, de:"0.4x", high52:3200, low52:1800, support:2200, resistance:2600, setup:"BUY",      conviction:"HIGH", target:"25–35%" },
  { id:15, name:"Astral Ltd",        ticker:"ASTRAL",     sector:"Building Mat",  list:"conviction", basePrice:1720,  mktCap:"46,000",   pe:68,  roce:24, roe:22, de:"0.1x", high52:2100, low52:1400, support:1600, resistance:1850, setup:"BUY",      conviction:"MED",  target:"20–25%" },
  { id:16, name:"Indian Hotels",     ticker:"INDHOTEL",   sector:"Hospitality",   list:"conviction", basePrice:572,   mktCap:"81,000",   pe:75,  roce:14, roe:16, de:"0.3x", high52:700,  low52:420,  support:540,  resistance:620,  setup:"BUY",      conviction:"MED",  target:"25–30%" },
  { id:17, name:"Coforge",           ticker:"COFORGE",    sector:"Mid IT",        list:"conviction", basePrice:6540,  mktCap:"44,000",   pe:38,  roce:25, roe:22, de:"0.2x", high52:8000, low52:5000, support:6200, resistance:7000, setup:"BUY",      conviction:"MED",  target:"20–25%" },
  { id:18, name:"KEI Industries",    ticker:"KEI",        sector:"Cables",        list:"conviction", basePrice:3480,  mktCap:"31,000",   pe:42,  roce:25, roe:22, de:"0.0x", high52:4200, low52:2600, support:3200, resistance:3750, setup:"BUY",      conviction:"MED",  target:"25–30%" },
  { id:19, name:"Godrej Properties", ticker:"GODREJPROP", sector:"Real Estate",   list:"conviction", basePrice:2560,  mktCap:"71,000",   pe:45,  roce:10, roe:12, de:"0.6x", high52:3200, low52:1900, support:2400, resistance:2750, setup:"BUY",      conviction:"MED",  target:"25–30%" },
  { id:20, name:"Lupin",             ticker:"LUPIN",      sector:"Pharma",        list:"conviction", basePrice:1940,  mktCap:"88,000",   pe:30,  roce:14, roe:16, de:"0.3x", high52:2400, low52:1500, support:1800, resistance:2100, setup:"BUY",      conviction:"MED",  target:"20–25%" },
  // ── Trading Watchlist (20) ───────────────────────────────────────
  { id:21, name:"Tata Motors",       ticker:"TATAMOTORS", sector:"Auto",          list:"trading",    basePrice:748,   mktCap:"2,75,000", pe:8,   roce:12, roe:14, de:"1.2x", high52:1000, low52:620,  support:720,  resistance:780,  setup:"BREAKOUT", conviction:"—",    target:"₹850"   },
  { id:22, name:"NMDC",              ticker:"NMDC",       sector:"Mining",        list:"trading",    basePrice:258,   mktCap:"75,000",   pe:9,   roce:22, roe:18, de:"0.0x", high52:290,  low52:180,  support:240,  resistance:265,  setup:"52W HIGH", conviction:"—",    target:"₹290"   },
  { id:23, name:"Suzlon Energy",     ticker:"SUZLON",     sector:"Renewables",    list:"trading",    basePrice:62,    mktCap:"87,000",   pe:38,  roce:18, roe:22, de:"0.3x", high52:78,   low52:38,   support:58,   resistance:65,   setup:"MOMENTUM", conviction:"—",    target:"₹75"    },
  { id:24, name:"SBI",               ticker:"SBIN",       sector:"Banking",       list:"trading",    basePrice:784,   mktCap:"6,98,000", pe:10,  roce:8,  roe:15, de:"12x",  high52:900,  low52:620,  support:760,  resistance:800,  setup:"BREAKOUT", conviction:"—",    target:"₹880"   },
  { id:25, name:"HCL Tech",          ticker:"HCLTECH",    sector:"IT",            list:"trading",    basePrice:1645,  mktCap:"4,46,000", pe:28,  roce:30, roe:24, de:"0.0x", high52:2000, low52:1400, support:1620, resistance:1680, setup:"PULLBACK", conviction:"—",    target:"₹1850"  },
  { id:26, name:"BEL",               ticker:"BEL",        sector:"Defence",       list:"trading",    basePrice:308,   mktCap:"2,25,000", pe:42,  roce:28, roe:20, de:"0.0x", high52:380,  low52:220,  support:295,  resistance:320,  setup:"BREAKOUT", conviction:"—",    target:"₹360"   },
  { id:27, name:"Tata Power",        ticker:"TATAPOWER",  sector:"Power",         list:"trading",    basePrice:448,   mktCap:"1,43,000", pe:32,  roce:10, roe:12, de:"1.4x", high52:550,  low52:320,  support:430,  resistance:465,  setup:"BREAKOUT", conviction:"—",    target:"₹520"   },
  { id:28, name:"PFC",               ticker:"PFC",        sector:"Infra Fin",     list:"trading",    basePrice:432,   mktCap:"1,43,000", pe:7,   roce:9,  roe:18, de:"8x",   high52:580,  low52:360,  support:420,  resistance:455,  setup:"REVERSAL", conviction:"—",    target:"₹510"   },
  { id:29, name:"Cipla",             ticker:"CIPLA",      sector:"Pharma",        list:"trading",    basePrice:1598,  mktCap:"1,29,000", pe:28,  roce:20, roe:18, de:"0.1x", high52:1800, low52:1200, support:1580, resistance:1640, setup:"BREAKOUT", conviction:"—",    target:"₹1800"  },
  { id:30, name:"Deepak Nitrite",    ticker:"DEEPAKNTR",  sector:"Chemicals",     list:"trading",    basePrice:2548,  mktCap:"36,000",   pe:32,  roce:22, roe:20, de:"0.1x", high52:3000, low52:1800, support:2460, resistance:2600, setup:"BREAKOUT", conviction:"—",    target:"₹2900"  },
  { id:31, name:"NTPC Green",        ticker:"NTPCGREEN",  sector:"Green Energy",  list:"trading",    basePrice:134,   mktCap:"1,42,000", pe:65,  roce:7,  roe:8,  de:"0.8x", high52:160,  low52:100,  support:128,  resistance:142,  setup:"IPO BASE", conviction:"—",    target:"₹165"   },
  { id:32, name:"Prestige Estates",  ticker:"PRESTIGE",   sector:"Real Estate",   list:"trading",    basePrice:1548,  mktCap:"62,000",   pe:42,  roce:12, roe:14, de:"0.8x", high52:1900, low52:1100, support:1520, resistance:1600, setup:"BREAKOUT", conviction:"—",    target:"₹1800"  },
  { id:33, name:"Kotak Bank",        ticker:"KOTAKBANK",  sector:"Banking",       list:"trading",    basePrice:1948,  mktCap:"3,87,000", pe:20,  roce:7,  roe:14, de:"9x",   high52:2400, low52:1700, support:1920, resistance:2000, setup:"REVERSAL", conviction:"—",    target:"₹2200"  },
  { id:34, name:"Indus Towers",      ticker:"INDUSTOWER", sector:"Telecom Infra", list:"trading",    basePrice:382,   mktCap:"1,01,000", pe:18,  roce:16, roe:24, de:"0.6x", high52:430,  low52:260,  support:365,  resistance:395,  setup:"52W HIGH", conviction:"—",    target:"₹430"   },
  { id:35, name:"Oil India",         ticker:"OIL",        sector:"Oil & Gas",     list:"trading",    basePrice:512,   mktCap:"64,000",   pe:8,   roce:14, roe:16, de:"0.3x", high52:680,  low52:420,  support:500,  resistance:535,  setup:"RETEST",   conviction:"—",    target:"₹600"   },
  { id:36, name:"Mphasis",           ticker:"MPHASIS",    sector:"Mid IT",        list:"trading",    basePrice:2880,  mktCap:"54,000",   pe:34,  roce:28, roe:22, de:"0.0x", high52:3400, low52:2200, support:2820, resistance:2960, setup:"TRIANGLE", conviction:"—",    target:"₹3300"  },
  { id:37, name:"Cochin Shipyard",   ticker:"COCHINSHIP", sector:"Defence",       list:"trading",    basePrice:1640,  mktCap:"43,000",   pe:28,  roce:20, roe:18, de:"0.0x", high52:2800, low52:1400, support:1600, resistance:1750, setup:"PULLBACK", conviction:"—",    target:"₹2000"  },
  { id:38, name:"Amara Raja Energy", ticker:"AMARAJABAT", sector:"Energy Stor",   list:"trading",    basePrice:1218,  mktCap:"21,000",   pe:22,  roce:18, roe:16, de:"0.1x", high52:1420, low52:800,  support:1180, resistance:1260, setup:"52W HIGH", conviction:"—",    target:"₹1420"  },
  { id:39, name:"PVR Inox",          ticker:"PVRINOX",    sector:"Media",         list:"trading",    basePrice:1498,  mktCap:"17,000",   pe:48,  roce:6,  roe:8,  de:"1.2x", high52:1900, low52:1200, support:1480, resistance:1580, setup:"REVERSAL", conviction:"—",    target:"₹1780"  },
  { id:40, name:"Aarti Industries",  ticker:"AARTIIND",   sector:"Spec Chem",     list:"trading",    basePrice:462,   mktCap:"16,000",   pe:28,  roce:12, roe:14, de:"0.8x", high52:700,  low52:380,  support:450,  resistance:485,  setup:"ROTATION", conviction:"—",    target:"₹560"   },
];

// ─────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────
const SETUP_COLORS = {
  "BUY":      { bg:"#0d2b4e", text:"#60b0ff", border:"#1e4a7a" },
  "BREAKOUT": { bg:"#0d3320", text:"#4ade80", border:"#166534" },
  "MOMENTUM": { bg:"#1a2e0d", text:"#86efac", border:"#15803d" },
  "PULLBACK": { bg:"#0f2a3d", text:"#67e8f9", border:"#0e7490" },
  "REVERSAL": { bg:"#2d1a00", text:"#fbbf24", border:"#92400e" },
  "52W HIGH": { bg:"#2d0f2d", text:"#e879f9", border:"#86198f" },
  "RETEST":   { bg:"#1a1a2e", text:"#a78bfa", border:"#5b21b6" },
  "TRIANGLE": { bg:"#0f2d2d", text:"#2dd4bf", border:"#0f766e" },
  "IPO BASE": { bg:"#2d1a2d", text:"#f0abfc", border:"#a21caf" },
  "ROTATION": { bg:"#1a2000", text:"#bef264", border:"#4d7c0f" },
};

// ─────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────
function useLivePrices(isLive) {
  const [data, setData] = useState(() =>
    STOCKS.map(s => ({
      ...s,
      price: s.basePrice,
      change: +(Math.random() * 4 - 2).toFixed(2),
      volume: Math.floor(s.basePrice < 500 ? 6e6 + Math.random() * 4e6 : 4e5 + Math.random() * 6e5),
      avgVol: Math.floor(s.basePrice < 500 ? 3e6 + Math.random() * 2e6 : 3e5 + Math.random() * 3e5),
      rsi: +(45 + Math.random() * 30).toFixed(1),
      flash: false,
    }))
  );

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      setData(prev =>
        prev.map(s => {
          const drift = (Math.random() - 0.498) * 0.0015;
          const newPrice = Math.max(s.price * (1 + drift), 1);
          return {
            ...s,
            price: newPrice,
            change: +((newPrice - s.basePrice) / s.basePrice * 100).toFixed(2),
            volume: s.volume * (1 + (Math.random() - 0.5) * 0.018),
            rsi: Math.min(88, Math.max(22, s.rsi + (Math.random() - 0.5) * 0.7)),
            flash: Math.abs(drift) > 0.001,
          };
        })
      );
    }, 1100);
    return () => clearInterval(id);
  }, [isLive]);

  return data;
}

function usePriceHistory(rawData) {
  const [histories, setHistories] = useState(() =>
    Object.fromEntries(STOCKS.map(s => [s.ticker, [s.basePrice]]))
  );
  const [flashing, setFlashing] = useState(new Set());

  useEffect(() => {
    setHistories(prev => {
      const next = { ...prev };
      rawData.forEach(s => {
        next[s.ticker] = [...(prev[s.ticker] || [s.price]), s.price].slice(-36);
      });
      return next;
    });
    const fl = new Set(rawData.filter(s => s.flash).map(s => s.ticker));
    setFlashing(fl);
    const t = setTimeout(() => setFlashing(new Set()), 400);
    return () => clearTimeout(t);
  }, [rawData]);

  return { histories, flashing };
}

// ─────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────
function Sparkline({ history, color }) {
  if (!history || history.length < 2) return <svg width={64} height={24} />;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const W = 64, H = 22;
  const points = history
    .map((v, i) => `${(i / (history.length - 1)) * W},${H - ((v - min) / range) * H}`)
    .join(" ");
  return (
    <svg width={W} height={H} style={{ display: "block", overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function RsiBar({ rsi }) {
  const v = Math.round(rsi);
  const color = v > 70 ? "#f87171" : v < 30 ? "#4ade80" : "#60b0ff";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 44, height: 5, background: "#0f2540", borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ width: `${v}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.7s ease" }} />
      </div>
      <span style={{ color, fontSize: 10, fontWeight: 600, minWidth: 22, fontVariantNumeric: "tabular-nums" }}>{v}</span>
    </div>
  );
}

function ConvBadge({ v }) {
  const styles = {
    "HIGH": { bg: "#0d2b4e", color: "#60b0ff" },
    "MED":  { bg: "#1e1200", color: "#fbbf24" },
    "—":    { bg: "#111827", color: "#374151" },
  };
  const s = styles[v] || styles["—"];
  return (
    <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>
      {v}
    </span>
  );
}

function SetupBadge({ setup }) {
  const s = SETUP_COLORS[setup] || SETUP_COLORS["BUY"];
  return (
    <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: s.bg, color: s.text, border: `1px solid ${s.border}`, whiteSpace: "nowrap" }}>
      {setup}
    </span>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 60 }}>
      <span style={{ fontSize: 8, color: "#1e3a5f", letterSpacing: 1, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 11, color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [isLive, setIsLive] = useState(true);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState({ key: "id", dir: 1 });
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());

  const rawData = useLivePrices(isLive);
  const { histories, flashing } = usePriceHistory(rawData);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const doSort = useCallback(key => {
    setSort(p => p.key === key ? { key, dir: -p.dir } : { key, dir: 1 });
  }, []);

  // Derived stats
  const gainers = rawData.filter(s => s.change > 0).length;
  const losers  = rawData.filter(s => s.change < 0).length;
  const avgChg  = (rawData.reduce((a, s) => a + s.change, 0) / rawData.length).toFixed(2);

  // Filter + sort
  const rows = rawData
    .filter(s => tab === "all" || s.list === tab)
    .filter(s => {
      if (!search) return true;
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const numKeys = ["price", "change", "rsi", "pe", "roce", "roe", "high52", "low52", "volume"];
      const av = numKeys.includes(sort.key) ? parseFloat(a[sort.key]) : a[sort.key];
      const bv = numKeys.includes(sort.key) ? parseFloat(b[sort.key]) : b[sort.key];
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
    });

  // Format helpers
  const fp = n => n >= 10000 ? n.toFixed(0) : n >= 1000 ? n.toFixed(1) : n.toFixed(2);
  const fv = n => n >= 1e7 ? (n / 1e7).toFixed(1) + "Cr" : n >= 1e5 ? (n / 1e5).toFixed(1) + "L" : Math.round(n).toLocaleString("en-IN");

  // Table header cell
  const TH = ({ k, label, right, width }) => (
    <th
      onClick={() => doSort(k)}
      style={{
        padding: "8px 5px", fontSize: 9, fontWeight: 600, cursor: "pointer", userSelect: "none",
        color: sort.key === k ? "#60b0ff" : "#475569", whiteSpace: "nowrap",
        textAlign: right ? "right" : "left",
        borderBottom: "2px solid #0d2040", width,
        fontFamily: "inherit", background: "#020b18",
        position: "sticky", top: 0, zIndex: 2,
      }}
    >
      {label}{sort.key === k ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
    </th>
  );
  const THPlain = ({ label, right, width }) => (
    <th style={{
      padding: "8px 5px", fontSize: 9, fontWeight: 600, color: "#475569",
      whiteSpace: "nowrap", textAlign: right ? "right" : "left",
      borderBottom: "2px solid #0d2040", width,
      fontFamily: "inherit", background: "#020b18",
      position: "sticky", top: 0, zIndex: 2,
    }}>{label}</th>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#020b18", color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020b18; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #020b18; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2e5a8f; }
        tr.datarow:hover td { background: #071828 !important; }
        @keyframes flashGreen { 0%,100%{} 50%{ background: rgba(74,222,128,0.12) !important; } }
        @keyframes flashRed   { 0%,100%{} 50%{ background: rgba(248,113,113,0.12) !important; } }
        .fg td { animation: flashGreen 0.4s ease; }
        .fr td { animation: flashRed   0.4s ease; }
        @keyframes livePulse { 0%,100%{ opacity:1; box-shadow: 0 0 6px #4ade80; } 50%{ opacity:0.4; box-shadow: none; } }
        .live-dot { animation: livePulse 1.8s infinite; }
        input::placeholder { color: #1e3a5f; }
        input:focus { outline: none; border-color: #1e4a7a !important; }
        button { cursor: pointer; font-family: inherit; }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* ══ STICKY HEADER ══════════════════════════════════════════ */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(2, 11, 24, 0.98)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #0d2040",
        padding: "0 20px",
      }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Logo */}
            <div style={{
              background: "linear-gradient(135deg, #1e40af, #0ea5e9)",
              borderRadius: 6, padding: "4px 11px",
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 12,
              color: "#fff", letterSpacing: 1.5,
            }}>🇮🇳 NSE</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#f0f6ff", letterSpacing: 0.5 }}>
                INDIA LIVE MARKET TERMINAL
              </div>
              <div style={{ fontSize: 8, color: "#1e3a5f", letterSpacing: 1, marginTop: 1 }}>
                40 STOCKS · SIMULATED LIVE DATA · NSE / BSE
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "#041020", border: "1px solid #0f2540", borderRadius: 20 }}>
              <div className={isLive ? "live-dot" : ""} style={{ width: 7, height: 7, borderRadius: "50%", background: isLive ? "#4ade80" : "#374151" }} />
              <span style={{ fontSize: 9, color: isLive ? "#4ade80" : "#4b5563", fontWeight: 700 }}>
                {isLive ? "LIVE SIM" : "PAUSED"}
              </span>
            </div>

            {/* Clock */}
            <span style={{ fontSize: 11, color: "#334155", fontVariantNumeric: "tabular-nums", letterSpacing: 0.5 }}>
              {time.toLocaleTimeString("en-IN", { hour12: false })} IST
            </span>

            {/* Pause / Resume */}
            <button
              onClick={() => setIsLive(v => !v)}
              style={{
                padding: "5px 14px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                background: isLive ? "#0d2b0d" : "#0d2040",
                color: isLive ? "#4ade80" : "#60b0ff",
                border: `1px solid ${isLive ? "#166534" : "#1d4ed8"}`,
                transition: "all 0.2s",
              }}
            >
              {isLive ? "⏸  PAUSE" : "▶  RESUME"}
            </button>
          </div>
        </div>

        {/* Stats ticker */}
        <div style={{ display: "flex", gap: 24, padding: "5px 0 8px", borderTop: "1px solid #050e1e", flexWrap: "wrap" }}>
          <StatPill label="WATCHING"  value="40"                          color="#60b0ff" />
          <StatPill label="GAINERS"   value={gainers}                     color="#4ade80" />
          <StatPill label="LOSERS"    value={losers}                      color="#f87171" />
          <StatPill label="AVG CHG"   value={(avgChg > 0 ? "+" : "") + avgChg + "%"} color={parseFloat(avgChg) >= 0 ? "#4ade80" : "#f87171"} />
          <StatPill label="NIFTY 50"  value="22,520  ▲0.38%"             color="#4ade80" />
          <StatPill label="SENSEX"    value="74,119  ▲0.29%"             color="#4ade80" />
          <StatPill label="INDIA VIX" value="14.2"                        color="#fbbf24" />
          <StatPill label="USD/INR"   value="83.42"                       color="#a78bfa" />
          <StatPill label="CRUDE OIL" value="$82.4 / bbl"                color="#fb923c" />
        </div>
      </header>

      {/* ══ CONTROLS ════════════════════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px", borderBottom: "1px solid #050e1e", gap: 12, flexWrap: "wrap",
      }}>
        {/* Tab filters */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { k: "all",        l: "ALL 40" },
            { k: "conviction", l: "🏆 LT CONVICTION (20)" },
            { k: "trading",    l: "📅 DAILY TRADING (20)" },
          ].map(({ k, l }) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                background: tab === k ? "#0d2b4e" : "transparent",
                color: tab === k ? "#60b0ff" : "#334155",
                border: `1px solid ${tab === k ? "#1e4a7a" : "#0d1e30"}`,
                transition: "all 0.15s",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#1e3a5f", fontSize: 12 }}>⌕</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name / ticker / sector…"
            style={{
              background: "#030d1c", border: "1px solid #0d1e30", borderRadius: 6,
              padding: "6px 12px 6px 26px", color: "#94a3b8", fontSize: 10,
              width: 240, fontFamily: "inherit", transition: "border-color 0.2s",
            }}
          />
        </div>
      </div>

      {/* ══ TABLE ════════════════════════════════════════════════════ */}
      <div style={{ overflowX: "auto", padding: "0 20px 32px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}>
          <thead>
            <tr>
              <TH      k="id"          label="#"          width={32}  />
              <TH      k="name"        label="COMPANY"    width={150} />
              <TH      k="ticker"      label="TICKER"     width={110} />
              <TH      k="sector"      label="SECTOR"     width={110} />
              <TH      k="price"       label="PRICE ₹"    width={90}  right />
              <TH      k="change"      label="CHG %"      width={80}  right />
              <THPlain                 label="SPARK"      width={70}  />
              <TH      k="volume"      label="VOLUME"     width={90}  right />
              <THPlain                 label="REL VOL"    width={75}  right />
              <TH      k="high52"      label="52W HI"     width={85}  right />
              <TH      k="low52"       label="52W LO"     width={85}  right />
              <THPlain                 label="52W POS"    width={100} />
              <THPlain                 label="MKTCAP CR"  width={90}  right />
              <TH      k="pe"          label="P/E"        width={55}  right />
              <TH      k="roce"        label="ROCE%"      width={65}  right />
              <TH      k="roe"         label="ROE%"       width={60}  right />
              <THPlain                 label="RSI"        width={85}  />
              <THPlain                 label="SUPPORT"    width={80}  />
              <THPlain                 label="RESIST"     width={80}  />
              <THPlain                 label="SETUP"      width={85}  />
              <THPlain                 label="CONV"       width={60}  />
              <THPlain                 label="TARGET"     width={80}  />
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => {
              const green = s.change >= 0;
              const cc    = green ? "#4ade80" : "#f87171";
              const rv    = s.volume / s.avgVol;
              const rvc   = rv >= 3 ? "#e879f9" : rv >= 2 ? "#60b0ff" : rv >= 1.5 ? "#67e8f9" : "#475569";
              const pos52 = Math.min(100, Math.max(0, (s.price - s.low52) / (s.high52 - s.low52) * 100));
              const from52High = ((s.price - s.high52) / s.high52 * 100).toFixed(1);
              const isNear52H  = parseFloat(from52High) > -5;
              const rowBg = i % 2 === 0 ? "#020d1f" : "#030f22";
              const isFlashing = flashing.has(s.ticker);

              return (
                <tr
                  key={s.ticker}
                  className={`datarow ${isFlashing ? (green ? "fg" : "fr") : ""}`}
                  style={{ borderBottom: "1px solid #060d1a" }}
                >
                  {/* # */}
                  <td style={{ padding: "7px 5px", background: rowBg, color: "#1e3a5f", fontSize: 9, textAlign: "center" }}>{s.id}</td>

                  {/* Company */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 148 }}>{s.name}</div>
                    <div style={{ fontSize: 8, color: "#1e3a5f", marginTop: 1 }}>D/E {s.de}</div>
                  </td>

                  {/* Ticker */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#60b0ff", letterSpacing: 0.5 }}>{s.ticker}</span>
                  </td>

                  {/* Sector */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <span style={{ fontSize: 8, color: "#64748b", background: "#0a1628", padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap" }}>{s.sector}</span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#f0f6ff", fontVariantNumeric: "tabular-nums" }}>{fp(s.price)}</span>
                  </td>

                  {/* Change % */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: cc,
                      background: green ? "rgba(74,222,128,0.07)" : "rgba(248,113,113,0.07)",
                      padding: "2px 6px", borderRadius: 4,
                    }}>
                      {green ? "+" : ""}{s.change.toFixed(2)}%
                    </span>
                  </td>

                  {/* Sparkline */}
                  <td style={{ padding: "4px 5px", background: rowBg }}>
                    <Sparkline history={histories[s.ticker]} color={cc} />
                  </td>

                  {/* Volume */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right", fontSize: 9, color: "#64748b", fontVariantNumeric: "tabular-nums" }}>
                    {fv(s.volume)}
                  </td>

                  {/* Rel Volume */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: rvc }}>{rv.toFixed(1)}x</span>
                  </td>

                  {/* 52W High */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right", fontSize: 9, color: "#475569" }}>
                    {fp(s.high52)}
                  </td>

                  {/* 52W Low */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right", fontSize: 9, color: "#475569" }}>
                    {fp(s.low52)}
                  </td>

                  {/* 52W Position bar */}
                  <td style={{ padding: "7px 8px", background: rowBg }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 50, height: 5, background: "#0f2540", borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
                        <div style={{
                          width: `${pos52}%`, height: "100%",
                          background: `hsl(${pos52 * 1.2}, 65%, 52%)`,
                          borderRadius: 3, transition: "width 0.9s ease",
                        }} />
                      </div>
                      <span style={{ fontSize: 8, color: isNear52H ? "#e879f9" : "#334155", minWidth: 36 }}>
                        {from52High}%
                      </span>
                    </div>
                  </td>

                  {/* Mkt Cap */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right", fontSize: 9, color: "#475569" }}>
                    {s.mktCap}
                  </td>

                  {/* P/E */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: s.pe > 60 ? "#fbbf24" : s.pe > 30 ? "#94a3b8" : "#4ade80" }}>
                      {s.pe}
                    </span>
                  </td>

                  {/* ROCE */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: s.roce >= 30 ? "#4ade80" : s.roce >= 20 ? "#60b0ff" : "#94a3b8" }}>
                      {s.roce}%
                    </span>
                  </td>

                  {/* ROE */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "right" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: s.roe >= 25 ? "#4ade80" : s.roe >= 15 ? "#60b0ff" : "#94a3b8" }}>
                      {s.roe}%
                    </span>
                  </td>

                  {/* RSI */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <RsiBar rsi={s.rsi} />
                  </td>

                  {/* Support */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "center" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "#4ade80" }}>₹{s.support}</span>
                  </td>

                  {/* Resistance */}
                  <td style={{ padding: "7px 5px", background: rowBg, textAlign: "center" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "#f87171" }}>₹{s.resistance}</span>
                  </td>

                  {/* Setup */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <SetupBadge setup={s.setup} />
                  </td>

                  {/* Conviction */}
                  <td style={{ padding: "7px 5px", background: rowBg }}>
                    <ConvBadge v={s.conviction} />
                  </td>

                  {/* Target */}
                  <td style={{ padding: "7px 5px", background: rowBg, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "#a78bfa" }}>{s.target}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#1e3a5f", fontSize: 12 }}>
            No stocks match "<span style={{ color: "#60b0ff" }}>{search}</span>"
          </div>
        )}
      </div>

      {/* ══ FOOTER ══════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: "1px solid #050e1e", padding: "10px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 8, color: "#0f2540" }}>
          ⚠  Prices are simulated for demo purposes. For real NSE/BSE data connect Zerodha Kite API, Upstox API, or Angel One SmartAPI.
        </span>
        <span style={{ fontSize: 8, color: "#0f2540" }}>
          INDIA MARKET TERMINAL 2026 · NSE / BSE · Built with React + Vite
        </span>
      </footer>
    </div>
  );
}
