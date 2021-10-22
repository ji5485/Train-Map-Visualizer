import { useState, useEffect, MutableRefObject } from 'react'
import produce from 'immer'
import shortId from '../utils/shortId'
import { useManageTrainPlatform } from '../state/Train/TrainMapState'
import {
  useGetTrainForm,
  useResetTrainForm,
} from '../state/FloatingForm/TrainPlatformFormState'
import { useStateCoordinateSystemCurrentMode } from '../state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { TrainPlatformType, TrainLineItemType } from '../types/Train.types'

type useAppendTrainPlatformType = {
  visibleTrainPlatformPreview: boolean
  previewTrainPlatform: {
    platformName: string
    selectedTrainLine: TrainLineItemType[]
  }
  showTrainPreview: () => void
  hideTrainPreview: () => void
  createTrainPlatform: () => void
}

export default function useAppendTrainPlatform(
  row: number,
  column: number,
  nodeNumber: number,
  nodeRef: MutableRefObject<HTMLDivElement | null>,
  trainPlatform: TrainPlatformType | null,
): useAppendTrainPlatformType {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const { selectedTrainLine, trainPlatformName } = useGetTrainForm()
  const resetTrainForm = useResetTrainForm()
  const [visibleTrainPlatformPreview, setVisibleTrainPlatformPreview] =
    useState<boolean>(false)
  const { setTrainPlatformMatrix } = useManageTrainPlatform()

  const showTrainPreview = () => setVisibleTrainPlatformPreview(true)

  const hideTrainPreview = () => setVisibleTrainPlatformPreview(false)

  const createTrainPlatform = () => {
    const newTrainPlatform: TrainPlatformType = {
      id: shortId(),
      name: trainPlatformName,
      line: [selectedTrainLine],
      nodeNumber,
    }

    hideTrainPreview()
    resetTrainForm()
    setCurrentMode('hand')
    setTrainPlatformMatrix(prev =>
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
    ) {
      hideTrainPreview()
      return
    }

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
      platformName: trainPlatformName,
      selectedTrainLine: [selectedTrainLine],
    },
    showTrainPreview,
    hideTrainPreview,
    createTrainPlatform,
  }
}
