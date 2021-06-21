import { TrainLineItemType } from 'types/Train.types'

// SideBar Condition Type
export type SideBarContentType = 'select_train' | 'select_line' | 'append'
export type SideBarType = {
  isOpen: boolean
  menu: SideBarContentType | null
}

// Train Form in SideBar Type
export type TrainFormType = {
  selectedTrainLine: TrainLineItemType
  trainPlatform: {
    name: string
    isValid: boolean
    error: string
  }
}
