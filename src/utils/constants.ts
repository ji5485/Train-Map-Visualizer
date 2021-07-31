import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { GrAdd } from 'react-icons/gr'
import { BiAddToQueue } from 'react-icons/bi'
import { HiCursorClick } from 'react-icons/hi'
import { IoHandRightSharp } from 'react-icons/io5'

// Train Line Color
export const TRAIN_LINE_COLOR = {
  indigo: '#4263eb',
  teal: '#20c997',
  orange: '#fd7e14',
  blue: '#1864ab',
  violet: '#9775fa',
  red: '#fa5252',
  yellow: '#fcc419',
  pink: '#e64980',
  lime: '#5c940d',
}

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

// Used in ToolForm.tsx
export const TOOL_FORM_TITLE = {
  select_platform: '선택한 지하철역',
  select_line: '선택한 선로',
  append: '지하철역 추가',
  line: '그릴 선로 선택',
}

// Used in ToolItem.tsx
export const TOOL_ITEM_ICON = {
  hand: IoHandRightSharp,
  select: HiCursorClick,
  append: BiAddToQueue,
  line: AiOutlineEdit,
}

// Used in Train Line & Platform State
export const TRAIN_MATRIX_MAX_LENGTH = 30

// Used in useDrawTrainLine.tsx
export const TRAIN_LINE_NEXT_POSITION = {
  top: [-1, 0],
  right: [0, 1],
  bottom: [1, 0],
  left: [0, -1],
}

// Used in TrainPlatform.tsx
export const TRANSFER_TRAIN_PLATFORM_COLOR = `
  radial-gradient(circle at 50% 0, rgb(224, 49, 49), rgba(224, 49, 49, 0.1) 80%),
  radial-gradient(circle at 6.7% 75%, rgb(59, 91, 219), rgba(59, 91, 219, 0.1) 60%),
  radial-gradient(circle at 93.3% 75%, rgb(255, 212, 59), rgba(255, 212, 59, 0.1) 80%)
  beige
`
