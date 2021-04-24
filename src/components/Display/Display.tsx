import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ZoomWidget from 'components/ZoomWidget'

const Display: FunctionComponent = function () {
  return (
    <div css={background}>
      <Coordinates />
      <ZoomWidget />
    </div>
  )
}

const background = css`
  position: relative;
  overflow: hidden;
`

export default Display
