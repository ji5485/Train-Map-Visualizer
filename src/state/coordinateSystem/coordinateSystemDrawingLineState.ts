import {
  atom,
  SetterOrUpdater,
  useRecoilState,
  Resetter,
  useResetRecoilState,
} from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'
import { TrainLineType } from 'state/train/trainLineState'

const PREVIEW_TRAIN_LINE_MAX_LENGTH = 50

type CoordinateSystemDrawingLineStatusType = {
  isFirst: boolean
  isDrawing: boolean
  previewTrainLineColor: TrainLineColorName
  currentPosition: {
    row: number
    column: number
  }
}

type PreviewTrainLineType = (TrainLineType | null)[][]

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
  default: new Array<(TrainLineType | null)[]>(
    PREVIEW_TRAIN_LINE_MAX_LENGTH,
  ).fill(
    new Array<TrainLineType | null>(PREVIEW_TRAIN_LINE_MAX_LENGTH).fill(null),
  ),
})

export const useManageCoordinateSystemDrawingLineStatus = (): [
  CoordinateSystemDrawingLineStatusType,
  SetterOrUpdater<CoordinateSystemDrawingLineStatusType>,
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
  PreviewTrainLineType,
  SetterOrUpdater<PreviewTrainLineType>,
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
