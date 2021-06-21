import { useResetTrainForm } from 'state/SideBar/trainFormState'
import { useSetSideBar } from 'state/SideBar/sideBarState'

type useModifyOrCancelAppendingTrainType = {
  modify: () => void
  cancel: () => void
}

export default function useModifyOrCancelAppendingTrain(
  setHandMode: () => void,
): useModifyOrCancelAppendingTrainType {
  const setSideBar = useSetSideBar()
  const resetTrainForm = useResetTrainForm()

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
