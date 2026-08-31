import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const CONTACT = {
  phone: "+95 9 XXX XXX XXX",
  viber: "+95 9 XXX XXX XXX",
  telegram: "@AURAENERGYMYANMAR",
  email: "sales@auraenergy.com.mm",
  address: "Yangon, Myanmar",
  facebook: "https://www.facebook.com/"
};

const products = [
  {cat:"DAPA Power Batteries", code:"DP-512314", name:"51.2V 314Ah", energy:"16.08 kWh", use:"Home • Commercial • Backup", desc:"High-capacity 51.2V lithium storage for larger residential and small-business systems."},
  {cat:"DAPA Power Batteries", code:"DP-512280", name:"51.2V 280Ah", energy:"14.34 kWh", use:"Home • Commercial • Backup", desc:"Large-format 48V-class storage for hybrid solar and backup applications."},
  {cat:"DAPA Power Batteries", code:"DP-512200", name:"51.2V 200Ah", energy:"10.24 kWh", use:"Home • Shop • Office", desc:"10kWh-class storage for everyday solar backup and energy shifting."},
  {cat:"DAPA Power Batteries", code:"DP-512100-P1", name:"51.2V 100Ah P1", energy:"5.12 kWh", use:"Home • Small Business", desc:"Compact 48V-class storage for smaller hybrid systems."},
  {cat:"DAPA Power Batteries", code:"Confirm", name:"51.2V 102Ah", energy:"5.22 kWh", use:"Confirm application", desc:"5kWh-class storage. Exact supplier model code should be confirmed before publication."},
  {cat:"DAPA Power Batteries", code:"DP-256100", name:"25.6V 100Ah", energy:"2.56 kWh", use:"24V-class systems", desc:"Compact lithium storage for 24V-class inverter and DC applications."},
  {cat:"DAPA Power Batteries", code:"Confirm", name:"25.6V 200Ah", energy:"5.12 kWh", use:"24V-class systems", desc:"Higher-capacity 24V-class storage. Exact supplier code to be confirmed."},
  {cat:"DAPA Power Batteries", code:"Confirm", name:"25.6V 280Ah", energy:"7.17 kWh", use:"24V-class systems", desc:"Large 24V-class storage. Exact supplier code to be confirmed."},
  {cat:"DAPA Power Batteries", code:"DP-128100", name:"12.8V 100Ah", energy:"1.28 kWh", use:"12V-class applications", desc:"Compact lithium battery for small DC and backup applications."},
  {cat:"DAPA Power Batteries", code:"DP-128200", name:"12.8V 200Ah", energy:"2.56 kWh", use:"12V-class applications", desc:"Higher-capacity 12V-class lithium storage."},
  {cat:"DAPA Power Batteries", code:"Confirm", name:"12V / 280Ah", energy:"3.58 kWh*", use:"12V-class applications", desc:"Listed from the current AURA product plan; exact voltage/model code should be confirmed. *Energy calculated at 12.8V nominal."},
  {cat:"C&I Energy Storage", code:"DP-CIES", name:"DP-CIES", energy:"Project-based", use:"Commercial • Industrial", desc:"Commercial and industrial energy-storage solution for larger projects."},
  {cat:"SOFAR PV Inverters", code:"100KTLX-G4", name:"100KTLX-G4", energy:"100 kW AC class", use:"C&I Solar", desc:"Three-phase commercial PV inverter for large rooftop and business solar projects."},
  {cat:"SOFAR PV Inverters", code:"110KTLX-G4", name:"110KTLX-G4", energy:"110 kW AC class", use:"C&I Solar", desc:"Commercial PV inverter for medium-to-large business and industrial installations."},
  {cat:"SOFAR PV Inverters", code:"125KTLX-G4", name:"125KTLX-G4", energy:"125 kW AC class", use:"C&I Solar", desc:"High-power C&I PV inverter for demanding commercial and industrial projects."},
  {cat:"SOFAR Hybrid Inverters", code:"SOFAR Hybrid", name:"Hybrid Inverter Series", energy:"Model-based", use:"Solar + Grid + Battery", desc:"Hybrid power conversion for systems combining solar, grid and battery storage."},
  {cat:"SOFAR C&I ESS", code:"PowerMagic", name:"PowerMagic C&I ESS", energy:"Project-based", use:"Factory • Hotel • Office • C&I", desc:"Integrated commercial energy-storage solution for backup, energy management and peak-demand strategies."}
];

const solutions = [
  ["01","Residential Solar","Solar + inverter + battery packages designed around home loads and backup needs."],
  ["02","Commercial Solar","Energy solutions for shops, offices, hotels, warehouses and business facilities."],
  ["03","Industrial Solar","Large PV and storage projects for factories and industrial operations."],
  ["04","C&I Energy Storage","Battery energy storage, PowerMagic and DP-CIES solutions for commercial and industrial applications."]
];

function Icon({type}) {
  const icons = {sun:"☀", battery:"▣", inverter:"⌁", factory:"▥"};
  return <span className="icon">{icons[type] || "✦"}</span>
}

function App(){
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);

  const categories = ["All", ...new Set(products.map(p=>p.cat))];
  const filtered = useMemo(()=>products.filter(p =>
    (activeCat==="All" || p.cat===activeCat) &&
    (p.name+" "+p.code+" "+p.use).toLowerCase().includes(query.toLowerCase())
  ),[activeCat,query]);

  const submitQuote = (e)=>{
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <div>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#home"><img src="/aura-logo-header.png" alt="AURA ENERGY MYANMAR"/></a>
          <nav>
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#about">About</a>
            <a href="#quote" className="nav-cta">Request a Quote</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-glow"/>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span/> MYANMAR RENEWABLE ENERGY & STORAGE</div>
              <h1>Powering a <em>Brighter</em> Tomorrow.</h1>
              <p>Reliable solar, inverter, battery and commercial energy-storage solutions for homes, businesses and industries across Myanmar.</p>
              <div className="hero-actions">
                <a href="#products" className="btn btn-gold">Explore Products</a>
                <a href="#quote" className="btn btn-ghost">Get a Quote</a>
              </div>
              <div className="hero-stats">
                <div><strong>Solar</strong><span>Panels & PV Systems</span></div>
                <div><strong>Storage</strong><span>Lithium Batteries & ESS</span></div>
                <div><strong>C&I</strong><span>Business Energy Solutions</span></div>
              </div>
            </div>
            <div className="hero-card">
              <div className="orbital"/>
              <img src="/aura-logo-hero.png" alt="AURA Energy logo"/>
              <div className="hero-card-label">SOLAR • INVERTER • BATTERY • ESS</div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span>PRODUCT CATEGORIES</span>
            <b>DAPA POWER</b><i/> <b>SOFAR</b><i/> <b>C&I ESS</b><i/> <b>ENERGY SOLUTIONS</b>
          </div>
        </section>

        <section id="products" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow dark"><span/> PRODUCT CATALOG</div>
                <h2>Energy products built for <em>real projects.</em></h2>
              </div>
              <p>Browse the current AURA Energy Myanmar product plan. Exact supplier model codes marked “Confirm” should be verified against the latest datasheet before publishing.</p>
            </div>
            <div className="filters">
              <div className="chips">{categories.map(c=><button key={c} className={activeCat===c?"chip active":"chip"} onClick={()=>setActiveCat(c)}>{c}</button>)}</div>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product or code…" aria-label="Search products"/>
            </div>
            <div className="product-grid">
              {filtered.map((p,i)=>
                <article className="product-card" key={p.code+p.name+i}>
                  <div className="product-top"><span className="product-cat">{p.cat}</span><span className="product-code">{p.code}</span></div>
                  <div className="product-icon"><Icon type={p.cat.includes("Battery")?"battery":p.cat.includes("Inverter")?"inverter":p.cat.includes("ESS")?"factory":"sun"}/></div>
                  <h3>{p.name}</h3>
                  <div className="energy">{p.energy}</div>
                  <p>{p.desc}</p>
                  <div className="use">{p.use}</div>
                  <a href="#quote" className="text-link">Request this product →</a>
                </article>
              )}
            </div>
          </div>
        </section>

        <section id="solutions" className="section dark-section">
          <div className="container">
            <div className="section-head light">
              <div>
                <div className="eyebrow"><span/> ENERGY SOLUTIONS</div>
                <h2>From rooftop solar to <em>C&I storage.</em></h2>
              </div>
              <p>We position AURA as a solution partner—not simply a product seller.</p>
            </div>
            <div className="solution-grid">
              {solutions.map(([n,title,desc])=><div className="solution" key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p><a href="#quote">Discuss a project →</a></div>)}
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container about-grid">
            <div>
              <div className="eyebrow dark"><span/> ABOUT AURA</div>
              <h2>A local energy brand with a <em>future-first</em> mindset.</h2>
              <p>AURA ENERGY MYANMAR is built around a simple idea: make dependable, smarter and cleaner energy solutions easier to source for Myanmar customers and business partners.</p>
              <p>Our focus spans solar PV, lithium battery storage, hybrid systems and commercial & industrial energy-storage projects.</p>
            </div>
            <div className="principles">
              <div><b>01</b><strong>Reliable Supply</strong><span>Product-focused sourcing for repeatable project delivery.</span></div>
              <div><b>02</b><strong>Technical Thinking</strong><span>Match products to load, backup and project requirements.</span></div>
              <div><b>03</b><strong>After-Sales Focus</strong><span>Support customers beyond the initial sale.</span></div>
            </div>
          </div>
        </section>

        <section id="quote" className="quote-section">
          <div className="container quote-grid">
            <div className="quote-copy">
              <div className="eyebrow"><span/> REQUEST A QUOTE</div>
              <h2>Tell us what you need. <em>We’ll plan the next step.</em></h2>
              <p>For solar, inverter, battery or C&I ESS requirements, send your project details and our team can follow up with the right product direction.</p>
              <div className="contact-list">
                <a href={`tel:${CONTACT.phone}`}>☎ {CONTACT.phone}</a>
                <a href={`mailto:${CONTACT.email}`}>✉ {CONTACT.email}</a>
                <span>⌖ {CONTACT.address}</span>
              </div>
            </div>
            <form className="quote-form" onSubmit={submitQuote}>
              <div className="form-row"><label>Name<input required name="name" placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company name"/></label></div>
              <div className="form-row"><label>Phone / Viber<input required name="phone" placeholder="+95 …"/></label><label>Project type<select name="type"><option>Residential Solar</option><option>Commercial Solar</option><option>Industrial Solar</option><option>Battery / ESS</option><option>C&I Project</option><option>Product Supply</option></select></label></div>
              <label>Interested products<input name="products" placeholder="e.g. DP-512314, SOFAR 125KTLX-G4"/></label>
              <label>Project details<textarea name="message" rows="5" placeholder="Load size, daily usage, backup hours, site type, quantity, or any other details…"/></label>
              <button className="btn btn-gold" type="submit">Send Quote Request →</button>
              {sent && <div className="success">Thanks. Your request is captured in this demo form. Connect the form to your preferred CRM/email backend before going live.</div>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><img src="/aura-logo-header.png" alt="AURA ENERGY MYANMAR"/><p>Powering a Brighter Tomorrow.</p></div>
          <div><strong>Explore</strong><a href="#products">Products</a><a href="#solutions">Solutions</a><a href="#about">About</a></div>
          <div><strong>Contact</strong><a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><span>{CONTACT.address}</span></div>
        </div>
        <div className="container copyright">© {new Date().getFullYear()} AURA ENERGY MYANMAR. All rights reserved.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
