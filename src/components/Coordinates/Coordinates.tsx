import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Node from 'components/Node'
// import { zoomState } from 'state/zoomState'
// import { useRecoilValue } from 'recoil'

const Coordinates: FunctionComponent = function () {
  return (
    <div css={coordinatesBackgroundStyle}>
      {[1, 2, 3, 4, 5, 6].map((row: number) => (
        <div css={rowStyle} key={`row-${row}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((column: number) => (
            <Node key={`${row}-${column}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

const coordinatesBackgroundStyle = css`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: calc(120px * 8);
  height: calc(120px * 6);
  margin: 150px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

const rowStyle = css`
  display: flex;
`

export default Coordinates
