import { FunctionComponent } from 'react'
import { css } from '@emotion/react'

const EnterTrainLineItemName: FunctionComponent = function () {
  return (
    <div css={enterTrainLineItemNameStyle}>
      <input type="text" css={enterTrainLineItemNameInputStyle} />
      <button css={enterTrainLineItemNameButtonStyle}>변경</button>
    </div>
  )
}

const enterTrainLineItemNameStyle = css`
  display: flex;
`

const enterTrainLineItemNameInputStyle = css`
  flex: 1;
  padding: 5px 0;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

const enterTrainLineItemNameButtonStyle = css`
  margin-left: 10px;
  padding: 0 10px;
`

export default EnterTrainLineItemName
