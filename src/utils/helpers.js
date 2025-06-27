export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};
