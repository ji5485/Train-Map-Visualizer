import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  CurrentModeType,
  useSetCoordinateSystemCurrentMode,
} from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import {
  SideBarContentType,
  SideBarType,
  useStateSideBar,
} from 'state/sideBar/sideBarState'
import ToolIcon from 'components/Layout/ToolMenu'

const ToolBox: FunctionComponent = function () {
  const [{ isOpen }, setSideBar] = useStateSideBar()
  const setCoordinateSystemCurrentMode = useSetCoordinateSystemCurrentMode()

  const handleClickToolMenu = (
    openOrNot: boolean,
    mode: CurrentModeType,
    sideBarMenu: SideBarContentType | null = null,
  ) => () => {
    const nextSideBarState = (prevState: SideBarType) => ({
      isOpen: openOrNot,
      menu: openOrNot && sideBarMenu !== null ? sideBarMenu : prevState.menu,
    })

    setSideBar(nextSideBarState)
    setCoordinateSystemCurrentMode(mode)
  }

  return (
    <div css={toolBoxStyle}>
      <ToolIcon type="hand" onClick={handleClickToolMenu(isOpen, 'hand')} />
      <ToolIcon type="select" onClick={handleClickToolMenu(false, 'select')} />
      <ToolIcon
        type="append"
        onClick={handleClickToolMenu(true, 'hand', 'append')}
      />
      <ToolIcon type="line" onClick={handleClickToolMenu(false, 'line')} />
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
