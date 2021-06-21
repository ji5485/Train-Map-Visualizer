import { TrainLineColorName, TrainLineType } from 'types/Train.types'

// Coordinate Plane Size Type
export type CoordinatePlaneSizeType = {
  width: number
  height: number
}

// Coordinate System Current Mode Type
export type CoordinateSystemCurrentModeType =
  | 'hand'
  | 'select'
  | 'append'
  | 'line'

// Coordinate System Drawing Line Type
export type CoordinateSystemDrawingLineStatusType = {
  isFirst: boolean
  isDrawing: boolean
  previewTrainLineColor: TrainLineColorName
  currentPosition: {
    row: number
    column: number
  }
}
export type PreviewTrainLineType = (TrainLineType | null)[][]
