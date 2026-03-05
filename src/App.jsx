import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════

const T = {
  pt: {
    available: "Disponível para trabalho",
    heroSub: "Fullstack Dev & Engenheira",
    heroDesc: "Transformando ideias complexas em soluções digitais — do frontend ao backend, de automações Python a sistemas com IA.",
    heroCta1: "Ver Projetos ✦",
    heroCta2: "Entrar em Contato →",
    navAbout: "Sobre", navProjects: "Projetos", navGames: "Jogos", navAuto: "Automações", navContact: "Contato",
    aboutLabel: "Sobre mim",
    aboutTitle1: "Engenheira que", aboutTitle2: "virou Dev.",
    aboutP1: "Minha base em <strong>Engenharia de Materiais</strong> me deu pensamento sistêmico, atenção a detalhes e a capacidade de ver problemas como estruturas que precisam de solução.",
    aboutP2: "Hoje construo desde interfaces React até APIs Node.js, automações Python e sistemas com IA. Cada projeto une rigor de engenharia com criatividade digital.",
    aboutP3: "Aberta a emprego, freelance e colaborações que me desafiem de verdade.",
    journeyLabel: "Jornada",
    statsRepo: "Repositórios", statsProj: "Projetos", statsTech: "Tecnologias", statsLearn: "Aprendizado",
    projectsLabel: "Projetos Destaque",
    projectsTitle1: "Código que resolve", projectsTitle2: "problemas reais.",
    projectsDesc: "Passe o mouse nos cards para ver demo e GitHub.",
    webLabel: "Web & Landing Pages",
    gamesLabel: "Jogos & Experimentos",
    gamesTitle1: "Código que", gamesTitle2: "diverte e ensina.",
    gamesDesc: "WebRTC, Canvas, Web Audio — aprendido construindo coisas que as pessoas realmente jogam.",
    gameTabAll: "✦ Todos", gameTabRpg: "⚔️ RPG", gameTabAcao: "🎮 Ação", gameTabCartas: "🃏 Cartas", gameTabMem: "🧠 Memória", gameTabInt: "🎹 Interativo",
    autoLabel: "Automações & N8N",
    autoTitle1: "Trabalho", autoTitle2: "automatizado.",
    autoP1: "Combinando Python e N8N para criar fluxos que eliminam trabalho repetitivo e geram valor mensurável.",
    autoP2: "Se acontece mais de uma vez, automatize.",
    autoPhil: "Filosofia: ",
    autoWip: "Em desenvolvimento ativo",
    certsLabel: "Certificações",
    certsTitle1: "Aprendizado", certsTitle2: "documentado.",
    certsDesc: "Cada certificado representa horas de estudo focado e projetos entregues.",
    contactLabel: "Contato",
    contactTitle: "Vamos construir",
    contactSub: "algo juntos?",
    contactDesc: "Aberta a emprego, freelance e colaborações. Se você tem um desafio interessante, eu tenho as ferramentas para resolvê-lo.",
    formName: "Seu nome", formEmail: "Seu email", formMsg: "Sua mensagem...", formSend: "Enviar Mensagem ✦",
    formSending: "Enviando...", formOk: "✔ Mensagem enviada!", formErr: "Erro ao enviar. Tente pelo email.",
    downloadCv: "Baixar CV",
    footer: "Feito com 💜 por",
    footerRole: "FullStack Developer & Engineer",
    playBtn: "🌐 Jogar", demoBtn: "🌐 Demo", ghBtn: "🐙 GitHub",
    triggerStep: "Trigger", triggerDesc: "Formulário, webhook ou agendamento",
    processStep: "Processamento", processDesc: "Python ou N8N nodes transformam os dados",
    intStep: "Integração", intDesc: "CRM, e-mail, Slack, planilhas",
    resultStep: "Resultado", resultDesc: "Relatório automático ou ação concluída",
    econStep: "Economia real", econDesc: "Horas de trabalho → segundos de execução",
  },
  en: {
    available: "Available for work",
    heroSub: "Fullstack Dev & Engineer",
    heroDesc: "Turning complex ideas into digital solutions — from frontend to backend, Python automations to AI-powered systems.",
    heroCta1: "View Projects ✦",
    heroCta2: "Get in Touch →",
    navAbout: "About", navProjects: "Projects", navGames: "Games", navAuto: "Automation", navContact: "Contact",
    aboutLabel: "About me",
    aboutTitle1: "Engineer who", aboutTitle2: "became a Dev.",
    aboutP1: "My background in <strong>Materials Engineering</strong> gave me systems thinking, attention to detail and the ability to see problems as structures that need solving.",
    aboutP2: "Today I build React interfaces, Node.js APIs, Python automations and AI systems. Each project combines engineering rigor with digital creativity.",
    aboutP3: "Open to employment, freelance and collaborations that truly challenge me.",
    journeyLabel: "Journey",
    statsRepo: "Repositories", statsProj: "Projects", statsTech: "Technologies", statsLearn: "Learning",
    projectsLabel: "Featured Projects",
    projectsTitle1: "Code that solves", projectsTitle2: "real problems.",
    projectsDesc: "Hover the cards to see demo and GitHub links.",
    webLabel: "Web & Landing Pages",
    gamesLabel: "Games & Experiments",
    gamesTitle1: "Code that", gamesTitle2: "entertains and teaches.",
    gamesDesc: "WebRTC, Canvas, Web Audio — learned by building things people actually play.",
    gameTabAll: "✦ All", gameTabRpg: "⚔️ RPG", gameTabAcao: "🎮 Action", gameTabCartas: "🃏 Cards", gameTabMem: "🧠 Memory", gameTabInt: "🎹 Interactive",
    autoLabel: "Automation & N8N",
    autoTitle1: "Work on", autoTitle2: "autopilot.",
    autoP1: "Combining Python and N8N to create workflows that eliminate repetitive work and generate measurable value.",
    autoP2: "If it happens more than once, automate it.",
    autoPhil: "Philosophy: ",
    autoWip: "Actively in development",
    certsLabel: "Certifications",
    certsTitle1: "Documented", certsTitle2: "learning.",
    certsDesc: "Each certificate represents focused study hours and delivered projects.",
    contactLabel: "Contact",
    contactTitle: "Let's build",
    contactSub: "something together?",
    contactDesc: "Open to employment, freelance and collaborations. If you have an interesting challenge, I have the tools to solve it.",
    formName: "Your name", formEmail: "Your email", formMsg: "Your message...", formSend: "Send Message ✦",
    formSending: "Sending...", formOk: "✔ Message sent!", formErr: "Error sending. Try via email.",
    downloadCv: "Download CV",
    footer: "Made with 💜 by",
    footerRole: "FullStack Developer & Engineer",
    playBtn: "🌐 Play", demoBtn: "🌐 Demo", ghBtn: "🐙 GitHub",
    triggerStep: "Trigger", triggerDesc: "Form, webhook or schedule",
    processStep: "Processing", processDesc: "Python or N8N nodes transform the data",
    intStep: "Integration", intDesc: "CRM, email, Slack, spreadsheets",
    resultStep: "Result", resultDesc: "Automatic report or action completed",
    econStep: "Real savings", econDesc: "Hours of work → seconds of execution",
  }
};

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const PROJECTS = (t) => [
  { id:"lumen",    title:"Lumen AI",         subtitle:t==="pt"?"Triagem de Emails com IA":"AI Email Triage",        desc:t==="pt"?"Classifica emails corporativos com IA, sugere respostas automáticas e reduz tempo operacional em até 60%. Arquitetura híbrida com XAI.":"Classifies corporate emails with AI, suggests automatic replies and reduces operational time by up to 60%. Hybrid XAI architecture.", tags:["Python","IA/LLM","XAI"],     accent:"#f472b6", icon:"🤖", links:{ live:"https://lumen-triage.vercel.app/",                                gh:"https://github.com/AnnyKaah/lumen-triage" },              bg:"#200028" },
  { id:"terras",   title:"Terras de Ferro",   subtitle:t==="pt"?"RPG Cooperativo P2P":"Cooperative P2P RPG",         desc:t==="pt"?"RPG para 2 jogadores em tempo real via WebRTC/PeerJS. Sistema Ironsworn, UI cinematográfica com parallax e glassmorphism. PWA instalável.":"2-player real-time RPG via WebRTC/PeerJS. Ironsworn system, cinematic UI with parallax and glassmorphism. Installable PWA.", tags:["WebRTC","PeerJS","PWA"],     accent:"#fb7185", icon:"⚔️", links:{ live:"https://annykaah.github.io/terras-de-ferro-rpg/",          gh:"https://github.com/AnnyKaah/terras-de-ferro-rpg" },       bg:"#1a0a14" },
  { id:"habithero",title:"HabitHero",          subtitle:t==="pt"?"App FullStack de Hábitos":"FullStack Habit App",    desc:t==="pt"?"App gamificado com React + TypeScript e backend escalável. Sistema de recompensas que incentiva consistência.":"Gamified app with React + TypeScript and scalable backend. Reward system that encourages consistency.", tags:["TypeScript","React","Node.js"], accent:"#60a5fa", icon:"🦸", links:{                                                                      gh:"https://github.com/AnnyKaah/HabitHero" },                 bg:"#0a1628" },
  { id:"croche",   title:"Calc. Crochê",       subtitle:t==="pt"?"Precificação para Artesãos":"Pricing for Artisans", desc:t==="pt"?"Cronômetro integrado, gestão de materiais, Chart.js e exportação PDF. Chega de chutes no preço!":"Integrated timer, material management, Chart.js and PDF export. No more guessing at prices!", tags:["JavaScript","Chart.js"],      accent:"#fbbf24", icon:"🧶", links:{ live:"https://annykaah.github.io/calculadora-precifica-o-croche/", gh:"https://github.com/AnnyKaah/calculadora-precifica-o-croche" }, bg:"#1a1200" },
  { id:"gemini",   title:"Gemini AI Chat",     subtitle:t==="pt"?"Assistente com IA":"AI Assistant",                  desc:t==="pt"?"Chat integrado à API Gemini com contexto persistente e respostas em tempo real.":"Chat integrated with the Gemini API with persistent context and real-time responses.", tags:["Gemini API","JavaScript"],    accent:"#c084fc", icon:"💬", links:{                                                                      gh:"https://github.com/AnnyKaah/gemini-ai-chat-assistant" },  bg:"#0f0a1e" },
  { id:"aws",      title:"Cloud Girls AWS",    subtitle:"Bootcamp Santander · 100% ✅",                               desc:t==="pt"?"11 módulos completos: EC2, S3, Lambda, VPC, RDS, ECS, CodePipeline, CloudFormation.":"11 complete modules: EC2, S3, Lambda, VPC, RDS, ECS, CodePipeline, CloudFormation.", tags:["AWS","IaC","Serverless"],    accent:"#34d399", icon:"☁️", links:{                                                                      gh:"https://github.com/AnnyKaah/cloud-girls-aws-journey" },   bg:"#051a14" },
];

const GAMES = (t) => [
  { id:"terras-rpg", title:"Terras de Ferro",  subtitle:t==="pt"?"RPG Cooperativo P2P":"Cooperative P2P RPG",   icon:"⚔️", cat:"rpg",       color:"#fb7185", bg:"#1a0a14", techs:["WebRTC","PeerJS","PWA"],    links:{ live:"https://annykaah.github.io/terras-de-ferro-rpg/",    gh:"https://github.com/AnnyKaah/terras-de-ferro-rpg" },    big:true  },
  { id:"space",      title:"Space Runner",      subtitle:t==="pt"?"Arcade Espacial":"Space Arcade",             icon:"🚀", cat:"acao",      color:"#a855f7", bg:"#030510", techs:["Canvas","Web Audio","OOP"], links:{ live:"https://annykaah.github.io/space-runner/",           gh:"https://github.com/AnnyKaah/space-runner" },           big:false },
  { id:"ralph",      title:"Fuga do Ralph!",    subtitle:t==="pt"?"Arcade DIO":"DIO Arcade",                    icon:"🔨", cat:"acao",      color:"#f472b6", bg:"#1a0a0a", techs:["JS","HTML","CSS"],           links:{ live:"https://annykaah.github.io/detona-ralph-challenge/", gh:"https://github.com/AnnyKaah/detona-ralph-challenge" }, big:false },
  { id:"cybernexus", title:"Cyber Nexus",       subtitle:t==="pt"?"TCG com IA":"AI Card Game",                  icon:"🌀", cat:"cartas",    color:"#c084fc", bg:"#050014", techs:["JS","AI","CSS"],            links:{ live:"https://annykaah.github.io/yu-gi-oh-challenger/",    gh:"https://github.com/AnnyKaah/yu-gi-oh-challenger" },    big:false },
  { id:"memory",     title:t==="pt"?"Memória Cósmico":"Cosmic Memory", subtitle:t==="pt"?"Aventura Espacial":"Space Adventure", icon:"🪐", cat:"memoria", color:"#8b5cf6", bg:"#030510", techs:["JS","CSS Grid"],    links:{ live:"https://annykaah.github.io/memory-game-challenge/",  gh:"https://github.com/AnnyKaah/memory-game-challenge" },  big:false },
  { id:"piano",      title:"Virtual Piano",      subtitle:t==="pt"?"Experiência Musical":"Music Experience",    icon:"🎹", cat:"interativo", color:"#f472b6", bg:"#1a0a28", techs:["JS","Web Audio API"],    links:{ live:"https://annykaah.github.io/piano-challenger/",       gh:"https://github.com/AnnyKaah/piano-challenger" },       big:false },
];

const CERTS = [
  { title:"AWS Cloud Practitioner", org:"Amazon Web Services", year:"2024", icon:"☁️", color:"#f59e0b", url:"https://github.com/AnnyKaah/cloud-girls-aws-journey" },
  { title:"Santander Code Girls", org:"Santander / DIO", year:"2024", icon:"🎓", color:"#f472b6", url:"https://github.com/AnnyKaah/cloud-girls-aws-journey" },
  { title:"Ri Happy — Front-End", org:"DIO", year:"2024", icon:"⚛️", color:"#60a5fa", url:"https://github.com/AnnyKaah/HabitHero" },
  { title:"prograMaria", org:"prograMaria", year:"2024", icon:"🐍", color:"#34d399", url:"https://github.com/AnnyKaah/lumen-triage" },
  { title:"N8N Automações", org:"Hashtag Treinamentos", year:"2025", icon:"⚡", color:"#fbbf24", url:"https://github.com/AnnyKaah" },
  { title:"Python Impressionador", org:"Hashtag Treinamentos", year:"2025", icon:"🐍", color:"#a855f7", url:"https://github.com/AnnyKaah" },
];

const TIMELINE = (t) => [
  {year:"2022",icon:"⚗️",title:t==="pt"?"Engenheira de Materiais":"Materials Engineer",    desc:t==="pt"?"Graduação — pensamento sistêmico e resolução de problemas complexos.":"Degree — systems thinking and complex problem solving.", color:"#34d399"},
  {year:"2024",icon:"💻",title:t==="pt"?"Primeiro Código":"First Lines of Code",           desc:t==="pt"?"HTML, CSS, JS. A lógica de engenharia encontrou a criatividade digital.":"HTML, CSS, JS. Engineering logic met digital creativity.", color:"#60a5fa"},
  {year:"2024",icon:"🎓",title:t==="pt"?"Bootcamps Intensivos":"Intensive Bootcamps",      desc:t==="pt"?"DIO, Santander Cloud Girls AWS, prograMaria.":"DIO, Santander Cloud Girls AWS, prograMaria.", color:"#c084fc"},
  {year:"2025",icon:"🐍",title:"Python & IA / AI",                                          desc:t==="pt"?"Lumen AI, automação, documentação pública da jornada.":"Lumen AI, automation, public journey documentation.", color:"#f472b6"},
  {year:"2025",icon:"✨",title:t==="pt"?"Novos Horizontes":"New Horizons",                   desc:t==="pt"?"Nova fase — automação, IA e projetos que fazem diferença real.":"New chapter — automation, AI and projects that make a real difference.", color:"#a855f7"},
];

// ═══════════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════════

function Cursor() {
  const dot = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const move = e => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX-6}px,${e.clientY-6}px)`;
    };
    window.addEventListener("mousemove", move, { passive:true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={dot} style={{position:"fixed",width:12,height:12,background:"radial-gradient(circle,#f472b6,#a855f7)",borderRadius:"50%",pointerEvents:"none",zIndex:9999,boxShadow:"0 0 10px #f472b6,0 0 20px #a855f750",transition:"transform 0.07s linear",willChange:"transform"}}/>;
}

// ═══════════════════════════════════════════════════
// INTRO
// ═══════════════════════════════════════════════════

function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <motion.div exit={{ opacity:0, scale:1.03 }} transition={{ duration:0.45 }}
      style={{ position:"fixed", inset:0, zIndex:9998, background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:24 }}>
      {phase === 0 && (
        <div style={{ textAlign:"center" }}>
          <div style={{ width:160, height:2, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden" }}>
            <motion.div initial={{ width:0 }} animate={{ width:"100%" }} transition={{ duration:0.55 }}
              style={{ height:"100%", background:"linear-gradient(90deg,#f472b6,#a855f7)" }} />
          </div>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"var(--muted)", letterSpacing:"5px", textTransform:"uppercase", marginTop:12 }}>loading</p>
        </div>
      )}
      {phase === 1 && (
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} style={{ textAlign:"center" }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.8rem,8vw,7rem)", fontWeight:900, background:"linear-gradient(135deg,#f472b6,#c084fc,#8b5cf6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:"-1px" }}>
            Anny Karoline
          </h1>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.64rem", color:"var(--muted)", letterSpacing:"5px", textTransform:"uppercase", marginTop:12 }}>
            FullStack Developer & Engineer
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════

function ContactForm({ t }) {
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | err

  const submit = async () => {
    if (!form.name || !form.email || !form.msg) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mgonwewg", {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify({ name:form.name, email:form.email, message:form.msg }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  };

  if (status === "ok") return (
    <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
      style={{ background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.3)", borderRadius:14, padding:"28px 24px", textAlign:"center", color:"#34d399", fontWeight:600 }}>
      {t.formOk}
    </motion.div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:24 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <input placeholder={t.formName} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
          style={{ padding:"12px 16px", background:"var(--surface2)", border:"1px solid var(--br)", borderRadius:10, color:"var(--text)", fontSize:"0.88rem", fontFamily:"'DM Sans',sans-serif", outline:"none" }}/>
        <input placeholder={t.formEmail} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
          style={{ padding:"12px 16px", background:"var(--surface2)", border:"1px solid var(--br)", borderRadius:10, color:"var(--text)", fontSize:"0.88rem", fontFamily:"'DM Sans',sans-serif", outline:"none" }}/>
      </div>
      <textarea placeholder={t.formMsg} rows={4} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}
        style={{ padding:"12px 16px", background:"var(--surface2)", border:"1px solid var(--br)", borderRadius:10, color:"var(--text)", fontSize:"0.88rem", fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"vertical" }}/>
      {status === "err" && <p style={{ color:"#f87171", fontSize:"0.8rem" }}>{t.formErr}</p>}
      <button onClick={submit} disabled={status==="sending"}
        style={{ padding:"13px 28px", background:"linear-gradient(135deg,#f472b6,#a855f7)", color:"#fff", border:"none", borderRadius:50, fontWeight:700, fontSize:"0.88rem", fontFamily:"'DM Sans',sans-serif", cursor:"pointer", opacity:status==="sending"?0.7:1, transition:"opacity 0.2s, transform 0.2s" }}
        onMouseOver={e=>e.target.style.transform="translateY(-2px)"} onMouseOut={e=>e.target.style.transform="none"}>
        {status === "sending" ? t.formSending : t.formSend}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// CARD COMPONENTS
// ═══════════════════════════════════════════════════

function ProjectCard({ p, big, t }) {
  return (
    <motion.div className="pcard" data-big={String(big)}
      initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-50px" }} transition={{ duration:0.5 }}
      style={{ gridColumn: big ? "span 2" : "span 1", background:p.bg, "--accent":p.accent }}>
      <div className="pcard-top" style={{ height: big ? 200 : 150 }}>
        <span className="pcard-icon">{p.icon}</span>
        <span className="pcard-label">{p.subtitle}</span>
        <div className="pcard-overlay">
          {p.links?.live && <a href={p.links.live} target="_blank" rel="noreferrer" className="pcard-btn pcard-fill">{t.demoBtn}</a>}
          {p.links?.gh   && <a href={p.links.gh}   target="_blank" rel="noreferrer" className="pcard-btn pcard-out">{t.ghBtn}</a>}
        </div>
      </div>
      <div className="pcard-body">
        <h3 className="pcard-title">{p.title}</h3>
        <p className="pcard-desc">{p.desc}</p>
        <div className="tags">{p.tags.map(tg=><span key={tg} className="tag">{tg}</span>)}</div>
      </div>
    </motion.div>
  );
}

function GameCard({ g, t }) {
  return (
    <motion.div className="gcard" initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.28 }}
      style={{ gridColumn: g.big ? "span 2" : "span 1", background:g.bg, "--gc":g.color }}>
      <div className="gcard-top" style={{ height: g.big ? 175 : 140 }}>
        <span className="gcard-icon">{g.icon}</span>
        <span className="gcard-label">{g.subtitle}</span>
        <div className="gcard-overlay">
          {g.links?.live && <a href={g.links.live} target="_blank" rel="noreferrer" className="gcard-btn gcard-fill">{t.playBtn}</a>}
          <a href={g.links?.gh} target="_blank" rel="noreferrer" className="gcard-btn gcard-out">{t.ghBtn}</a>
        </div>
      </div>
      <div className="gcard-body">
        <h3 className="gcard-title">{g.title}</h3>
        <div className="tags">{g.techs.map(tg=><span key={tg} className="tag">{tg}</span>)}</div>
      </div>
    </motion.div>
  );
}


// ═══════════════════════════════════════════════════
// CSS STARS (zero JS, zero canvas, pure CSS)
// ═══════════════════════════════════════════════════

function Stars() {
  // Generate star data once (memo-stable, no re-renders)
  const stars = Array.from({length:80}, (_,i) => ({
    x: (i * 137.508) % 100,          // golden angle distribution
    y: (i * 97.31 + 13) % 100,
    size: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
    delay: (i * 0.23) % 4,
    dur: 2.5 + (i * 0.17) % 2.5,
  }));
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      {stars.map((s,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          borderRadius:"50%",
          background: i%3===0?"#f472b6": i%3===1?"#c084fc":"#ffffff",
          animation:`star-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          boxShadow: s.size>=2 ? `0 0 ${s.size*3}px currentColor` : "none",
        }}/>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════

export default function App() {
  const [ready, setReady]   = useState(false);
  const [lang, setLang]     = useState("pt");
  const [dark, setDark]     = useState(true);
  const [gameTab, setGameTab] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30 });

  const t = T[lang];
  const projects = PROJECTS(lang);
  const games    = GAMES(lang);
  const timeline = TIMELINE(lang);
  const filtered = games.filter(g => gameTab === "all" || g.cat === gameTab);

  const GAME_TABS = [
    {key:"all",label:t.gameTabAll},{key:"rpg",label:t.gameTabRpg},{key:"acao",label:t.gameTabAcao},
    {key:"cartas",label:t.gameTabCartas},{key:"memoria",label:t.gameTabMem},{key:"interativo",label:t.gameTabInt},
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [scrolled]);

  const navLinks = [
    ["about", t.navAbout], ["python", t.navProjects], ["games", t.navGames],
    ["automation", t.navAuto], ["contact", t.navContact],
  ];

  return (
    <div data-theme={dark ? "dark" : "light"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

        [data-theme="dark"]  { --bg:#0d0a14; --sf:#140f20; --surface2:#1e1630; --br:rgba(180,100,255,0.13); --text:#f2ecff; --muted:#a090be; --card:#140f20; --sep:rgba(168,85,247,0.18); }
        [data-theme="light"] { --bg:#faf8ff; --sf:#f0ecff; --surface2:#e8e0ff; --br:rgba(140,80,220,0.18); --text:#1a0f2e; --muted:#6b5a8e; --card:#fff; --sep:rgba(140,80,220,0.18); }

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box }
        html { scroll-behavior:smooth; background:var(--bg) }
        body { background:var(--bg) !important; color:var(--text) !important; font-family:'DM Sans',sans-serif; overflow-x:hidden; cursor:none; min-height:100vh; transition:background 0.3s, color 0.3s }
        #root { background:var(--bg); min-height:100vh }
        @media (pointer:coarse) { body { cursor:auto } }
        ::-webkit-scrollbar { width:4px }
        ::-webkit-scrollbar-track { background:var(--bg) }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#a855f7,#f472b6); border-radius:2px }
        a, button { cursor:none }
        input, textarea { transition:border-color 0.2s }
        input:focus, textarea:focus { border-color:#a855f7 !important }
        input::placeholder, textarea::placeholder { color:var(--muted) }

        /* NOISE */
        [data-theme="dark"] body::after { content:''; position:fixed; inset:0; opacity:0.35; pointer-events:none; z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E") }

        /* BLOBS */
        .blob { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; animation:bfloat 12s ease-in-out infinite alternate }
        .blob1 { width:480px; height:480px; background:radial-gradient(circle,rgba(168,85,247,0.1),transparent 70%); top:-80px; right:-80px }
        .blob2 { width:360px; height:360px; background:radial-gradient(circle,rgba(244,114,182,0.08),transparent 70%); bottom:10%; left:-60px; animation-delay:-5s }
        @keyframes bfloat { from{transform:translate(0,0)} to{transform:translate(18px,26px)} }
        @media (max-width:768px) { .blob { display:none } }

        /* PROGRESS */
        .prog { position:fixed; top:0; left:0; right:0; height:2px; z-index:300; background:linear-gradient(90deg,#f472b6,#a855f7,#8b5cf6); transform-origin:left }

        /* NAV */
        nav { position:fixed; top:0; left:0; right:0; z-index:200; padding:0 56px; height:68px; display:flex; align-items:center; justify-content:space-between; transition:background 0.4s, border 0.4s }
        nav.sc { background:rgba(var(--nav-bg,13,10,20),0.92); backdrop-filter:blur(20px); border-bottom:1px solid var(--br) }
        [data-theme="dark"]  nav.sc { background:rgba(13,10,20,0.92) }
        [data-theme="light"] nav.sc { background:rgba(250,248,255,0.94) }
        .logo { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:900; background:linear-gradient(135deg,#f472b6,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; text-decoration:none; cursor:none }
        .nav-links { display:flex; gap:32px; list-style:none; align-items:center }
        .nav-links a { color:var(--muted); text-decoration:none; font-size:0.76rem; font-weight:500; letter-spacing:2px; text-transform:uppercase; transition:color 0.2s; cursor:none }
        .nav-links a:hover { color:var(--text) }
        .nav-controls { display:flex; gap:8px; align-items:center }
        .ctrl-btn { padding:5px 11px; border-radius:20px; border:1px solid var(--br); background:transparent; color:var(--muted); font-size:0.72rem; font-weight:600; cursor:none; transition:all 0.2s; font-family:'DM Sans',sans-serif }
        .ctrl-btn:hover, .ctrl-btn.on { background:rgba(168,85,247,0.12); border-color:#a855f7; color:var(--text) }
        .hamburger { display:none; background:none; border:none; flex-direction:column; gap:5px; padding:6px; cursor:none }
        .hamburger span { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:all 0.3s }
        @media (max-width:900px) {
          nav { padding:0 20px }
          .nav-links { display:none }
          .hamburger { display:flex }
        }
        .mobile-menu { position:fixed; top:68px; left:0; right:0; background:var(--sf); border-bottom:1px solid var(--br); z-index:190; padding:16px 20px 20px; display:flex; flex-direction:column; gap:4px }
        .mobile-menu a { color:var(--muted); text-decoration:none; font-size:0.9rem; font-weight:500; padding:10px 0; border-bottom:1px solid var(--br); cursor:none; transition:color 0.2s }
        .mobile-menu a:last-child { border-bottom:none }
        .mobile-menu a:hover { color:var(--text) }
        .mobile-controls { display:flex; gap:8px; margin-top:12px }

        /* HELPERS */
        .gt { background:linear-gradient(135deg,#f472b6,#c084fc,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }
        .sl-label { font-family:'Space Mono',monospace; font-size:0.67rem; color:#f472b6; letter-spacing:4px; text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:10px }
        .sl-label::before { content:''; display:block; width:24px; height:1px; background:linear-gradient(90deg,#f472b6,transparent) }
        .sep { height:1px; background:linear-gradient(90deg,transparent,var(--sep) 30%,var(--sep) 70%,transparent); position:relative; z-index:2 }
        .si { max-width:1200px; margin:0 auto; padding:100px 80px; position:relative; z-index:2 }
        .dark-sec { background:var(--bg) }
        .surf-sec { background:var(--sf) }
        .sec-title { font-family:'Playfair Display',serif; font-weight:700; line-height:1.12; margin-bottom:14px }

        /* BTNS */
        .bp { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f472b6,#a855f7); color:#fff; padding:13px 26px; border-radius:50px; text-decoration:none; font-weight:700; font-size:0.88rem; border:none; font-family:'DM Sans',sans-serif; box-shadow:0 6px 22px rgba(168,85,247,0.38); transition:box-shadow 0.25s, transform 0.2s }
        .bp:hover { box-shadow:0 12px 36px rgba(168,85,247,0.55); transform:translateY(-2px) }
        .bo { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#c084fc; padding:13px 26px; border-radius:50px; text-decoration:none; font-weight:600; font-size:0.88rem; border:1.5px solid rgba(192,132,252,0.35); font-family:'DM Sans',sans-serif; transition:all 0.22s }
        .bo:hover { background:rgba(192,132,252,0.08); border-color:#c084fc; transform:translateY(-2px) }
        .tags { display:flex; gap:5px; flex-wrap:wrap }
        .tag { font-size:0.63rem; color:var(--muted); background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.08) }
        [data-theme="light"] .tag { background:rgba(0,0,0,0.04); border-color:rgba(0,0,0,0.08) }

        /* HERO */
        .hero { min-height:100vh; display:flex; align-items:center; padding:110px 80px 70px; position:relative }
        .hero-g { display:grid; grid-template-columns:1.1fr 0.9fr; gap:70px; align-items:center; width:100%; max-width:1200px; margin:0 auto; position:relative; z-index:2 }

        /* PHOTO */
        .photo-wrap { width:200px; height:200px; border-radius:50%; margin:0 auto 28px; position:relative }
        .photo-ring { position:absolute; inset:-4px; border-radius:50%; background:linear-gradient(135deg,#f472b6,#a855f7,#8b5cf6); z-index:0 }
        .photo-inner { position:absolute; inset:4px; border-radius:50%; overflow:hidden; z-index:1; background:var(--surface2) }
        .photo-inner img { width:100%; height:100%; object-fit:cover }
        .photo-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:4rem }

        /* TERMINAL */
        .terminal { background:var(--sf); border:1px solid var(--br); border-radius:16px; overflow:hidden; box-shadow:0 24px 70px rgba(0,0,0,0.4) }
        .th { background:var(--surface2); padding:12px 16px; display:flex; align-items:center; gap:7px; border-bottom:1px solid var(--br) }
        .td { width:10px; height:10px; border-radius:50% }
        .tt { margin-left:7px; font-family:'Space Mono',monospace; font-size:0.7rem; color:var(--muted) }
        .tb { padding:20px 22px; font-family:'Space Mono',monospace; font-size:0.76rem; line-height:2 }
        .tp { color:#f472b6 } .tc { color:var(--text) } .to { color:var(--muted); margin-left:12px; display:block }
        .tk { color:#c084fc } .tv { color:#86efac }
        .cur { display:inline-block; width:7px; height:14px; background:#f472b6; animation:blink 1s step-end infinite; vertical-align:middle }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes star-twinkle { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.4)} }
        [data-theme="light"] .star-layer { opacity:0.3 }

        /* ABOUT */
        .ag { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:start }
        .stk { display:flex; flex-wrap:wrap; gap:8px; margin-top:22px }
        .si2 { display:flex; align-items:center; gap:6px; padding:7px 12px; background:var(--surface2); border:1px solid var(--br); border-radius:8px; font-size:0.77rem; color:var(--text); transition:all 0.2s; cursor:default }
        .si2:hover { border-color:#a855f7; transform:translateY(-2px) }
        .sg { display:grid; grid-template-columns:1fr 1fr; gap:11px }
        .sc2 { background:var(--bg); border:1px solid var(--br); border-radius:13px; padding:18px; text-align:center; transition:all 0.22s; cursor:default }
        .sc2:hover { border-color:rgba(244,114,182,0.3); transform:translateY(-3px) }
        .sn { font-family:'Playfair Display',serif; font-size:2.1rem; font-weight:900; background:linear-gradient(135deg,#f472b6,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }
        .sl2 { font-size:0.67rem; color:var(--muted); margin-top:3px; letter-spacing:1px; text-transform:uppercase }
        .tl { position:relative }
        .tl::before { content:''; position:absolute; left:23px; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,#a855f7,transparent) }

        /* PROJECT CARDS */
        .pg { display:grid; grid-template-columns:repeat(3,1fr); gap:16px }
        .pcard { border-radius:18px; overflow:hidden; border:1px solid var(--br); transition:border-color 0.25s, box-shadow 0.25s, transform 0.25s }
        .pcard:hover { transform:translateY(-6px); box-shadow:0 22px 55px rgba(0,0,0,0.45) }
        .pcard-top { position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden }
        .pcard-icon { font-size:3rem; transition:transform 0.3s }
        .pcard:hover .pcard-icon { transform:scale(1.15) }
        .pcard-label { position:absolute; top:11px; left:11px; padding:3px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14); border-radius:50px; font-size:0.6rem; font-weight:700; color:#f2ecff; letter-spacing:1px; text-transform:uppercase; backdrop-filter:blur(5px) }
        .pcard-overlay { position:absolute; inset:0; background:rgba(13,10,20,0.88); display:flex; align-items:center; justify-content:center; gap:10px; opacity:0; transition:opacity 0.2s; backdrop-filter:blur(7px) }
        .pcard:hover .pcard-overlay { opacity:1 }
        .pcard-btn { padding:9px 18px; border-radius:50px; text-decoration:none; font-size:0.78rem; font-weight:700; cursor:none; transition:transform 0.15s }
        .pcard-btn:hover { transform:scale(1.05) }
        .pcard-fill { background:linear-gradient(135deg,var(--accent,#f472b6),#a855f7); color:#fff }
        .pcard-out { background:rgba(255,255,255,0.09); color:#fff; border:1px solid rgba(255,255,255,0.2) }
        .pcard-body { padding:16px 20px 20px; background:var(--card) }
        .pcard-title { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700; color:var(--text); margin-bottom:7px }
        .pcard[data-big="true"] .pcard-title { font-size:1.3rem }
        .pcard-desc { font-size:0.8rem; color:var(--muted); line-height:1.7; margin-bottom:11px }

        /* GAME CARDS */
        .gg { display:grid; grid-template-columns:repeat(3,1fr); gap:14px }
        .gcard { border-radius:16px; overflow:hidden; border:1px solid var(--br); transition:border-color 0.25s, box-shadow 0.25s, transform 0.25s }
        .gcard:hover { transform:translateY(-5px); box-shadow:0 16px 44px rgba(0,0,0,0.4) }
        .gcard-top { position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden }
        .gcard-icon { font-size:2.4rem; transition:transform 0.28s }
        .gcard:hover .gcard-icon { transform:scale(1.18) }
        .gcard-label { position:absolute; top:10px; left:10px; padding:3px 9px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.13); border-radius:50px; font-size:0.59rem; font-weight:700; color:var(--gc,#f472b6); letter-spacing:1px; text-transform:uppercase; backdrop-filter:blur(5px) }
        .gcard-overlay { position:absolute; inset:0; background:rgba(13,10,20,0.86); display:flex; align-items:center; justify-content:center; gap:9px; opacity:0; transition:opacity 0.18s; backdrop-filter:blur(6px) }
        .gcard:hover .gcard-overlay { opacity:1 }
        .gcard-btn { padding:8px 16px; border-radius:50px; text-decoration:none; font-size:0.76rem; font-weight:700; cursor:none }
        .gcard-fill { background:linear-gradient(135deg,var(--gc,#f472b6),#a855f7); color:#fff }
        .gcard-out { background:rgba(255,255,255,0.08); color:#fff; border:1px solid rgba(255,255,255,0.2) }
        .gcard-body { padding:12px 16px 16px; background:var(--card) }
        .gcard-title { font-family:'Playfair Display',serif; font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:7px }

        /* TABS */
        .tabs { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:28px }
        .tab { padding:8px 16px; border-radius:50px; border:1.5px solid var(--br); background:transparent; color:var(--muted); font-size:0.76rem; font-weight:500; cursor:none; transition:all 0.2s; font-family:'DM Sans',sans-serif }
        .tab:hover { border-color:#a855f7; color:var(--text) }
        .tab.active { background:linear-gradient(135deg,#f472b6,#a855f7); border-color:transparent; color:#fff; box-shadow:0 4px 16px rgba(168,85,247,0.38) }

        /* CERTS */
        .cg { display:grid; grid-template-columns:repeat(3,1fr); gap:14px }
        .cert { background:var(--card); border:1px solid var(--br); border-radius:14px; padding:18px 20px; display:flex; align-items:center; gap:14px; transition:all 0.22s; cursor:default }
        .cert:hover { transform:translateY(-3px); border-color:rgba(244,114,182,0.3); box-shadow:0 12px 30px rgba(0,0,0,0.25) }
        .cert-icon { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0 }
        .cert-org { font-size:0.68rem; color:var(--muted); margin-top:2px }
        .cert-year { font-family:'Space Mono',monospace; font-size:0.62rem; color:var(--muted); margin-top:4px }

        /* AUTOMATION */
        .auto-g { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center }
        .flow { display:flex; flex-direction:column; gap:10px }
        .fs { background:var(--bg); border:1px solid var(--br); border-radius:12px; padding:14px 16px; display:flex; align-items:center; gap:13px; transition:all 0.22s; position:relative; cursor:default }
        .fs:not(:last-child)::after { content:'↓'; position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); color:#a855f7; font-size:0.7rem; z-index:2 }
        .fs:hover { border-color:#a855f7; transform:translateX(6px) }
        .fi { width:36px; height:36px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0; background:rgba(168,85,247,0.12) }
        .csb { display:inline-flex; align-items:center; gap:7px; padding:7px 14px; background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.26); border-radius:50px; font-size:0.74rem; color:#c084fc; margin-top:14px }
        .csd { width:6px; height:6px; border-radius:50%; background:#c084fc; animation:blink 1.5s ease-in-out infinite }

        /* CONTACT */
        .cc { max-width:680px; margin:0 auto; padding:100px 40px; position:relative; z-index:2 }
        .ccard { background:var(--card); border:1px solid var(--br); border-radius:22px; padding:50px 44px; position:relative; overflow:hidden }
        .ccard::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:260px; height:2px; background:linear-gradient(90deg,transparent,#f472b6,#a855f7,transparent) }
        .cl { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:24px }
        .cl a { display:flex; align-items:center; gap:8px; padding:11px 18px; border-radius:10px; background:var(--surface2); border:1px solid var(--br); color:var(--text); text-decoration:none; font-size:0.81rem; font-weight:500; transition:all 0.22s; cursor:none }
        .cl a:hover { border-color:#f472b6; transform:translateY(-3px); box-shadow:0 8px 24px rgba(244,114,182,0.16) }

        /* WEB MINI */
        .wg { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:22px }
        .wcard { background:var(--card); border:1px solid var(--br); border-radius:13px; padding:18px; transition:all 0.22s }
        .wcard:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(0,0,0,0.3) }

        /* BADGES */
        .bpk { padding:5px 13px; border-radius:50px; font-size:0.71rem; font-weight:500; color:#f472b6; border:1px solid rgba(244,114,182,0.35); background:rgba(244,114,182,0.07) }
        .bpp { padding:5px 13px; border-radius:50px; font-size:0.71rem; font-weight:500; color:#c084fc; border:1px solid rgba(192,132,252,0.35); background:rgba(192,132,252,0.07) }
        .bvl { padding:5px 13px; border-radius:50px; font-size:0.71rem; font-weight:500; color:#a5b4fc; border:1px solid rgba(165,180,252,0.35); background:rgba(165,180,252,0.07) }

        /* ─── RESPONSIVE ─────────────────────────────── */
        @media (max-width:900px) {
          .si { padding:70px 20px }
          .hero { padding:90px 20px 60px }
          .hero-g { grid-template-columns:1fr }
          .hero-vis { display:none !important }
          .ag { grid-template-columns:1fr; gap:36px }
          .pg { grid-template-columns:1fr }
          .pcard[data-big="true"] { grid-column:span 1 }
          .gg { grid-template-columns:1fr }
          .gcard[style*="span 2"] { grid-column:span 1 !important }
          .cg { grid-template-columns:1fr 1fr }
          .wg { grid-template-columns:1fr }
          .auto-g { grid-template-columns:1fr; gap:36px }
          .cc { padding:70px 16px }
          .ccard { padding:36px 22px }
          .sg { grid-template-columns:1fr 1fr }
          .cl { flex-direction:column; align-items:stretch }
          .cl a { justify-content:center }
        }
        @media (max-width:500px) {
          .cg { grid-template-columns:1fr }
          .tabs { gap:5px }
          .tab { padding:7px 12px; font-size:0.72rem }
          .hero-g { gap:28px }
          .sec-title { font-size:clamp(1.8rem,7vw,2.6rem) !important }
        }
      `}</style>

      {/* INTRO */}
      <AnimatePresence>{!ready && <Intro onDone={() => setReady(true)} />}</AnimatePresence>

      {/* CURSOR */}
      <Cursor />

      {/* STARS */}
      <Stars />

      {/* BLOBS */}
      <div className="blob blob1" /><div className="blob blob2" />

      {/* PROGRESS */}
      <motion.div className="prog" style={{ scaleX }} />

      {/* NAV */}
      <nav className={scrolled ? "sc" : ""}>
        <a href="#home" className="logo">AK.</a>
        <ul className="nav-links">
          {navLinks.map(([id, lbl]) => <li key={id}><a href={`#${id}`}>{lbl}</a></li>)}
          <li style={{ display:"flex", gap:7 }}>
            <button className={`ctrl-btn ${lang==="pt"?"on":""}`} onClick={() => setLang("pt")}>PT</button>
            <button className={`ctrl-btn ${lang==="en"?"on":""}`} onClick={() => setLang("en")}>EN</button>
            <button className="ctrl-btn" onClick={() => setDark(!dark)} title="Toggle theme">
              {dark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
        {/* hamburger */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div className="nav-controls" style={{ display:"flex", gap:6 }}>
            <button className={`ctrl-btn ${lang==="pt"?"on":""}`} onClick={() => setLang("pt")}>PT</button>
            <button className={`ctrl-btn ${lang==="en"?"on":""}`} onClick={() => setLang("en")}>EN</button>
            <button className="ctrl-btn" onClick={() => setDark(!dark)}>{dark?"☀️":"🌙"}</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.2 }}>
            {navLinks.map(([id, lbl]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{lbl}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="hero dark-sec" id="home">
        <div className="hero-g">
          {/* LEFT */}
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:ready?1:0, y:ready?0:28 }} transition={{ duration:0.75, delay:0.1 }}>
            <motion.p initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.35 }}
              style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.68rem", color:"#f472b6", letterSpacing:"4px", textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ width:24, height:1, background:"#f472b6", display:"block" }}/>
              {t.available}
            </motion.p>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.65 }}
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(3rem,5.5vw,5.8rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-2px", color:"var(--text)", marginBottom:2 }}>
              Anny
            </motion.h1>
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.52, duration:0.65 }}
              className="gt" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(3rem,5.5vw,5.8rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-2px", marginBottom:16, display:"block" }}>
              Karoline
            </motion.h1>

            <motion.h2 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1rem,1.8vw,1.55rem)", fontWeight:400, fontStyle:"italic", color:"var(--muted)", marginBottom:20 }}>
              {t.heroSub}
            </motion.h2>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
              style={{ color:"var(--muted)", fontSize:"0.94rem", lineHeight:1.85, maxWidth:440, marginBottom:28 }}>
              {t.heroDesc}
            </motion.p>

            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
              style={{ display:"flex", gap:11, flexWrap:"wrap" }}>
              <a href="#python" className="bp">{t.heroCta1}</a>
              <a href="#contact" className="bo">{t.heroCta2}</a>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05 }}
              style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:24 }}>
              {["JavaScript","Python","React","Node.js","AWS","WebRTC","FullStack"].map((b,i) => (
                <span key={b} className={i%3===0?"bpk":i%3===1?"bpp":"bvl"}>{b}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — terminal */}
          <motion.div className="hero-vis" initial={{ opacity:0, x:28, scale:0.95 }} animate={{ opacity:ready?1:0, x:0, scale:1 }} transition={{ duration:0.75, delay:0.25 }}>
            <div className="terminal">
              <div className="th">
                <div className="td" style={{background:"#ff5f57"}}/><div className="td" style={{background:"#febc2e"}}/><div className="td" style={{background:"#28c840"}}/>
                <span className="tt">anny@dev ~ portfolio.py</span>
              </div>
              <div className="tb">
                <span className="tp">$ </span><span className="tc">python portfolio.py</span><br/><br/>
                <span className="to"><span className="tk">dev</span> = {"{"}</span>
                <span className="to">&nbsp;&nbsp;<span className="tk">"nome"</span>: <span className="tv">"Anny Karoline"</span>,</span>
                <span className="to">&nbsp;&nbsp;<span className="tk">"stack"</span>: [<span className="tv">"JS"</span>, <span className="tv">"Python"</span>, <span className="tv">"React"</span>],</span>
                <span className="to">&nbsp;&nbsp;<span className="tk">"status"</span>: <span className="tv">"open_to_work ✦"</span></span>
                <span className="to">{"}"}</span><br/>
                <span className="to" style={{color:"#86efac"}}>✔ {lang==="pt"?"Pronta para o próximo desafio.":"Ready for the next challenge."}</span><br/>
                <span className="tp">$ </span><span className="cur"/>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ ABOUT ═════════════════════════════════════════════ */}
      <section id="about" className="surf-sec">
        <div className="si">
          <div className="ag">
            <div>
              <motion.p className="sl-label" initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>{t.aboutLabel}</motion.p>
              <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                className="sec-title" style={{fontSize:"clamp(2rem,3.8vw,3rem)",marginBottom:18}}>
                <span style={{display:"block",color:"var(--text)"}}>{t.aboutTitle1}</span>
                <span className="gt" style={{display:"block"}}>{t.aboutTitle2}</span>
              </motion.div>
              {[t.aboutP1, t.aboutP2, t.aboutP3].map((txt, i) => (
                <motion.p key={i} dangerouslySetInnerHTML={{__html:txt.replace(/<strong>/g,"<strong style='color:#c084fc'>")}}
                  initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                  style={{color:"var(--muted)",lineHeight:1.9,marginBottom:13,fontSize:"0.91rem"}}/>
              ))}
              <div className="stk">
                {["⚡ JavaScript","🐍 Python","⚛️ React","🟢 Node.js","☕ Java","☁️ AWS","🐳 Docker","🗄️ SQL/NoSQL"].map(s => (
                  <span key={s} className="si2">{s}</span>
                ))}
              </div>
            </div>

            <div>
              {/* PHOTO */}
              <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                className="photo-wrap">
                <div className="photo-ring"/>
                <div className="photo-inner">
                  {/* Replace src with your actual photo path e.g. src="/foto.jpg" */}
                  <img src="/perfil.jpeg" alt="Anny Karoline" />
                </div>
              </motion.div>

              <div className="sg">
                {[[("30+"),t.statsRepo],[("10+"),t.statsProj],[("5+"),t.statsTech],[("∞"),t.statsLearn]].map(([n,l],i) => (
                  <motion.div key={l} className="sc2" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}>
                    <div className="sn">{n}</div><div className="sl2">{l}</div>
                  </motion.div>
                ))}
              </div>

              <div style={{marginTop:32}}>
                <p className="sl-label" style={{marginBottom:18}}>{t.journeyLabel}</p>
                <div className="tl">
                  {timeline.map((item, i) => (
                    <motion.div key={i} initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                      style={{display:"flex",gap:14,alignItems:"flex-start",paddingBottom:22,position:"relative"}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:`${item.color}12`,border:`2px solid ${item.color}36`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0,zIndex:1}}>
                        {item.icon}
                      </div>
                      <div>
                        <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.58rem",color:item.color,letterSpacing:"2px",display:"block",marginBottom:3}}>{item.year}</span>
                        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"0.94rem",fontWeight:700,color:"var(--text)",marginBottom:4}}>{item.title}</h3>
                        <p style={{fontSize:"0.77rem",color:"var(--muted)",lineHeight:1.6}}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ PROJECTS ══════════════════════════════════════════ */}
      <section id="python" className="dark-sec">
        <div className="si">
          <motion.p className="sl-label" initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>{t.projectsLabel}</motion.p>
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="sec-title" style={{fontSize:"clamp(2rem,3.8vw,3rem)",marginBottom:12}}>
            <span style={{display:"block",color:"var(--text)"}}>{t.projectsTitle1}</span>
            <span className="gt" style={{display:"block"}}>{t.projectsTitle2}</span>
          </motion.div>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            style={{color:"var(--muted)",fontSize:"0.91rem",lineHeight:1.75,maxWidth:480,marginBottom:44}}>
            {t.projectsDesc}
          </motion.p>
          <div className="pg">
            {projects.map((p, i) => <ProjectCard key={p.id} p={p} big={i<2} t={t} />)}
          </div>

          {/* Web mini */}
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginTop:52}}>
            <p className="sl-label" style={{marginBottom:4}}>{t.webLabel}</p>
            <div className="wg">
              {[{title:"Universo & Lei da Atração",icon:"🌌",color:"#c084fc",live:"https://annykaah.github.io/universe-law-landing-page/",gh:"https://github.com/AnnyKaah/universe-law-landing-page",techs:["HTML","CSS","JS"]},
                {title:"E-commerce JS",icon:"🛒",color:"#fbbf24",gh:"https://github.com/AnnyKaah/ecommecer-JS-hash",techs:["JavaScript","HTML"]},
                {title:lang==="pt"?"Primeira Página Web":"First Web Page",icon:"🌱",color:"#34d399",gh:"https://github.com/AnnyKaah/minha-primeira-pagina-web",techs:["HTML","CSS","JS"]},
              ].map(p => (
                <div key={p.title} className="wcard">
                  <div style={{fontSize:"1.7rem",marginBottom:9}}>{p.icon}</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"0.9rem",fontWeight:700,marginBottom:8,color:"var(--text)"}}>{p.title}</h3>
                  <div className="tags" style={{marginBottom:11}}>
                    {p.techs.map(tg => <span key={tg} className="tag">{tg}</span>)}
                  </div>
                  <div style={{display:"flex",gap:11}}>
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{fontSize:"0.73rem",color:p.color,textDecoration:"none",fontWeight:600,cursor:"none"}}>{t.demoBtn} →</a>}
                    <a href={p.gh} target="_blank" rel="noreferrer" style={{fontSize:"0.73rem",color:"var(--muted)",textDecoration:"none",cursor:"none"}}>{t.ghBtn}</a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ GAMES ═════════════════════════════════════════════ */}
      <section id="games" className="surf-sec">
        <div className="si">
          <motion.p className="sl-label" initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>{t.gamesLabel}</motion.p>
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="sec-title" style={{fontSize:"clamp(2rem,3.8vw,3rem)",marginBottom:12}}>
            <span style={{display:"block",color:"var(--text)"}}>{t.gamesTitle1}</span>
            <span className="gt" style={{display:"block"}}>{t.gamesTitle2}</span>
          </motion.div>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            style={{color:"var(--muted)",fontSize:"0.91rem",lineHeight:1.75,maxWidth:480,marginBottom:36}}>
            {t.gamesDesc}
          </motion.p>
          <div className="tabs">
            {GAME_TABS.map(tab => (
              <button key={tab.key} className={`tab ${gameTab===tab.key?"active":""}`} onClick={() => setGameTab(tab.key)}>{tab.label}</button>
            ))}
          </div>
          <div className="gg">
            {filtered.map(g => <GameCard key={g.id} g={g} t={t} />)}
          </div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ CERTS ═════════════════════════════════════════════ */}
      <section className="dark-sec">
        <div className="si">
          <motion.p className="sl-label" initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>{t.certsLabel}</motion.p>
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="sec-title" style={{fontSize:"clamp(2rem,3.8vw,3rem)",marginBottom:12}}>
            <span style={{display:"block",color:"var(--text)"}}>{t.certsTitle1}</span>
            <span className="gt" style={{display:"block"}}>{t.certsTitle2}</span>
          </motion.div>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            style={{color:"var(--muted)",fontSize:"0.91rem",marginBottom:36}}>{t.certsDesc}</motion.p>
          <div className="cg">
            {CERTS.map((c, i) => (
              <motion.a key={c.title} href={c.url} target="_blank" rel="noreferrer" className="cert"
                initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}}
                style={{textDecoration:"none",cursor:"none"}}>
                <div className="cert-icon" style={{background:`${c.color}18`}}>{c.icon}</div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"0.88rem",fontWeight:700,color:"var(--text)"}}>{c.title}</div>
                  <div className="cert-org">{c.org}</div>
                  <div className="cert-year">{c.year}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ AUTOMATION ════════════════════════════════════════ */}
      <section id="automation" className="surf-sec">
        <div className="si">
          <div className="auto-g">
            <div>
              <motion.p className="sl-label" initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>{t.autoLabel}</motion.p>
              <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                className="sec-title" style={{fontSize:"clamp(2rem,3.8vw,3rem)",marginBottom:16}}>
                <span style={{display:"block",color:"var(--text)"}}>{t.autoTitle1}</span>
                <span className="gt" style={{display:"block"}}>{t.autoTitle2}</span>
              </motion.div>
              {[t.autoP1, t.autoP2].map((txt, i) => (
                <motion.p key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                  style={{color:"var(--muted)",lineHeight:1.85,marginBottom:11,fontSize:"0.91rem"}}>
                  {i===1?<><strong style={{color:"#c084fc"}}>{t.autoPhil}</strong>{txt}</>:txt}
                </motion.p>
              ))}
              <div className="csb"><div className="csd"/>{t.autoWip}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>
                {["N8N","Python","APIs REST","Webhooks","CRM"].map((b,i) => (
                  <span key={b} className={i%3===0?"bpk":i%3===1?"bpp":"bvl"}>{b}</span>
                ))}
              </div>
            </div>
            <motion.div className="flow" initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.55}}>
              {[[("📥"),t.triggerStep,t.triggerDesc],[("⚙️"),t.processStep,t.processDesc],[("🔗"),t.intStep,t.intDesc],[("📊"),t.resultStep,t.resultDesc],[("✅"),t.econStep,t.econDesc]].map(([icon,title,desc],i) => (
                <motion.div key={i} className="fs" initial={{opacity:0,x:18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.06}}
                  style={i===4?{borderColor:"rgba(244,114,182,0.22)"}:{}}>
                  <div className="fi" style={i===4?{background:"rgba(244,114,182,0.1)"}:{}}>{icon}</div>
                  <div>
                    <strong style={{display:"block",fontSize:"0.84rem",color:i===4?"#f472b6":"var(--text)",marginBottom:2}}>{title}</strong>
                    <span style={{fontSize:"0.75rem",color:"var(--muted)"}}>{desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="sep"/>

      {/* ══ CONTACT ═══════════════════════════════════════════ */}
      <section id="contact" className="dark-sec">
        <div className="cc">
          <p className="sl-label" style={{justifyContent:"center"}}>{t.contactLabel}</p>
          <motion.div className="ccard" initial={{opacity:0,y:28,scale:0.97}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{duration:0.55}}>
            <div style={{fontSize:"clamp(1.7rem,3.5vw,2.5rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.2,marginBottom:11,color:"var(--text)"}}>
              {t.contactTitle}<br/><span className="gt">{t.contactSub}</span>
            </div>
            <p style={{color:"var(--muted)",lineHeight:1.85,fontSize:"0.91rem"}}>{t.contactDesc}</p>

            {/* CONTACT FORM */}
            <ContactForm t={t} />

            <div style={{margin:"24px 0",height:1,background:"var(--br)"}}/>

            <div className="cl">
              {[{icon:"📧",label:"annykamartins@icloud.com",href:"mailto:annykamartins@icloud.com"},
                {icon:"💼",label:"LinkedIn",href:"https://www.linkedin.com/in/annykarolinedecarvalhomartins"},
                {icon:"🐙",label:"GitHub",href:"https://github.com/AnnyKaah"},
              ].map(l => <a key={l.label} href={l.href} target="_blank" rel="noreferrer"><span>{l.icon}</span>{l.label}</a>)}
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{textAlign:"center",padding:"24px",color:"var(--muted)",fontSize:"0.73rem",borderTop:"1px solid var(--br)",position:"relative",zIndex:2,background:"var(--bg)"}}>
        <p>{t.footer} <span className="gt">Anny Karoline</span> · 2025 · {t.footerRole}</p>
      </footer>
    </div>
  );
}
