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
  goBack: (event: Event) => void
  cancel: (event: Event) => void
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
    const { start, destination, row, column } = previewTrainLineStack[
      previewTrainLineStack.length - 1
    ]

    setTrainLine(prev =>
      produce(prev, draft => {
        draft[start][destination] = draft[destination][start] = null
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

  const goBack = (event: Event) => {
    event.preventDefault()

    const { row, column } = previewTrainLineStack[
      previewTrainLineStack.length - 1
    ]

    setDrawingLineStatus(prev =>
      produce(prev, draft => {
        draft.currentNode = getNodeNumberByPosition(row, column)
      }),
    )
    removePrevTrainLine()
  }

  const cancel = (event: Event) => {
    event.preventDefault()

    setCurrentMode('hand')
    resetDrawingLineStatus()
    resetPreviewTrainLineTrace()
    resetPreviewTrainLineStack()
  }

  return { goBack, cancel }
}
