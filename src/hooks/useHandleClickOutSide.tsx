import { useEffect, useRef, MutableRefObject } from 'react'

export default function useHandleClickOutSide(
  handleHideTrainLineList: () => void,
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current === null) return
    if (!ref.current.contains(event.target as Node)) handleHideTrainLineList()
  }

  useEffect(() => {
    window.document.addEventListener('mousedown', handleClickOutside)

    return () =>
      window.document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return ref
}
