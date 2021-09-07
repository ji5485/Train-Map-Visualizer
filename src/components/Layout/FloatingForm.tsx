import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { VscChromeClose } from 'react-icons/vsc'
import { TOOL_FORM_TITLE } from 'utils/constants'
import { FloatingFormContentType } from 'types/FloatingForm.types'
import TrainPlatformForm from 'components/AppendTrainPlatform/TrainPlatformForm'
import DrawingLineForm from 'components/SelectDrawingLine/DrawingLineForm'
import ModifyTrainPlatformForm from 'components/ModifyTrainPlatform/ModifyTrainPlatformForm'
import ModifyTrainLineForm from 'components/ModifyTrainLine/ModifyTrainLineForm'
import SettingMenuContent from 'components/SettingMenu/SettingMenuContent'
import FindTrainPathContent from 'components/FindTrainPath/FindTrainPathContent'
import ManageTrainLineItemForm from 'components/ManageTrainLineItem/ManageTrainLineItemForm'

// constants.ts 파일에 두면 순환 종속성 문제로 인한 에러 발생
const TOOL_FORM_CONTENT = {
  setting: SettingMenuContent,
  select_platform: ModifyTrainPlatformForm,
  select_line: ModifyTrainLineForm,
  line: ManageTrainLineItemForm,
  append: TrainPlatformForm,
  draw: DrawingLineForm,
  path: FindTrainPathContent,
}

type FloatingFormProps = {
  menu: FloatingFormContentType
  closeFloatingForm: () => void
}

const FloatingForm: FunctionComponent<FloatingFormProps> = function ({
  menu,
  closeFloatingForm,
}) {
  return (
    <div css={floatingFormStyle}>
      <div css={floatingFormHeaderStyle}>
        <div css={floatingFormTitleStyle}>{TOOL_FORM_TITLE[menu]}</div>
        <VscChromeClose css={closeIconStyle} onClick={closeFloatingForm} />
      </div>
      {createElement(TOOL_FORM_CONTENT[menu])}
    </div>
  )
}

const floatingFormStyle = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 15px;
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const floatingFormHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const floatingFormTitleStyle = css`
  font-size: 1.1rem;
  font-weight: 300;
  color: rgb(64, 64, 64);
`

const closeIconStyle = css`
  align-self: flex-end;
  font-size: 1.7rem;
  color: #f03e3e;
  cursor: pointer;
`

export default FloatingForm
