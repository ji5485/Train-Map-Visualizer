import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import { useStateCoordinateSystemCurrentMode } from '../state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { useManageCoordinateSystemDrawingLineStatus } from '../state/CoordinateSystem/CoordinateSystemDrawingLineState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../state/Train/TrainMapState'
import {
  useManagePreviewTrainLineTrace,
  useManagePreviewTrainLineStack,
} from '../state/Train/PreviewTrainLineState'
import {
  useManageTrainMapGraph,
  useManageTrainMapGraphEdge,
} from '../state/Train/TrainMapGraphState'
import {
  TrainLineColorName,
  TrainPlatformType,
  TrainLineDirection,
  PreviewTrainLineStackItemType,
  TrainLineType,
} from '../types/Train.types'
import useSelectDrawingTrainLine from './useSelectDrawingTrainLine'
import useGetPositionByNodeNumber from './useGetPositionByNodeNumber'
import shortId from '../utils//shortId'

type useDrawTrainLineType = {
  isDrawingCurrentNode: boolean
  currentDrawingLine: {
    color: TrainLineColorName
    direction: TrainLineDirection | null
  }
}

export default function useDrawTrainLine(
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useDrawTrainLineType {
  // Information About Coordinate System
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    drawingLineStatus: {
      isDrawing,
      currentNode,
      startTrainPlatform,
      drawingLine,
    },
    setDrawingLineStatus,
    resetDrawingLineStatus,
  } = useManageCoordinateSystemDrawingLineStatus()

  // Drawing Mode of Current Node
  const [isDrawingCurrentNode, setIsDrawingCurrentNode] =
    useState<boolean>(false)
  const [direction, setDirection] = useState<TrainLineDirection | null>(null)

  // Train Info Setter
  const { openDrawingLineList } = useSelectDrawingTrainLine()
  const { trainLineMatrix, setTrainLineMatrix } = useManageTrainLine()
  const { setTrainPlatformMatrix } = useManageTrainPlatform()
  const {
    previewTrainLineTrace,
    setPreviewTrainLineTrace,
    resetPreviewTrainLineTrace,
  } = useManagePreviewTrainLineTrace()
  const {
    previewTrainLineStack,
    setPreviewTrainLineStack,
    resetPreviewTrainLineStack,
  } = useManagePreviewTrainLineStack()

  // Train Map Graph
  const { setTrainMapGraph } = useManageTrainMapGraph()
  const { trainMapGraphEdge, setTrainMapGraphEdge, resetTrainMapGraphEdge } =
    useManageTrainMapGraphEdge()

  // Node Position Information
  const {
    position: { row, column },
    nextNodeNumber,
    getPositionByNodeNumber,
    checkNotExistNextNodeInCoord,
  } = useGetPositionByNodeNumber(nodeNumber)

  // ?????? ????????? ?????? ??????
  const startDrawing = () => {
    // ?????? ???????????? ???????????? ????????? ?????? ????????? ??? ?????? ?????? ?????????
    if (trainPlatform !== null && trainPlatform.line.length >= 2 && !isDrawing)
      openDrawingLineList(trainPlatform.line)

    // ???????????? ???????????? ?????? ????????? ?????? ??????
    setIsDrawingCurrentNode(true)
    if (trainPlatform !== null && !isDrawing) {
      setDrawingLineStatus(prev => ({
        isDrawing: true,
        currentNode: nodeNumber,
        startTrainPlatform: trainPlatform,
        drawingLine:
          trainPlatform.line.length === 1
            ? trainPlatform.line[0]
            : prev.drawingLine,
      }))
      setTrainMapGraphEdge({ id: shortId(), time: 0 })
    }
  }

  // ?????? ???????????? ????????? ??????
  const finishDrawing = () => {
    if (
      trainPlatform === null ||
      drawingLine === null ||
      startTrainPlatform === null
    )
      return

    setTrainMapGraph(prev =>
      produce(prev, draft => {
        draft[startTrainPlatform.nodeNumber][trainPlatform.nodeNumber] = draft[
          trainPlatform.nodeNumber
        ][startTrainPlatform.nodeNumber] = trainMapGraphEdge
        return draft
      }),
    )

    if (!trainPlatform.line.find(({ id }) => id === drawingLine.id)) {
      setTrainPlatformMatrix(prev =>
        produce(prev, draft => {
          const { row, column } = getPositionByNodeNumber(
            trainPlatform.nodeNumber,
          )

          draft[row][column]?.line.push(drawingLine)
          return draft
        }),
      )
    }

    setCurrentMode('hand')
    resetDrawingLineStatus()
    resetPreviewTrainLineTrace()
    resetPreviewTrainLineStack()
    resetTrainMapGraphEdge()
  }

  // ?????? ????????? ??????
  useEffect(() => {
    const drawing = (event: MouseEvent) => {
      if (nodeRef.current === null) return

      const {
        top,
        left,
        width: nodeWidth,
        height: nodeHeight,
      } = nodeRef.current.getBoundingClientRect()
      const relativeY = top + nodeHeight / 2 - event.clientY
      const relativeX = event.clientX - (left + nodeWidth / 2)
      const angle = 180 * (Math.atan2(relativeY, relativeX) / Math.PI)

      const getDirectionByAngle = (): TrainLineDirection => {
        if (45 <= angle && angle < 135) return 'top'
        else if (-45 <= angle && angle < 45) return 'right'
        else if (-135 <= angle && angle < -45) return 'bottom'
        else return 'left'
      }

      const getNextPositionByDirection = (direction: TrainLineDirection) => {
        const nextPosByDirection = [
          { direction: 'top', value: -1 },
          { direction: 'right', value: 1 },
          { direction: 'bottom', value: 1 },
          { direction: 'left', value: -1 },
        ]

        const nextPosValue = nextPosByDirection.find(
          nextPos => nextPos.direction === direction,
        )

        const nextRow =
          ['top', 'bottom'].includes(direction) && nextPosValue
            ? row + nextPosValue.value
            : row
        const nextColumn =
          ['right', 'left'].includes(direction) && nextPosValue
            ? column + nextPosValue.value
            : column

        return {
          nextRow,
          nextColumn,
        }
      }

      const checkPreviewTrainLineDirection = () => {
        const direction = getDirectionByAngle()

        if (
          checkNotExistNextNodeInCoord(nodeNumber, direction) ||
          trainLineMatrix[nodeNumber][nextNodeNumber[direction]] !== null ||
          trainLineMatrix[nextNodeNumber[direction]][nodeNumber] !== null
        )
          return null

        const { nextRow, nextColumn } = getNextPositionByDirection(direction)
        if (previewTrainLineTrace[nextRow][nextColumn]) return null

        return direction
      }

      setDirection(checkPreviewTrainLineDirection())
    }

    const completeDrawing = () => setIsDrawingCurrentNode(false)

    // ?????? ????????? ???????????? ?????? ??? ?????? ????????? ?????? ??????
    if (nodeNumber !== currentNode) {
      setDirection(null)
      return
    }

    // ?????? ????????? ????????? ????????? ?????? ??????????????? ??????????????? ??????
    // ???????????? ???????????? ?????? ????????? ???????????? ??????????????? ??????
    if (isDrawing && isDrawingCurrentNode && drawingLine !== null) {
      window.document.addEventListener('mousemove', drawing)
      window.document.addEventListener('click', completeDrawing)
    }

    return () => {
      window.document.removeEventListener('mousemove', drawing)
      window.document.removeEventListener('click', completeDrawing)
    }
  }, [isDrawing, isDrawingCurrentNode, currentNode, drawingLine])

  // ?????? ?????? ????????? ?????? ?????? ??????
  useEffect(() => {
    if (
      !isDrawing ||
      isDrawingCurrentNode ||
      nodeNumber !== currentNode ||
      drawingLine === null
    )
      return

    if (direction === null) {
      setIsDrawingCurrentNode(true)
      return
    }

    const newPreviewTrainLineStackItem: PreviewTrainLineStackItemType = {
      start: nodeNumber,
      destination: nextNodeNumber[direction],
      row,
      column,
    }

    const { start, destination } = newPreviewTrainLineStackItem

    setTrainLineMatrix(prev =>
      produce(prev, draft => {
        const newPreviewTrainLine: TrainLineType = {
          lineItemId: drawingLine.id,
          graphEdgeId: trainMapGraphEdge.id,
          color: drawingLine.color,
        }

        draft[start][destination] = draft[destination][start] =
          newPreviewTrainLine
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
    setDrawingLineStatus(prev => ({
      ...prev,
      currentNode: destination,
    }))
    setTrainMapGraphEdge(prev => ({ ...prev, time: prev.time + 1 }))
  }, [isDrawingCurrentNode])

  // startDrawing ????????? finishDrawing ????????? ??????????????? ?????? ??????
  useEffect(() => {
    if (currentMode !== 'draw' || (isDrawing && currentNode !== nodeNumber))
      return

    if (isDrawing) {
      if (trainPlatform !== null && previewTrainLineStack.length !== 0)
        finishDrawing()
      else startDrawing()
    } else
      nodeRef.current?.addEventListener('click', startDrawing, { once: true })

    return () => nodeRef.current?.removeEventListener('click', startDrawing)
  }, [currentMode, isDrawing, currentNode, previewTrainLineStack.length])

  return {
    isDrawingCurrentNode,
    currentDrawingLine: {
      color: drawingLine !== null ? drawingLine.color : 'blue',
      direction,
    },
  }
}
