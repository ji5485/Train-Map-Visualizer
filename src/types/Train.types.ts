import { TRAIN_LINE_COLOR } from 'utils/constants'

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
  line: TrainLineItemType[]
  nodeNumber: number
}
export type TrainPlatformMatrixType = (TrainPlatformType | null)[][]

// Train Line Type
export type TrainLineDirection = 'top' | 'right' | 'bottom' | 'left'
export type TrainLineType = {
  lineId: TrainLineItemType['id']
  color: TrainLineColorName
}
export type TrainLineMatrixType = (TrainLineType | null)[][]
export type TrainLineForNodeType = {
  right: TrainLineType | null
  bottom: TrainLineType | null
}
export type TrainLineDirectionForNodeType = keyof TrainLineForNodeType

// Preview Train Line Type
export type PreviewTrainLineTraceType = boolean[][]
export type PreviewTrainLineStackItemType = {
  start: number
  destination: number
  row: number
  column: number
}
export type PreviewTrainLineStackType = PreviewTrainLineStackItemType[]
