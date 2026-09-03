import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const CONTACT = {
  phone: "09 255955556",
  viber: "09 255955556",
  telegram: "@auraenergymyanmar",
  email: "auraenergymyanmar@gmail.com",
  address: "No.474, Yadanar Pone St, 132 Quarter, East Dagon, Yangon, Myanmar",
  facebook: "https://www.facebook.com/"
};

const products = [
  {
    id:"hyd6000", cat:"Hybrid Inverters", brand:"SOFAR", code:"HYD6000-EP", name:"HYD6000-EP 6kW",
    image:"/products/hyd6000-ep.jpg",
    summary:"6kW single-phase hybrid energy-storage inverter for solar, grid and battery systems.",
    tags:["6 kW","Single-phase","2 MPPT","IP65"],
    specs:[
      ["Rated AC output","6,000 W"],["PV max input power","9,000 Wp"],["Max PV voltage","600 V"],["MPPT range","90–550 V"],["MPPT / strings","2 / 1 per MPPT"],["Max input current","13 A per MPPT"],["Battery voltage range","42–58 V"],["Max charge/discharge","100 A"],["Battery communication","CAN / RS485"],["Grid voltage","230 V, single-phase"],["Max efficiency","98.0%"],["Protection","IP65"]
    ],
    features:["On-grid and off-grid operation","EPS switchover about 10 ms","Feed-in limitation","Natural / fanless cooling","Lithium-ion and lead-acid battery support"],
    source:"https://www.sofarsolar.com/upload/file/20250114/1736844471478085568.pdf"
  },
  {
    id:"hyd20", cat:"Hybrid Inverters", brand:"SOFAR", code:"HYD20KTL-3PH", name:"HYD20KTL-3PH 20kW",
    image:"/products/hyd20ktl-3ph.jpg",
    summary:"20kW three-phase hybrid inverter for residential and small C&I energy-storage applications.",
    tags:["20 kW","Three-phase","Dual MPPT","UPS"],
    specs:[
      ["Rated AC output","20 kW"],["Max apparent output","22 kVA"],["Max PV input power","30 kWp"],["Rated grid voltage","380 / 400 / 415 V, 3-phase"],["MPPT","Dual MPPT"],["Max charge/discharge current","50 A"],["Peak output","26 kVA / 60 s"],["UPS switching","10 ms default"],["Battery inputs","Up to 2"],["Efficiency","Up to 98.2%"],["Battery / system","Energy storage hybrid"],["Use cases","Home, shop, office, small C&I"]
    ],
    features:["Three-phase unbalanced-load support on backup output","Multiple parallel systems","Two battery inputs","Multiple operating modes","UPS function for critical loads"],
    source:"https://www.sofarsolar.com/upload/file/20231223/1703311628842000137.pdf"
  },
  {
    id:"100ktlx", cat:"C&I PV Inverters", brand:"SOFAR", code:"100KTLX-G4", name:"100KTLX-G4 100kW",
    image:"/products/100ktlx-g4.png",
    summary:"High-power three-phase string inverter for commercial and industrial PV projects.",
    tags:["100 kW","10 MPPT","1100 V DC","98.6%"],
    specs:[
      ["Rated output power","100 kW"],["Max DC input voltage","1,100 V"],["Rated DC voltage","625 V"],["MPPT range","180–1,000 V"],["MPPT trackers","10"],["DC inputs","20"],["Max MPPT current","10 × 40 A"],["Max short-circuit current","10 × 50 A"],["Grid voltage","380 / 400 / 415 V, 3/N/PE"],["Grid voltage range","310–480 V"],["Max efficiency","98.60%"],["Protection","DC reverse, anti-islanding, AFCI, Type II SPD"]
    ],
    features:["150% DC input overload capability","I-V curve scanning","Type II SPD on DC and AC","Modbus communication / external Wi-Fi","Outdoor IP66 design"],
    source:"https://www.sofarsolar.com/upload/file/20251124/1763979078435042751.pdf"
  },
  {
    id:"125ktlx", cat:"C&I PV Inverters", brand:"SOFAR", code:"125KTLX-G4", name:"125KTLX-G4 125kW",
    image:"/products/125ktlx-g4.jpg",
    summary:"125kW three-phase string inverter designed for demanding commercial and industrial PV projects.",
    tags:["125 kW","10 MPPT","1100 V DC","98.6%"],
    specs:[
      ["Rated output power","125 kW"],["Max DC input voltage","1,100 V"],["Rated DC voltage","625 V"],["MPPT range","180–1,000 V"],["MPPT trackers","10"],["DC inputs","20"],["Max MPPT current","10 × 40 A"],["Max short-circuit current","10 × 50 A"],["Grid voltage","380 / 400 / 415 V, 3/N/PE"],["Max output current","190 A @ 380 V / 181.2 A @ 400 V / 174 A @ 415 V"],["Max efficiency","98.60%"],["Protection","AFCI + Type II SPD DC/AC"]
    ],
    features:["150% DC input overload capability","I-V curve scanning","High-current MPPT design","Modbus / external Wi-Fi","IP66 outdoor protection"],
    source:"https://www.sofarsolar.com/upload/file/20251124/1763979078435042751.pdf"
  },
  {
    id:"bts5k", cat:"Battery Storage", brand:"SOFAR", code:"BTS 5K", name:"BTS 5K Battery",
    image:"/products/bts5k.jpg",
    summary:"Modular 5kWh-class high-voltage lithium battery module for SOFAR storage systems.",
    tags:["5.12 kWh","High-voltage","LFP","Modular"],
    specs:[
      ["Nominal energy","5.12 kWh"],["Battery chemistry","Lithium iron phosphate (LFP)"],["System type","High-voltage modular storage"],["Expansion","Up to 4 modules per BDU"],["Installation","Wall / floor depending on system"],["Protection","System dependent; battery module designed for energy storage"],["Use cases","Residential / small C&I storage"]
    ],
    features:["Modular expansion","Plug-and-play architecture","Built-in battery management","Compatible with SOFAR storage architecture","Designed for quick installation"],
    source:"https://www2.sofarsolar.com/product/residentialstorage/battery/BTS%205K.html"
  },
  {
    id:"bdu", cat:"Battery Storage", brand:"SOFAR", code:"BTS 5K-BDU", name:"BTS 5K-BDU Battery Distribution Unit",
    image:"/products/bts5k-bdu.png",
    summary:"Battery distribution and management unit for the BTS 5K high-voltage battery system.",
    tags:["400 V class","BDU","1–4 BTS modules","Protection"],
    specs:[
      ["System voltage","400 V class"],["Maximum current","30 A"],["Supported battery modules","1–4 BTS 5K units"],["Function","Battery distribution / system management"],["Protection","Isolation switch + fuse"],["Installation","Pre-wired / wall-mounted system component"],["Use case","SOFAR high-voltage battery systems"]
    ],
    features:["Pre-wired architecture","Isolation and fuse protection","Power control","Cluster-level battery management","Designed for BTS 5K expansion"],
    source:"https://www2.sofarsolar.com/product/residentialstorage/battery/BTS%205K-BDU.html"
  },
  {
    id:"gtx", cat:"Battery Storage", brand:"SOFAR", code:"GTX5000S", name:"GTX5000S 5.12kWh",
    image:"/products/gtx5000s.jpg",
    summary:"51.2V LFP low-voltage battery module for residential and small backup systems.",
    tags:["5.12 kWh","51.2 V","LFP","50 A"],
    specs:[
      ["Nominal energy","5.12 kWh"],["Nominal voltage","51.2 V"],["Chemistry","LFP"],["Rated charge/discharge current","50 A"],["Parallel expansion","Up to 6 units on current SOFAR product page"],["Protection rating","IP65"],["Installation","Wall-mounted / floor-mounted"],["Communication","CAN / RS485 / RS232"],["Compatible inverter family","SOFAR HYD 3000–6000-EP" ]
    ],
    features:["Automatic parallel ID allocation","Remote monitoring and software upgrades","Wall or floor installation","Safe LFP chemistry","Expandable capacity"],
    source:"https://www1.sofarsolar.com/product/residentialstorage/battery/GTX5000S.html"
  },
  {
    id:"ch1000", cat:"Monitoring & Control", brand:"SOFAR", code:"CH1000A", name:"CH1000A Control Hub",
    image:"/products/ch1000a.png",
    summary:"SOFAR control and communication hub for system monitoring, data collection and remote management.",
    tags:["Control Hub","RS485","Wi-Fi","Ethernet / 4G options"],
    specs:[
      ["Product type","Control Hub / data collector"],["Power input","100–240 VAC"],["DC output","12 V / 2 A"],["Interfaces","RS485, Wi-Fi, Ethernet / optional 4G depending on variant"],["Operating temperature","Approx. −30 to +65 °C"],["Protection","IP20"],["Use case","PV / ESS monitoring and communication"]
    ],
    features:["Centralized data collection","Remote monitoring","Communication gateway","System commissioning support","Cloud / app connectivity depending on configuration"],
    source:"https://www.sofarsolar.com/upload/file/20241211/1733882270596078087.pdf"
  },
  {
    id:"smartmeter", cat:"Monitoring & Control", brand:"SOFAR", code:"Smart Meter", name:"Smart Meter",
    image:"/products/smart-meter.jpg",
    summary:"Energy meter used for grid-flow measurement, export limitation and energy management.",
    tags:["Energy meter","3-phase options","RS485","Modbus"],
    specs:[
      ["Product type","Smart / energy meter"],["Typical SOFAR-supported model","Chint DTSU666 family"],["Measurement","Grid import / export and power flow"],["Communication","RS485 / Modbus on supported models"],["Mounting","DIN rail on supported models"],["Application","Feed-in limitation, self-consumption and energy monitoring"]
    ],
    features:["Grid power-flow measurement","Supports export limitation architectures","RS485 communication on supported model","DIN-rail installation on supported model","Model must match inverter / system requirements"],
    source:"https://www.sofarsolar.com/upload/file/20231103/1698999053401079637.pdf"
  },
  {
    id:"dapa314", cat:"Battery Storage", brand:"DAPA POWER", code:"DP-512314", name:"DAPA Power 51.2V 314Ah",
    image:"/products/dp-512314.jpg",
    summary:"16.08kWh floor-mounted lithium energy-storage battery for residential, commercial and backup applications.",
    tags:["51.2 V","314 Ah","16.08 kWh","LFP"],
    specs:[
      ["Nominal voltage","51.2 V"],["Capacity","314 Ah"],["Nominal energy","16.08 kWh"],["Battery type","Lithium energy-storage battery"],["Installation","Floor-mounted"],["Expansion","Modular expansion supported"],["Use cases","Residential, commercial and backup systems"]
    ],
    features:["High-capacity 16kWh-class storage","Floor-mounted cabinet design","Expandable architecture","Designed for energy-storage applications","DAPA Power lithium battery platform"],
    source:"https://dapapower.com/dp-512314-"
  }
];

const solutions = [
  ["01","Residential Energy","Hybrid inverter and battery solutions for homes, backup and energy self-consumption."],
  ["02","Commercial Solar","PV and storage solutions for shops, offices, hotels and business facilities."],
  ["03","Industrial PV","100kW–125kW class PV inverters and project-based energy systems for industrial sites."],
  ["04","C&I Energy Storage","PowerMagic and battery-storage solutions for peak shaving, backup and energy management."]
];

function App(){
  const [activeCat,setActiveCat]=useState("All");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [sent,setSent]=useState(false);
  const categories=["All",...new Set(products.map(p=>p.cat))];
  const filtered=useMemo(()=>products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(p.name+" "+p.code+" "+p.summary).toLowerCase().includes(query.toLowerCase())),[activeCat,query]);
  
  const submitQuote=(e)=>{
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    // Fallback: Opens user's default email client
    window.location.href = `mailto:${CONTACT.email}?subject=Website Quote Request`;
  };

  return <div>
    <header className="nav"><div className="container nav-inner"><a className="brand" href="#home"><img src="/aura-logo-header.png" alt="AURA ENERGY MYANMAR"/></a><nav><a href="#products">Products</a><a href="#solutions">Solutions</a><a href="#about">About</a><a href="#quote" className="nav-cta">Request a Quote</a></nav></div></header>

    <main id="home">
      <section className="hero"><div className="hero-glow"/><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span/> MYANMAR RENEWABLE ENERGY & STORAGE</div><h1>Powering a <em>Brighter</em> Tomorrow.</h1><p>Reliable solar, hybrid inverter, battery and commercial energy-storage solutions for homes, businesses and industries across Myanmar.</p><div className="hero-actions"><a href="#products" className="btn btn-gold">Explore Products</a><a href="#quote" className="btn btn-ghost">Get a Quote</a></div><div className="hero-stats"><div><strong>SOFAR</strong><span>Inverter & ESS</span></div><div><strong>DAPA</strong><span>Energy Storage</span></div><div><strong>C&I</strong><span>Business Energy</span></div></div></div><div className="hero-card"><div className="orbital"/><img src="/aura-logo-hero.png" alt="AURA Energy"/><div className="hero-card-label">SOLAR • INVERTER • BATTERY • ESS</div></div></div></section>

      <section className="trust-strip"><div className="container trust-inner"><span>AUTHORIZED PRODUCT FOCUS</span><b>SOFAR</b><i/><b>DAPA POWER</b><i/><b>HYBRID</b><i/><b>C&I ESS</b></div></section>

      <section id="products" className="section"><div className="container"><div className="section-head"><div><div className="eyebrow dark"><span/> PRODUCT CATALOG</div><h2>Professional products with <em>datasheet-level detail.</em></h2></div><p>Every product shown here is from the current supplier list. Open any product to view technical specifications, key features, product image and the manufacturer documentation reference.</p></div>
        <div className="catalog-note"><strong>10 products</strong><span>•</span><span>Supplier list only</span><span>•</span><span>Technical specifications shown for reference</span></div>
        <div className="filters"><div className="chips">{categories.map(c=><button key={c} className={activeCat===c?"chip active":"chip"} onClick={()=>setActiveCat(c)}>{c}</button>)}</div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product or model…" aria-label="Search products"/></div>
        <div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id} onClick={()=>setSelected(p)}><div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{p.brand}</span></div><div className="product-top"><span className="product-cat">{p.cat}</span><span className="product-code">{p.code}</span></div><h3>{p.name}</h3><p>{p.summary}</p><div className="tag-row">{p.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><button className="text-link" onClick={(e)=>{e.stopPropagation();setSelected(p)}}>View full datasheet →</button></article>)}</div>
      </div></section>

      <section id="solutions" className="section dark-section"><div className="container"><div className="section-head light"><div><div className="eyebrow"><span/> ENERGY SOLUTIONS</div><h2>From rooftop solar to <em>C&I storage.</em></h2></div><p>We position AURA as a solution partner—not simply a product seller.</p></div><div className="solution-grid">{solutions.map(([n,title,desc])=><div className="solution" key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p><a href="#quote">Discuss a project →</a></div>)}</div></div></section>

      <section id="about" className="section about"><div className="container about-grid"><div><div className="eyebrow dark"><span/> ABOUT AURA</div><h2>A local energy brand with a <em>future-first</em> mindset.</h2><p>AURA ENERGY MYANMAR is built around a simple idea: make dependable, smarter and cleaner energy solutions easier to source for Myanmar customers and business partners.</p><p>Our current catalog focuses on SOFAR inverter, battery, monitoring and C&I ESS products together with DAPA Power energy storage.</p></div><div className="principles"><div><b>01</b><strong>Reliable Products</strong><span>Manufacturer-backed products and technical references.</span></div><div><b>02</b><strong>Project Thinking</strong><span>Solutions selected around load, backup and energy requirements.</span></div><div><b>03</b><strong>B2B Focus</strong><span>Clear product information for installers, businesses and project partners.</span></div><div><b>04</b><strong>Long-Term Energy</strong><span>Solar, storage and smarter energy management for tomorrow.</span></div></div></div></section>

      <section id="quote" className="quote-section"><div className="container quote-grid"><div className="quote-copy"><div className="eyebrow"><span/> REQUEST A QUOTE</div><h2>Tell us what your <em>project needs.</em></h2><p>Send the product/model you are interested in and AURA Energy Myanmar will follow up with pricing, system guidance and project information.</p><div className="contact-list"><span>☎ {CONTACT.phone}</span><span>Viber: {CONTACT.viber}</span><span>Telegram: {CONTACT.telegram}</span><span>✉ {CONTACT.email}</span><span>⌖ {CONTACT.address}</span></div></div><form className="quote-form" onSubmit={submitQuote}><div className="form-row"><label>Name<input required name="name" placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company name"/></label></div><div className="form-row"><label>Phone / Viber<input required name="phone" placeholder="09…"/></label><label>Product<select name="product"><option>General enquiry</option>{products.map(p=><option key={p.id}>{p.code} — {p.name}</option>)}</select></label></div><label>Project details<textarea name="details" rows="5" placeholder="Tell us about your load, project size, battery requirement or product quantity…"/></label><button className="btn btn-gold" type="submit">Send Request</button>{sent&&<div className="success">Your request has been received. We will contact you shortly!</div>}</form></div></section>
    </main>

    <footer><div className="container footer-grid"><div><img src="/aura-logo-header.png" alt="AURA ENERGY MYANMAR"/><p>Powering a Brighter Tomorrow.</p></div><div><strong>Explore</strong><a href="#products">Products</a><a href="#solutions">Solutions</a><a href="#about">About AURA</a></div><div><strong>Contact</strong><span>{CONTACT.address}</span><span>{CONTACT.phone}</span><span>{CONTACT.telegram}</span><a href={CONTACT.facebook}>Facebook</a></div></div><div className="container copyright">© {new Date().getFullYear()} AURA ENERGY MYANMAR. All rights reserved.</div></footer>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="datasheet-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close">×</button><div className="datasheet-head"><div className="datasheet-photo"><img src={selected.image} alt={selected.name}/></div><div><div className="eyebrow dark"><span/> {selected.cat}</div><div className="datasheet-brand">{selected.brand}</div><h2>{selected.name}</h2><div className="model-code">MODEL / {selected.code}</div><p>{selected.summary}</p><div className="tag-row large">{selected.tags.map(t=><span key={t}>{t}</span>)}</div></div></div><div className="datasheet-body"><div className="spec-block"><h3>Technical Specifications</h3><div className="spec-table">{selected.specs.map(([k,v])=><div className="spec-row" key={k}><strong>{k}</strong><span>{v}</span></div>)}</div></div><div className="feature-block"><h3>Key Features</h3><ul>{selected.features.map(f=><li key={f}>{f}</li>)}</ul><div className="datasheet-actions"><a className="btn btn-gold" href={selected.source} target="_blank" rel="noreferrer">Manufacturer document ↗</a><a className="btn btn-outline" href="#quote" onClick={()=>setSelected(null)}>Request this product</a></div><small>Specifications are presented for product-information purposes and may vary by production version / regional configuration. Confirm the latest manufacturer datasheet before quotation or installation.</small></div></div></div></div>}
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);
