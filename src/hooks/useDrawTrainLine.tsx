import { useState, useEffect, MutableRefObject } from 'react'
import { TrainPlatformType } from 'state/train/trainPlatformState'
import { TrainLineColorName } from 'state/train/trainLineColorState'
import { useStateCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import {
  TrainLineDirection,
  CoordinateSystemPreviewTrainLineType,
  useStateCoordinateSystemDrawingLine,
  useSetCoordinateSystemPreviewTrainLine,
} from 'state/coordinateSystem/coordinateSystemDrawingLineState'

type useDrawTrainLineType = {
  visibleTrainLinePreview: boolean
  previewTrainLine: {
    color: TrainLineColorName
    direction: TrainLineDirection
  }
}

export default function useDrawTrainLine(
  row: number,
  column: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useDrawTrainLineType {
  const [currentMode] = useStateCoordinateSystemCurrentMode()
  const [
    { isFirst, isDrawing, previewTrainLineColor, currentPosition },
    setCoordinateSystemDrawingLine,
  ] = useStateCoordinateSystemDrawingLine()
  const setPreviewTrainLine = useSetCoordinateSystemPreviewTrainLine()
  const [
    visibleTrainLinePreview,
    setVisibleTrainLinePreview,
  ] = useState<boolean>(false)
  const [direction, setDirection] = useState<TrainLineDirection>('top')

  const drawing = (event: MouseEvent) => {
    if (nodeRef.current === null) return

    const { top, left, width, height } = nodeRef.current.getBoundingClientRect()
    const relativeY = top + height / 2 - event.clientY
    const relativeX = event.clientX - (left + width / 2)
    const angle = 180 * (Math.atan2(relativeY, relativeX) / Math.PI)

    if (-45 <= angle && angle < 45) setDirection('right')
    else if (45 <= angle && angle < 135) setDirection('top')
    else if (135 <= angle || angle < -135) setDirection('left')
    else if (-135 <= angle && angle < -45) setDirection('bottom')

    window.document.addEventListener('click', finishDrawing)
  }

  const startDrawing = () => {
    setCoordinateSystemDrawingLine({
      isFirst: true,
      isDrawing: true,
      previewTrainLineColor:
        trainPlatform !== null ? trainPlatform.line[0].color : 'blue',
      currentPosition: { row, column },
    })
    setVisibleTrainLinePreview(true)

    window.document.addEventListener('mousemove', drawing)
  }

  const finishDrawing = () => {
    const previewTrainLine: CoordinateSystemPreviewTrainLineType = {
      row,
      column,
      color: previewTrainLineColor,
      direction,
    }

    const nextPosition = {
      top: [-1, 0],
      right: [0, 1],
      bottom: [1, 0],
      left: [0, -1],
    }

    setCoordinateSystemDrawingLine(prev => ({
      ...prev,
      currentPosition: {
        row: row + nextPosition[direction][0],
        column: column + nextPosition[direction][1],
      },
    }))

    setPreviewTrainLine(prev => [...prev, previewTrainLine])

    window.document.removeEventListener('mousemove', drawing)
    window.document.removeEventListener('click', finishDrawing)
  }

  useEffect(() => {
    if (currentMode !== 'line') return

    if (!isDrawing && isFirst && trainPlatform !== null)
      nodeRef.current?.addEventListener('click', startDrawing)
    else if (
      isDrawing &&
      currentPosition.row === row &&
      currentPosition.column === column
    )
      window.document.addEventListener('mousemove', drawing)

    return () => {
      nodeRef.current?.removeEventListener('click', startDrawing)
      window.document.removeEventListener('mousemove', drawing)
    }
  }, [currentMode])

  return {
    visibleTrainLinePreview,
    previewTrainLine: {
      color: previewTrainLineColor,
      direction,
    },
  }
}
