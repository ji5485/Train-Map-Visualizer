/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/coordinateSystemDrawingLineState'
import { useStateTrainLine } from 'state/Train/trainLineState'
import {
  useManagePreviewTrainLineTrace,
  useManagePreviewTrainLineStack,
} from 'state/Train/PreviewTrainLineState'
import {
  TrainLineColorName,
  TrainPlatformType,
  TrainLineDirection,
  PreviewTrainLineStackItemType,
  TrainLineType,
} from 'types/Train.types'

type useDrawTrainLineType = {
  isDrawingCurrentNode: boolean
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
): useDrawTrainLineType {
  // Information About Coordinate System
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const { width: coordWidth, height: coordHeight } = useGetCoordinatePlaneSize()

  // Coordinate System Preview Train Line Status
  const [
    { isFirst, isDrawing, previewTrainLineColor, currentPosition },
    setDrawingLineStatus,
    resetDrawingLineStatus,
  ] = useManageCoordinateSystemDrawingLineStatus()

  // Drawing Mode of Current Node
  const [isDrawingCurrentNode, setIsDrawingCurrentNode] = useState<boolean>(
    false,
  )
  const [direction, setDirection] = useState<TrainLineDirection | null>(null)

  // Train Line Setter
  const [trainLine, setTrainLine] = useStateTrainLine()
  const [
    previewTrainLineTrace,
    setPreviewTrainLineTrace,
    resetPreviewTrainLineTrace,
  ] = useManagePreviewTrainLineTrace()
  const [
    previewTrainLineStack,
    setPreviewTrainLineStack,
    resetPreviewTrainLineStack,
  ] = useManagePreviewTrainLineStack()

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
    setIsDrawingCurrentNode(true)
  }

  const createTrainLine = () => setCurrentMode('hand')

  // Function for finishing draw train line
  const finishDrawing = () => {
    if (direction === null) {
      console.log('null')
      return
    }

    setIsDrawingCurrentNode(false)

    if (isFirst)
      setDrawingLineStatus(prev =>
        produce(prev, draft => {
          draft.isFirst = false
          return draft
        }),
      )

    const nextNodeNumber = {
      top: nodeNumber - coordWidth,
      right: nodeNumber + 1,
      bottom: nodeNumber + coordWidth,
      left: nodeNumber - 1,
    }

    const newPreviewTrainLine: TrainLineType = {
      color: previewTrainLineColor,
      direction,
    }

    const newPreviewTrainLineStackItem: PreviewTrainLineStackItemType = {
      start: nodeNumber,
      destination: nextNodeNumber[direction],
      row,
      column,
    }

    const { start, destination } = newPreviewTrainLineStackItem

    setTrainLine(prev =>
      produce(prev, draft => {
        draft[start][destination] = draft[destination][
          start
        ] = newPreviewTrainLine
        return draft
      }),
    )
    setPreviewTrainLineTrace(prev =>
      produce(prev, draft => {
        draft[row][column] = true
        return draft
      }),
    )
    setPreviewTrainLineStack(prev => [...prev, newPreviewTrainLineStackItem])
  }

  // Drawing Train Line
  useEffect(() => {
    const nextNodeNumber = {
      top: nodeNumber - coordWidth,
      right: nodeNumber + 1,
      bottom: nodeNumber + coordWidth,
      left: nodeNumber - 1,
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
          top: nodeNumber <= coordWidth,
          right: nodeNumber / coordWidth === 0,
          bottom: coordWidth * (coordHeight - 1) + 1 <= nodeNumber,
          left: nodeNumber % coordWidth === 1,
        }

        if (
          isNotExistNextNodeInCoord[direction] ||
          trainLine[nodeNumber][nextNodeNumber[direction]] !== null ||
          trainLine[nextNodeNumber[direction]][nodeNumber] !== null
        )
          return null

        return direction
      }

      setDirection(checkPreviewTrainLineDirection())

      window.document.addEventListener('click', finishDrawing, { once: true })
    }

    if (isDrawing && isDrawingCurrentNode)
      window.document.addEventListener('mousemove', drawing)

    return () => window.document.removeEventListener('mousemove', drawing)
  }, [isDrawingCurrentNode, direction])

  // Start to draw train line with "startDrawing" Function
  useEffect(() => {
    if (currentMode !== 'line') {
      setIsDrawingCurrentNode(false)

      return () => {
        resetDrawingLineStatus()
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
    isDrawingCurrentNode,
    currentDrawingLine: {
      color: previewTrainLineColor,
      direction,
    },
  }
}
