import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-radial flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-hospital-red rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 glow-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block"
            animate={{ 
              textShadow: [
                "0 0 20px hsl(var(--neon-glow))",
                "0 0 30px hsl(var(--neon-glow)), 0 0 40px hsl(var(--neon-glow))",
                "0 0 20px hsl(var(--neon-glow))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            We Save Lives
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/login")}
            className="glass px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-2xl hover:scale-105 hover:shadow-glow transition-all duration-300 backdrop-blur-md"
            variant="ghost"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Subtle red glow effect */}
      <div className="absolute inset-0 bg-hospital-red/5 blur-3xl animate-pulse" />
    </div>
  );
};

export default Home;