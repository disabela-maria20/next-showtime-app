import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useAutoFontSize(max = 24, min = 12) {
 const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current

    if (!container || !text) return

    const resize = () => {
      let size = max
      text.style.fontSize = size + 'px'

      const maxHeight = container.clientHeight

      while (text.scrollHeight > maxHeight && size > min) {
        size--
        text.style.fontSize = size + 'px'
      }
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [max, min])

  return { containerRef, textRef }
}
