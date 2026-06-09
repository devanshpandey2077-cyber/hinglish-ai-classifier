import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';
import { getPredictionColor, getPredictionLabel } from '../utils/helpers';

const ResultCard = ({ prediction, confidence, scores }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const barVariants = {
    hidden: { scaleX: 0 },
    visible: (i) => ({
      scaleX: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const color = getPredictionColor(prediction);
  const label = getPredictionLabel(prediction);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 backdrop-blur-md shadow-2xl"
    >
      {/* Header with Prediction */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <FiTrendingUp size={24} style={{ color }} />
          <div>
            <p className="text-slate-400 text-sm">Prediction</p>
            <h3 className="text-2xl font-bold text-white">{label}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-slate-300 font-semibold">{confidence}% Confidence</span>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-8">
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Overall Confidence</p>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
          />
        </div>
      </div>

      {/* Probability Bars */}
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-4">Probability Distribution</p>
        <div className="space-y-3">
          {Object.entries(scores).map(([className, score], i) => (
            <div key={className}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-300">
                  {className.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-semibold text-slate-200">{score}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  custom={i}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full rounded-full"
                  style={{ width: `${score}%`, background: getPredictionColor(className) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
