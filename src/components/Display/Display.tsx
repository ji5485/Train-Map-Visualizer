import { useEffect, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ToolBox from 'components/ToolBox'
import ZoomWidget from 'components/ZoomWidget'

import { zoomState } from 'state/zoomState'
import { useRecoilValue } from 'recoil'

const Display: FunctionComponent = function () {
  const coordinatesRef = useRef<HTMLDivElement | null>(null)
  const zoom = useRecoilValue(zoomState)

  useEffect(() => {
    const coordinates = coordinatesRef?.current

    if (coordinates === null) return

    // const { scrollHeight: height, scrollWidth: width } = coordinates

    // const scrollYCenterPos = (height - window.innerHeight) / 2
    // const scrollXCenterPos = (width - window.innerWidth) / 2

    console.log(coordinates.scrollTop)

    // coordinates.scrollTo(scrollXCenterPos, scrollYCenterPos)
  }, [zoom])

  return (
    <div css={displayStyle} ref={coordinatesRef}>
      <Coordinates />
      <ToolBox />
      <ZoomWidget />
    </div>
  )
}

const displayStyle = css`
  display: flex;
  overflow: scroll;
  position: relative;
  width: 100%;
  height: 100%;
  background: lightgrey;
`

export default Display
