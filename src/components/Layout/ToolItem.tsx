import { createElement, FunctionComponent } from 'react'
import { TOOL_ITEM_ICON } from '../../utils/constants'
import { CoordinateSystemCurrentModeType } from '../../types/CoordinateSystem.types'

type ToolItemProps = {
  type: keyof typeof TOOL_ITEM_ICON
  onClick: () => void
  currentMode: CoordinateSystemCurrentModeType
}

const ToolItem: FunctionComponent<ToolItemProps> = function ({
  type,
  onClick,
  currentMode,
}) {
  return createElement(TOOL_ITEM_ICON[type], {
    style: toolItemStyle(type === currentMode),
    onClick,
  })
}

const toolItemStyle = (isActive: boolean) => ({
  fontSize: '1.4rem',
  cursor: 'pointer',
  color: isActive ? '#7950f2' : '#000000',
})

export default ToolItem
