import { AiOutlineCheck } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'
import { HiCursorClick } from 'react-icons/hi'
import { IoHandRightSharp } from 'react-icons/io5'
import TrainPlatformForm from 'components/AppendTrainPlatform/TrainPlatformForm'

// Used in TrainLineItem.tsx
export const TRAIN_LINE_ITEM_ICON = {
  check: {
    component: AiOutlineCheck,
    color: '#40c057',
  },
  cancel: {
    component: MdClose,
    color: '#fa5252',
  },
  append: {
    component: GrAdd,
    color: '#000000',
  },
}

// Used in MessageWidget.tsx
export const MESSAGE_TYPE = {
  append: '적절한 위치에 지하철 역을 추가해주세요.',
  select: '지하철 역 또는 선로를 선택해 속성을 변경할 수 있습니다.',
  line: '지하철 역 사이에 선로를 추가해주세요.',
}

// Used in SideBar.tsx
export const SIDE_BAR_CONTENT = {
  select_train: TrainPlatformForm,
  select_line: TrainPlatformForm,
  append: TrainPlatformForm,
}

// Used in ToolMenu.tsx
export const TOOL_MENU_ICON = {
  hand: IoHandRightSharp,
  select: HiCursorClick,
  append: BiAddToQueue,
  line: AiOutlineEdit,
}

// Used in Train Line & Platform State
export const TRAIN_MATRIX_MAX_LENGTH = 30
