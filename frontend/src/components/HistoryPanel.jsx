import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiCopy } from 'react-icons/fi';
import { formatText, getPredictionColor, getPredictionLabel } from '../utils/helpers';

const HistoryPanel = ({ history, onDeleteItem, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCopyToTextarea = (text) => {
    onSelectItem(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 backdrop-blur-md shadow-2xl h-fit max-h-96 overflow-y-auto"
    >
      <h3 className="text-lg font-bold text-white mb-4">Recent Predictions</h3>

      {history.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No predictions yet</p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-700 bg-opacity-50 rounded-lg p-3 hover:bg-opacity-75 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{formatText(item.input)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                        style={{ backgroundColor: getPredictionColor(item.prediction) }}
                      >
                        {getPredictionLabel(item.prediction)}
                      </span>
                      <span className="text-xs text-slate-400">{item.confidence}%</span>
                      <span className="text-xs text-slate-500">{item.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyToTextarea(item.input)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors"
                      title="Copy to textarea"
                    >
                      <FiCopy size={16} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPanel;
