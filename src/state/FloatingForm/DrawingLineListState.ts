import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { TrainLineItemType } from '../../types/Train.types'
import { Getter, Setter } from '../../types/RecoilMethods.types'

const drawingLineListAtom = atom<TrainLineItemType[]>({
  key: 'drawingLineForm',
  default: [],
})

export const useGetDrawingLineList = (): Getter<TrainLineItemType[]> =>
  useRecoilValue(drawingLineListAtom)

export const useSetDrawingLineList = (): Setter<TrainLineItemType[]> =>
  useSetRecoilState(drawingLineListAtom)
