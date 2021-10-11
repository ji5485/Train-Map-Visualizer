import { useState, useEffect } from 'react'
import { useGetRandomUnusedColor } from '../state/Train/TrainLineColorState'
import { TrainLineItemType, TrainLineColorName } from '../types/Train.types'

type useVisibleNewTrainLineItemType = {
  newTrainLineColor: TrainLineColorName
  newTrainLineVisible: boolean
}

export default function useVisibleNewTrainLineItem(
  trainLine: TrainLineItemType[],
  trainLineName: string,
): useVisibleNewTrainLineItemType {
  const [newTrainLineColor] = useState<TrainLineColorName>(
    useGetRandomUnusedColor(),
  )
  const [newTrainLineVisible, setNewTrainLineVisible] = useState<boolean>(false)

  useEffect(() => {
    if (
      trainLineName !== '' &&
      newTrainLineColor !== undefined &&
      !trainLine.map(({ name }) => name).includes(trainLineName)
    )
      setNewTrainLineVisible(true)
    else setNewTrainLineVisible(false)
  }, [trainLineName])

  return { newTrainLineColor, newTrainLineVisible }
}
