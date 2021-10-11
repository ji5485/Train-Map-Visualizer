import { useEffect, MutableRefObject } from 'react'
import { useStateCoordinateSystemCurrentMode } from '../state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { useSetFloatingForm } from '../state/FloatingForm/FloatingFormState'
import { useManageModifyTrainPlatformForm } from '../state/FloatingForm/ModifyTrainPlatformState'
import { useManageModifyTrainLineForm } from '../state/FloatingForm/ModifyTrainLineState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../state/Train/TrainMapState'
import { useManageTrainMapGraph } from '../state/Train/TrainMapGraphState'
import useGetPositionByNodeNumber from './useGetPositionByNodeNumber'
import useFindTrainLinePath from './useFindTrainLinePath'
import { TrainLineDirection } from '../types/Train.types'
import { FloatingFormContentType } from '../types/FloatingForm.types'
import { TRAIN_LINE_NEXT_POSITION } from '../utils//constants'

export default function useSelectCoordComponent(
  type: 'platform' | 'line',
  coordComponentRef: MutableRefObject<HTMLDivElement | null>,
  nodeNumber: number,
  direction: TrainLineDirection | null,
): void {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    position: { row, column },
    getNodeNumberByPosition,
  } = useGetPositionByNodeNumber(nodeNumber)
  const { findConnectedPlatformWithSelectedLine } = useFindTrainLinePath()

  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix } = useManageTrainLine()
  const { trainMapGraph } = useManageTrainMapGraph()
  const setFloatingForm = useSetFloatingForm()
  const { setModifyTrainPlatformForm } = useManageModifyTrainPlatformForm()
  const { setModifyTrainLineForm } = useManageModifyTrainLineForm()

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
    if (direction === null) return

    const [dy, dx]: number[] = TRAIN_LINE_NEXT_POSITION[direction]
    const nextNodeNumber = getNodeNumberByPosition(row + dy, column + dx)
    const selectedTrainLine = trainLineMatrix[nodeNumber][nextNodeNumber]!

    const connectedTrainPlatform = findConnectedPlatformWithSelectedLine(
      nodeNumber,
      selectedTrainLine,
    )
    const selectedTrainLineTime =
      trainMapGraph[connectedTrainPlatform[0].nodeNumber][
        connectedTrainPlatform[1].nodeNumber
      ]!.time

    setModifyTrainLineForm({
      selectedTrainLine,
      connectedTrainPlatform,
      time: selectedTrainLineTime,
    })
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
