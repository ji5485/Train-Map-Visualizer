import { useEffect, MutableRefObject } from 'react'
import { useGetSideBar } from 'state/sideBar/sideBarState'

const CURSOR_BY_CURRENT_MODE = {
  hand: 'grab',
  select: 'pointer',
  append: 'copy',
  line: 'crosshair',
}

export default function useChangeCursor(
  elementRef: MutableRefObject<HTMLDivElement | null>,
): void {
  const { currentMode } = useGetSideBar()

  useEffect(() => {
    if (elementRef.current === null) return

    elementRef.current.style.cursor = CURSOR_BY_CURRENT_MODE[currentMode]
  }, [currentMode])
}
