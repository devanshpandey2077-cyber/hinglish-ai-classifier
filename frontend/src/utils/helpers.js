export const getPredictionColor = (prediction) => {
  const colors = {
    abusive_friendly: '#22c55e',
    abusive_hostile: '#ef4444',
    non_abusive_positive: '#3b82f6',
    non_abusive_negative: '#f97316',
  };
  return colors[prediction] || '#94a3b8';
};

export const getPredictionLabel = (prediction) => {
  const labels = {
    abusive_friendly: 'Abusive Friendly',
    abusive_hostile: 'Abusive Hostile',
    non_abusive_positive: 'Non-abusive Positive',
    non_abusive_negative: 'Non-abusive Negative',
  };
  return labels[prediction] || 'Unknown';
};

export const formatText = (text) => {
  return text.slice(0, 100) + (text.length > 100 ? '...' : '');
};

export const countWords = (text) => {
  return text.trim().split(/\s+/).length;
};

export const countCharacters = (text) => {
  return text.length;
};
