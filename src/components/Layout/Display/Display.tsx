import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import CoordinatePlane from 'components/CoordinateSystem/CoordinatePlane'
import ToolBox from 'components/Layout/ToolBox'
import ZoomWidget from 'components/Layout/ZoomWidget'
import MessageWidget from 'components/Layout/MessageWidget'
import ModifyOrCancelAppendingTrainWidget from 'components/Layout/ModifyOrCancelAppendingTrainWidget'

const Display: FunctionComponent = function () {
  return (
    <div css={displayStyle}>
      <CoordinatePlane width={9} height={6} />
      <ToolBox />
      <ZoomWidget />
      <MessageWidget />
      <ModifyOrCancelAppendingTrainWidget />
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
