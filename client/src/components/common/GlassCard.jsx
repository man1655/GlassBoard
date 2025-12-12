import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      iinitial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      viewport={{
        once: false, 
        amount: 0.3, 
        margin: "-90px", 
      }}
      className={`
        relative overflow-hidden
        bg-white/10               
        backdrop-blur-lg           
        border border-white/20     
        shadow-xl                  
        rounded-2xl                
        p-6                        
        ${className}
      `}
    >
      {/* Optional: Simple shine effect inside */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />

      {children}
    </motion.div>
  );
};

export default GlassCard;
