"use client";

import { motion } from "framer-motion";
import React from "react";

const variants = {
  hidden: { opacity: 0, y: 200, x: 0 },
  enter: { opacity: 1, y: 0, x: 0 },
};

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
