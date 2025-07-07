"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text = "Loading..." }: LoadingProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xl text-gray-200"
      >
        {text}
      </motion.p>
    </div>
  );
}; 