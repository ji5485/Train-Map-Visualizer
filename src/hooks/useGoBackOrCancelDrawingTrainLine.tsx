import { MouseEvent } from 'react'
import produce from 'immer'
import {
  useManagePreviewTrainLineTrace,
  useManagePreviewTrainLineStack,
} from 'state/Train/PreviewTrainLineState'
import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/CoordinateSystemDrawingLineState'
import { useManageTrainLine } from 'state/Train/TrainMapState'
import { useSetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'

type useGoBackOrCancelDrawingTrainLineType = {
  goBack: (event: MouseEvent<HTMLDivElement>) => void
  cancel: () => void
}

export default function useGoBackOrCancelDrawingTrainLine(): useGoBackOrCancelDrawingTrainLineType {
  const setCurrentMode = useSetCoordinateSystemCurrentMode()
  const { width } = useGetCoordinatePlaneSize()

  const { setDrawingLineStatus, resetDrawingLineStatus } =
    useManageCoordinateSystemDrawingLineStatus()
  const { setTrainLineMatrix } = useManageTrainLine()
  const { setPreviewTrainLineTrace, resetPreviewTrainLineTrace } =
    useManagePreviewTrainLineTrace()
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
    setTrainLineMatrix(prev =>
      produce(prev, draft => {
        draft[start][destination] = draft[destination][start] = null
        return draft
      }),
    )

  const goBack = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (previewTrainLineStack.length === 0) return

    const { start, destination, row, column } =
      previewTrainLineStack[previewTrainLineStack.length - 1]

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
