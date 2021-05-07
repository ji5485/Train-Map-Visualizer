import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Node from 'components/Node'
import { useGetCoordinatesZoom } from 'state/coordinatesState'

const Coordinates: FunctionComponent = function () {
  const zoom = useGetCoordinatesZoom()

  console.log(zoom)

  return (
    <div css={coordinatesBackgroundStyle(zoom)}>
      <div css={coordinatesContentStyle(zoom)}>
        {[1, 2, 3, 4, 5, 6].map((row: number) => (
          <div css={rowStyle} key={`row-${row}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((column: number) => (
              <Node key={`${row}-${column}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const coordinatesBackgroundStyle = (zoom: number) => css`
  flex-shrink: 0;
  display: flex;
  width: calc(120px * 8 * ${zoom});
  height: calc(120px * 6 * ${zoom});
  margin: auto;
  padding: 100px 150px;
  box-sizing: initial;
`

const coordinatesContentStyle = (zoom: number) => css`
  width: calc(120px * 8);
  height: calc(120px * 6);
  transform: scale(${zoom});
  transform-origin: 0% 0%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

const rowStyle = css`
  display: flex;
`

export default Coordinates
