import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import CoordinatePlane from '../CoordinateSystem/CoordinatePlane'
import ToolWidget from '../Layout/ToolWidget'
import ZoomWidget from '../Layout/ZoomWidget'
import MessageWidget from '../Layout/MessageWidget'
import HelperWidget from '../Layout/HelperWidget'

const Display: FunctionComponent = function () {
  return (
    <div css={displayStyle}>
      <CoordinatePlane />
      <ToolWidget />
      <ZoomWidget />
      <MessageWidget />
      <HelperWidget />
    </div>
  )
}

const displayStyle = css`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100%;
`

export default Display
