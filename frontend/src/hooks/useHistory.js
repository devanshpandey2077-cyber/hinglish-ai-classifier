import { useState, useCallback } from 'react';

const HISTORY_KEY = 'hinglish_abuse_history';
const MAX_HISTORY = 10;

export const useHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = useCallback((input, prediction, confidence) => {
    setHistory(prev => {
      const newHistory = [
        {
          id: Date.now(),
          input,
          prediction,
          confidence,
          timestamp: new Date().toLocaleString(),
        },
        ...prev.slice(0, MAX_HISTORY - 1),
      ];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const deleteHistoryItem = useCallback((id) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { history, addToHistory, clearHistory, deleteHistoryItem };
};
