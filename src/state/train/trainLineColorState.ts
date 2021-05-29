import { atom, useRecoilValue, selectorFamily } from 'recoil'

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

export type TrainLineColor = keyof typeof TRAIN_LINE_COLOR

const trainLineColorAtom = atom<TRAIN_LINE_COLOR>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})

const trainLineColorHexSelector = selectorFamily<string, TrainLineColor>({
  key: 'trainLineColorHex',
  get: color => ({ get }) => get(trainLineColorAtom)[color]
})

export const useGetTrainLineColor = (): TRAIN_LINE_COLOR =>
  useRecoilValue(trainLineColorAtom)

export const useGetTrainLineColorHexByName = (color: TrainLineColor): string =>
  useRecoilValue(trainLineColorHexSelector(color))