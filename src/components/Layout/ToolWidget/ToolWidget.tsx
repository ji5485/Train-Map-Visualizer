import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { RiSubwayFill } from 'react-icons/ri'
import ToolItem from 'components/Layout/ToolItem'
import FloatingForm from 'components/Layout/FloatingForm'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { useStateFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useResetTrainForm } from 'state/FloatingForm/TrainPlatformFormState'
import useGoBackOrCancelDrawingTrainLine from 'hooks/useGoBackOrCancelDrawingTrainLine'
import { useManageModifyTrainPlatformFormStatus } from 'state/FloatingForm/ModifyTrainPlatformState'
import { CoordinateSystemCurrentModeType } from 'types/CoordinateSystem.types'
import {
  FloatingFormType,
  FloatingFormContentType,
} from 'types/FloatingForm.types'

const ToolWidget: FunctionComponent = function () {
  const [{ isOpen, menu }, setFloatingForm] = useStateFloatingForm()
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const resetTrainForm = useResetTrainForm()
  const { cancel: cancelDrawingTrainLine } = useGoBackOrCancelDrawingTrainLine()
  const {
    resetModifyTrainPlatformFormStatus,
  } = useManageModifyTrainPlatformFormStatus()

  const handleClickToolMenu = (
    openOrNot: boolean,
    mode: CoordinateSystemCurrentModeType,
    floatingFormMenu: FloatingFormContentType | null = null,
  ) => () => {
    if (menu === 'append') resetTrainForm()
    else if (menu === 'line') cancelDrawingTrainLine()
    else if (menu === 'select_platform') resetModifyTrainPlatformFormStatus()

    const nextFloatingFormState = (prevState: FloatingFormType) => ({
      isOpen: openOrNot,
      menu:
        openOrNot && floatingFormMenu !== null
          ? floatingFormMenu
          : prevState.menu,
    })

    setFloatingForm(nextFloatingFormState)
    setCurrentMode(mode)
  }

  const closeFloatingForm = () => {
    if (menu === 'append') resetTrainForm()
    else if (menu === 'line') cancelDrawingTrainLine()
    else if (menu === 'select_platform') resetModifyTrainPlatformFormStatus()

    setFloatingForm(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div css={toolWidgetStyle}>
      <div css={toolMenuStyle}>
        <div
          css={logoStyle}
          onClick={handleClickToolMenu(true, 'hand', 'setting')}
        >
          <RiSubwayFill />
        </div>
        <div css={toolItemListStyle}>
          <ToolItem
            type="hand"
            onClick={handleClickToolMenu(isOpen, 'hand')}
            currentMode={currentMode}
          />
          <ToolItem
            type="select"
            onClick={handleClickToolMenu(false, 'select')}
            currentMode={currentMode}
          />
          <ToolItem
            type="append"
            onClick={handleClickToolMenu(true, 'hand', 'append')}
            currentMode={currentMode}
          />
          <ToolItem
            type="line"
            onClick={handleClickToolMenu(false, 'line')}
            currentMode={currentMode}
          />
        </div>
      </div>

      {isOpen && menu !== null ? (
        <FloatingForm menu={menu} closeFloatingForm={closeFloatingForm} />
      ) : null}
    </div>
  )
}

const toolWidgetStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 30px;
  left: 30px;
`

const toolMenuStyle = css`
  display: flex;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const logoStyle = css`
  display: grid;
  place-items: center;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  background: #b197fc;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.1);
  }
`

const toolItemListStyle = css`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20px;

  svg + svg {
    margin-left: 20px;
  }
`

export default ToolWidget
