import { TrainPlatformType, TrainLineType } from './Train.types'

// Converted Train Map Graph Type
export type AdjacencyListNodeType = {
  node: number
  weight: number
}

// Section of Train Path Type
export type TrainPathSectionType = {
  start: TrainPlatformType
  destination: TrainPlatformType | null
  line: TrainLineType
  time: number
}
