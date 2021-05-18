import { useState, useEffect, MutableRefObject } from 'react'
import { useGetSideBar } from 'state/sideBar/sideBarState'

export default function useScrollWithMouse(
  elementRef: MutableRefObject<HTMLDivElement | null>,
): void {
  const [isDown, setIsDown] = useState<boolean>(false)
  const { currentMode } = useGetSideBar()

  const handleMouseDown = () => {
    console.log('down')
    setIsDown(true)
  }

  const handleMouseMove = () => {
    console.log(isDown)
    if (!isDown) return
    console.log('move')
  }

  const handleMouseUp = () => {
    console.log('up')
    setIsDown(false)
  }

  useEffect(() => {
    if (currentMode !== 'hand') return

    elementRef.current?.addEventListener('mousedown', handleMouseDown)
    elementRef.current?.addEventListener('mousemove', handleMouseMove)
    elementRef.current?.addEventListener('mouseleave', handleMouseUp)
    elementRef.current?.addEventListener('mouseup', handleMouseUp)

    return () => {
      elementRef.current?.removeEventListener('mousedown', handleMouseDown)
      elementRef.current?.removeEventListener('mousemove', handleMouseMove)
      elementRef.current?.removeEventListener('mouseleave', handleMouseUp)
      elementRef.current?.removeEventListener('mouseup', handleMouseUp)
    }
  }, [currentMode])
}
