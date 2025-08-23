import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-black to-black overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -800 }}
        transition={{ duration: 2, ease: "easeIn" }}
        className="flex flex-col items-center"
      >
        {/* Rocket */}
        <Rocket size={80} className="text-white" />
        
        {/* Flames */}
        <motion.div
          className="w-6 h-16 bg-gradient-to-t from-orange-500 to-transparent rounded-full mt-2"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
