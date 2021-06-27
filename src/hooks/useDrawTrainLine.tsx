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
  const { width: coordWidth, height: coordHeight } = useGetCoordinatePlaneSize()

  // Coordinate System Preview Train Line Status
  const [
    {
      isFirst,
      isDrawing,
      previewTrainLineColor,
      currentPosition: { row, column },
    },
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
    if (coordWidth === 0) return

    setPosition({
      nodeRow: Math.floor((nodeNumber - 1) / coordWidth),
      nodeColumn: (nodeNumber - 1) % coordWidth,
    })
    setNextNodeNumber({
      top: nodeNumber - coordWidth,
      right: nodeNumber + 1,
      bottom: nodeNumber + coordWidth,
      left: nodeNumber - 1,
    })
  }, [coordWidth])

  // Function for starting draw train line
  const startDrawing = () => {
    // TODO: 하나의 호선에 대한 선로의 개수 체크
    // console.log(trainLine)

    setIsDrawingCurrentNode(true)

    if (isFirst)
      setDrawingLineStatus({
        isFirst: false,
        isDrawing: true,
        previewTrainLineColor:
          trainPlatform !== null ? trainPlatform.line[0].color : 'blue',
        currentPosition: { row: nodeRow, column: nodeColumn },
      })
  }

  // Drawing Train Line
  useEffect(() => {
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

    const finishDrawing = () => setIsDrawingCurrentNode(false)

    if (isDrawing && isDrawingCurrentNode) {
      window.document.addEventListener('mousemove', drawing)
      console.log('Add Event Listener')
    }

    return () => {
      window.document.removeEventListener('mousemove', drawing)
      window.document.removeEventListener('click', finishDrawing)
      console.log('Remove Event Listener')
    }
  }, [isDrawingCurrentNode])

  useEffect(() => {
    if (isDrawingCurrentNode || !isDrawing || direction === null) return

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
      row: nodeRow,
      column: nodeColumn,
    }

    const { start, destination } = newPreviewTrainLineStackItem
    const nextNodeRow = Math.floor((nextNodeNumber[direction] - 1) / coordWidth)
    const nextNodeColumn = (nextNodeNumber[direction] - 1) % coordWidth

    console.log(nextNodeRow, nextNodeColumn)

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
        draft[nodeRow][nodeColumn] = true
        return draft
      }),
    )
    setPreviewTrainLineStack(prev => [...prev, newPreviewTrainLineStackItem])
    setDrawingLineStatus(prev => ({
      ...prev,
      currentPosition: { row: nextNodeRow, column: nextNodeColumn },
    }))
  }, [isDrawingCurrentNode])

  // Start to draw train line with "startDrawing" Function
  useEffect(() => {
    if (
      currentMode !== 'line' ||
      (isDrawing && (row !== nodeRow || column !== nodeColumn))
    )
      return

    console.log(`${nodeNumber} checked!`)

    if (isDrawing && !isFirst) {
      if (trainPlatform !== null) {
        setCurrentMode('hand')
        console.log('그리기 모드 O, 역 있음')
      } else {
        startDrawing()
        console.log('그리기 모드 O, 역 없음')
      }
    } else {
      if (trainPlatform !== null) {
        nodeRef.current?.addEventListener('click', startDrawing, { once: true })
        console.log('그리기 모드 X, 역 있음')
      } else {
        console.log('그리기 모드 X, 역 없음')
        return
      }
    }

    // if (!isDrawing && isFirst && trainPlatform !== null)
    //   nodeRef.current?.addEventListener('click', startDrawing, { once: true })
    // else if (
    //   isDrawing &&
    //   !isFirst &&
    //   row === nodeRow &&
    //   column === nodeColumn
    // ) {
    //   if (trainPlatform === null) {
    //     console.log('abc')
    //     startDrawing()
    //   } else setCurrentMode('hand')
    // }

    return () => nodeRef.current?.removeEventListener('click', startDrawing)
  }, [currentMode, isDrawing, isFirst, row, column])

  return {
    isDrawingCurrentNode,
    currentDrawingLine: {
      color: previewTrainLineColor,
      direction,
    },
  }
}
