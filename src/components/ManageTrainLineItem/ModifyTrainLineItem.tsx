import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const ModifyTrainLineItem: FunctionComponent = function () {
  return <div css={modifyTrainLineItemStyle}>abc</div>
}

const modifyTrainLineItemStyle = css`
  width: 100%;
  padding: 15px;
`

export default ModifyTrainLineItem
