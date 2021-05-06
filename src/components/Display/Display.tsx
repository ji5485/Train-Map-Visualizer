import { useState, useEffect, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ToolBox from 'components/ToolBox'
import ZoomWidget from 'components/ZoomWidget'

import { zoomState } from 'state/zoomState'
import { useRecoilValue } from 'recoil'

const Display: FunctionComponent = function () {
  const coordinatesRef = useRef<HTMLDivElement | null>(null)
  const zoom = useRecoilValue(zoomState)

  const [coord, setCoord] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const coordinates = coordinatesRef?.current

    if (coordinates === null) return

    const contents = coordinates.children[0].children[0]
    const { width, height } = contents.getBoundingClientRect()

    setCoord({ width, height })
  }, [])

  useEffect(() => {
    const coordinates = coordinatesRef?.current

    if (coordinates === null) return

    const {
      width: currentWidth,
      height: currentHeight,
    } = coordinates.children[0].children[0].getBoundingClientRect()

    coordinates.scrollBy(
      (currentWidth - coord.width) / 2,
      (currentHeight - coord.height) / 2,
    )
    setCoord({ width: currentWidth, height: currentHeight })
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
