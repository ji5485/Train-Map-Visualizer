import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ToolBox from 'components/ToolBox'
import ZoomWidget from 'components/ZoomWidget'

const Display: FunctionComponent = function () {
  return (
    <div css={displayStyle}>
      <Coordinates width={9} height={6} />
      <ToolBox />
      <ZoomWidget />
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
