import { useState, useEffect, useRef } from "react";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring,
  useMotionValue,
} from "framer-motion";

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const PROJECTS = [
  { id:"lumen",    title:"Lumen AI",           subtitle:"Triagem Inteligente de Emails",   desc:"Classifica emails corporativos com IA, sugere respostas automáticas e reduz tempo operacional em até 60%. Arquitetura híbrida com XAI explicando cada decisão.", tags:["Python","IA/LLM","XAI","Automação"],   accent:"#f472b6", icon:"🤖", img:"/img/lumen.png", links:{ live:"https://lumen-triage.vercel.app/",                                gh:"https://github.com/AnnyKaah/lumen-triage" },              bg:"linear-gradient(135deg,#200028 0%,#3d0f52 100%)" },
  { id:"terras",   title:"Terras de Ferro",     subtitle:"Dark Fantasy RPG Cooperativo P2P", desc:"RPG para 2 jogadores em tempo real via WebRTC/PeerJS. Sistema Ironsworn, UI cinematográfica com parallax multicamada, glassmorphism, partículas de faísca. PWA instalável.", tags:["WebRTC","PeerJS","JS ES6+","PWA"],    accent:"#fb7185", icon:"⚔️", img:"/img/terras.png", links:{ live:"https://annykaah.github.io/terras-de-ferro-rpg/",          gh:"https://github.com/AnnyKaah/terras-de-ferro-rpg" },       bg:"linear-gradient(135deg,#0d0a14 0%,#2d1035 100%)" },
  { id:"habithero",title:"HabitHero",           subtitle:"App FullStack de Hábitos",         desc:"App gamificado com React + TypeScript e backend escalável. Sistema de recompensas que incentiva consistência e constrói rotinas duradouras.", tags:["TypeScript","React","Node.js"],        accent:"#60a5fa", icon:"🦸", img:"/img/habithero.png", links:{                                                                      gh:"https://github.com/AnnyKaah/HabitHero" },                 bg:"linear-gradient(135deg,#0a1628 0%,#1a2d4e 100%)" },
  { id:"croche",   title:"Calc. de Crochê",     subtitle:"Precificação para Artesãos",       desc:"Cronômetro integrado, gestão de materiais, Chart.js, exportação PDF e login Google. Chega de chutes no preço!", tags:["JavaScript","Chart.js","html2pdf"],    accent:"#fbbf24", icon:"🧶", img:"/img/croche.png", links:{ live:"https://annykaah.github.io/calculadora-precifica-o-croche/", gh:"https://github.com/AnnyKaah/calculadora-precifica-o-croche" }, bg:"linear-gradient(135deg,#1a1200 0%,#2d2010 100%)" },
  { id:"gemini",   title:"Gemini AI Chat",      subtitle:"Assistente Conversacional com IA", desc:"Chat integrado à API Gemini com contexto persistente e respostas em tempo real. Processamento de linguagem natural avançado.", tags:["Gemini API","JavaScript"],             accent:"#c084fc", icon:"💬", img:"/img/gemini.png", links:{                                                                      gh:"https://github.com/AnnyKaah/gemini-ai-chat-assistant" },  bg:"linear-gradient(135deg,#0f0a1e 0%,#1f1040 100%)" },
  { id:"aws",      title:"Cloud Girls AWS",     subtitle:"Bootcamp Santander · 100% ✅",    desc:"11 módulos completos: EC2, S3, Lambda, VPC, RDS, ECS, CodePipeline, CloudFormation. Diário técnico com diagramas e reflexões práticas.", tags:["AWS","IaC","Serverless","YAML"],      accent:"#34d399", icon:"☁️", img:"/img/aws.png", links:{                                                                      gh:"https://github.com/AnnyKaah/cloud-girls-aws-journey" },   bg:"linear-gradient(135deg,#051a14 0%,#0a2820 100%)" },
];

const GAMES = [
  { id:"terras-rpg", title:"Terras de Ferro",    subtitle:"RPG Cooperativo P2P",      desc:"RPG para 2 jogadores via WebRTC. Sistema Ironsworn, parallax multicamada e glassmorphism.", icon:"⚔️", cat:"rpg",      color:"#fb7185", bg:"linear-gradient(135deg,#0d0a14,#2d1035)", techs:["WebRTC","PeerJS","PWA"],      links:{ live:"https://annykaah.github.io/terras-de-ferro-rpg/",       gh:"https://github.com/AnnyKaah/terras-de-ferro-rpg" },       featured:true, img:"/img/terras.png" },
  { id:"space",      title:"Space Runner",        subtitle:"Arcade Espacial Infinito", desc:"Nave arcade com asteroides, power-ups, parallax, partículas e Web Audio API.",             icon:"🚀", cat:"acao",     color:"#a855f7", bg:"linear-gradient(135deg,#030510,#0a0a28)", techs:["Canvas","Web Audio","OOP"], links:{ live:"https://annykaah.github.io/space-runner/",               gh:"https://github.com/AnnyKaah/space-runner" },              featured:false, img:"/img/space.png" },
  { id:"ralph",      title:"Fuga do Ralph!",      subtitle:"Arcade DIO Bootcamp",      desc:"Ajude o Felix a desviar dos tijolos do Ralph. Power-ups e recorde salvo localmente.",      icon:"🔨", cat:"acao",     color:"#f472b6", bg:"linear-gradient(135deg,#1a0a0a,#2d1010)", techs:["JS","HTML","CSS"],          links:{ live:"https://annykaah.github.io/detona-ralph-challenge/",    gh:"https://github.com/AnnyKaah/detona-ralph-challenge" },    featured:false, img:"/img/ralph.png" },
  { id:"cybernexus", title:"Cyber Nexus",         subtitle:"TCG Cyberpunk com IA",     desc:"TCG completo inspirado em Yu-Gi-Oh! com IA adversária em múltiplos níveis de dificuldade.", icon:"🌀", cat:"cartas",   color:"#c084fc", bg:"linear-gradient(135deg,#050014,#1a0035)", techs:["JS","IA","CSS Avançado"],   links:{ live:"https://annykaah.github.io/yu-gi-oh-challenger/",       gh:"https://github.com/AnnyKaah/yu-gi-oh-challenger" },       featured:false, img:"/img/cybernexus.png" },
  { id:"memory",     title:"Memória Cósmico",     subtitle:"Aventura Intergaláctica",  desc:"Jogo da memória com tema espacial, animações @keyframes avançadas e CSS Grid.",             icon:"🪐", cat:"memoria",  color:"#8b5cf6", bg:"linear-gradient(135deg,#030510,#0f0a28)", techs:["JS ES6+","CSS Grid"],       links:{ live:"https://annykaah.github.io/memory-game-challenge/",     gh:"https://github.com/AnnyKaah/memory-game-challenge" },     featured:false, img:"/img/memory.png" },
  { id:"piano",      title:"Virtual Piano",        subtitle:"Experiência Musical",      desc:"Piano web com tutorial, desafio de velocidade, gravação e biblioteca pessoal. Tema claro/escuro.", icon:"🎹", cat:"interativo",color:"#f472b6", bg:"linear-gradient(135deg,#1a0a28,#0d0520)", techs:["JS","Web Audio API"],      links:{ live:"https://annykaah.github.io/piano-challenger/",          gh:"https://github.com/AnnyKaah/piano-challenger" },          featured:false, img:"/img/piano.png" },
];

const GAME_TABS = [
  {key:"all",label:"✦ Todos"},{key:"rpg",label:"⚔️ RPG"},{key:"acao",label:"🎮 Ação"},
  {key:"cartas",label:"🃏 Cartas"},{key:"memoria",label:"🧠 Memória"},{key:"interativo",label:"🎹 Interativo"},
];

const TIMELINE = [
  {year:"2022",icon:"⚗️",title:"Engenheira de Materiais",   desc:"Graduação em Engenharia — pensamento sistêmico e resolução de problemas complexos.",          color:"#34d399"},
  {year:"2024",icon:"💻",title:"Primeiro Código",            desc:"HTML, CSS, JavaScript. A lógica de engenharia encontrou a criatividade digital.",              color:"#60a5fa"},
  {year:"2024",icon:"🎓",title:"Bootcamps Intensivos",       desc:"DIO Ri Happy, Santander Code Girls AWS, prograMaria. Aprendizado com projetos reais.",         color:"#c084fc"},
  {year:"2025",icon:"🐍",title:"Python & IA",               desc:"Lumen AI, automação, documentação pública da jornada. Python como superpoder.",               color:"#f472b6"},
  {year:"2025",icon:"🌍",title:"Europa & Novos Horizontes", desc:"Nova fase — construindo empresa de automação, buscando oportunidades que desafiem de verdade.", color:"#a855f7"},
];

// ═══════════════════════════════════════════════════
// PARTICLE CANVAS
// ═══════════════════════════════════════════════════

function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const mouse = { x: -999, y: -999 };
    const trail = [];
    const COLORS = ["#f472b6","#a855f7","#fb7185","#c084fc"];
    let lastTrail = 0;
    const onMove = e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      const now = Date.now();
      if (now - lastTrail > 40) {
        lastTrail = now;
        for (let i = 0; i < 2; i++) trail.push({
          x: e.clientX+(Math.random()-0.5)*5, y: e.clientY+(Math.random()-0.5)*5,
          vx:(Math.random()-0.5)*1.8, vy:(Math.random()-0.5)*1.8-0.4,
          r: Math.random()*2.2+0.6, a: 0.8, life: 1,
          c: COLORS[Math.floor(Math.random()*COLORS.length)],
        });
        if (trail.length > 35) trail.splice(0, trail.length - 35);
      }
    };
    window.addEventListener("mousemove", onMove);

    const pts = Array.from({length:28}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28,
      r: Math.random()*1.1+0.4, a: Math.random()*0.38+0.1,
      c: COLORS[Math.floor(Math.random()*COLORS.length)],
    }));

    let raf;
    const tick = () => {
      ctx.clearRect(0,0,W,H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const dx=p.x-mouse.x, dy=p.y-mouse.y, d=Math.hypot(dx,dy);
        if(d<80&&d>0){p.x+=dx/d*1.1; p.y+=dy/d*1.1;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.fill();
        for(let j=i+1;j<Math.min(i+8,pts.length);j++){
          const q=pts[j], dd=Math.hypot(p.x-q.x,p.y-q.y);
          if(dd<80){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle="#a855f7";ctx.globalAlpha=(1-dd/80)*0.08;ctx.lineWidth=0.5;ctx.stroke();}
        }
      }
      for(let i=trail.length-1;i>=0;i--){
        const p=trail[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.06;
        p.life-=0.055; p.r*=0.96;
        if(p.life<=0){trail.splice(i,1);continue;}
        ctx.beginPath();ctx.arc(p.x,p.y,Math.max(p.r,0.1),0,Math.PI*2);
        ctx.fillStyle=p.c; ctx.globalAlpha=p.life*p.a; ctx.fill();
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(tick);
    };
    tick();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("mousemove",onMove);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

// ═══════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════

function CustomCursor() {
  const ring = useRef(null), dot = useRef(null);
  const pos = useRef({x:0,y:0}), m = useRef({x:0,y:0});
  const [big, setBig] = useState(false), [click, setClick] = useState(false);

  useEffect(()=>{
    const mv = e => { m.current={x:e.clientX,y:e.clientY}; };
    const md = ()=>setClick(true), mu=()=>setClick(false);
    window.addEventListener("mousemove",mv);
    window.addEventListener("mousedown",md);
    window.addEventListener("mouseup",mu);
    const grow=()=>setBig(true), shrink=()=>setBig(false);
    document.querySelectorAll("a,button,[data-h]").forEach(el=>{
      el.addEventListener("mouseenter",grow); el.addEventListener("mouseleave",shrink);
    });
    let raf;
    const loop=()=>{
      pos.current.x+=(m.current.x-pos.current.x)*0.1;
      pos.current.y+=(m.current.y-pos.current.y)*0.1;
      if(ring.current){
        const s = click?0.6:big?2.2:1;
        ring.current.style.transform=`translate(${pos.current.x-18}px,${pos.current.y-18}px) scale(${s})`;
        ring.current.style.opacity=big?"0.35":"1";
        ring.current.style.borderColor=big?"#c084fc":"#f472b6";
      }
      if(dot.current){
        dot.current.style.transform=`translate(${m.current.x-4}px,${m.current.y-4}px) scale(${click?2.5:1})`;
      }
      raf=requestAnimationFrame(loop);
    };
    loop();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",mv);window.removeEventListener("mousedown",md);window.removeEventListener("mouseup",mu);};
  },[big,click]);

  return(<>
    <div ref={ring} style={{position:"fixed",width:36,height:36,border:"1.5px solid #f472b6",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transition:"transform 0.13s ease,opacity 0.3s,border-color 0.3s",mixBlendMode:"screen"}}/>
    <div ref={dot}  style={{position:"fixed",width:8,height:8,background:"#f472b6",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transition:"transform 0.06s ease",boxShadow:"0 0 12px #f472b6,0 0 24px #f472b660"}}/>
  </>);
}

// ═══════════════════════════════════════════════════
// INTRO SCREEN
// ═══════════════════════════════════════════════════

function Intro({onDone}){
  const [phase,setPhase]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),700);
    const t2=setTimeout(()=>setPhase(2),2300);
    const t3=setTimeout(()=>onDone(),3100);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);

  return(
    <motion.div animate={phase===2?{opacity:0,scale:1.06}:{}} transition={{duration:0.6,ease:"easeInOut"}}
      style={{position:"fixed",inset:0,zIndex:9998,background:"#0d0a14",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:28}}>
      {/* burst */}
      {phase===2&&[...Array(24)].map((_,i)=>(
        <motion.div key={i} initial={{x:0,y:0,scale:1,opacity:1}}
          animate={{x:(Math.random()-0.5)*500,y:(Math.random()-0.5)*500,scale:0,opacity:0}}
          transition={{duration:0.55,ease:"easeOut"}}
          style={{position:"absolute",width:5+Math.random()*9,height:5+Math.random()*9,borderRadius:"50%",
            background:i%2?"#f472b6":"#a855f7",boxShadow:`0 0 14px ${i%2?"#f472b6":"#a855f7"}`}}/>
      ))}

      {/* loading bar */}
      <AnimatePresence>
        {phase===0&&(
          <motion.div exit={{opacity:0,y:-20}} style={{textAlign:"center"}}>
            <div style={{width:200,height:2,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
              <motion.div initial={{width:0}} animate={{width:"100%"}} transition={{duration:0.65,ease:"easeInOut"}}
                style={{height:"100%",background:"linear-gradient(90deg,#f472b6,#a855f7)",boxShadow:"0 0 12px #f472b6"}}/>
            </div>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#a090be",letterSpacing:"5px",textTransform:"uppercase",marginTop:16}}>inicializando</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* name */}
      <AnimatePresence>
        {phase>=1&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:"center",perspective:1000}}>
            {"ANNY KAROLINE".split("").map((ch,i)=>(
              <motion.span key={i}
                initial={{opacity:0,y:80,rotateX:-90,scale:0.5}}
                animate={{opacity:1,y:0,rotateX:0,scale:1}}
                transition={{delay:i*0.045,duration:0.55,ease:[0.22,1,0.36,1]}}
                style={{display:"inline-block",fontFamily:"'Playfair Display',serif",
                  fontSize:"clamp(2.8rem,8vw,7.5rem)",fontWeight:900,
                  letterSpacing:ch===" "?"0.3em":"-1px",
                  background:"linear-gradient(135deg,#f472b6 0%,#c084fc 50%,#8b5cf6 100%)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  filter:phase===2?"blur(10px)":"none",transition:"filter 0.3s"}}>
                {ch===" "?"\u00A0":ch}
              </motion.span>
            ))}
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.75}}
              style={{fontFamily:"'Space Mono',monospace",fontSize:"0.68rem",color:"#a090be",letterSpacing:"6px",textTransform:"uppercase",marginTop:14}}>
              FullStack Developer & Engineer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════

function Magnet({children,href,className,style:s,onClick}){
  const ref=useRef(null);
  const x=useMotionValue(0),y=useMotionValue(0);
  const sx=useSpring(x,{stiffness:280,damping:18}),sy=useSpring(y,{stiffness:280,damping:18});
  const mv=e=>{const r=ref.current.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*0.38);y.set((e.clientY-r.top-r.height/2)*0.38);};
  const ml=()=>{x.set(0);y.set(0);};
  const Tag=href?"a":"button";
  return(
    <motion.div ref={ref} style={{display:"inline-block"}} onMouseMove={mv} onMouseLeave={ml}>
      <motion.div style={{x:sx,y:sy}}>
        <Tag href={href} onClick={onClick} className={className}
          target={href&&!href.startsWith("#")?"_blank":undefined}
          rel={href&&!href.startsWith("#")?"noreferrer":undefined}
          style={{display:"inline-flex",alignItems:"center",gap:8,cursor:"none",...s}}>
          {children}
        </Tag>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// GLITCH TEXT
// ═══════════════════════════════════════════════════

function Glitch({text,style:s}){
  const [on,setOn]=useState(false);
  useEffect(()=>{
    const iv=setInterval(()=>{setOn(true);setTimeout(()=>setOn(false),180);},2800+Math.random()*2000);
    return()=>clearInterval(iv);
  },[]);
  return(
    <span style={{position:"relative",display:"inline-block",...s}}>
      <span style={{position:"relative",zIndex:1}}>{text}</span>
      {on&&<>
        <span style={{position:"absolute",top:0,left:0,color:"#f472b6",clipPath:"inset(20% 0 55% 0)",transform:"translateX(-4px)",opacity:0.85,mixBlendMode:"screen",pointerEvents:"none"}}>{text}</span>
        <span style={{position:"absolute",top:0,left:0,color:"#8b5cf6",clipPath:"inset(55% 0 15% 0)",transform:"translateX(4px)",opacity:0.85,mixBlendMode:"screen",pointerEvents:"none"}}>{text}</span>
      </>}
    </span>
  );
}

// ═══════════════════════════════════════════════════
// REVEAL TEXT (letter by letter on scroll)
// ═══════════════════════════════════════════════════

function Reveal({text,className,style:s,delay=0}){
  return(
    <motion.span className={className} style={{display:"block",...s}}
      initial="h" whileInView="v" viewport={{once:true,margin:"-20px"}}
      variants={{v:{transition:{staggerChildren:0.02,delayChildren:delay}}}}>
      {text.split(" ").map((w,wi)=>(
        <span key={wi} style={{display:"inline-block",overflow:"hidden",marginRight:"0.27em"}}>
          {w.split("").map((c,ci)=>(
            <motion.span key={ci} style={{display:"inline-block"}}
              variants={{h:{y:"105%",opacity:0},v:{y:0,opacity:1,transition:{duration:0.52,ease:[0.22,1,0.36,1]}}}}>
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════
// TILT CARD
// ═══════════════════════════════════════════════════

function Tilt({children,style:s,className,onHoverStart,onHoverEnd}){
  const ref=useRef(null);
  const rx=useMotionValue(0),ry=useMotionValue(0);
  const srx=useSpring(rx,{stiffness:220,damping:22}),sry=useSpring(ry,{stiffness:220,damping:22});
  const gx=useMotionValue(50),gy=useMotionValue(50);
  const mv=e=>{
    const r=ref.current.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    rx.set((py-0.5)*-18);ry.set((px-0.5)*18);gx.set(px*100);gy.set(py*100);
    onHoverStart&&onHoverStart();
  };
  const ml=()=>{rx.set(0);ry.set(0);gx.set(50);gy.set(50);onHoverEnd&&onHoverEnd();};
  return(
    <motion.div ref={ref} className={className}
      style={{...s,transformStyle:"preserve-3d",perspective:900,rotateX:srx,rotateY:sry,position:"relative",overflow:"hidden"}}
      onMouseMove={mv} onMouseLeave={ml} whileHover={{scale:1.025}} transition={{scale:{duration:0.28}}}>
      <motion.div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:10,borderRadius:"inherit",
        background:useTransform([gx,gy],([a,b])=>`radial-gradient(circle at ${a}% ${b}%,rgba(255,255,255,0.07) 0%,transparent 55%)`)}}/>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// PROJECT CARD
// ═══════════════════════════════════════════════════

function ProjectCard({p,index}){
  const [hov,setHov]=useState(false);
  const big=index<2;
  return(
    <motion.div initial={{opacity:0,y:64}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:"-50px"}} transition={{duration:0.7,delay:index*0.07,ease:[0.22,1,0.36,1]}}
      style={{gridColumn:big?"span 2":"span 1"}}>
      <Tilt onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
        style={{background:`${p.bg}`,border:`1px solid ${hov?p.accent+"55":"rgba(180,100,255,0.12)"}`,
          borderRadius:22,overflow:"hidden",height:"100%",
          boxShadow:hov?`0 32px 80px rgba(0,0,0,0.65),0 0 50px ${p.accent}18`:"0 4px 30px rgba(0,0,0,0.45)",
          transition:"border-color 0.3s,box-shadow 0.3s"}}>
        {/* top area */}
        <div style={{height:big?220:165,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          {p.img ? (
            <motion.img src={p.img} alt={p.title}
              style={{width:"100%",height:"100%",objectFit:"cover"}}
              animate={{scale:hov?1.1:1}} transition={{duration:0.4}}
            />
          ) : (
            <motion.span style={{fontSize:big?"5rem":"3.5rem",filter:`drop-shadow(0 0 30px ${p.accent}90)`}}
              animate={{scale:hov?1.22:1}} transition={{duration:0.4,ease:[0.34,1.56,0.64,1]}}>
              {p.icon}
            </motion.span>
          )}
          {/* label */}
          <div style={{position:"absolute",top:12,left:12,padding:"4px 11px",background:`${p.accent}18`,border:`1px solid ${p.accent}50`,borderRadius:50,fontSize:"0.61rem",fontWeight:700,color:p.accent,letterSpacing:"1px",textTransform:"uppercase",backdropFilter:"blur(8px)"}}>
            {p.subtitle}
          </div>
          {/* hover overlay */}
          <AnimatePresence>
            {hov&&(
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.18}}
                style={{position:"absolute",inset:0,background:"rgba(13,10,20,0.88)",display:"flex",alignItems:"center",justifyContent:"center",gap:12,backdropFilter:"blur(10px)"}}>
                {p.links?.live&&<a href={p.links.live} target="_blank" rel="noreferrer"
                  style={{padding:"10px 22px",background:`linear-gradient(135deg,${p.accent},#a855f7)`,color:"#fff",borderRadius:50,textDecoration:"none",fontSize:"0.8rem",fontWeight:700,boxShadow:`0 8px 24px ${p.accent}55`,cursor:"none"}}>
                  🌐 Demo</a>}
                {p.links?.gh&&<a href={p.links.gh} target="_blank" rel="noreferrer"
                  style={{padding:"10px 22px",background:"rgba(255,255,255,0.1)",color:"#fff",borderRadius:50,textDecoration:"none",fontSize:"0.8rem",fontWeight:600,border:"1px solid rgba(255,255,255,0.22)",cursor:"none"}}>
                  🐙 GitHub</a>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* body */}
        <div style={{padding:"20px 26px 26px"}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:big?"1.4rem":"1.08rem",fontWeight:700,color:"#f2ecff",marginBottom:8}}>{p.title}</h3>
          <p style={{fontSize:"0.82rem",color:"#a090be",lineHeight:1.72,marginBottom:14}}>{p.desc}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {p.tags.map(t=><span key={t} style={{fontSize:"0.64rem",color:"#a090be",background:"rgba(255,255,255,0.06)",padding:"3px 8px",borderRadius:4,border:"1px solid rgba(255,255,255,0.08)"}}>{t}</span>)}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// GAME CARD
// ═══════════════════════════════════════════════════

function GameCard({g}){
  const [hov,setHov]=useState(false);
  return(
    <motion.div 
      layout
      initial={{opacity:0, scale:0.9}} 
      animate={{opacity:1, scale:1}} 
      exit={{opacity:0, scale:0.9}} 
      transition={{duration:0.3}}
      style={{gridColumn:g.featured?"span 2":"span 1"}}>
      <Tilt onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
        style={{background:g.bg,border:`1px solid ${hov?g.color+"45":"rgba(180,100,255,0.12)"}`,borderRadius:20,overflow:"hidden",height:"100%",transition:"border-color 0.3s"}}>
        <div style={{height:g.featured?185:145,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          {g.img ? (
            <motion.img src={g.img} alt={g.title}
              style={{width:"100%",height:"100%",objectFit:"cover"}}
              animate={{scale:hov?1.1:1}} transition={{duration:0.3}}
            />
          ) : (
            <motion.span style={{fontSize:g.featured?"3.8rem":"2.6rem"}}
              animate={{scale:hov?1.25:1,filter:hov?`drop-shadow(0 0 22px ${g.color})`:"none"}} transition={{duration:0.3}}>
              {g.icon}
            </motion.span>
          )}
          <div style={{position:"absolute",top:10,left:10,padding:"3px 9px",background:`${g.color}18`,border:`1px solid ${g.color}40`,borderRadius:50,fontSize:"0.6rem",fontWeight:700,color:g.color,letterSpacing:"1px",textTransform:"uppercase",backdropFilter:"blur(6px)"}}>
            {g.subtitle}
          </div>
          <AnimatePresence>
            {hov&&(
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                style={{position:"absolute",inset:0,background:"rgba(13,10,20,0.86)",display:"flex",alignItems:"center",justifyContent:"center",gap:10,backdropFilter:"blur(7px)"}}>
                {g.links?.live&&<a href={g.links.live} target="_blank" rel="noreferrer"
                  style={{padding:"9px 18px",background:`linear-gradient(135deg,${g.color},#a855f7)`,color:"#fff",borderRadius:50,textDecoration:"none",fontSize:"0.78rem",fontWeight:700,cursor:"none"}}>
                  🌐 Jogar</a>}
                <a href={g.links?.gh} target="_blank" rel="noreferrer"
                  style={{padding:"9px 18px",background:"rgba(255,255,255,0.08)",color:"#fff",borderRadius:50,textDecoration:"none",fontSize:"0.78rem",border:"1px solid rgba(255,255,255,0.2)",cursor:"none"}}>
                  🐙 GitHub</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{padding:"14px 20px 20px"}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:"#f2ecff",marginBottom:6}}>{g.title}</h3>
          <p style={{fontSize:"0.79rem",color:"#a090be",lineHeight:1.62,marginBottom:10}}>{g.desc}</p>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {g.techs.map(t=><span key={t} style={{fontSize:"0.62rem",color:"#a090be",background:"rgba(255,255,255,0.05)",padding:"2px 7px",borderRadius:4}}>{t}</span>)}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════

const rv = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };

export default function App(){
  const [ready,setReady]=useState(false);
  const [gameTab,setGameTab]=useState("all");
  const [scrolled,setScrolled]=useState(false);
  const {scrollYProgress}=useScroll();
  const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:30});
  const heroY=useTransform(scrollYProgress,[0,0.28],[0,-110]);
  const heroOp=useTransform(scrollYProgress,[0,0.22],[1,0]);
  const mouseX=useMotionValue(0),mouseY=useMotionValue(0);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",fn);
    const mv=e=>{mouseX.set(e.clientX);mouseY.set(e.clientY);};
    window.addEventListener("mousemove",mv);
    return()=>{window.removeEventListener("scroll",fn);window.removeEventListener("mousemove",mv);};
  },[]);

  const gx=useTransform(mouseX,[0,window.innerWidth],[0,100]);
  const gy=useTransform(mouseY,[0,window.innerHeight],[0,100]);
  const filtered=GAMES.filter(g=>gameTab==="all"||g.cat===gameTab);

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
      :root{--pk:#f472b6;--pp:#a855f7;--vi:#8b5cf6;--lv:#c084fc;--rs:#fb7185;--tx:#f2ecff;--mu:#a090be;--bg:#0d0a14;--sf:#140f20;--s2:#1e1630;--br:rgba(180,100,255,0.13)}
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth;background:#0d0a14}
      body{background:#0d0a14!important;color:#f2ecff!important;font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none;min-height:100vh}
      #root{background:#0d0a14;min-height:100vh}
      @media(max-width:768px){body{cursor:auto}}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0d0a14}::-webkit-scrollbar-thumb{background:linear-gradient(#a855f7,#f472b6);border-radius:2px}
      a,button{cursor:none}
      body::after{content:'';position:fixed;inset:0;opacity:0.45;pointer-events:none;z-index:1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")}

      /* NAV */
      nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 56px;height:70px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s}
      nav.sc{background:rgba(13,10,20,0.9);backdrop-filter:blur(24px);border-bottom:1px solid rgba(180,100,255,0.1)}
      .logo{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:900;background:linear-gradient(135deg,#f472b6,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-decoration:none;cursor:none}
      .nav-links{display:flex;gap:38px;list-style:none}
      .nav-links a{color:#a090be;text-decoration:none;font-size:0.78rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;transition:color 0.2s;cursor:none}
      .nav-links a:hover{color:#f2ecff}
      @media(max-width:900px){.nav-links{display:none}nav{padding:0 24px}}

      /* PROGRESS */
      .prog{position:fixed;top:0;left:0;right:0;height:2px;z-index:300;background:linear-gradient(90deg,#f472b6,#a855f7,#8b5cf6);transform-origin:left}

      /* HERO */
      .hero{min-height:100vh;display:flex;align-items:center;padding:120px 80px 80px;position:relative;overflow:hidden}
      .hero-g{display:grid;grid-template-columns:1.1fr 0.9fr;gap:80px;align-items:center;width:100%;max-width:1200px;margin:0 auto}
      @media(max-width:900px){.hero{padding:100px 24px 60px}.hero-g{grid-template-columns:1fr}.hero-vis{display:none!important}}

      /* SECTIONS */
      .si{max-width:1200px;margin:0 auto;padding:110px 80px;position:relative;z-index:2}
      @media(max-width:900px){.si{padding:70px 24px}}
      .sl{font-family:'Space Mono',monospace;font-size:0.67rem;color:#f472b6;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:10px}
      .sl::before{content:'';display:block;width:26px;height:1px;background:linear-gradient(90deg,#f472b6,transparent)}
      .sep{height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.2) 30%,rgba(244,114,182,0.2) 70%,transparent);position:relative;z-index:2}
      .gt{background:linear-gradient(135deg,#f472b6 0%,#c084fc 50%,#8b5cf6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

      /* BTNS */
      .bp{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.88rem;border:none;font-family:'DM Sans',sans-serif;box-shadow:0 8px 30px rgba(168,85,247,0.42);transition:box-shadow 0.3s}
      .bp:hover{box-shadow:0 18px 50px rgba(168,85,247,0.65)}
      .bo{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#c084fc;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:0.88rem;border:1.5px solid rgba(192,132,252,0.35);font-family:'DM Sans',sans-serif;transition:all 0.3s}
      .bo:hover{background:rgba(192,132,252,0.08);border-color:#c084fc}

      /* BADGES */
      .bs{display:flex;flex-wrap:wrap;gap:9px;margin-top:28px}
      .b{padding:5px 14px;border-radius:50px;font-size:0.72rem;font-weight:500;border:1px solid}
      .bpk{color:#f472b6;border-color:rgba(244,114,182,0.35);background:rgba(244,114,182,0.07)}
      .bpp{color:#c084fc;border-color:rgba(192,132,252,0.35);background:rgba(192,132,252,0.07)}
      .bvl{color:#a5b4fc;border-color:rgba(165,180,252,0.35);background:rgba(165,180,252,0.07)}

      /* TERMINAL */
      .terminal{background:#140f20;border:1px solid rgba(180,100,255,0.13);border-radius:18px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(168,85,247,0.07),0 0 60px rgba(244,114,182,0.04)}
      .th{background:#1e1630;padding:14px 18px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(180,100,255,0.1)}
      .td{width:11px;height:11px;border-radius:50%}
      .tt{margin-left:8px;font-family:'Space Mono',monospace;font-size:0.72rem;color:#a090be}
      .tb{padding:24px;font-family:'Space Mono',monospace;font-size:0.78rem;line-height:2.1}
      .tp{color:#f472b6}.tc{color:#f2ecff}.to{color:#a090be;margin-left:14px;display:block}.tk{color:#c084fc}.tv{color:#86efac}
      .cur{display:inline-block;width:7px;height:15px;background:#f472b6;animation:blink 1s step-end infinite;vertical-align:middle;box-shadow:0 0 8px #f472b6}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

      /* GRIDS */
      .pg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
      @media(max-width:900px){.pg{grid-template-columns:1fr}}
      .gg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
      @media(max-width:900px){.gg{grid-template-columns:1fr}}

      /* ABOUT */
      .ag{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
      @media(max-width:900px){.ag{grid-template-columns:1fr;gap:40px}}
      .sg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
      .sc2{background:#0d0a14;border:1px solid rgba(180,100,255,0.13);border-radius:16px;padding:22px;text-align:center;transition:all 0.3s;cursor:default}
      .sc2:hover{border-color:rgba(244,114,182,0.35);transform:translateY(-4px);box-shadow:0 16px 40px rgba(244,114,182,0.1)}
      .sn{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:900;background:linear-gradient(135deg,#f472b6,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .sl2{font-size:0.7rem;color:#a090be;margin-top:4px;letter-spacing:1px;text-transform:uppercase}
      .stk{display:flex;flex-wrap:wrap;gap:9px;margin-top:26px}
      .si2{display:flex;align-items:center;gap:6px;padding:7px 13px;background:#1e1630;border:1px solid rgba(180,100,255,0.13);border-radius:8px;font-size:0.78rem;color:#f2ecff;transition:all 0.2s;cursor:default}
      .si2:hover{border-color:#a855f7;background:rgba(168,85,247,0.1);transform:translateY(-2px)}
      .tl{position:relative}
      .tl::before{content:'';position:absolute;left:23px;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,#a855f7,rgba(168,85,247,0.04))}

      /* TABS */
      .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px}
      .tab{padding:9px 18px;border-radius:50px;border:1.5px solid rgba(180,100,255,0.13);background:transparent;color:#a090be;font-size:0.78rem;font-weight:500;cursor:none;transition:all 0.2s;font-family:'DM Sans',sans-serif}
      .tab:hover{border-color:#a855f7;color:#c084fc}
      .tab.active{background:linear-gradient(135deg,#f472b6,#a855f7);border-color:transparent;color:#fff;box-shadow:0 4px 22px rgba(168,85,247,0.42)}

      /* AUTOMATION */
      .auto-g{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
      @media(max-width:900px){.auto-g{grid-template-columns:1fr;gap:40px}}
      .flow{display:flex;flex-direction:column;gap:12px}
      .fs{background:#0d0a14;border:1px solid rgba(180,100,255,0.13);border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px;transition:all 0.3s;position:relative;cursor:default}
      .fs:not(:last-child)::after{content:'↓';position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);color:#a855f7;font-size:0.74rem;z-index:2}
      .fs:hover{border-color:#a855f7;transform:translateX(8px);box-shadow:0 8px 28px rgba(168,85,247,0.14)}
      .fi{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;background:rgba(168,85,247,0.12)}
      .csb{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:50px;font-size:0.76rem;color:#c084fc;margin-top:16px}
      .csd{width:6px;height:6px;border-radius:50%;background:#c084fc;animation:blink 1.5s ease-in-out infinite}

      /* CONTACT */
      .cc{max-width:660px;margin:0 auto;text-align:center;padding:110px 40px;position:relative;z-index:2}
      .ccard{background:#160f22;border:1px solid rgba(180,100,255,0.15);border-radius:26px;padding:60px 48px;position:relative;overflow:hidden;color:#f2ecff}
      .ccard::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:300px;height:2px;background:linear-gradient(90deg,transparent,#f472b6,#a855f7,transparent)}
      .ccard::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(168,85,247,0.07) 0%,transparent 65%);pointer-events:none}
      .cl{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:32px}
      .cl a{display:flex;align-items:center;gap:9px;padding:13px 22px;border-radius:12px;background:#1e1630;border:1px solid rgba(180,100,255,0.13);color:#f2ecff;text-decoration:none;font-size:0.83rem;font-weight:500;transition:all 0.25s;cursor:none}
      .cl a:hover{border-color:#f472b6;transform:translateY(-4px);box-shadow:0 12px 32px rgba(244,114,182,0.2)}

      /* ORBS */
      .orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;animation:florb 9s ease-in-out infinite alternate}
      @keyframes florb{from{transform:translate(0,0) scale(1)}to{transform:translate(24px,36px) scale(1.12)}}

      /* SECTION BG */
      .dark{background:#0d0a14}.surf{background:#140f20}
    `}</style>

    {/* INTRO */}
    <AnimatePresence>{!ready&&<Intro onDone={()=>setReady(true)}/>}</AnimatePresence>

    {/* PARTICLES */}
    <ParticleCanvas/>

    {/* CURSOR */}
    <CustomCursor/>

    {/* PROGRESS BAR */}
    <motion.div className="prog" style={{scaleX}}/>

    {/* DECORATIVE ORBS */}
    <div className="orb" style={{width:520,height:520,background:"radial-gradient(circle,rgba(168,85,247,0.13),transparent 70%)",top:-120,right:-120,animationDelay:"0s"}}/>
    <div className="orb" style={{width:420,height:420,background:"radial-gradient(circle,rgba(244,114,182,0.1),transparent 70%)",bottom:"12%",left:-100,animationDelay:"-4s"}}/>
    <div className="orb" style={{width:320,height:320,background:"radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)",top:"42%",right:"6%",animationDelay:"-2s"}}/>

    {/* NAV */}
    <nav className={scrolled?"sc":""}>
      <a href="#home" className="logo">AK.</a>
      <ul className="nav-links">
        {[["about","Sobre"],["python","Projetos"],["games","Jogos"],["automation","Automações"],["contact","Contato"]].map(([id,lbl])=>(
          <li key={id}><a href={`#${id}`}>{lbl}</a></li>
        ))}
      </ul>
    </nav>

    {/* ══════ HERO ══════════════════════════════════════════════ */}
    <section className="hero dark" id="home">
      {/* mouse-reactive gradient */}
      <motion.div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1,
        background:useTransform([gx,gy],([a,b])=>`radial-gradient(650px circle at ${a}% ${b}%,rgba(168,85,247,0.07) 0%,transparent 62%)`)}}/>

      <motion.div className="hero-g" style={{position:"relative",zIndex:2,y:heroY,opacity:heroOp}}>
        {/* LEFT */}
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:ready?1:0,y:ready?0:40}} transition={{duration:0.9,delay:0.15,ease:[0.22,1,0.36,1]}}>
          <motion.p initial={{opacity:0,x:-22}} animate={{opacity:1,x:0}} transition={{delay:0.4}}
            style={{fontFamily:"'Space Mono',monospace",fontSize:"0.7rem",color:"#f472b6",letterSpacing:"4px",textTransform:"uppercase",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
            <span style={{display:"block",width:28,height:1,background:"#f472b6"}}/>
            Available for work
          </motion.p>

          <div style={{overflow:"hidden",marginBottom:4}}>
            <motion.h1 initial={{y:"110%"}} animate={{y:0}} transition={{delay:0.5,duration:0.78,ease:[0.22,1,0.36,1]}}
              style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(3.5rem,6vw,6.2rem)",fontWeight:900,lineHeight:1,letterSpacing:"-2px",color:"#f2ecff"}}>
              <Glitch text="Anny"/>
            </motion.h1>
          </div>
          <div style={{overflow:"hidden",marginBottom:18}}>
            <motion.h1 initial={{y:"110%"}} animate={{y:0}} transition={{delay:0.62,duration:0.78,ease:[0.22,1,0.36,1]}}
              style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(3.5rem,6vw,6.2rem)",fontWeight:900,lineHeight:1,letterSpacing:"-2px"}}>
              <span className="gt">Karoline</span>
            </motion.h1>
          </div>

          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
            style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.1rem,2vw,1.7rem)",fontWeight:400,fontStyle:"italic",color:"#a090be",marginBottom:24}}>
            Fullstack Dev & <span className="gt">Engenheira</span>
          </motion.h2>

          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.0}}
            style={{color:"#a090be",fontSize:"1rem",lineHeight:1.85,maxWidth:460,marginBottom:32}}>
            Transformando ideias complexas em soluções digitais completas — do frontend ao backend, de automações Python a sistemas com IA. Construindo o futuro uma linha por vez.
          </motion.p>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.1}}
            style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <Magnet href="#python" className="bp">Ver Projetos ✦</Magnet>
            <Magnet href="#contact" className="bo">Entrar em Contato →</Magnet>
          </motion.div>

          <motion.div className="bs" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
            {["JavaScript","Python","React","Node.js","AWS","WebRTC","FullStack"].map((b,i)=>(
              <motion.span key={b} className={`b ${i%3===0?"bpk":i%3===1?"bpp":"bvl"}`}
                initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
                transition={{delay:1.32+i*0.055,type:"spring",stiffness:420}}>
                {b}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT - terminal */}
        <motion.div className="hero-vis" style={{position:"relative"}}
          initial={{opacity:0,scale:0.86,x:40}} animate={{opacity:ready?1:0,scale:1,x:0}}
          transition={{duration:0.9,delay:0.4,ease:[0.22,1,0.36,1]}}>
          {/* rotating rings */}
          <motion.div animate={{rotate:360}} transition={{duration:22,repeat:Infinity,ease:"linear"}}
            style={{position:"absolute",inset:-44,border:"1px solid rgba(244,114,182,0.09)",borderRadius:"50%",pointerEvents:"none"}}/>
          <motion.div animate={{rotate:-360}} transition={{duration:34,repeat:Infinity,ease:"linear"}}
            style={{position:"absolute",inset:-20,border:"1px dashed rgba(168,85,247,0.11)",borderRadius:"50%",pointerEvents:"none"}}/>
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
              <span className="to" style={{color:"#86efac"}}>✔ Pronta para o próximo desafio.</span><br/>
              <span className="tp">$ </span><span className="cur"/>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>

    <div className="sep"/>

    {/* ══════ ABOUT ═════════════════════════════════════════════ */}
    <section id="about" className="surf">
      <div className="si">
        <div className="ag">
          <div>
            <motion.p className="sl" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>Sobre mim</motion.p>
            <div style={{fontSize:"clamp(2rem,4vw,3rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.15,marginBottom:20}}>
              <Reveal text="Engenheira que" style={{color:"#f2ecff"}}/>
              <Reveal text="virou Dev." className="gt" delay={0.12}/>
            </div>
            {["Minha base em <strong style='color:#c084fc'>Engenharia de Materiais</strong> me deu pensamento sistêmico, atenção a detalhes e a capacidade de ver problemas como estruturas que precisam de solução — não apenas de código.",
              "Hoje construo desde interfaces React até APIs Node.js, automações Python e sistemas com IA. Cada projeto une rigor de engenharia com criatividade digital.",
              " Aberta a emprego, freelance e colaborações que me desafiem de verdade."
            ].map((t,i)=>(
              <motion.p key={i} dangerouslySetInnerHTML={{__html:t}}
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{color:"#a090be",lineHeight:1.9,marginBottom:16,fontSize:"0.93rem"}}/>
            ))}
            <div className="stk">
              {["⚡ JavaScript","🐍 Python","⚛️ React","🟢 Node.js","☕ Java","☁️ AWS","🐳 Docker","🗄️ SQL/NoSQL"].map((s,i)=>(
                <motion.span key={s} className="si2" initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.05,type:"spring"}}>{s}</motion.span>
              ))}
            </div>
          </div>

          <div>
            <div className="sg">
              {[["30+","Repositórios"],["10+","Projetos Completos"],["5+","Tecnologias"],["∞","Aprendizado"]].map(([n,l],i)=>(
                <motion.div key={l} className="sc2" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09}}>
                  <div className="sn">{n}</div><div className="sl2">{l}</div>
                </motion.div>
              ))}
            </div>
            <div style={{marginTop:40}}>
              <p className="sl" style={{marginBottom:22}}>Jornada</p>
              <div className="tl">
                {TIMELINE.map((item,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.6,ease:[0.22,1,0.36,1]}}
                    style={{display:"flex",gap:18,alignItems:"flex-start",paddingBottom:26,position:"relative"}}>
                    <div style={{width:46,height:46,borderRadius:"50%",background:`${item.color}14`,border:`2px solid ${item.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,zIndex:1,boxShadow:`0 0 18px ${item.color}18`}}>
                      {item.icon}
                    </div>
                    <div>
                      <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",color:item.color,letterSpacing:"2px",display:"block",marginBottom:4}}>{item.year}</span>
                      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"0.98rem",fontWeight:700,color:"#f2ecff",marginBottom:5}}>{item.title}</h3>
                      <p style={{fontSize:"0.79rem",color:"#a090be",lineHeight:1.65}}>{item.desc}</p>
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

    {/* ══════ PROJECTS ══════════════════════════════════════════ */}
    <section id="python" className="dark">
      <div className="si">
        <motion.p className="sl" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>Projetos Destaque</motion.p>
        <div style={{fontSize:"clamp(2rem,4vw,3rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.15,marginBottom:14}}>
          <Reveal text="Código que resolve" style={{color:"#f2ecff"}}/>
          <Reveal text="problemas reais." className="gt" delay={0.1}/>
        </div>
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{color:"#a090be",fontSize:"0.95rem",lineHeight:1.75,maxWidth:520,marginBottom:56}}>
          Passe o mouse nos cards para ver o projeto ao vivo. Cada um tem uma história por trás.
        </motion.p>
        <div className="pg">
          {PROJECTS.map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}
        </div>
        {/* web mini */}
        <div style={{marginTop:64}}>
          <p className="sl" style={{marginBottom:8}}>Web & Landing Pages</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:28}}>
            {[{title:"Universo & Lei da Atração",icon:"🌌",color:"#c084fc",live:"https://annykaah.github.io/universe-law-landing-page/",gh:"https://github.com/AnnyKaah/universe-law-landing-page",techs:["HTML","CSS","JS Vanilla"]},
              {title:"E-commerce JS",icon:"🛒",color:"#fbbf24",gh:"https://github.com/AnnyKaah/ecommecer-JS-hash",techs:["JavaScript","HTML"]},
              {title:"Primeira Página Web",icon:"🌱",color:"#34d399",gh:"https://github.com/AnnyKaah/minha-primeira-pagina-web",techs:["HTML","CSS","JS"]},
            ].map(p=>(
              <motion.div key={p.title} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                whileHover={{y:-6,boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}
                style={{background:"#140f20",border:"1px solid rgba(180,100,255,0.13)",borderRadius:16,padding:"22px",transition:"border-color 0.3s",cursor:"default"}}
                onHoverStart={e=>e.currentTarget.style.borderColor=p.color+"40"}
                onHoverEnd={e=>e.currentTarget.style.borderColor="rgba(180,100,255,0.13)"}>
                <div style={{fontSize:"2rem",marginBottom:12}}>{p.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"0.95rem",fontWeight:700,marginBottom:10,color:"#f2ecff"}}>{p.title}</h3>
                <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
                  {p.techs.map(t=><span key={t} style={{fontSize:"0.62rem",color:"#a090be",background:"rgba(255,255,255,0.05)",padding:"2px 7px",borderRadius:4}}>{t}</span>)}
                </div>
                <div style={{display:"flex",gap:12}}>
                  {p.live&&<a href={p.live} target="_blank" rel="noreferrer" style={{fontSize:"0.74rem",color:p.color,textDecoration:"none",fontWeight:600,cursor:"none"}}>🌐 Demo →</a>}
                  <a href={p.gh} target="_blank" rel="noreferrer" style={{fontSize:"0.74rem",color:"#a090be",textDecoration:"none",cursor:"none"}}>🐙 GitHub</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div className="sep"/>

    {/* ══════ GAMES ═════════════════════════════════════════════ */}
    <section id="games" className="surf">
      <div className="si">
        <motion.p className="sl" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>Jogos & Experimentos</motion.p>
        <div style={{fontSize:"clamp(2rem,4vw,3rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.15,marginBottom:14}}>
          <Reveal text="Código que" style={{color:"#f2ecff"}}/>
          <Reveal text="diverte e ensina." className="gt" delay={0.1}/>
        </div>
        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
          style={{color:"#a090be",fontSize:"0.95rem",lineHeight:1.75,maxWidth:520,marginBottom:48}}>
          WebRTC, Canvas, Web Audio — aprendido construindo coisas que as pessoas vão realmente jogar.
        </motion.p>
        <div className="tabs">
          {GAME_TABS.map(t=>(
            <button key={t.key} className={`tab ${gameTab===t.key?"active":""}`} onClick={()=>setGameTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div className="gg">
          <AnimatePresence mode="popLayout">
            {filtered.map(g=><GameCard key={g.id} g={g}/>)}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div style={{gridColumn:"1/-1",textAlign:"center",color:"#a090be",padding:"40px"}}>Nenhum jogo encontrado nesta categoria.</div>
          )}
=======
  import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaBriefcase,
  FaProjectDiagram,
  FaDownload,
  FaMouse,
  FaGraduationCap,
  FaTimes,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaSun,
  FaMoon,
  FaAws,
  FaChevronDown,
  FaDatabase,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiGooglegemini,
  SiPostgresql,
} from "react-icons/si";

import perfilImg from "/perfil.jpeg";
import avatarImg from "/img/avatar.png";
import hashLivreImg from "/img/hashLivre2.png";
import apiIaImg from "/img/API-IA.png";
import fugaDoRalphImg from "/img/fuga-do-ralph.png";
import HabitheroImg from "/img/hero-vs2.png";
import cosmicMemoryGameImg from "/img/cosmic-memory-game.png"; // Adicione a imagem do seu projeto aqui
import AnimatedBackground from "./components/AnimatedBackground";
import NebulaBackground from "./components/NebulaBackground";
import About from "./components/About";

const translations = {
  pt: {
    navLinks: [
      { href: "#hero", label: "Início" },
      { href: "#sobre", label: "Sobre" },
      { href: "#skills", label: "Skills" },
      { href: "#projetos", label: "Projetos" },
      { href: "#experiencia", label: "Jornada" },
      { href: "#contato", label: "Contato" },
    ],
    hero: {
      typing: ["Dev Full Stack", "Paixão por Código", "Da ideia ao deploy"],
      subtitle: "Da ideia ao código, do design à funcionalidade.",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entrar em Contato",
      ctaCV: "Baixar Currículo",
    },
    about: {
      title: "Sobre Mim",
      p1: "Sou engenheira de materiais em transição para o desenvolvimento de software. Minha experiência analítica e foco em soluções práticas me impulsionam a criar aplicações web criativas e eficientes.",
      p2: "Com pós-graduação em Desenvolvimento de Software, desenvolvo habilidades em JavaScript, React, Node.js, Python e Power BI. Minha trajetória na indústria fortaleceu meu pensamento analítico, resolução de problemas e atenção aos detalhes — qualidades que aplico em projetos digitais inovadores.",
      p3: "Vamos construir algo incrível juntos!",
    },
    skills: {
      title: "Habilidades",
      categories: {
        frontend: "Front-end",
        backend: "Back-end",
        tools: "Bancos de Dados & Ferramentas",
      },
      names: {
        React: "React",
        JavaScript: "JavaScript",
        HTML5: "HTML5",
        CSS3: "CSS3",
        "Tailwind CSS": "Tailwind CSS",
        "Node.js": "Node.js",
        Express: "Express",
        Python: "Python",
        MongoDB: "MongoDB",
        Git: "Git",
        "Power BI": "Power BI",
        "Google Gemini": "Google Gemini",
        SQL: "SQL",
        PostgreSQL: "PostgreSQL",
        AWS: "AWS",
      },
    },
    projects: {
      title: "Projetos",
      repo: "Repositório",
      demo: "Demo",
      subtitle: "Onde a Ideia Vira Código.",
    },
    timeline: {
      title: "Minha Jornada",
      professional: "Profissional",
      academic: "Acadêmica",
    },
    experiences: {
      professional: [
        {
          company: "Ambev",
          role: "Técnica de Materiais",
          period: "Out 2022 - Set 2025",
          location: "Teresina, Piauí, Brazil",
          description:
            "Responsável pela gestão e recuperação de itens com estoque zerado. Essa função exigiu uma forte estruturação lógica de processos e a identificação de padrões para garantir a disponibilidade contínua dos itens",
        },
        {
          company: "AIESEC",
          role: "TL/Manager Customer Success - B2B (Voluntário)",
          period: "Jul 2022 - Mar 2023",
          location: "Remoto",
          description:
            "Gestão de produto focada em vendas e relacionamento com parceiros, monitorando processos de experiência do cliente e sinergia entre equipes globais.",
        },
        {
          company: "Ambev",
          role: "Estagiária",
          period: "Out 2021 - Jun 2022",
          location: "Teresina, Piauí, Brazil",
          description:
            "Contribuí para a organização e monitoramento de rotinas de manutenção, garantindo maior confiabilidade e eficiência nos processos.",
        },
      ],
      academic: [
        {
          company: "UNOPAR - Universidade Norte do Paraná",
          role: "Pós-graduação em Análise e Desenvolvimento de Sistemas",
          period: "Ago 2024 - Ago 2025",
          location: "Remoto",
          description:
            "Pós-graduação com foco em tecnologias full-stack, aprimorando habilidades em JavaScript, lógica, estruturas de dados, bancos de dados relacionais e construção de APIs REST, solidificando minha transição de carreira para a área de tecnologia.",
        },
        {
          company: "IFPI - Instituto Federal do Piauí",
          role: "Técnico em Eletrônica",
          period: "2020 - 2022",
          location: "Teresina, Piauí, Brazil",
          description:
            "Curso técnico focado em sistemas eletrônicos e circuitos, onde adquiri conhecimento fundamental em raciocínio lógico e resolução de problemas técnicos, além do primeiro contato com programação e automação.",
        },
        {
          company: "Universidade Federal do Piauí",
          role: "Graduação em Engenharia de Materiais",
          period: "2015 - 2020",
          location: "Teresina, Piauí, Brazil",
          description:
            "Minha graduação proporcionou uma base sólida em pensamento analítico e resolução de problemas. Atuei em iniciação científica e monitoria, fortalecendo minha capacidade de seguir processos estruturados, analisar dados e comunicar conceitos complexos.",
        },
      ],
    },
    contact: {
      title: "Vamos Conversar",
      subtitle:
        "Estou sempre aberta a novas oportunidades e colaborações. Se você tem um projeto em mente, uma vaga em aberto, ou simplesmente quer trocar ideias, não hesite em me contatar.",
      otherTitle: "Outras formas de contato",
      form: {
        name: "Seu Nome",
        email: "Seu E-mail",
        message: "Sua Mensagem",
        submit: "Enviar Mensagem",
        success: "Obrigado! Sua mensagem foi enviada com sucesso.",
        error: "Oops! Houve um problema ao enviar seu formulário.",
      },
    },
    footer: {
      copyright: "Todos os direitos reservados.",
    },
  },
  en: {
    navLinks: [
      { href: "#hero", label: "Home" },
      { href: "#sobre", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projetos", label: "Projects" },
      { href: "#experiencia", label: "Journey" },
      { href: "#contato", label: "Contact" },
    ],
    hero: {
      typing: ["Full Stack Developer", "Passion for Code", "From idea to code"],
      subtitle: "From idea to code, from design to functionality.",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
      ctaCV: "Download CV",
    },
    about: {
      title: "About Me",
      p1: "I am a materials engineer transitioning to software development. My analytical background and focus on practical solutions drive me to create creative and efficient web applications.",
      p2: "With a postgraduate degree in Software Development, I am honing skills in JavaScript, React, Node.js, Python, and Power BI. My industry experience has strengthened my analytical thinking, problem-solving, and attention to detail—qualities I apply to innovative digital projects.",
      p3: "Let's build something amazing together!",
    },
    skills: {
      title: "Skills",
      categories: {
        frontend: "Front-end",
        backend: "Back-end",
        tools: "Databases & Tools",
      },
      names: {
        React: "React",
        JavaScript: "JavaScript",
        HTML5: "HTML5",
        CSS3: "CSS3",
        "Tailwind CSS": "Tailwind CSS",
        "Node.js": "Node.js",
        Express: "Express",
        Python: "Python",
        MongoDB: "MongoDB",
        Git: "Git",
        "Power BI": "Power BI",
        "Google Gemini": "Google Gemini",
        SQL: "SQL",
        PostgreSQL: "PostgreSQL",
        AWS: "AWS",
      },
    },
    projects: {
      title: "Projects",
      repo: "Repository",
      demo: "Demo",
      subtitle: "Where Idea Becomes Code.",
    },
    timeline: {
      title: "My Journey",
      professional: "Professional",
      academic: "Academic",
    },
    experiences: {
      professional: [
        {
          company: "Ambev",
          role: "Materials Technician",
          period: "Oct 2022 - Sep 2025",
          location: "Teresina, Piauí, Brazil",
          description:
            "Responsible for the management and recovery of zero-stock items. This role demands a highly logical structuring of processes and the identification of patterns to ensure continuous item availability.",
        },
        {
          company: "AIESEC",
          role: "TL/Manager Customer Success - B2B (Volunteer)",
          period: "Jul 2022 - Mar 2023",
          location: "Remote",
          description:
            "Product management focused on sales and partner relationships, monitoring customer experience processes and synergy between global teams.",
        },
        {
          company: "Ambev",
          role: "Intern",
          period: "Oct 2021 - Jun 2022",
          location: "Teresina, Piauí, Brazil",
          description:
            "Support in stock management and inspection routines, contributing to process optimization and data control.",
        },
      ],
      academic: [
        {
          company: "UNOPAR - Universidade Norte do Paraná",
          role: "Postgraduate Degree in Systems Analysis and Development",
          period: "Aug 2024 - Aug 2025",
          location: "Remote",
          description:
            "Postgraduate degree focused on full-stack technologies, enhancing skills in JavaScript, logic, data structures, relational databases, and building REST APIs, solidifying my career transition into the technology field.",
        },
        {
          company: "IFPI - Instituto Federal do Piauí",
          role: "Technical Degree in Electronics",
          period: "2020 - 2022",
          location: "Teresina, Piauí, Brazil",
          description:
            "Technical course focused on electronic systems and circuits, where I acquired fundamental knowledge in logical reasoning and technical problem-solving, in addition to my first contact with programming and automation.",
        },
        {
          company: "Universidade Federal do Piauí",
          role: "Bachelor's Degree in Materials Engineering",
          period: "2015 - 2020",
          location: "Teresina, Piauí, Brazil",
          description:
            "My bachelor's degree provided a solid foundation in analytical thinking and problem-solving. I participated in a scientific research project and served as a teaching assistant, strengthening my ability to follow structured processes, analyze data, and communicate complex concepts.",
        },
      ],
    },
    contact: {
      title: "Let's Talk",
      subtitle:
        "I'm always open to new opportunities and collaborations. If you have a project in mind, an open position, or just want to exchange ideas, feel free to contact me.",
      otherTitle: "Other ways to connect",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        submit: "Send Message",
        success: "Thank you! Your message has been sent successfully.",
        error: "Oops! There was a problem submitting your form.",
      },
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
};

function TypingAnimation({ typingTexts }) {
  const [textIndex, setTextIndex] = useState(0); // Controla qual texto do array está sendo animado
  const [displayedText, setDisplayedText] = useState(""); // O texto que é exibido na tela
  const [isDeleting, setIsDeleting] = useState(false); // Controla se a animação está apagando o texto
  const typingSpeed = 120;
  const deletingSpeed = 60;
  
  useEffect(() => {
    const currentText = typingTexts[textIndex];

    const handleTyping = () => {
      if (!isDeleting && displayedText.length < currentText.length) {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, displayedText.length - 1));
      } else if (!isDeleting && displayedText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false); // Para de apagar
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, typingTexts, typingSpeed, deletingSpeed]);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end text-glow min-h-[80px] md:min-h-[100px]">
      {displayedText}
      <span className="animate-blink text-highlight">|</span>
    </h1>
  );
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Hero({ language }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 items-center gap-12 w-full max-w-7xl mx-auto">
        {/* Conteúdo de Texto */}
        <motion.div variants={heroItemVariants} className="text-center lg:text-left flex flex-col items-center lg:items-start lg:col-span-3">
          <TypingAnimation typingTexts={translations[language].hero.typing} key={language}/>

          <motion.p
            variants={heroItemVariants}
            className="mt-4 max-w-xl text-text-dark/90 dark:text-text-light/90 text-lg md:text-xl font-light tracking-wide"
          >
            {translations[language].hero.subtitle}
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="mt-8 w-full max-w-md lg:max-w-none flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4"
          >
            <a href="#projetos" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-start/50 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <FaProjectDiagram />
              <span>{translations[language].hero.ctaProjects}</span>
            </a>
            <div className="w-full sm:w-auto flex gap-4">
              <a href="#contato" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-highlight text-highlight font-semibold rounded-lg hover:bg-highlight hover:text-white dark:hover:text-background-dark transition-colors">
                <FaEnvelope />
                <span>{translations[language].hero.ctaContact}</span>
              </a>
              <a href="https://docs.google.com/document/d/1owrzDln4ZECsyVK3Gr5Iq9KODSrwyWdvbbsAIqOZEW8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-highlight text-highlight font-semibold rounded-lg hover:bg-highlight hover:text-white dark:hover:text-background-dark transition-colors">
                <FaDownload />
                <span>{translations[language].hero.ctaCV}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Imagem com Efeito de Glow */}
        <motion.div variants={heroItemVariants} className="relative group lg:col-span-2 lg:justify-self-end justify-self-center">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-start to-primary-end rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-glow"></div>
          <div className="relative">
            <img
              src={perfilImg}
              alt="Anny Karoline"
              className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-background-dark/50 shadow-lg object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Indicador de Rolagem */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#sobre" aria-label="Scroll down">
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-white/50 flex items-start justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <FaMouse className="text-gray-600 dark:text-white" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}

const skillCategories = [
  {
    titleKey: "frontend",
    skills: [
      { name: "React", icon: <FaReact size={32} /> },
      { name: "JavaScript", icon: <FaJs size={32} /> },
      { name: "HTML5", icon: <FaHtml5 size={32} /> },
      { name: "CSS3", icon: <FaCss3Alt size={32} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={32} /> },
    ],
  },
  {
    titleKey: "backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs size={32} /> },
      { name: "Express", icon: <SiExpress size={32} /> },
      { name: "Python", icon: <FaPython size={32} /> },
    ],
  },
  {
    titleKey: "tools",
    skills: [
      { name: "MongoDB", icon: <SiMongodb size={32} /> },
      { name: "Git", icon: <FaGitAlt size={32} /> },
      { name: "Google Gemini", icon: <SiGooglegemini size={32} /> },
      { name: "SQL", icon: <FaDatabase size={32} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={32} /> },
      { name: "AWS", icon: <FaAws size={32} /> },
    ],
  },
];

function Skills({ language }) {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center px-6 py-20"
    >
      <div className="relative">
        <h2 className="text-3xl font-heading font-bold mb-16 text-highlight text-center">
          {translations[language].skills.title}
        </h2>
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={heroContainerVariants} // Reutilizando variantes do Hero
        >
        {skillCategories.map(({ titleKey, skills }) => (
          <motion.div
            key={titleKey}
            className="bg-white/60 dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-highlight/20 shadow-lg backdrop-blur-sm"
            variants={heroItemVariants}
          >
            <h3 className="text-2xl font-heading font-bold text-highlight mb-6 text-center">
              {translations[language].skills.categories[titleKey]}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="group flex items-center gap-3 p-3 bg-gray-100 dark:bg-white/5 rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--highlight-color)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-highlight group-hover:text-black dark:group-hover:text-black transition-colors">{skill.icon}</div>
                  <span className="text-text-dark dark:text-text-light font-semibold group-hover:text-black dark:group-hover:text-black transition-colors">
                    {translations[language].skills.names[skill.name]}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        </motion.div>
      </div>
    </section>
  );
}

const projectData = [
  {
    id: "cosmic-memory-game",
    image: cosmicMemoryGameImg,
    techs: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/AnnyKaah/memory-game-challenge", // Substitua pelo link do seu repositório
    demo: "https://annykaah.github.io/memory-game-challenge/", 
    live: true,
    pt: {
        title: "Jogo da Memória Cósmico",
        description:
          "Projeto do desafio do Bootcamp Ri Happy - Front-end do Zero #2. Jogo da Memória com Emojis usando JavaScript, HTML e CSS, com diferentes níveis de dificuldade e modos de jogo.",
        highlights: [
          "Níveis de dificuldade: fácil, médio e difícil.",
          "Modo clássico e modo desafio com temporizador.",
          "Interface temática e responsiva."
        ]
    },
    en: {
        title: "Cosmic Memory Game",
        description:
          "Project from the Ri Happy Bootcamp challenge - Front-end from Scratch #2. A Memory Game with Emojis using JavaScript, HTML, and CSS, featuring different difficulty levels and game modes.",
        highlights: [
          "Difficulty levels: easy, medium, and hard.",
          "Classic mode and a timed challenge mode.",
          "Themed and responsive interface."
        ]
    },
  },
  {
    id: "shophere",
    image: hashLivreImg,
    techs: ["Express", "Node.js", "MongoDB", "JavaScript"],
    repo: "https://github.com/AnnyKaah/ShopHere-E-commerce",
    demo: "https://project-shophere.vercel.app/", // Link para o projeto no ar
    live: true, // Indica que o projeto está no ar
    pt: {
        title: "ShopHere E-commerce",
        description:
          "Uma plataforma de e-commerce completa para demonstrar habilidades full-stack, desde a criação de uma API RESTful segura até a implementação de uma interface de usuário rica e responsiva.",
        highlights: [
          "API RESTful com autenticação JWT.",
          "Integração de pagamentos (simulada).",
          "Painel de administração para gerenciamento de produtos."
        ]
    },
    en: {
        title: "ShopHere E-commerce",
        description:
          "A complete e-commerce platform to demonstrate full-stack skills, from creating a secure RESTful API to implementing a rich and responsive user interface.",
        highlights: [
          "RESTful API with JWT authentication.",
          "Payment integration (simulated).",
          "Admin panel for product management."
        ]
    },
  },
  {
    id: "gemini-chat",
    image: apiIaImg,
    techs: ["React", "Node.js", "Express", "Google Gemini API", "CSS"],
    repo: "https://github.com/AnnyKaah/gemini-ai-chat-assistant",
    demo: "https://gemini-ai-chat-assistant.vercel.app/", // Link para o projeto no ar
    live: true,
    pt: {
        title: "API de Chat com IA",
        description:
          "Uma interface de chat moderna e responsiva para interagir com a API do Google Gemini, permitindo conversas baseadas em texto e análise de imagens.",
        highlights: [
          "Consumo da API do Google Gemini.",
          "Streaming de respostas em tempo real.",
          "Interface de chat com histórico de mensagens."
        ]
    },
    en: {
        title: "AI Chat API",
        description:
          "A modern and responsive chat interface to interact with the Google Gemini API, allowing for text-based conversations and image analysis.",
        highlights: [
          "Google Gemini API consumption.",
          "Real-time response streaming.",
          "Chat interface with message history."
        ]
    },
  },
  {
    id: "habithero",
    image: HabitheroImg,
    techs: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    repo: "https://github.com/AnnyKaah/Habit-Hero",
    demo: "https://habit-hero-project.vercel.app/", // Link para o projeto no ar
    live: true,
    pt: {
        title: "HabitHero",
        description:
          "Um Dashboard interativo de controle de hábitos, em que os usuários concluem missões como em um jogo para derrotar vilões a cada nível. Cada hábito que o usuário completa é um golpe contra eles.",
        highlights: [
          "Gamificação de hábitos com sistema de níveis.",
          "CRUD completo de hábitos e recompensas.",
          "Design interativo com Tailwind CSS e Framer Motion."
        ]
    },
    en: {
        title: "HabitHero",
        description:
          "An interactive habit-tracking dashboard where users complete game-like missions to defeat villains at each level. Each habit the user completes is a strike against them.",
        highlights: [
          "Habit gamification with a leveling system.",
          "Full CRUD for habits and rewards.",
          "Interactive design with Tailwind CSS and Framer Motion."
        ]
    },
  },
  {
    id: "ralph-game",
    image: fugaDoRalphImg,
    techs: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/AnnyKaah/fuga-do-ralph",
    demo: "https://annykaah.github.io/detona-ralph-challenge/", // Link para o projeto no ar
    live: true,
    pt: {
        title: "Fuga do Ralph - Jogo Arcade",
        description:
          "Jogo de arcade dinâmico e responsivo, parte do desafio 'Criando um Jogo do Detona Ralph com JavaScript' da DIO. O objetivo é ajudar o Felix a desviar dos tijolos jogados por um Ralph furioso, coletar power-ups e sobreviver para alcançar a maior pontuação.",
        highlights: [
          "Manipulação do DOM com JavaScript puro.",
          "Lógica de jogo com colisões e pontuação.",
          "Animações baseadas em `setInterval`."
        ]
    },
    en: {
        title: "Ralph's Escape - Arcade Game",
        description:
          "A dynamic and responsive arcade game, part of the 'Creating a Wreck-It Ralph Game with JavaScript' challenge by DIO. The goal is to help Felix dodge bricks thrown by an angry Ralph, collect power-ups, and survive as long as possible to get the highest score.",
        highlights: [
          "DOM manipulation with vanilla JavaScript.",
          "Game logic with collisions and scoring.",
          "`setInterval`-based animations."
        ]
    },
  },
];

function Projetos({ language }) {
  // const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  return (
    <section 
      id="projetos" 
      className="relative min-h-screen flex flex-col justify-center px-6 py-20"
    >
      <div className="relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end text-glow"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {translations[language].projects.title}
        </motion.h2>
        <motion.p 
          className="text-lg text-center text-text-dark/90 dark:text-text-light/90 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {translations[language].projects.subtitle}
        </motion.p>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectData.map((project, index) => {
            const { title, description, highlights } = project[language];
            return (
              <motion.div
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-highlight/20 backdrop-blur-sm cursor-pointer transition-colors duration-300`}
                initial={{ opacity: 0, y: 50, transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25), 0 0 30px -5px var(--highlight-color)",
                  transform: 'perspective(1000px) rotateX(2deg) rotateY(-3deg)',
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Ver demo do projeto ${title}`} className="relative block overflow-hidden">
                  <img
                    src={project.image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-highlight/80 rounded-full flex items-center justify-center">
                      <FaProjectDiagram className="text-black text-3xl" />
                    </div>
                  </div>
                </a>
                <div className="p-6 flex flex-col flex-grow">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-text-dark dark:text-white">
                        {title}
                      </h3>
                      {project.live && (
                        <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded-full">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-xs font-semibold text-green-800 dark:text-green-300">Live</span>
                        </div>
                      )}
                    </div>
                  </a>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.map((tech) => (
                      <span key={tech} className="text-xs bg-highlight/10 text-highlight px-2 py-1 rounded-full font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 text-sm font-semibold border-t border-gray-200 dark:border-white/10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Ver detalhes sobre ${title}`}
                      className="text-highlight hover:underline flex items-center gap-1"
                    >
                      Ver Detalhes
                    </button>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline flex items-center gap-1">
                        <FaProjectDiagram /> {translations[language].projects.demo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-background-dark rounded-2xl shadow-2xl overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-highlight transition-colors z-10"
                aria-label="Fechar modal"
              >
                <FaTimes size={24} />
              </button>

              <img 
                src={selectedProject.image} 
                alt={selectedProject[language].title} 
                className="w-full h-64 object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold text-highlight mb-2">
                  {selectedProject[language].title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techs.map((tech) => (
                    <span key={tech} className="text-xs bg-highlight/10 text-highlight px-2 py-1 rounded-full font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedProject[language].description}
                </p>

                <div>
                  <h4 className="font-semibold text-text-dark dark:text-text-light text-lg mb-3">Destaques Técnicos:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {selectedProject[language].highlights.map(highlight => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 text-center px-6 py-3 bg-highlight text-black font-semibold rounded-lg shadow-lg hover:shadow-highlight/50 transition-all duration-300"
                  >
                    Ver Demo Ao Vivo
                  </a>
                  <a 
                    href={selectedProject.repo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 text-center px-6 py-3 border-2 border-highlight text-highlight font-semibold rounded-lg hover:bg-highlight hover:text-white dark:hover:text-background-dark transition-colors"
                  >
                    Ver Repositório
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const TimelineButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ${
      isActive
        ? "bg-highlight text-black shadow-lg"
        : "bg-transparent border-2 border-highlight text-highlight"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
);


function Timeline({ language }) {
  const [view, setView] = useState("professional"); // 'professional' or 'academic'

  const dataToShow = translations[language].experiences[view];

  return (
    <section
      id="experiencia"
      className="min-h-screen flex flex-col justify-center px-6 py-20"
    >
      <h2 className="text-3xl font-heading font-bold mb-12 text-highlight text-center">
        {translations[language].timeline.title}
      </h2>
      <div className="flex justify-center gap-4 mb-16">
        <TimelineButton
          label={translations[language].timeline.professional}
          isActive={view === "professional"}
          onClick={() => setView("professional")}
        />
        <TimelineButton
          label={translations[language].timeline.academic}
          isActive={view === "academic"}
          onClick={() => setView("academic")}
        />
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Linha vertical */}
        <div className="absolute left-5 md:left-1/2 top-0 transform md:-translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-highlight/20" />

        <div className="space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={view} // Chave para AnimatePresence saber que o conteúdo mudou
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {dataToShow.map(
                ({ company, role, period, location, description }, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={`${view}-${i}`} className="relative mb-12">
                      {/* Icon in the middle */}
                      <div className="absolute top-0 left-5 md:left-1/2 transform -translate-x-1/2 z-10 ">
                        <div className="bg-highlight text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-background-light dark:ring-background-dark">
                          {view === "professional" ? (
                            <FaBriefcase className="text-xl" />
                          ) : (
                            <FaGraduationCap className="text-xl" />
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <motion.div
                        className={`w-full pl-16 md:pl-20 md:w-1/2 ${
                          isLeft ? "md:pl-0 md:pr-12" : "md:ml-auto md:pl-12"
                        }`}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div
                          className={`bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-highlight/20 rounded-lg p-6 shadow-lg ${
                            isLeft ? "md:text-right" : "md:text-left"
                          }`}
                        >
                          <h3 className="text-xl font-bold text-highlight">
                            {role}
                          </h3>
                          <h4 className="text-lg font-semibold">
                            <span className="text-text-dark dark:text-text-light">{company}</span>
                          </h4>
                          <p className="text-sm italic text-gray-500 dark:text-gray-300 mb-3">
                            {period} | {location}
                          </p>
                          <p className="text-text-dark/90 dark:text-text-light/90 text-sm leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                }
              )}
            </motion.div>
          </AnimatePresence>
>>>>>>> de4165ddfec2b77bb2c6b46fbf7d7c56434c381a
        </div>
      </div>
    </section>

    <div className="sep"/>

<<<<<<< HEAD
    {/* ══════ AUTOMATION ════════════════════════════════════════ */}
    <section id="automation" className="dark">
      <div className="si">
        <div className="auto-g">
          <div>
            <motion.p className="sl" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>Automações & N8N</motion.p>
            <div style={{fontSize:"clamp(2rem,4vw,3rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.15,marginBottom:18}}>
              <Reveal text="Trabalho" style={{color:"#f2ecff"}}/>
              <Reveal text="automatizado." className="gt" delay={0.1}/>
            </div>
            {["Combinando Python e N8N para criar fluxos que eliminam trabalho repetitivo e geram valor mensurável para empresas europeias.",
              "Se acontece mais de uma vez, automatize."
            ].map((t,i)=>(
              <motion.p key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{color:"#a090be",lineHeight:1.85,marginBottom:14,fontSize:"0.93rem"}}>
                {i===1?<><strong style={{color:"#c084fc"}}>Filosofia: </strong>{t}</>:t}
              </motion.p>
            ))}
            <div className="csb"><div className="csd"/>Em desenvolvimento ativo</div>
            <div style={{display:"flex",gap:9,flexWrap:"wrap",marginTop:20}}>
              {["N8N","Python Scripts","APIs REST","Webhooks","CRM Integration"].map((b,i)=>(
                <span key={b} className={`b ${i%3===0?"bpk":i%3===1?"bpp":"bvl"}`}>{b}</span>
              ))}
            </div>
          </div>
          <motion.div className="flow" initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            {[["📥","Trigger","Formulário, webhook ou agendamento"],["⚙️","Processamento","Python ou N8N nodes transformam os dados"],["🔗","Integração","CRM, e-mail, Slack, planilhas"],["📊","Resultado","Relatório automático ou ação concluída"],["✅","Economia real","Horas de trabalho → segundos de execução"]].map(([icon,title,desc],i)=>(
              <motion.div key={i} className="fs" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                style={i===4?{borderColor:"rgba(244,114,182,0.25)"}:{}}>
                <div className="fi" style={i===4?{background:"rgba(244,114,182,0.12)"}:{}}>{icon}</div>
                <div>
                  <strong style={{display:"block",fontSize:"0.87rem",color:i===4?"#f472b6":"#f2ecff",marginBottom:3}}>{title}</strong>
                  <span style={{fontSize:"0.77rem",color:"#a090be"}}>{desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
=======
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus(translations[language].contact.form.success);
        form.reset();
      } else {
        const responseData = await response.json();
        if (Object.hasOwn(responseData, "errors")) {
          setStatus(
            responseData["errors"].map((error) => error["message"]).join(", ")
          );
        } else {
          setStatus(translations[language].contact.form.error);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error); // Adicionado log de erro
      setStatus(translations[language].contact.form.error);
    }
  }

  return (
    <section
      id="contato"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-heading font-bold text-highlight">
          {translations[language].contact.title}
        </h2>
        <p className="text-text-dark/90 dark:text-text-light/90 mt-4 max-w-2xl mx-auto text-lg">
          {translations[language].contact.subtitle}
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Coluna da Esquerda: Informações de Contato */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light text-center md:text-left">
            <span>{translations[language].contact.otherTitle}</span>
          </h3>
          <a
            href="mailto:annykamartins@icloud.com"
            className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-highlight/10 transition-colors border border-gray-200 dark:border-highlight/20"
          >
            <FaEnvelope className="text-highlight text-2xl" />
            <span className="text-text-dark dark:text-text-light">annykamartins@icloud.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/annykarolinedecarvalhomartins/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-highlight/10 transition-colors border border-gray-200 dark:border-highlight/20"
          >
            <FaLinkedin className="text-highlight text-2xl" />
            <span className="text-text-dark dark:text-text-light">LinkedIn</span>
          </a>
          <a
            href="https://github.com/AnnyKaah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-highlight/10 transition-colors border border-gray-200 dark:border-highlight/20"
          >
            <FaGithub className="text-highlight text-2xl" />
            <span className="text-text-dark dark:text-text-light">GitHub</span>
          </a>
        </motion.div>

        {/* Coluna da Direita: Formulário */}
        <motion.form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/mwpnarjo"
          method="POST"
          className="w-full bg-white dark:bg-white/5 p-8 rounded-lg shadow-lg space-y-6 border-2 border-gray-200 dark:border-highlight/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="text"
            name="name"
            placeholder={translations[language].contact.form.name}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-text-dark dark:text-text-light focus:ring-2 focus:ring-highlight outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={translations[language].contact.form.email}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-text-dark dark:text-text-light focus:ring-2 focus:ring-highlight outline-none"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder={translations[language].contact.form.message}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-text-dark dark:text-text-light focus:ring-2 focus:ring-highlight outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full px-10 py-4 bg-highlight text-black font-bold rounded-full shadow-lg hover:shadow-highlight/50 transition-shadow"
          >
            {translations[language].contact.form.submit}
          </button>
          {status && <p className="mt-4 text-center text-text-dark dark:text-text-light">{status}</p>}
        </motion.form>
>>>>>>> de4165ddfec2b77bb2c6b46fbf7d7c56434c381a
      </div>
    </section>

<<<<<<< HEAD
    <div className="sep"/>

    {/* ══════ CONTACT ═══════════════════════════════════════════ */}
    <section id="contact" className="surf">
      <div className="cc">
        <p className="sl" style={{justifyContent:"center"}}>Contato</p>
        <motion.div className="ccard" initial={{opacity:0,y:44,scale:0.95}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{duration:0.72,ease:[0.22,1,0.36,1]}}>
          <div style={{fontSize:"clamp(1.8rem,4vw,2.8rem)",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.2,marginBottom:14,color:"#f2ecff"}}>
            Vamos construir<br/><span className="gt">algo juntos?</span>
          </div>
          <p style={{color:"#a090be",lineHeight:1.85,fontSize:"0.93rem"}}>
            Aberta a emprego, freelance e colaborações. Se você tem um desafio interessante, eu tenho as ferramentas para resolvê-lo.
          </p>
          <div className="cl">
            {[{icon:"📧",label:"annykamartins@icloud.com",href:"mailto:annykamartins@icloud.com"},
              {icon:"💼",label:"LinkedIn",href:"https://www.linkedin.com/in/annykarolinedecarvalhomartins"},
              {icon:"🐙",label:"GitHub",href:"https://github.com/AnnyKaah"},
            ].map(l=><a key={l.label} href={l.href} target="_blank" rel="noreferrer"><span>{l.icon}</span>{l.label}</a>)}
          </div>
        </motion.div>
=======
function Header({ language, setLanguage, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muda o fundo do header ao rolar
      setScrolled(window.scrollY > 50);

      // Destaca a seção ativa no menu
      for (const sectionId of translations.pt.navLinks.map((l) =>
        l.href.substring(1)
      )) {
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = translations[language].navLinks;
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-heading font-bold text-highlight tracking-wider"
        >
          Anny &lt; / &gt;
        </a>
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-text-dark dark:text-text-light font-semibold hover:text-highlight transition-colors duration-300 ${
                  activeSection === href.substring(1)
                    ? "text-highlight border-b-2 border-highlight"
                    : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="w-10 h-10 flex items-center justify-center border-2 border-highlight text-highlight font-bold rounded-full hover:bg-highlight hover:text-background-dark transition-colors duration-300"
              aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
          </li>
          <li>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 flex items-center justify-center border-2 border-highlight text-highlight rounded-full hover:bg-highlight hover:text-black transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-text-dark dark:text-text-light text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <motion.div
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-background-light dark:bg-background-dark/95 backdrop-blur-sm flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`text-text-dark dark:text-text-light text-3xl font-semibold hover:text-highlight transition-colors duration-300 ${
                    activeSection === href.substring(1)
                      ? "text-highlight"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

function Footer({ language }) {
  return ( // Adicionado z-10 para garantir que o footer fique sobre o fundo
    <footer className="relative z-10 border-t border-gray-200 dark:border-highlight/20 py-8 text-center text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-6 mb-4 text-highlight text-2xl">
          <a
            href="https://github.com/AnnyKaah"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:scale-125 hover:text-highlight-dark dark:hover:text-white transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/annykarolinedecarvalhomartins/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:scale-125 hover:text-highlight-dark dark:hover:text-white transition-all duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:annykamartins@icloud.com"
            title="Email"
            className="hover:scale-125 hover:text-highlight-dark dark:hover:text-white transition-all duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Anny Karoline.{" "}
          {translations[language].footer.copyright}
        </p>
>>>>>>> de4165ddfec2b77bb2c6b46fbf7d7c56434c381a
      </div>
    </section>

    <footer style={{textAlign:"center",padding:"28px",color:"#a090be",fontSize:"0.75rem",borderTop:"1px solid rgba(180,100,255,0.1)",position:"relative",zIndex:2,background:"#0d0a14"}}>
      <p>Feito com 💜 por <span className="gt">Anny Karoline</span> · 2025 · FullStack Developer & Engineer</p>
    </footer>
<<<<<<< HEAD
  </>);
}
=======
  );
}

function App() {
  const [language, setLanguage] = useState("pt");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Header language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      <main className="relative pt-16 text-text-dark dark:text-text-light">
        <NebulaBackground />
        <div className="relative z-10">
          <Hero language={language} />
          <About translations={translations[language].about} />
          <Skills language={language} />
          <Projetos language={language} />
          <Timeline language={language} />
          <Contact language={language} />
        </div>
      </main>
      <Footer language={language} />
    </>
  );
}

export default App;
>>>>>>> de4165ddfec2b77bb2c6b46fbf7d7c56434c381a
