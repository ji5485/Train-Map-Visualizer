import { atom, SetterOrUpdater, useRecoilState } from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'

type CoordinateSystemDrawingLineType = {
  isFirst: boolean
  isDrawing: boolean
  previewTrainLineColor: TrainLineColorName
  currentPosition: {
    row: number
    column: number
  }
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

export const useStateCoordinateSystemDrawingLine = (): [
  CoordinateSystemDrawingLineType,
  SetterOrUpdater<CoordinateSystemDrawingLineType>,
] => useRecoilState(coordinateSystemDrawingLineAtom)
