import { useCallback } from "react";

export function useTruncate() {
  return useCallback((text: string, maxLength: number) => {
    if (!text) return "";

    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trimEnd() + "...";
  }, []);
}