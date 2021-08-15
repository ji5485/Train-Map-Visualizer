import { atom, useRecoilValue } from 'recoil'
import { TrainLineColorType, TrainLineColorName } from 'types/Train.types'
import { Getter } from 'types/RecoilMethods.types'
import { useManageTrainLineItem } from 'state/Train/TrainLineItemState'
import { TRAIN_LINE_COLOR } from 'utils/constants'

const trainLineColorAtom = atom<TrainLineColorType>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})

export const useGetTrainLineColor = (): Getter<TrainLineColorType> =>
  useRecoilValue(trainLineColorAtom)

export const useGetRandomUnusedColor = (): Getter<TrainLineColorName> => {
  const { trainLineItem } = useManageTrainLineItem()
  const usedColor = trainLineItem.map(({ color }) => color)
  const unusedColor = (Object.keys(
    useGetTrainLineColor(),
  ) as TrainLineColorName[]).filter(name => !usedColor.includes(name))

  return unusedColor[Math.floor(Math.random() * unusedColor.length)]
}
