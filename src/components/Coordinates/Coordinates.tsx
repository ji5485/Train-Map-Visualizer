import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Node from 'components/Node'
import { useGetCoordinatesZoom } from 'state/coordinatesZoomState'
import {
  useSetCoordinatesSize,
  useGetCoordinatesCalculatedSize,
} from 'state/coordinatesSizeState'

type CoordinatesProps = {
  width: number
  height: number
}

const Coordinates: FunctionComponent<CoordinatesProps> = function ({
  width,
  height,
}) {
  useSetCoordinatesSize(width, height)

  const zoom = useGetCoordinatesZoom()
  const {
    width: calculatedWidth,
    height: calculatedHeight,
  } = useGetCoordinatesCalculatedSize()

  return (
    <div css={coordinatesBackgroundStyle(calculatedWidth, calculatedHeight)}>
      <div css={coordinatesContentStyle(width, height, zoom)}>
        {[...Array<number>(height).keys()].map((row: number) => (
          <div css={rowStyle} key={`row-${row}`}>
            {[...Array<number>(width).keys()].map((column: number) => (
              <Node key={`${row}-${column}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const coordinatesBackgroundStyle = (width: number, height: number) => css`
  flex-shrink: 0;
  display: flex;
  width: ${width}px;
  height: ${height}px;
  margin: auto;
  padding: 100px 150px;
  box-sizing: initial;
`

const coordinatesContentStyle = (
  width: number,
  height: number,
  zoom: number,
) => css`
  width: calc(120px * ${width});
  height: calc(120px * ${height});
  transform: scale(${zoom});
  transform-origin: 0% 0%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

const rowStyle = css`
  display: flex;
`

export default Coordinates
