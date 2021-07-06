import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import shortId from 'utils/shortId'
import { useSetTrainPlatform } from 'state/Train/trainPlatformState'
import {
  useGetTrainForm,
  useResetTrainForm,
} from 'state/SideBar/trainFormState'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { TrainPlatformType, TrainLineItemType } from 'types/Train.types'

type useManageTrainPlatformType = {
  visibleTrainPlatformPreview: boolean
  previewTrainPlatform: {
    platformName: string
    selectedTrainLine: TrainLineItemType[]
  }
  showTrainPreview: () => void
  hideTrainPreview: () => void
  createTrainPlatform: () => void
}

export default function useManageTrainPlatform(
  row: number,
  column: number,
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useManageTrainPlatformType {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    selectedTrainLine,
    trainPlatform: { name },
  } = useGetTrainForm()
  const resetTrainForm = useResetTrainForm()
  const [
    visibleTrainPlatformPreview,
    setVisibleTrainPlatformPreview,
  ] = useState<boolean>(false)
  const setTrainPlatform = useSetTrainPlatform()

  const showTrainPreview = () => setVisibleTrainPlatformPreview(true)

  const hideTrainPreview = () => setVisibleTrainPlatformPreview(false)

  const createTrainPlatform = () => {
    const newTrainPlatform: TrainPlatformType = {
      id: shortId(),
      name,
      line: [selectedTrainLine],
      nodeNumber,
    }

    hideTrainPreview()
    resetTrainForm()
    setCurrentMode('hand')
    setTrainPlatform(prev =>
      produce(prev, draft => {
        draft[row][column] = newTrainPlatform
        return draft
      }),
    )
  }

  useEffect(() => {
    if (
      currentMode !== 'append' ||
      nodeRef.current === null ||
      trainPlatform !== null
    )
      return

    nodeRef.current.addEventListener('mouseover', showTrainPreview)
    nodeRef.current.addEventListener('mouseleave', hideTrainPreview)
    nodeRef.current.addEventListener('click', createTrainPlatform)

    return () => {
      nodeRef.current?.removeEventListener('mouseover', showTrainPreview)
      nodeRef.current?.removeEventListener('mouseleave', hideTrainPreview)
      nodeRef.current?.removeEventListener('click', createTrainPlatform)
    }
  }, [currentMode])

  return {
    visibleTrainPlatformPreview,
    previewTrainPlatform: {
      platformName: name,
      selectedTrainLine: [selectedTrainLine],
    },
    showTrainPreview,
    hideTrainPreview,
    createTrainPlatform,
  }
}
