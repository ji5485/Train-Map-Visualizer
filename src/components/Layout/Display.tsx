import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import CoordinatePlane from 'components/CoordinateSystem/CoordinatePlane'
import ToolWidget from 'components/Layout/ToolWidget'
import ZoomWidget from 'components/Layout/ZoomWidget'
import MessageWidget from 'components/Layout/MessageWidget'
import HelperWidget from 'components/Layout/HelperWidget'

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