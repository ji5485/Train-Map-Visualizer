import { useState, useEffect, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Coordinates from 'components/Coordinates'
import ToolBox from 'components/ToolBox'
import ZoomWidget from 'components/ZoomWidget'
import { useGetCoordinatesZoom } from 'state/coordinates/coordinatesZoomState'
import { useGetCoordinatesCalculatedSize } from 'state/coordinates/coordinatesSizeState'

const Display: FunctionComponent = function () {
  const coordinatesRef = useRef<HTMLDivElement | null>(null)
  const zoom = useGetCoordinatesZoom()
  const {
    width: calculatedWidth,
    height: calculatedHeight,
  } = useGetCoordinatesCalculatedSize()

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

    coordinates.scrollBy(
      (calculatedWidth - coord.width) / 2,
      (calculatedHeight - coord.height) / 2,
    )
    setCoord({ width: calculatedWidth, height: calculatedHeight })
  }, [zoom])

  return (
    <div css={displayStyle} ref={coordinatesRef}>
      <Coordinates width={9} height={6} />
      <ToolBox />
      <ZoomWidget />
    </div>
  )
}

const displayStyle = css`
  flex: 1;
  display: flex;
  overflow: scroll;
  position: relative;
  height: 100%;
  background: lightgrey;
`

export default Display
