import { useResetTrainForm } from '../state/FloatingForm/TrainPlatformFormState'
import { useSetFloatingForm } from '../state/FloatingForm/FloatingFormState'
import { useSetCoordinateSystemCurrentMode } from '../state/CoordinateSystem/CoordinateSystemCurrentModeState'

type useModifyOrCancelAppendingTrainType = {
  modify: () => void
  cancel: () => void
}

export default function useModifyOrCancelAppendingTrain(): useModifyOrCancelAppendingTrainType {
  const setFloatingForm = useSetFloatingForm()
  const resetTrainForm = useResetTrainForm()
  const setCurrentMode = useSetCoordinateSystemCurrentMode()

  const setHandMode = () => setCurrentMode('hand')

  const modify = () => {
    setHandMode()
    setFloatingForm(prev => ({ ...prev, isOpen: true }))
  }

  const cancel = () => {
    setHandMode()
    resetTrainForm()
  }

  return { modify, cancel }
}
