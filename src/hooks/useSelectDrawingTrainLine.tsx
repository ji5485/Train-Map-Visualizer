import { useManageCoordinateSystemDrawingLineStatus } from 'state/CoordinateSystem/coordinateSystemDrawingLineState'
import { useSetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useSetDrawingLineList } from 'state/FloatingForm/DrawingLineListState'
import { TrainLineItemType } from 'types/Train.types'

type useSelectDrawingTrainLineType = {
  openDrawingLineList: (trainLine: TrainLineItemType[]) => void
  selectDrawingLine: (selectedTrainLine: TrainLineItemType) => void
}

export default function useSelectDrawingTrainLine(): useSelectDrawingTrainLineType {
  const setCurrentMode = useSetCoordinateSystemCurrentMode()
  const setFloatingForm = useSetFloatingForm()
  const { setDrawingLineStatus } = useManageCoordinateSystemDrawingLineStatus()
  const setDrawingLineList = useSetDrawingLineList()

  const openDrawingLineList = (trainLine: TrainLineItemType[]) => {
    setCurrentMode('hand')
    setDrawingLineList(trainLine)
    setFloatingForm({ isOpen: true, menu: 'line' })
  }

  const selectDrawingLine = (selectedTrainLine: TrainLineItemType) => {
    setCurrentMode('line')
    setFloatingForm(prev => ({ ...prev, isOpen: false }))
    setDrawingLineStatus(prev => ({
      ...prev,
      drawingLine: selectedTrainLine,
    }))
  }

  return { openDrawingLineList, selectDrawingLine }
}
