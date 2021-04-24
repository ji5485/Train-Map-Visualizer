import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const Node: FunctionComponent = function () {
  return <div css={nodeStyle}></div>
}

const nodeStyle = css`
  width: 120px;
  height: 120px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`

export default Node
