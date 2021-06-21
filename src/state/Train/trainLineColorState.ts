import { atom, useRecoilValue, selectorFamily } from 'recoil'
import { TrainLineColorType, TrainLineColorName } from 'types/Train.types'
import { Getter } from 'types/RecoilMethods.types'
import { useGetTrainLineList } from 'state/Train/trainLineListState'

export const TRAIN_LINE_COLOR = {
  indigo: '#4263eb',
  teal: '#20c997',
  orange: '#fd7e14',
  blue: '#1864ab',
  violet: '#9775fa',
  red: '#fa5252',
  yellow: '#fcc419',
  pink: '#e64980',
  lime: '#5c940d',
}

const trainLineColorAtom = atom<TrainLineColorType>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})

const trainLineColorHexSelector = selectorFamily<string, TrainLineColorName>({
  key: 'trainLineColorHex',
  get: color => ({ get }) => get(trainLineColorAtom)[color],
})

export const useGetTrainLineColor = (): Getter<TrainLineColorType> =>
  useRecoilValue(trainLineColorAtom)

export const useGetTrainLineColorHexByName = (
  color: TrainLineColorName,
): Getter<string> => useRecoilValue(trainLineColorHexSelector(color))

export const useGetRandomUnusedColor = (): Getter<TrainLineColorName> => {
  const usedColor = useGetTrainLineList().map(({ color }) => color)
  const unusedColor = (Object.keys(
    useGetTrainLineColor(),
  ) as TrainLineColorName[]).filter(name => !usedColor.includes(name))

  return unusedColor[Math.floor(Math.random() * unusedColor.length)]
}
