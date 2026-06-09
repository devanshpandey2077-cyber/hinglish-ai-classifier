import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Toast = ({ id, message, type, onRemove }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type] || 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4`}
    >
      <p>{message}</p>
      <button onClick={() => onRemove(id)} className="hover:opacity-80">
        <FiX size={20} />
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
