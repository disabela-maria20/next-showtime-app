import { useLayoutEffect, useRef } from 'react';

interface AutoFontSizeOptions {
  max?: number;
  min?: number;
  targetHeight?: number;
}

export function useAutoFontSize({
  max = 24,
  min = 12,
  targetHeight = 56
}: AutoFontSizeOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const adjustFontSize = () => {
      const containerWidth = container.clientWidth;

      const measure = document.createElement('div');
      const style = window.getComputedStyle(text);

      measure.style.position = 'absolute';
      measure.style.visibility = 'hidden';
      measure.style.width = `${containerWidth}px`;
      measure.style.fontFamily = style.fontFamily;
      measure.style.fontWeight = style.fontWeight;
      measure.style.lineHeight = '1.4';
      measure.style.whiteSpace = 'normal';
      measure.style.wordBreak = 'break-word';

      measure.innerText = text.innerText;

      document.body.appendChild(measure);

      let fontSize = max;

      while (fontSize >= min) {
        measure.style.fontSize = `${fontSize}px`;

        if (measure.scrollHeight <= targetHeight) {
          break;
        }

        fontSize--;
      }

      document.body.removeChild(measure);

      text.style.fontSize = `${fontSize}px`;
      text.style.lineHeight = '1.4';
      text.style.height = `${targetHeight}px`;

      // 👇 permite quebrar linha normal
      text.style.whiteSpace = 'normal';
      text.style.wordBreak = 'break-word';

      // 👇 garante alinhamento vertical bonito
      text.style.display = 'flex';
      text.style.alignItems = 'center';
    };

    adjustFontSize();

    const observer = new ResizeObserver(adjustFontSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [max, min, targetHeight]);

  return { containerRef, textRef };
}