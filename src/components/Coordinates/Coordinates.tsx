import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Node from 'components/Node'
import { zoomState } from 'state/zoomState'
import { useRecoilValue } from 'recoil'

const Coordinates: FunctionComponent = function () {
  const zoom = useRecoilValue<number>(zoomState)

  return (
    <div
      css={css`
        ${coordinatesStyle};
        zoom: ${zoom};
      `}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((rowNum: number) => (
        <div css={rowStyle} key={rowNum}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
            (nodeNum: number) => (
              <Node key={`${rowNum}-${nodeNum}`} />
            ),
          )}
        </div>
      ))}
    </div>
  )
}

const coordinatesStyle = css`
  position: absolute;
  transition: 1s all;
`

const rowStyle = css`
  display: flex;
`

export default Coordinates
