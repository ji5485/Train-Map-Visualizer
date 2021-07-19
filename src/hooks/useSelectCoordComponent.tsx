import { useEffect, MutableRefObject } from 'react'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useSetSelectTrainPlatformForm } from 'state/FloatingForm/SelectTrainPlatformFormState'
import { useGetTrainPlatform } from 'state/Train/trainPlatformState'
import { TrainLineDirection } from 'types/Train.types'
import { FloatingFormContentType } from 'types/FloatingForm.types'

const getPositionByNodeNumber = (number: number, width: number) => ({
  row: Math.floor(number / width),
  column: number % width,
})

export default function useSelectCoordComponent(
  type: 'platform' | 'line',
  coordComponentRef: MutableRefObject<HTMLDivElement | null>,
  nodeNumber: number,
  direction: TrainLineDirection | null,
): void {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const { width } = useGetCoordinatePlaneSize()
  const setFloatingForm = useSetFloatingForm()
  const setSelectTrainPlatformForm = useSetSelectTrainPlatformForm()
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
    const { row, column } = getPositionByNodeNumber(nodeNumber, width)
    const selectedTrainPlatform = trainPlatformMatrix[row][column]

    if (selectedTrainPlatform === null) return
    setSelectTrainPlatformForm(selectedTrainPlatform)
  }

  const setTrainLineInfo = () => {
    console.log(type, getPositionByNodeNumber(nodeNumber, width), direction)
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
