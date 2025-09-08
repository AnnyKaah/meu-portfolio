import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
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
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiGooglegemini,
} from "react-icons/si";

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
      typing: [
        "Desenvolvedora Full Stack",
        "Paixão por Código",
        "Criando soluções inovadoras",
      ],
      subtitle:
        "Transformando ideias em soluções digitais inovadoras e funcionais.",
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
      },
    },
    projects: {
      title: "Projetos",
      repo: "Repositório",
      demo: "Demo",
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
            "Responsável pela gestão e recuperação de itens zero-stock, mantendo a disponibilidade abaixo de 3%, otimizando processos e garantindo eficiência na cadeia de suprimentos.",
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
            "Apoio em rotinas de gestão de estoque e inspeção, contribuindo para otimização de processos e controle de dados.",
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
      typing: [
        "Full Stack Developer",
        "Passion for Code",
        "Building innovative solutions",
      ],
      subtitle:
        "Transforming ideas into innovative and functional digital solutions.",
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
      },
    },
    projects: {
      title: "Projects",
      repo: "Repository",
      demo: "Demo",
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
            "Responsible for managing and recovering zero-stock items, maintaining availability below 3%, optimizing processes, and ensuring supply chain efficiency.",
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
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let timer;

    if (!isDeleting && displayedText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, speed);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, speed / 2);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, speed]);

  return (
    <h1 className="text-4xl md:text-6xl font-futuristic font-bold text-white whitespace-nowrap border-r-4 border-goldMetallic pr-2 overflow-hidden max-w-full">
      {displayedText}
      <span className="animate-blink">|</span>
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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Fundo de Grade */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#121212] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:2rem_2rem]"></div>

      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Imagem */}
        <motion.div variants={heroItemVariants}>
          <img
            src="/perfil.jpeg"
            alt="Anny Karoline"
            className="w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-goldMetallic shadow-lg object-cover"
          />
        </motion.div>

        {/* Conteúdo de Texto */}
        <div className="text-center lg:text-left">
          <motion.div variants={heroItemVariants}>
            <TypingAnimation typingTexts={translations[language].hero.typing} />
          </motion.div>

          <motion.p
            variants={heroItemVariants}
            className="mt-6 max-w-xl text-white text-lg md:text-xl font-light"
          >
            {translations[language].hero.subtitle}
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-goldMetallic text-black font-semibold rounded-md shadow-lg hover:shadow-goldMetallic transition-shadow"
            >
              <FaProjectDiagram />
              <span>{translations[language].hero.ctaProjects}</span>
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-goldMetallic text-goldMetallic font-semibold rounded-md hover:bg-goldMetallic hover:text-black transition"
            >
              <FaEnvelope />
              <span>{translations[language].hero.ctaContact}</span>
            </a>
            <a
              href="/curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-goldMetallic text-goldMetallic font-semibold rounded-md hover:bg-goldMetallic hover:text-black transition"
            >
              <FaDownload />
              <span>{translations[language].hero.ctaCV}</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de Rolagem */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#sobre" aria-label="Scroll down">
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <FaMouse className="text-white" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}

function About({ language }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      id="sobre"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 bg-[#121212]"
    >
      <motion.img
        src="/img/avatar.jpeg"
        alt="Anny Karoline"
        className="w-48 h-48 rounded-full border-4 border-goldMetallic shadow-lg object-cover"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <motion.div className="max-w-xl text-white" data-aos="fade-right">
        <h2 className="text-3xl font-futuristic font-bold mb-4 text-goldMetallic">
          {translations[language].about.title}
        </h2>
        <p className="text-lg leading-relaxed">
          {translations[language].about.p1}
          <br />
          <br />
          {translations[language].about.p2}
          <br />
          <br />
          {translations[language].about.p3}
        </p>
      </motion.div>
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
    ],
  },
];

function Skills({ language }) {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-br from-purpleGradientEnd to-pinkGradientStart px-6 py-20"
    >
      <h2 className="text-3xl font-futuristic font-bold mb-12 text-goldMetallic text-center">
        {translations[language].skills.title}
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map(({ titleKey, skills }) => (
          <div
            key={titleKey}
            className="bg-[#121212] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border-2 border-goldMetallic/20 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-goldMetallic mb-6 text-center">
              {translations[language].skills.categories[titleKey]}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center gap-3 p-3 bg-black bg-opacity-30 rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-goldMetallic">{skill.icon}</div>
                  <span className="text-white font-semibold">
                    {translations[language].skills.names[skill.name]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const projetos = [
  {
    image: "/img/hashLivre2.png",
    techs: ["Express", "Node.js", "MongoDB", "JavaScript"],
    repo: "https://github.com/AnnyKaah/ecommecer-JS-hash",
    demo: "#",
  },
  {
    image: "/img/API-IA.png",
    techs: ["React", "Node.js", "Express", "Google Gemini API", "CSS"],
    repo: "https://github.com/AnnyKaah/gemini-ai-chat-assistant",
    demo: "#",
  },
  {
    image: "/img/visualizacao-dados.png",
    techs: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    repo: "https://github.com/AnnyKaah/visualizacao-dados",
    demo: "#",
  },
];

function Projetos({ language }) {
  const projectData = {
    pt: [
      {
        title: "ShopHere E-commerce",
        description:
          "Uma plataforma de e-commerce completa para demonstrar habilidades full-stack, desde a criação de uma API RESTful segura até a implementação de uma interface de usuário rica e responsiva.",
      },
      {
        title: "API de Chat com IA",
        description:
          "Uma interface de chat moderna e responsiva para interagir com a API do Google Gemini, permitindo conversas baseadas em texto e análise de imagens.",
      },
      {
        title: "StudyFlow",
        description:
          "Desenvolvimento de uma plataforma completa para ensino online, integrando funcionalidades de cadastro, aulas ao vivo, avaliações e acompanhamento de desempenho.",
      },
    ],
    en: [
      {
        title: "ShopHere E-commerce",
        description:
          "A complete e-commerce platform to demonstrate full-stack skills, from creating a secure RESTful API to implementing a rich and responsive user interface.",
      },
      {
        title: "AI Chat API",
        description:
          "A modern and responsive chat interface to interact with the Google Gemini API, allowing for text-based conversations and image analysis.",
      },
      {
        title: "StudyFlow",
        description:
          "Development of a complete online learning platform, integrating features for registration, live classes, assessments, and performance tracking.",
      },
    ],
  };

  return (
    <section id="projetos" className="min-h-screen bg-[#121212] px-6 py-20">
      <h2 className="text-3xl font-futuristic font-bold mb-12 text-goldMetallic text-center">
        {translations[language].projects.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projectData[language].map(({ title, description }, index) => (
          <motion.div
            key={title}
            className="bg-gradient-to-tr from-purpleGradientEnd to-pinkGradientStart rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col"
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              boxShadow: "0 10px 20px rgba(212, 175, 55, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img
              src={projetos[index].image}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-[#1a1a2e] flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-sm mb-4 flex-grow">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projetos[index].techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-goldMetallic text-black px-2 py-1 rounded font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto pt-4">
                <a
                  href={projetos[index].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-goldMetallic hover:underline"
                >
                  {translations[language].projects.repo}
                </a>
                {projetos[index].demo !== "#" && (
                  <a
                    href={projetos[index].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-goldMetallic hover:underline"
                  >
                    {translations[language].projects.demo}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Timeline({ language }) {
  const [view, setView] = useState("professional"); // 'professional' or 'academic'

  const dataToShow = translations[language].experiences[view];

  return (
    <section
      id="experiencia"
      className="min-h-screen bg-gradient-to-br from-pinkGradientStart to-purpleGradientEnd px-6 py-20"
    >
      <h2 className="text-3xl font-futuristic font-bold mb-12 text-goldMetallic text-center">
        {translations[language].timeline.title}
      </h2>
      <div className="flex justify-center gap-4 mb-16">
        <button
          onClick={() => setView("professional")}
          className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ${
            view === "professional"
              ? "bg-goldMetallic text-black shadow-lg"
              : "bg-transparent border-2 border-goldMetallic text-goldMetallic"
          }`}
        >
          {translations[language].timeline.professional}
        </button>
        <button
          onClick={() => setView("academic")}
          className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ${
            view === "academic"
              ? "bg-goldMetallic text-black shadow-lg"
              : "bg-transparent border-2 border-goldMetallic text-goldMetallic"
          }`}
        >
          {translations[language].timeline.academic}
        </button>
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Linha vertical */}
        <div className="absolute left-5 md:left-1/2 top-0 transform md:-translate-x-1/2 h-full w-1 bg-goldMetallic/30" />

        <div className="space-y-12">
          {dataToShow.map(
            ({ company, role, period, location, description }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative mb-12">
                  {/* Icon in the middle */}
                  <div className="absolute top-0 left-5 md:left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-goldMetallic text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-purpleGradientEnd">
                      {view === "professional" ? (
                        <FaBriefcase className="text-xl" />
                      ) : (
                        <FaGraduationCap className="text-xl" />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`w-full pl-20 md:w-1/2 ${
                      isLeft ? "md:pl-0 md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className={`bg-black/40 backdrop-blur-md border border-goldMetallic/30 rounded-lg p-6 shadow-lg ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-goldMetallic">
                        {role}
                      </h3>
                      <h4 className="text-lg font-semibold text-white">
                        {company}
                      </h4>
                      <p className="text-sm italic text-gray-300 mb-3">
                        {period} | {location}
                      </p>
                      <p className="text-white text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            }
          )}
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
      setStatus(translations[language].contact.form.error);
    }
  }

  return (
    <section
      id="contato"
      className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-futuristic font-bold text-goldMetallic">
          {translations[language].contact.title}
        </h2>
        <p className="text-white mt-4 max-w-2xl mx-auto text-lg">
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
          <h3 className="text-2xl font-bold text-white text-center md:text-left">
            {translations[language].contact.otherTitle}
          </h3>
          <a
            href="mailto:annykamartins@icloud.com"
            className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-lg hover:bg-goldMetallic/10 transition-colors border border-goldMetallic/20"
          >
            <FaEnvelope className="text-goldMetallic text-2xl" />
            <span className="text-white">annykamartins@icloud.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/annykarolinedecarvalhomartins/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-lg hover:bg-goldMetallic/10 transition-colors border border-goldMetallic/20"
          >
            <FaLinkedin className="text-goldMetallic text-2xl" />
            <span className="text-white">LinkedIn</span>
          </a>
          <a
            href="https://github.com/AnnyKaah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-lg hover:bg-goldMetallic/10 transition-colors border border-goldMetallic/20"
          >
            <FaGithub className="text-goldMetallic text-2xl" />
            <span className="text-white">GitHub</span>
          </a>
        </motion.div>

        {/* Coluna da Direita: Formulário */}
        <motion.form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/mwpnarjo"
          method="POST"
          className="w-full bg-[#1a1a2e] p-8 rounded-lg shadow-lg space-y-6 border-2 border-goldMetallic/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="text"
            name="name"
            placeholder={translations[language].contact.form.name}
            className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-goldMetallic outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={translations[language].contact.form.email}
            className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-goldMetallic outline-none"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder={translations[language].contact.form.message}
            className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-goldMetallic outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full px-10 py-4 bg-goldMetallic text-black font-bold rounded-full shadow-lg hover:shadow-goldMetallic transition-shadow"
          >
            {translations[language].contact.form.submit}
          </button>
          {status && <p className="mt-4 text-center text-white">{status}</p>}
        </motion.form>
      </div>
    </section>
  );
}

function Header({ language, setLanguage }) {
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
        scrolled ? "bg-[#121212] shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-futuristic font-bold text-goldMetallic"
        >
          Anny.
        </a>
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-white font-semibold hover:text-goldMetallic transition-colors duration-300 ${
                  activeSection === href.substring(1)
                    ? "text-goldMetallic border-b-2 border-goldMetallic"
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
              className="w-10 h-10 flex items-center justify-center border-2 border-goldMetallic text-goldMetallic font-bold rounded-full hover:bg-goldMetallic hover:text-black transition-colors duration-300"
            >
              {language.toUpperCase()}
            </button>
          </li>
        </ul>
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <motion.div
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center"
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
                  className="text-white text-3xl font-semibold hover:text-goldMetallic transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
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
  return (
    <footer className="bg-[#121212] border-t border-goldMetallic/20 py-8 text-center text-gray-400">
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-6 mb-4 text-goldMetallic text-2xl">
          <a
            href="https://github.com/AnnyKaah"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:scale-125 hover:text-white transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/annykarolinedecarvalhomartins/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:scale-125 hover:text-white transition-all duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:annykamartins@icloud.com"
            title="Email"
            className="hover:scale-125 hover:text-white transition-all duration-300"
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

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <main className="pt-16">
        {" "}
        {/* Adiciona padding para não ficar sob o header */}
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} />
        <Projetos language={language} />
        <Timeline language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </>
  );
}

export default App;
