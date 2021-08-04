import {
  TrainLineItemType,
  TrainLineType,
  TrainPlatformType,
} from 'types/Train.types'

// FloatingForm Condition Type
export type FloatingFormContentType =
  | 'select_platform'
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

// Modify Train Platform Form Type
export type ModifyTrainPlatformFormType = TrainPlatformType

// Modify Train Platform Form Status Type
export type ModifyTrainPlatformFormStatusType = {
  isModifyingName: boolean
  error: string
}

// Modify Train Line Form Type
export type ModifyTrainLineFormType = {
  selectedTrainLine: TrainLineType | null
  connectedTrainPlatform: TrainPlatformType[]
  time: number
}
