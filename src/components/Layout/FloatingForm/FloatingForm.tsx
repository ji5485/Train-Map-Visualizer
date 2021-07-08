import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { VscChromeClose } from 'react-icons/vsc'
import { TOOL_FORM_TITLE, TOOL_FORM_CONTENT } from 'utils/constants'

type FloatingFormProps = {
  menu: keyof typeof TOOL_FORM_CONTENT
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
