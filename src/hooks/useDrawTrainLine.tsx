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
  TrainLinePreviewMode,
  TrainLineColorName,
  TrainPlatformType,
  TrainLineDirection,
  TrainLineType,
  TrainLineInNodeType,
  TrainLineMatrixType,
} from 'types/Train.types'
import { Setter } from 'types/RecoilMethods.types'
import { TRAIN_LINE_NEXT_POSITION } from 'utils/constants'

type useDrawTrainLineType = {
  trainLinePreviewMode: TrainLinePreviewMode
  previewTrainLine: TrainLineType | null
  currentDrawingLine: {
    color: TrainLineColorName
    direction: TrainLineDirection | null
  }
}

export default function useDrawTrainLine(
  row: number,
  column: number,
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
  trainLine: TrainLineInNodeType,
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

  const setTrainLineMatrix = (
    trainLineSetter: Setter<TrainLineMatrixType>,
    trainLineItem: TrainLineType,
  ) => {
    trainLineSetter(prev =>
      produce(prev, draft => {
        switch (trainLineItem.direction) {
          case 'top':
            draft[nodeNumber][nodeNumber - coordinatePlaneWidth] = draft[
              nodeNumber - coordinatePlaneWidth
            ][nodeNumber] = trainLineItem
            break
          case 'right':
            draft[nodeNumber][nodeNumber + 1] = draft[nodeNumber + 1][
              nodeNumber
            ] = trainLineItem
            break
          case 'bottom':
            draft[nodeNumber][nodeNumber + coordinatePlaneWidth] = draft[
              nodeNumber + coordinatePlaneWidth
            ][nodeNumber] = trainLineItem
            break
          case 'left':
            draft[nodeNumber][nodeNumber - 1] = draft[nodeNumber - 1][
              nodeNumber
            ] = trainLineItem
            break
        }

        return draft
      }),
    )
  }

  // Function for starting draw train line
  const startDrawing = () => {
    // TODO: 하나의 호선에 대한 선로의 개수 체크
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

  const createTrainLine = () => {
    for (let r = 0; r < coordinatePlaneHeight; r++) {
      for (let c = 0; c < coordinatePlaneWidth; c++) {
        const previewTrainLineItem = previewTrainLine[r][c]
        if (previewTrainLineItem === null) continue

        setTrainLineMatrix(setTrainLine, previewTrainLineItem)
      }
    }

    setCurrentMode('hand')
  }

  // Drawing Train Line
  useEffect(() => {
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

      const getDirectionByAngle = (): TrainLineDirection => {
        if (45 <= angle && angle < 135) return 'top'
        else if (-45 <= angle && angle < 45) return 'right'
        else if (-135 <= angle && angle < -45) return 'bottom'
        else return 'left'
      }

      const checkPreviewTrainLineDirection = () => {
        const direction = getDirectionByAngle()

        const isNotExistNextNodeInCoord = {
          top: nodeNumber <= coordinatePlaneWidth,
          right: nodeNumber / coordinatePlaneWidth === 0,
          bottom:
            coordinatePlaneWidth * (coordinatePlaneHeight - 1) + 1 <=
            nodeNumber,
          left: nodeNumber % coordinatePlaneWidth === 1,
        }

        if (isNotExistNextNodeInCoord[direction]) return null

        const nextNodeNumber = {
          top: nodeNumber - coordinatePlaneWidth,
          right: nodeNumber + 1,
          bottom: nodeNumber + coordinatePlaneWidth,
          left: nodeNumber - 1,
        }

        if (
          previewTrainLine[nodeNumber][nextNodeNumber[direction]] !== null ||
          previewTrainLine[nextNodeNumber[direction]][nodeNumber] !== null
        )
          return null

        return direction
      }

      setDirection(checkPreviewTrainLineDirection())
      window.document.addEventListener('click', finishDrawing, { once: true })
    }

    if (isDrawing && trainLinePreviewMode === 'drawing')
      window.document.addEventListener('mousemove', drawing)

    return () => window.document.removeEventListener('mousemove', drawing)
  }, [trainLinePreviewMode, direction])

  // Append Preview Train Line After Drawing Train Line
  useEffect(() => {
    if (direction === null) return
    if (isDrawing && trainLinePreviewMode === 'drawing') return

    const newPreviewTrainLine: TrainLineType = {
      color: previewTrainLineColor,
      direction,
    }

    setDrawingLineStatus(prev => ({
      ...prev,
      currentPosition: {
        row: row + TRAIN_LINE_NEXT_POSITION[direction][0],
        column: column + TRAIN_LINE_NEXT_POSITION[direction][1],
      },
    }))
    setTrainLineMatrix(setPreviewTrainLine, newPreviewTrainLine)
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
