import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const SideBar: FunctionComponent = function () {
  return <div css={sideBarStyle}>abc</div>
}

const sideBarStyle = css`
  width: 400px;
  height: 100%;
  padding: 40px;
  background: #ffffff;
`

export default SideBar
