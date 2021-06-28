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
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useDrawTrainLineType {
  // Information About Coordinate System
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const { width, height } = useGetCoordinatePlaneSize()
  const [
    { isDrawing, previewTrainLineColor, currentNode },
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

  // Node Position Information
  const [{ nodeRow, nodeColumn }, setPosition] = useState<{
    nodeRow: number
    nodeColumn: number
  }>({
    nodeRow: 0,
    nodeColumn: 0,
  })
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

    setPosition({
      nodeRow: Math.floor((nodeNumber - 1) / width),
      nodeColumn: (nodeNumber - 1) % width,
    })
    setNextNodeNumber({
      top: nodeNumber - width,
      right: nodeNumber + 1,
      bottom: nodeNumber + width,
      left: nodeNumber - 1,
    })
  }, [width])

  // 선로 그리기 시작 함수
  const startDrawing = () => {
    // console.log(isDrawing, trainPlatform)
    // if (isDrawing && trainPlatform !== null) finishDrawing()

    // TODO: 하나의 호선에 대한 선로의 개수 체크
    const previewTrainLineColor =
      trainPlatform !== null ? trainPlatform.line[0].color : 'blue'

    setIsDrawingCurrentNode(true)

    if (!isDrawing) {
      setDrawingLineStatus({
        isDrawing: true,
        previewTrainLineColor,
        currentNode: nodeNumber,
      })
    }
  }

  const finishDrawing = () => {
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

      const checkPreviewTrainLineDirection = () => {
        const direction = getDirectionByAngle()

        const isNotExistNextNodeInCoord = {
          top: nodeNumber <= width,
          right: nodeNumber / width === 0,
          bottom: width * (height - 1) + 1 <= nodeNumber,
          left: nodeNumber % width === 1,
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
    }

    const completeDrawing = () => setIsDrawingCurrentNode(false)

    if (isDrawing && isDrawingCurrentNode) {
      window.document.addEventListener('mousemove', drawing)
      window.document.addEventListener('click', completeDrawing, { once: true })
      console.log('Add Event Listener')
    }

    return () => {
      window.document.removeEventListener('mousemove', drawing)
      window.document.removeEventListener('click', completeDrawing)
      console.log('Remove Event Listener')
    }
  }, [isDrawing, isDrawingCurrentNode])

  // 현재 노드 그리기 모드 종료 부분
  useEffect(() => {
    if (!isDrawing || isDrawingCurrentNode) return
    if (direction === null) {
      setIsDrawingCurrentNode(true)
      return
    }

    console.log(nodeNumber, nextNodeNumber[direction])

    const newPreviewTrainLineStackItem: PreviewTrainLineStackItemType = {
      start: nodeNumber,
      destination: nextNodeNumber[direction],
      row: nodeRow,
      column: nodeColumn,
    }

    setTrainLine(prev =>
      produce(prev, draft => {
        const newPreviewTrainLine: TrainLineType = {
          color: previewTrainLineColor,
          direction,
        }
        const { start, destination } = newPreviewTrainLineStackItem

        draft[start][destination] = draft[destination][
          start
        ] = newPreviewTrainLine
        return draft
      }),
    )

    setPreviewTrainLineTrace(prev =>
      produce(prev, draft => {
        draft[nodeRow][nodeColumn] = true
        return draft
      }),
    )
    setPreviewTrainLineStack(prev => [...prev, newPreviewTrainLineStackItem])
    setDrawingLineStatus(prev => ({
      ...prev,
      currentNode: nextNodeNumber[direction],
    }))
  }, [isDrawingCurrentNode])

  // StartDrawing을 실행시키기 위한 부분
  useEffect(() => {
    if (currentMode !== 'line' || (isDrawing && currentNode !== nodeNumber))
      return

    if (isDrawing) startDrawing()
    else {
      nodeRef.current?.addEventListener('click', startDrawing, { once: true })
      console.log('abc')
    }

    return () => nodeRef.current?.removeEventListener('click', startDrawing)
  }, [currentMode, isDrawing, currentNode])

  return {
    isDrawingCurrentNode,
    currentDrawingLine: {
      color: previewTrainLineColor,
      direction,
    },
  }
}
