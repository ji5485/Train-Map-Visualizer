import { useResetTrainForm } from 'state/SideBar/trainFormState'
import { useSetSideBar } from 'state/SideBar/sideBarState'
import { useSetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'

type useModifyOrCancelAppendingTrainType = {
  modify: () => void
  cancel: () => void
}

export default function useModifyOrCancelAppendingTrain(): useModifyOrCancelAppendingTrainType {
  const setSideBar = useSetSideBar()
  const resetTrainForm = useResetTrainForm()
  const setCurrentMode = useSetCoordinateSystemCurrentMode()

  const setHandMode = () => setCurrentMode('hand')

  const modify = () => {
    setHandMode()
    setSideBar(prev => ({ ...prev, isOpen: true }))
  }

  const cancel = () => {
    setHandMode()
    resetTrainForm()
  }

  return { modify, cancel }
}
