import { useEffect, MutableRefObject } from 'react'
import { useGetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'

const CURSOR_BY_CURRENT_MODE = {
  hand: 'grab',
  select: 'pointer',
  append: 'copy',
  line: 'crosshair',
}

export default function useChangeCursor(
  elementRef: MutableRefObject<HTMLDivElement | null>,
): void {
  const currentMode = useGetCoordinateSystemCurrentMode()

  useEffect(() => {
    if (elementRef.current === null) return

    elementRef.current.style.cursor = CURSOR_BY_CURRENT_MODE[currentMode]
  }, [currentMode])
}
