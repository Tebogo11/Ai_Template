import { useEffect, useState } from 'react';

type Placeholder = {
  id: number;
  placeholder: string;
};

export const useRotatingPlaceholder = (placeholders: Placeholder[], interval = 5000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (placeholders.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % placeholders.length);
    }, interval);

    return () => clearInterval(timer);
  }, [placeholders.length, interval]);

  return placeholders[index];
};
