import {
  atom,
  useRecoilState,
  Resetter,
  useResetRecoilState,
  useRecoilValue,
} from 'recoil'
import { CoordinateSystemDrawingLineStatusType } from 'types/CoordinateSystem.types'
import { TrainLineType, TrainLineMatrixType } from 'types/Train.types'
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

const coordinateSystemPreviewTrainLineAtom = atom<TrainLineMatrixType>({
  key: 'coordinateSystemPreviewTrainLine',
  default: new Array<(TrainLineType | null)[]>(
    TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainLineType | null>(
      TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
    ).fill(null),
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

export const useGetCoordinateSystemPreviewTrainLine = (): Getter<TrainLineMatrixType> =>
  useRecoilValue(coordinateSystemPreviewTrainLineAtom)

export const useManageCoordinateSystemPreviewTrainLine = (): [
  Getter<TrainLineMatrixType>,
  Setter<TrainLineMatrixType>,
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
