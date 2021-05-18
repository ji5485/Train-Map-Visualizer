import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useSetSideBar, CurrentModeType } from 'state/sideBar/sideBarState'
import ToolIcon from 'components/ToolIcon'

const ToolBox: FunctionComponent = function () {
  const setSideBar = useSetSideBar()

  const handleClickToolMenu = (menu: CurrentModeType, isOpen: boolean) => () =>
    setSideBar({ isOpen, currentMode: menu })

  return (
    <div css={toolBoxStyle}>
      <ToolIcon type="hand" onClick={handleClickToolMenu('hand', false)} />
      <ToolIcon type="select" onClick={handleClickToolMenu('select', false)} />
      <ToolIcon type="append" onClick={handleClickToolMenu('append', true)} />
      <ToolIcon type="line" onClick={handleClickToolMenu('line', false)} />
    </div>
  )
}

const toolBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);

  width: 50px;
  height: 350px;
  padding: 30px 0;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

export default ToolBox
