import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/CoordinateSystemDrawingLineState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useSetDrawingLineList } from 'state/FloatingForm/DrawingLineListState'
import { TrainLineItemType } from 'types/Train.types'

type useSelectDrawingTrainLineType = {
  openDrawingLineList: (trainLine: TrainLineItemType[]) => void
  selectDrawingLine: (selectedTrainLine: TrainLineItemType) => void
}

export default function useSelectDrawingTrainLine(): useSelectDrawingTrainLineType {
  const setFloatingForm = useSetFloatingForm()
  const { setDrawingLineStatus } = useManageCoordinateSystemDrawingLineStatus()
  const setDrawingLineList = useSetDrawingLineList()

  const openDrawingLineList = (trainLine: TrainLineItemType[]) => {
    setDrawingLineList(trainLine)
    setFloatingForm({ isOpen: true, menu: 'draw' })
  }

  const selectDrawingLine = (selectedTrainLine: TrainLineItemType) => {
    setFloatingForm(prev => ({ ...prev, isOpen: false }))
    setDrawingLineStatus(prev => ({
      ...prev,
      drawingLine: selectedTrainLine,
    }))
  }

  return { openDrawingLineList, selectDrawingLine }
}
