import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/coordinateSystemDrawingLineState'
import { useSetTrainPlatform } from 'state/Train/trainPlatformState'
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

// 노드 넘버를 통해 현재 위치를 구하는 함수
const getPositionByNodeNumber = (number: number, width: number) => ({
  row: Math.floor(number / width),
  column: number % width,
})

// 노드 넘버가 좌표계 내에 있는지 체크하는 함수
const checkNotExistNextNodeInCoord = (
  nodeNumber: number,
  direction: TrainLineDirection,
  width: number,
  height: number,
) =>
  ({
    top: nodeNumber < width,
    right: (nodeNumber + 1) / width === 0,
    bottom: width * (height - 1) <= nodeNumber,
    left: (nodeNumber + 1) % width === 1,
  }[direction])

export default function useDrawTrainLine(
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useDrawTrainLineType {
  // Information About Coordinate System
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const { width, height } = useGetCoordinatePlaneSize()
  const {
    drawingLineStatus: {
      isDrawing,
      currentNode,
      // startTrainPlatform,
      drawingLine,
    },
    setDrawingLineStatus,
    resetDrawingLineStatus,
  } = useManageCoordinateSystemDrawingLineStatus()

  // Drawing Mode of Current Node
  const [isDrawingCurrentNode, setIsDrawingCurrentNode] = useState<boolean>(
    false,
  )
  const [direction, setDirection] = useState<TrainLineDirection | null>(null)

  // Train Info Setter
  const [trainLine, setTrainLine] = useStateTrainLine()
  const setTrainPlatform = useSetTrainPlatform()
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

  // Node Position Information
  const [nextNodeNumber, setNextNodeNumber] = useState<{
    top: number
    right: number
    bottom: number
    left: number
  }>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  // Set Position of Current Node and Next Node Number
  useEffect(() => {
    if (width === 0) return

    setNextNodeNumber({
      top: nodeNumber - width,
      right: nodeNumber + 1,
      bottom: nodeNumber + width,
      left: nodeNumber - 1,
    })
  }, [width])

  // 선로 그리기 시작 함수
  const startDrawing = () => {
    // TODO: 그릴 선로의 호선 선택 부분 구현

    setIsDrawingCurrentNode(true)

    if (!isDrawing && trainPlatform !== null) {
      setDrawingLineStatus({
        isDrawing: true,
        currentNode: nodeNumber,
        startTrainPlatform: trainPlatform,
        drawingLine: trainPlatform.line[0],
      })
    }
  }

  // 선로 그리기를 끝내는 함수
  const finishDrawing = () => {
    if (trainPlatform === null || drawingLine === null) return

    if (!trainPlatform.line.find(({ id }) => id === drawingLine.id)) {
      setTrainPlatform(prev =>
        produce(prev, draft => {
          const { row, column } = getPositionByNodeNumber(
            trainPlatform.nodeNumber,
            width,
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
  }

  // 선로 그리기 함수
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
        const { row, column } = getPositionByNodeNumber(nodeNumber, width)

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
          checkNotExistNextNodeInCoord(nodeNumber, direction, width, height) ||
          trainLine[nodeNumber][nextNodeNumber[direction]] !== null ||
          trainLine[nextNodeNumber[direction]][nodeNumber] !== null
        )
          return null

        const { nextRow, nextColumn } = getNextPositionByDirection(direction)
        if (previewTrainLineTrace[nextRow][nextColumn]) return null

        return direction
      }

      setDirection(checkPreviewTrainLineDirection())
    }

    const completeDrawing = () => setIsDrawingCurrentNode(false)

    if (nodeNumber !== currentNode) {
      setDirection(null)
      return
    }

    if (isDrawing && isDrawingCurrentNode) {
      window.document.addEventListener('mousemove', drawing)
      window.document.addEventListener('click', completeDrawing)
    }

    return () => {
      window.document.removeEventListener('mousemove', drawing)
      window.document.removeEventListener('click', completeDrawing)
    }
  }, [isDrawing, isDrawingCurrentNode, currentNode])

  // 현재 노드 그리기 모드 종료 부분
  useEffect(() => {
    if (
      !isDrawing ||
      isDrawingCurrentNode ||
      nodeNumber !== currentNode ||
      direction === null ||
      drawingLine === null
    )
      return

    const { row, column } = getPositionByNodeNumber(nodeNumber, width)
    const newPreviewTrainLineStackItem: PreviewTrainLineStackItemType = {
      start: nodeNumber,
      destination: nextNodeNumber[direction],
      row,
      column,
    }

    const { start, destination } = newPreviewTrainLineStackItem

    setTrainLine(prev =>
      produce(prev, draft => {
        const newPreviewTrainLine: TrainLineType = {
          lineId: drawingLine.id,
          color: drawingLine.color,
        }

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
    setDrawingLineStatus(prev => ({
      ...prev,
      currentNode: destination,
    }))
  }, [isDrawingCurrentNode])

  // startDrawing 함수와 finishDrawing 함수를 실행시키기 위한 부분
  useEffect(() => {
    if (currentMode !== 'line' || (isDrawing && currentNode !== nodeNumber))
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
