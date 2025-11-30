import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-3 h-16">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-primary-foreground" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-lg font-semibold text-sidebar-foreground">Author Studio</h1>
        <p className="text-xs text-muted-foreground">Rexar App</p>
      </motion.div>
    </div>
  );
};

export default Logo;
