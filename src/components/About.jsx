import { motion } from "framer-motion";
import avatarImg from "/img/avatar.png";

function About({ translations }) {
  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <motion.div
        className="relative max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        // As variantes serão passadas como props ou definidas no App.jsx
      >
        <motion.div
          className="relative z-10 md:-mr-12 justify-self-center"
          // As variantes serão passadas como props ou definidas no App.jsx
        >
          <img
            src={avatarImg}
            alt="Avatar de Anny Karoline"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-highlight shadow-2xl object-cover"
          />
        </motion.div>
        <motion.div
          className="md:col-span-2 bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:pl-20 shadow-xl border border-gray-200 dark:border-highlight/20"
          // As variantes serão passadas como props ou definidas no App.jsx
        >
          <h2 className="text-3xl font-heading font-bold mb-6 text-highlight">
            {translations.title}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-text-dark/90 dark:text-text-light/90">
            <p>{translations.p1}</p>
            <p>{translations.p2}</p>
            <blockquote className="mt-6 border-l-4 border-highlight pl-4 italic text-text-dark dark:text-text-light font-semibold">
              {translations.p3}
            </blockquote>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;