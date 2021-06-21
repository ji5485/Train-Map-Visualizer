import { createElement, FunctionComponent } from 'react'
import { TOOL_MENU_ICON } from 'utils/constants'

type ToolMenuProps = {
  type: keyof typeof TOOL_MENU_ICON
  onClick: () => void
}

const ToolMenu: FunctionComponent<ToolMenuProps> = function ({
  type,
  onClick,
}) {
  return createElement(TOOL_MENU_ICON[type], { style: toolMenuStyle, onClick })
}

const toolMenuStyle = {
  fontSize: '1.5rem',
  cursor: 'pointer',
}

export default ToolMenu
