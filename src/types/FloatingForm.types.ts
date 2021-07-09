import { TrainLineItemType } from 'types/Train.types'

// FloatingForm Condition Type
export type FloatingFormContentType =
  | 'select_train'
  | 'select_line'
  | 'append'
  | 'line'
export type FloatingFormType = {
  isOpen: boolean
  menu: FloatingFormContentType | null
}

// Train Form in FloatingForm Type
export type TrainFormType = {
  selectedTrainLine: TrainLineItemType
  trainPlatform: {
    name: string
    isValid: boolean
    error: string
  }
}
