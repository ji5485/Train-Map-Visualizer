import { TrainPlatformType, TrainLineItemType } from './Train.types'

// Coordinate Plane Size Type
export type CoordinatePlaneSizeType = {
  width: number
  height: number
}

// Coordinate System Position Type
export type CoordinatePositionType = {
  row: number
  column: number
}

// Coordinate System Current Mode Type
export type CoordinateSystemCurrentModeType =
  | 'hand'
  | 'select'
  | 'append'
  | 'draw'

// Coordinate System Drawing Line Type
export type CoordinateSystemDrawingLineStatusType = {
  isDrawing: boolean
  currentNode: number
  startTrainPlatform: TrainPlatformType | null
  drawingLine: TrainLineItemType | null
}

// Coordinate System Path Highlight Type
export type CoordinateSystemPathHighlightType = {
  highlight: boolean
  highlightedComponents: {
    platforms: number[]
    lines: string[]
  }
}
