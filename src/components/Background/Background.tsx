import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const background = css`
  color: red;
`

const Background: FunctionComponent = function () {
  return <div css={background}>abc</div>
}

export default Background
