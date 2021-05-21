import { useState, useEffect, MutableRefObject } from 'react'
import { useGetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'

type PositionType = {
  scrollX: number
  scrollY: number
  cursorX: number
  cursorY: number
}

export default function useScrollWithMouse(
  elementRef: MutableRefObject<HTMLDivElement | null>,
): void {
  const [isDown, setIsDown] = useState<boolean>(false)
  const [position, setPosition] = useState<PositionType>({
    scrollX: 0,
    scrollY: 0,
    cursorX: 0,
    cursorY: 0,
  })
  const currentMode = useGetCoordinateSystemCurrentMode()

  const handleMouseDown = (event: MouseEvent) => {
    if (elementRef.current === null) return

    event.preventDefault()
    setIsDown(true)

    const { scrollLeft: scrollX, scrollTop: scrollY } = elementRef.current
    const { x: cursorX, y: cursorY } = event

    setPosition({ scrollX, scrollY, cursorX, cursorY })
  }

  const handleMouseUp = () => setIsDown(false)

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (!isDown || elementRef.current === null) return

      const { scrollX, scrollY, cursorX, cursorY } = position

      elementRef.current.scrollLeft = scrollX - (clientX - cursorX)
      elementRef.current.scrollTop = scrollY - (clientY - cursorY)
    }

    elementRef.current?.addEventListener('mousemove', handleMouseMove)

    return () =>
      elementRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [isDown, position])

  useEffect(() => {
    if (currentMode !== 'hand') return

    elementRef.current?.addEventListener('mousedown', handleMouseDown)
    elementRef.current?.addEventListener('mouseleave', handleMouseUp)
    elementRef.current?.addEventListener('mouseup', handleMouseUp)

    return () => {
      elementRef.current?.removeEventListener('mousedown', handleMouseDown)
      elementRef.current?.removeEventListener('mouseleave', handleMouseUp)
      elementRef.current?.removeEventListener('mouseup', handleMouseUp)
    }
  }, [currentMode])
}
