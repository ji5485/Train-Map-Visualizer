import { TRAIN_LINE_COLOR } from 'state/Train/trainLineColorState'

// Train Line Color Type
export type TrainLineColorType = typeof TRAIN_LINE_COLOR
export type TrainLineColorName = keyof TrainLineColorType

// Train Line List Type
export type TrainLineItemType = {
  id: string
  name: string
  color: TrainLineColorName
}

// Train Platform Type
export type TrainPlatformType = {
  id: string
  name: string
  isTransferPlatform: boolean
  line: TrainLineItemType[]
}
export type TrainPlatformMatrixType = (TrainPlatformType | null)[][]

// Train Line Type
export type TrainLinePreviewMode = 'drawing' | 'preview' | null
export type TrainLineDirection = 'top' | 'right' | 'bottom' | 'left'
export type TrainLineType = {
  color: TrainLineColorName
  direction: TrainLineDirection
}
export type TrainLineMatrixType = (TrainLineType | null)[][]
export type TrainLineInNodeType = {
  right: TrainLineType | null
  bottom: TrainLineType | null
}
export type TrainLineDirectionInNodeType = keyof TrainLineInNodeType
