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

  const removeTrainLine = ({
    start,
    destination,
  }: {
    start: number
    destination: number
  }) =>
    setTrainLine(prev =>
      produce(prev, draft => {
        draft[start][destination] = draft[destination][start] = null
        return draft
      }),
    )

  const goBack = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (previewTrainLineStack.length === 0) return

    const { start, destination, row, column } = previewTrainLineStack[
      previewTrainLineStack.length - 1
    ]

    removeTrainLine({ start, destination })
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
    setDrawingLineStatus(prev =>
      produce(prev, draft => {
        draft.currentNode = row * width + column
        return draft
      }),
    )
  }

  const cancel = () => {
    previewTrainLineStack.forEach(removeTrainLine)

    setCurrentMode('hand')
    resetDrawingLineStatus()
    resetPreviewTrainLineTrace()
    resetPreviewTrainLineStack()
  }

  return { goBack, cancel }
}