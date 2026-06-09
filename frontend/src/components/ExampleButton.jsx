import React from 'react';
import { motion } from 'framer-motion';

const ExampleButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(text)}
      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
    >
      "{text}"
    </motion.button>
  );
};

export default ExampleButton;
