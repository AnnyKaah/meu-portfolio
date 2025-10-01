import { motion } from "framer-motion";

const Planet = ({ size, x, y, color, glowColor, anim }) => {
  return (
    // Apenas um wrapper para posicionamento e animação de flutuação
    <motion.div
      className="absolute rounded-full"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: anim.y, // Animação de flutuação vertical
        x: anim.x, // Animação de flutuação horizontal
      }}
      transition={{
        opacity: { duration: 1.5, ease: "easeInOut" },
        scale: { duration: 1.5, ease: "easeInOut" },
        y: { duration: anim.durationY, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        x: { duration: anim.durationX, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: anim.delayX },
      }}
      style={{
        width: size,
        height: size,
        top: y,
        left: x,
        background: `radial-gradient(circle, ${color[0]}, ${color[1]})`,
        boxShadow: `0 0 20px 5px ${glowColor}, inset 0 0 15px rgba(255,255,255,0.3)`,
      }}
    />
  );
};

function NebulaBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-50 dark:bg-[#0a0a1a]">
      {/* Fundo da Nebulosa */}
      <div className="absolute inset-0 opacity-50 nebula-bg" />

      {/* Camadas de Estrelas para Parallax */}
      <div id="stars1" className="stars" />
      <div id="stars2" className="stars" />
      <div id="stars3" className="stars" />

      {/* Planetas Flutuantes */}
      <Planet
        size={25}
        x="15%"
        y="20%"
        color={["#ff6b81", "#ff4757"]}
        glowColor="rgba(255, 107, 129, 0.3)"
        anim={{ y: [0, 15, 0], x: [0, -10, 0], durationY: 20, durationX: 15, delayX: 0 }}
      />
      <Planet
        size={18}
        x="80%"
        y="60%"
        color={["#70a1ff", "#1e90ff"]}
        glowColor="rgba(112, 161, 255, 0.3)"
        anim={{ y: [0, -12, 0], x: [0, 20, 0], durationY: 18, durationX: 25, delayX: 3 }}
      />
      <Planet
        size={12}
        x="10%"
        y="85%"
        color={["#a55eea", "#8854d0"]}
        glowColor="rgba(165, 94, 234, 0.3)"
        anim={{ y: [0, 10, 0], x: [0, 5, 0], durationY: 22, durationX: 18, delayX: 1 }}
      />
      <Planet
        size={8}
        x="90%"
        y="15%"
        color={["#f1c40f", "#f39c12"]}
        glowColor="rgba(241, 196, 15, 0.2)"
        anim={{ y: [0, -20, 0], x: [0, -15, 0], durationY: 12, durationX: 16, delayX: 2 }}
      />
      <Planet
        size={6}
        x="45%"
        y="50%"
        color={["#55efc4", "#00b894"]}
        glowColor="rgba(0, 184, 148, 0.2)"
        anim={{ y: [0, 25, 0], x: [0, 25, 0], durationY: 15, durationX: 20, delayX: 4 }}
      />
      <Planet
        size={10}
        x="70%"
        y="90%"
        color={["#ff7675", "#d63031"]}
        glowColor="rgba(214, 48, 49, 0.2)"
        anim={{ y: [0, -18, 0], x: [0, -8, 0], durationY: 19, durationX: 14, delayX: 0 }}
      />
      <Planet
        size={5}
        x="30%"
        y="75%"
        color={["#a29bfe", "#6c5ce7"]}
        glowColor="rgba(108, 92, 231, 0.2)"
        anim={{ y: [0, 12, 0], x: [0, -12, 0], durationY: 16, durationX: 22, delayX: 5 }}
      />
      {/* --- Mais Planetas --- */}
      <Planet
        size={4}
        x="5%"
        y="5%"
        color={["#fd79a8", "#e84393"]}
        glowColor="rgba(232, 67, 147, 0.2)"
        anim={{ y: [0, -10, 0], x: [0, 10, 0], durationY: 13, durationX: 19, delayX: 6 }}
      />
      <Planet
        size={7}
        x="95%"
        y="95%"
        color={["#00cec9", "#01a3a4"]}
        glowColor="rgba(0, 206, 201, 0.2)"
        anim={{ y: [0, 8, 0], x: [0, -15, 0], durationY: 25, durationX: 17, delayX: 8 }}
      />
      <Planet
        size={9}
        x="50%"
        y="5%"
        color={["#fab1a0", "#e17055"]}
        glowColor="rgba(225, 112, 85, 0.2)"
        anim={{ y: [0, 20, 0], x: [0, 0, 0], durationY: 14, durationX: 14, delayX: 3 }}
      />
      <Planet
        size={3}
        x="60%"
        y="30%"
        color={["#ffffff", "#dfe6e9"]}
        glowColor="rgba(223, 230, 233, 0.2)"
        anim={{ y: [0, -5, 0], x: [0, 5, 0], durationY: 30, durationX: 30, delayX: 10 }}
      />
      <Planet
        size={14}
        x="25%"
        y="45%"
        color={["#81ecec", "#74b9ff"]}
        glowColor="rgba(116, 185, 255, 0.2)"
        anim={{ y: [0, 18, 0], x: [0, -18, 0], durationY: 17, durationX: 23, delayX: 7 }}
      />
    </div>
  );
}

export default NebulaBackground;