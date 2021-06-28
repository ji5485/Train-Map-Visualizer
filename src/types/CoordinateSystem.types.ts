import { TrainLineColorName } from 'types/Train.types'

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
  isDrawing: boolean
  previewTrainLineColor: TrainLineColorName
  currentNode: number
}
