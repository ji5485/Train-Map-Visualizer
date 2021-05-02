import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const ToolBox: FunctionComponent = function () {
  return <div css={toolBoxStyle}>abc</div>
}

const toolBoxStyle = css`
  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);

  width: 50px;
  height: 400px;
  background: lightblue;
  border-radius: 25px;
`

export default ToolBox
