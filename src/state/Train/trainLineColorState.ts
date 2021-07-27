import { atom, useRecoilValue } from 'recoil'
import { TrainLineColorType, TrainLineColorName } from 'types/Train.types'
import { Getter } from 'types/RecoilMethods.types'
import { useGetTrainLineList } from 'state/Train/trainLineListState'
import { TRAIN_LINE_COLOR } from 'utils/constants'

const trainLineColorAtom = atom<TrainLineColorType>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})

export const useGetTrainLineColor = (): Getter<TrainLineColorType> =>
  useRecoilValue(trainLineColorAtom)

export const useGetRandomUnusedColor = (): Getter<TrainLineColorName> => {
  const usedColor = useGetTrainLineList().map(({ color }) => color)
  const unusedColor = (Object.keys(
    useGetTrainLineColor(),
  ) as TrainLineColorName[]).filter(name => !usedColor.includes(name))

  return unusedColor[Math.floor(Math.random() * unusedColor.length)]
}
