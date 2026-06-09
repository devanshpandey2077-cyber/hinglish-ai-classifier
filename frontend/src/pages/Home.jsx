import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiTrash2, FiCopy } from 'react-icons/fi';
import ResultCard from '../components/ResultCard';
import HistoryPanel from '../components/HistoryPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ExampleButton from '../components/ExampleButton';
import ThemeToggle from '../components/ThemeToggle';
import { predictService } from '../services/api';
import { useHistory } from '../hooks/useHistory';
import { useToast } from '../hooks/useToast';
import { countWords, countCharacters } from '../utils/helpers';
import ToastContainer from '../components/Toast';

const Home = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendReady, setBackendReady] = useState(false);
  const { history, addToHistory, clearHistory, deleteHistoryItem } = useHistory();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await predictService.health();
      setBackendReady(true);
    } catch (error) {
      setBackendReady(false);
      addToast('Backend is not available. Please start the backend server.', 'warning');
    }
  };

  const handlePredict = async () => {
    if (!text.trim()) {
      addToast('Please enter some text to analyze', 'warning');
      return;
    }

    if (!backendReady) {
      addToast('Backend is not available', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await predictService.predict(text);
      setResult(response);
      addToHistory(text, response.prediction, response.confidence);
      addToast('Analysis complete!', 'success');
    } catch (error) {
      console.error('Prediction error:', error);
      addToast('Failed to analyze text. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    addToast('Copied to clipboard!', 'success');
  };

  const handleExampleClick = (example) => {
    setText(example);
  };

  const handleSelectFromHistory = (historyText) => {
    setText(historyText);
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.shiftKey)) {
      handlePredict();
    }
  };

  const examples = [
    "Oye bhosdike kaisa hai",
    "Madarchod chup ho ja",
    "Love you bro",
    "Wah kya coding hai"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -top-40 -left-40 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -bottom-40 -right-40 animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between p-6 border-b border-slate-700 backdrop-blur-md bg-slate-950 bg-opacity-50"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-white">
              Hinglish <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Abuse Detector</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">AI-powered context classification for Hinglish text</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <ThemeToggle />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input and Result */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <motion.h2
                    variants={itemVariants}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    Analyze Hinglish Text
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-slate-400 text-lg"
                  >
                    Detect whether the text is abusive (friendly/hostile) or non-abusive (positive/negative)
                  </motion.p>
                </div>

                {/* Textarea */}
                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter Hinglish text here... (or press Ctrl+Enter to analyze)"
                      className="w-full h-48 bg-slate-800 bg-opacity-50 border border-slate-600 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-md transition-all"
                    />
                  </div>

                  {/* Character and Word Count */}
                  <div className="flex gap-6 mt-3 text-sm text-slate-400">
                    <span>Characters: {countCharacters(text)}</span>
                    <span>Words: {countWords(text)}</span>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex gap-3 flex-wrap mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePredict}
                    disabled={loading || !backendReady}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        Analyze
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClear}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Clear
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyToClipboard}
                    disabled={!text}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCopy size={18} />
                  </motion.button>
                </motion.div>

                {/* Examples */}
                <motion.div variants={itemVariants} className="mt-8">
                  <p className="text-slate-400 text-sm mb-3">Try examples:</p>
                  <div className="flex flex-wrap gap-3">
                    {examples.map((example) => (
                      <ExampleButton
                        key={example}
                        text={example}
                        onClick={handleExampleClick}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Result */}
                {result && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-8"
                  >
                    <ResultCard
                      prediction={result.prediction}
                      confidence={result.confidence}
                      scores={result.scores}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Column - History */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <HistoryPanel
                history={history}
                onDeleteItem={deleteHistoryItem}
                onSelectItem={handleSelectFromHistory}
              />

              {history.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearHistory}
                  className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FiTrash2 size={18} />
                  Clear History
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-slate-700 backdrop-blur-md bg-slate-950 bg-opacity-50 mt-12 py-6"
        >
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
            <p>Hinglish Abuse Context Detector • AI-Powered Classification</p>
            {!backendReady && (
              <p className="text-yellow-500 mt-2">⚠️ Backend server is not available. Please start it to use the analyzer.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Home;
