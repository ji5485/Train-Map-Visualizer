import { MouseEventHandler, MouseEvent } from 'react'
import produce from 'immer'
import {
  useManagePreviewTrainLineTrace,
  useManagePreviewTrainLineStack,
} from 'state/Train/PreviewTrainLineState'
import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/coordinateSystemDrawingLineState'
import { useSetTrainLine } from 'state/Train/trainLineState'
import { useSetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'

type useGoBackOrCancelDrawingTrainLine = {
  goBack: MouseEventHandler<HTMLDivElement>
  cancel: MouseEventHandler<HTMLDivElement>
}

export default function useGoBackOrCancelDrawingTrainLine(): useGoBackOrCancelDrawingTrainLine {
  const setCurrentMode = useSetCoordinateSystemCurrentMode()
  const { width } = useGetCoordinatePlaneSize()

  const {
    setDrawingLineStatus,
    resetDrawingLineStatus,
  } = useManageCoordinateSystemDrawingLineStatus()
  const setTrainLine = useSetTrainLine()
  const {
    setPreviewTrainLineTrace,
    resetPreviewTrainLineTrace,
  } = useManagePreviewTrainLineTrace()
  const {
    previewTrainLineStack,
    setPreviewTrainLineStack,
    resetPreviewTrainLineStack,
  } = useManagePreviewTrainLineStack()

  const getNodeNumberByPosition = (row: number, column: number) =>
    row * width + column

  const removePrevTrainLine = () => {
    if (previewTrainLineStack.length === 0) return

    const { start, destination, row, column } = previewTrainLineStack[
      previewTrainLineStack.length - 1
    ]

    setTrainLine(prev =>
      produce(prev, draft => {
        draft[start][destination] = draft[destination][start] = null
        console.log('Remove Train Line', start, destination)
        return draft
      }),
    )
    setPreviewTrainLineTrace(prev =>
      produce(prev, draft => {
        draft[row][column] = false
        return draft
      }),
    )
    setPreviewTrainLineStack(prev =>
      produce(prev, draft => {
        draft.pop()
        return draft
      }),
    )
  }

  const goBack = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (previewTrainLineStack.length === 0) return

    const { row, column } = previewTrainLineStack[
      previewTrainLineStack.length - 1
    ]

    setDrawingLineStatus(prev =>
      produce(prev, draft => {
        draft.currentNode = getNodeNumberByPosition(row, column)
        console.log('Reload Node Number : ', draft.currentNode)
        return draft
      }),
    )
    removePrevTrainLine()
  }

  const cancel = () => {
    setCurrentMode('hand')
    resetDrawingLineStatus()
    resetPreviewTrainLineTrace()
    resetPreviewTrainLineStack()
  }

  return { goBack, cancel }
}
