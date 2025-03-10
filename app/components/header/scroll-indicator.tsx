"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="h-[2px] bg-primary origin-left"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  );
};

export default ScrollIndicator; 