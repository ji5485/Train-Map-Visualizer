import { useResetTrainForm } from 'state/sideBar/trainFormState'
import { useSetSideBar } from 'state/sideBar/sideBarState'
import { useSetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'

type useModifyOrCancelAppendingTrainType = {
  modify: () => void
  cancel: () => void
}

export default function useModifyOrCancelAppendingTrain(): useModifyOrCancelAppendingTrainType {
  const setMode = useSetCoordinateSystemCurrentMode()
  const setSideBar = useSetSideBar()
  const resetTrainForm = useResetTrainForm()

  const modify = () => {
    setMode('hand')
    setSideBar(prev => ({ ...prev, isOpen: true }))
  }

  const cancel = () => {
    setMode('hand')
    resetTrainForm()
  }

  return { modify, cancel }
}
