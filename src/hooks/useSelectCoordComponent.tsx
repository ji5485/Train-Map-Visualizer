import { useEffect, MutableRefObject } from 'react'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useManageModifyTrainPlatformForm } from 'state/FloatingForm/ModifyTrainPlatformState'
import { useGetTrainPlatform } from 'state/Train/trainPlatformState'
import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { TrainLineDirection } from 'types/Train.types'
import { FloatingFormContentType } from 'types/FloatingForm.types'

export default function useSelectCoordComponent(
  type: 'platform' | 'line',
  coordComponentRef: MutableRefObject<HTMLDivElement | null>,
  nodeNumber: number,
  direction: TrainLineDirection | null,
): void {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    position: { row, column },
  } = useGetPositionByNodeNumber(nodeNumber)
  const setFloatingForm = useSetFloatingForm()
  const { setModifyTrainPlatformForm } = useManageModifyTrainPlatformForm()
  const trainPlatformMatrix = useGetTrainPlatform()

  const handleComponentClick = () => {
    if (type === 'platform') setTrainPlatformInfo()
    else if (type === 'line') setTrainLineInfo()
    else return

    setFloatingForm({
      isOpen: true,
      menu: `select_${type}` as FloatingFormContentType,
    })
    setCurrentMode('hand')
  }

  const setTrainPlatformInfo = () => {
    const selectedTrainPlatform = trainPlatformMatrix[row][column]

    if (selectedTrainPlatform === null) return
    setModifyTrainPlatformForm(selectedTrainPlatform)
  }

  const setTrainLineInfo = () => {
    console.log(type, row, column, direction)
  }

  useEffect(() => {
    if (currentMode !== 'select' || coordComponentRef === null) return

    coordComponentRef.current?.addEventListener('click', handleComponentClick, {
      once: true,
    })

    return () =>
      coordComponentRef.current?.removeEventListener(
        'click',
        handleComponentClick,
      )
  }, [currentMode])
}
