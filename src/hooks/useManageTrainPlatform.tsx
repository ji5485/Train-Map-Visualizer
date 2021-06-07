import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import shortId from 'utils/shortId'
import {
  TrainPlatformType,
  useSetTrainPlatform,
} from 'state/train/trainPlatformState'
import {
  useGetTrainForm,
  useResetTrainForm,
} from 'state/sideBar/trainFormState'
import { useStateCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import { TrainLineType } from 'state/train/trainLineState'

type useManageTrainPlatformType = {
  visibleTrainPreview: boolean
  previewTrainPlatform: {
    platformName: string
    selectedTrainLine: TrainLineType
  }
  showTrainPreview: () => void
  hideTrainPreview: () => void
  createTrainPlatform: () => void
}

export default function useManageTrainPlatform(
  row: number,
  column: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useManageTrainPlatformType {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const {
    selectedTrainLine,
    trainPlatform: { name },
  } = useGetTrainForm()
  const resetTrainForm = useResetTrainForm()
  const [visibleTrainPreview, setVisibleTrainPreview] = useState<boolean>(false)
  const setTrainPlatform = useSetTrainPlatform()

  const showTrainPreview = () => setVisibleTrainPreview(true)

  const hideTrainPreview = () => setVisibleTrainPreview(false)

  const createTrainPlatform = () => {
    const newTrainPlatform: TrainPlatformType = {
      id: shortId(),
      name,
      isTransferPlatform: false,
      line: [selectedTrainLine],
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
    visibleTrainPreview,
    previewTrainPlatform: {
      platformName: name,
      selectedTrainLine,
    },
    showTrainPreview,
    hideTrainPreview,
    createTrainPlatform,
  }
}
