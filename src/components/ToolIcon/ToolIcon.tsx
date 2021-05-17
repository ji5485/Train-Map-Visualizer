import { createElement, FunctionComponent } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'
import { HiCursorClick } from 'react-icons/hi'
import { IoHandRightSharp } from 'react-icons/io5'

const TOOL_ICON = {
  hand: IoHandRightSharp,
  select: HiCursorClick,
  append: BiAddToQueue,
  line: AiOutlineEdit,
}

type ToolIconProps = {
  type: keyof typeof TOOL_ICON
  onClick: () => void
}

const ToolIcon: FunctionComponent<ToolIconProps> = function ({
  type,
  onClick,
}) {
  return createElement(TOOL_ICON[type], { style: toolIconStyle, onClick })
}

const toolIconStyle = {
  fontSize: '1.5rem',
  cursor: 'pointer',
}

export default ToolIcon
