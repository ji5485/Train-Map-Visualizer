import {
  atom,
  SetterOrUpdater,
  useSetRecoilState,
  useRecoilState,
} from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'

export type TrainLineDirection = 'top' | 'right' | 'bottom' | 'left'

type CoordinateSystemDrawingLineType = {
  isFirst: boolean
  isDrawing: boolean
  previewTrainLineColor: TrainLineColorName
  currentPosition: {
    row: number
    column: number
  }
}

export type CoordinateSystemPreviewTrainLineType = {
  row: number
  column: number
  color: TrainLineColorName
  direction: TrainLineDirection
}

const coordinateSystemDrawingLineAtom = atom<CoordinateSystemDrawingLineType>({
  key: 'coordinateSystemDrawingLine',
  default: {
    isFirst: true,
    isDrawing: false,
    previewTrainLineColor: 'blue',
    currentPosition: {
      row: 0,
      column: 0,
    },
  },
})

const coordinateSystemPreviewTrainLineAtom = atom<
  CoordinateSystemPreviewTrainLineType[]
>({
  key: 'coordinateSystemPreviewTrainLine',
  default: [],
})

export const useStateCoordinateSystemDrawingLine = (): [
  CoordinateSystemDrawingLineType,
  SetterOrUpdater<CoordinateSystemDrawingLineType>,
] => useRecoilState(coordinateSystemDrawingLineAtom)

export const useSetCoordinateSystemPreviewTrainLine = (): SetterOrUpdater<
  CoordinateSystemPreviewTrainLineType[]
> => useSetRecoilState(coordinateSystemPreviewTrainLineAtom)
