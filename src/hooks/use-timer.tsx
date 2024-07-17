import React from 'react';

export default function useTimer(_second = 60): [
  number,
  {
    reset: () => void;
    set: (set: number) => void;
  },
] {
  const [second, setSecond] = React.useState(_second);

  const handler = React.useMemo(() => {
    const reset = () => setSecond(_second);
    const set = (set: number) => setSecond(set);

    return { reset, set };
  }, [_second]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [setSecond]);

  return [second, handler];
}
