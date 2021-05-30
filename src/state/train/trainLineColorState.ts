import { atom, useRecoilValue, selectorFamily } from 'recoil'
import { useGetTrainLine } from 'state/train/trainLineState'

const TRAIN_LINE_COLOR = {
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

export type TrainLineColorType = typeof TRAIN_LINE_COLOR
export type TrainLineColorName = keyof TrainLineColorType

const trainLineColorAtom = atom<TrainLineColorType>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})

const trainLineColorHexSelector = selectorFamily<string, TrainLineColorName>({
  key: 'trainLineColorHex',
  get: color => ({ get }) => get(trainLineColorAtom)[color],
})

export const useGetTrainLineColor = (): TrainLineColorType =>
  useRecoilValue(trainLineColorAtom)

export const useGetTrainLineColorHexByName = (
  color: TrainLineColorName,
): string => useRecoilValue(trainLineColorHexSelector(color))

export const useGetRandomUnusedColor = (): TrainLineColorName => {
  const usedColor = useGetTrainLine().map(({ color }) => color)
  const unusedColor = (Object.keys(
    useGetTrainLineColor(),
  ) as TrainLineColorName[]).filter(name => !usedColor.includes(name))

  return unusedColor[Math.floor(Math.random() * unusedColor.length)]
}
