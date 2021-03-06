import {
  TrainLineItemType,
  TrainLineType,
  TrainPlatformType,
} from './Train.types'
import { TOOL_FORM_TITLE } from '../utils/constants'

// FloatingForm Condition Type
export type FloatingFormContentType = keyof typeof TOOL_FORM_TITLE
export type FloatingFormType = {
  isOpen: boolean
  menu: FloatingFormContentType | null
}

// Train Form in FloatingForm Type
export type TrainFormType = {
  selectedTrainLine: TrainLineItemType
  trainPlatformName: string
}
export type TrainFormValidityType = {
  validity: boolean
  error: string
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

// Find Train Line Path Form Type
export type FindTrainPathFormType = {
  start: TrainPlatformType | null
  destination: TrainPlatformType | null
}
