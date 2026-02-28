import { useEffect, useState } from 'react';
import figlet from 'figlet';

interface UseFigletTextOptions {
  font?: string;
}

export function useFigletText(text: string, options?: UseFigletTextOptions) {
  const [ascii, setAscii] = useState<string>('');

  useEffect(() => {
    figlet.text(text, { font: options?.font }, (err, data) => {
      if (err) {
        setAscii('');
        return;
      }
      setAscii(data || '');
    });
  }, [text, options?.font]);

  return ascii;
}
