import {
  TrainPlatformType,
  TrainMapGraphEdgeType,
  TrainLineColorName,
} from './Train.types'

// Converted Train Map Graph Type
export type AdjacencyListNodeType = {
  node: number
  weight: number
}

// Section of Train Path Type
export type TrainPathSectionType = {
  start: TrainPlatformType
  destination: TrainPlatformType | null
  line: TrainLineColorName
  time: number
  pass: TrainMapGraphEdgeType[]
}

// Type of Find Path Result
export type TrainPathResultType = {
  platforms: number[]
  sections: TrainPathSectionType[]
}
