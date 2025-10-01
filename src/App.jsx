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
        <motion.div variants={heroItemVariants} className="relative group lg:col-span-2 lg:justify-self-end">
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
        </div>
      </div>
    </section>
  );
}

function Contact({ language }) {
  const [status, setStatus] = useState("");

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
      </div>
    </section>
  );
}

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
      </div>
    </footer>
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
