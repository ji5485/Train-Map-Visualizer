import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import {
  useManageCoordinateSystemDrawingLineStatus,
  useManageCoordinateSystemPreviewTrainLine,
} from 'state/CoordinateSystem/coordinateSystemDrawingLineState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { useSetTrainLine } from 'state/Train/trainLineState'
import {
  TrainLineColorName,
  TrainPlatformType,
  TrainLineDirection,
  TrainLineType,
} from 'types/Train.types'

type TrainLinePreviewMode = 'drawing' | 'preview' | null

type useDrawTrainLineType = {
  trainLinePreviewMode: TrainLinePreviewMode
  previewTrainLine: TrainLineType | null
  currentDrawingLine: {
    color: TrainLineColorName
    direction: TrainLineDirection | null
  }
}

const NEXT_POSITION = {
  top: [-1, 0],
  right: [0, 1],
  bottom: [1, 0],
  left: [0, -1],
}

export default function useDrawTrainLine(
  row: number,
  column: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
  trainLine: TrainLineType[],
): useDrawTrainLineType {
  // Information About Coordinate System
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    width: coordinatePlaneWidth,
    height: coordinatePlaneHeight,
  } = useGetCoordinatePlaneSize()

  // Coordinate System Preview Train Line Status
  const [
    { isFirst, isDrawing, previewTrainLineColor, currentPosition },
    setDrawingLineStatus,
    resetDrawingLineStatus,
  ] = useManageCoordinateSystemDrawingLineStatus()
  const [
    previewTrainLine,
    setPreviewTrainLine,
    resetPreviewTrainLine,
  ] = useManageCoordinateSystemPreviewTrainLine()

  // Current Node Preview Train Line Status
  const [
    trainLinePreviewMode,
    setTrainLinePreviewMode,
  ] = useState<TrainLinePreviewMode>(null)
  const [direction, setDirection] = useState<TrainLineDirection | null>(null)

  // Train Line Setter
  const setTrainLine = useSetTrainLine()

  // Function for starting draw train line
  const startDrawing = () => {
    // if (trainPlatform !== null && isFirst) {
    //   const maxTrainLine = trainPlatform.line.length * 2

    //   if (maxTrainLine < trainLine.length + 1) return
    // }
    console.log(trainLine)

    setDrawingLineStatus(prev =>
      isFirst
        ? {
            isFirst: true,
            isDrawing: true,
            previewTrainLineColor:
              trainPlatform !== null ? trainPlatform.line[0].color : 'blue',
            currentPosition: { row, column },
          }
        : {
            ...prev,
            currentPosition: { row, column },
          },
    )
    setTrainLinePreviewMode('drawing')
  }

  // Function for finishing draw train line
  const finishDrawing = () => {
    setTrainLinePreviewMode('preview')

    if (isFirst)
      setDrawingLineStatus(prev =>
        produce(prev, draft => {
          draft.isFirst = false
          return draft
        }),
      )
  }

  const createTrainLine = () => {
    for (let r = 0; r < coordinatePlaneHeight; r++) {
      for (let c = 0; c < coordinatePlaneWidth; c++) {
        const previewTrainLineItem = previewTrainLine[r][c]

        if (previewTrainLineItem === null) continue

        setTrainLine(prev =>
          produce(prev, draft => {
            draft[r][c].push(previewTrainLineItem)
            return draft
          }),
        )
      }
    }

    setCurrentMode('hand')
  }

  // Drawing Train Line
  useEffect(() => {
    if (!isDrawing || trainLinePreviewMode !== 'drawing') return

    const drawing = (event: MouseEvent) => {
      if (nodeRef.current === null) return

      const {
        top,
        left,
        width,
        height,
      } = nodeRef.current.getBoundingClientRect()
      const relativeY = top + height / 2 - event.clientY
      const relativeX = event.clientX - (left + width / 2)
      const angle = 180 * (Math.atan2(relativeY, relativeX) / Math.PI)

      const checkPreviewTrainLineDirection = (
        isInRange: boolean,
        direction: TrainLineDirection,
      ) =>
        isInRange &&
        previewTrainLine[row + NEXT_POSITION[direction][0]][
          column + NEXT_POSITION[direction][1]
        ] === null &&
        0 <= row + NEXT_POSITION[direction][0] &&
        row + NEXT_POSITION[direction][0] < coordinatePlaneHeight &&
        0 <= column + NEXT_POSITION[direction][1] &&
        column + NEXT_POSITION[direction][1] < coordinatePlaneWidth

      if (checkPreviewTrainLineDirection(-45 <= angle && angle < 45, 'right'))
        setDirection('right')
      else if (
        checkPreviewTrainLineDirection(45 <= angle && angle < 135, 'top')
      )
        setDirection('top')
      else if (
        checkPreviewTrainLineDirection(135 <= angle || angle < -135, 'left')
      )
        setDirection('left')
      else if (
        checkPreviewTrainLineDirection(-135 <= angle && angle < -45, 'bottom')
      )
        setDirection('bottom')

      window.document.addEventListener('click', finishDrawing, { once: true })
    }

    window.document.addEventListener('mousemove', drawing)

    return () => window.document.removeEventListener('mousemove', drawing)
  }, [trainLinePreviewMode])

  // Append Preview Train Line After Drawing Train Line
  useEffect(() => {
    if (isDrawing && trainLinePreviewMode === 'drawing') return
    if (direction === null) return

    const newPreviewTrainLine: TrainLineType = {
      color: previewTrainLineColor,
      direction,
    }

    setDrawingLineStatus(prev => ({
      ...prev,
      currentPosition: {
        row: row + NEXT_POSITION[direction][0],
        column: column + NEXT_POSITION[direction][1],
      },
    }))
    setPreviewTrainLine(prev =>
      produce(prev, draft => {
        draft[row][column] = newPreviewTrainLine
        return draft
      }),
    )
  }, [trainLinePreviewMode])

  // Start to draw train line with "startDrawing" Function
  useEffect(() => {
    if (currentMode !== 'line') {
      setTrainLinePreviewMode(null)

      return () => {
        resetDrawingLineStatus()
        resetPreviewTrainLine()
        nodeRef.current?.removeEventListener('click', startDrawing)
      }
    }

    if (!isDrawing && isFirst && trainPlatform !== null)
      nodeRef.current?.addEventListener('click', startDrawing, { once: true })
    else if (
      isDrawing &&
      !isFirst &&
      currentPosition.row === row &&
      currentPosition.column === column
    ) {
      if (trainPlatform === null) startDrawing()
      else createTrainLine()
    }

    return () => nodeRef.current?.removeEventListener('click', startDrawing)
  }, [currentMode, currentPosition.row, currentPosition.column])

  return {
    trainLinePreviewMode,
    previewTrainLine: previewTrainLine[row][column],
    currentDrawingLine: {
      color: previewTrainLineColor,
      direction,
    },
  }
}
