import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import {
  CoordinateSystemDrawingLineStatusType,
  PreviewTrainLineType,
} from 'types/CoordinateSystem.types'
import { TrainLineType } from 'types/Train.types'
import { Getter, Setter } from 'types/RecoilMethods.types'
import { TRAIN_MATRIX_MAX_LENGTH } from 'utils/constants'

const coordinateSystemDrawingLineStatusAtom = atom<CoordinateSystemDrawingLineStatusType>(
  {
    key: 'coordinateSystemDrawingLineStatus',
    default: {
      isFirst: true,
      isDrawing: false,
      previewTrainLineColor: 'blue',
      currentPosition: {
        row: 0,
        column: 0,
      },
    },
  },
)

const coordinateSystemPreviewTrainLineAtom = atom<PreviewTrainLineType>({
  key: 'coordinateSystemPreviewTrainLine',
  default: new Array<(TrainLineType | null)[]>(TRAIN_MATRIX_MAX_LENGTH).fill(
    new Array<TrainLineType | null>(TRAIN_MATRIX_MAX_LENGTH).fill(null),
  ),
})

export const useManageCoordinateSystemDrawingLineStatus = (): [
  Getter<CoordinateSystemDrawingLineStatusType>,
  Setter<CoordinateSystemDrawingLineStatusType>,
  Resetter,
] => {
  const [drawingLineStatus, setDrawingLineStatus] = useRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )
  const resetDrawingLineStatus = useResetRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )

  return [drawingLineStatus, setDrawingLineStatus, resetDrawingLineStatus]
}

export const useManageCoordinateSystemPreviewTrainLine = (): [
  Getter<PreviewTrainLineType>,
  Setter<PreviewTrainLineType>,
  Resetter,
] => {
  const [previewTrainLine, setPreviewTrainLine] = useRecoilState(
    coordinateSystemPreviewTrainLineAtom,
  )
  const resetPreviewTrainLine = useResetRecoilState(
    coordinateSystemPreviewTrainLineAtom,
  )

  return [previewTrainLine, setPreviewTrainLine, resetPreviewTrainLine]
}
