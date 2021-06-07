import { useState, useEffect, MutableRefObject } from 'react'
import { useStateCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import { TrainPlatformType } from 'state/train/trainPlatformState'

export default function useDrawTrainLine(
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): void {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  const getAngleFromNode = (event: MouseEvent) => {
    if (nodeRef.current === null) return

    const { top, left, width, height } = nodeRef.current.getBoundingClientRect()

    const relativeY = top + height / 2 - event.clientY
    const relativeX = event.clientX - (left + width / 2)

    console.log(180 * (Math.atan2(relativeY, relativeX) / Math.PI))
  }

  const drawTrainLine = () => {
    if (trainPlatform === null || !isFirst) return

    if (isFirst) setIsFirst(false)
    if (!isDrawing) setIsDrawing(true)

    window.document.addEventListener('mousemove', getAngleFromNode)
  }

  useEffect(() => {
    if (currentMode !== 'line' || nodeRef.current === null) return

    console.log(setCurrentMode)

    nodeRef.current.addEventListener('click', drawTrainLine)

    return () => nodeRef.current?.removeEventListener('click', drawTrainLine)
  }, [currentMode])
}
