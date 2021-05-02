import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ToolBox from 'components/ToolBox'
import ZoomWidget from 'components/ZoomWidget'

const Display: FunctionComponent = function () {
  return (
    <div css={displayStyle}>
      <Coordinates />
      <ToolBox />
      <ZoomWidget />
    </div>
  )
}

const displayStyle = css`
  overflow: auto;
  position: relative;
  min-width: 100%;
  min-height: 100%;
  background: lightgrey;
`

export default Display
