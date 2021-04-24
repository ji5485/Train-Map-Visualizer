import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { zoomState } from 'state/zoomState'
import { useSetRecoilState } from 'recoil'

const ZoomWidget: FunctionComponent = function () {
  const setZoomState = useSetRecoilState<number>(zoomState)

  return (
    <div css={zoomWidgetStyle}>
      <div onClick={() => setZoomState(zoom => zoom + 0.25)}>+</div>
      <div onClick={() => setZoomState(zoom => zoom - 0.25)}>-</div>
    </div>
  )
}

const zoomWidgetStyle = css`
  display: flex;

  position: absolute;
  right: 20px;
  bottom: 20px;

  width: 80px;
  height: 25px;
  background: grey;
  border-radius: 12.5px;
`

export default ZoomWidget
