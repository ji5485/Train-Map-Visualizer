import { FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { zoomState } from 'state/zoomState'
import { useRecoilState } from 'recoil'

const ZoomWidget: FunctionComponent = function () {
  const [zoom, setZoom] = useRecoilState<number>(zoomState)

  const handleChangeZoom = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setZoom(parseFloat(value))

  return (
    <div css={zoomWidgetStyle}>
      <input
        type="range"
        value={zoom}
        min="0.1"
        max="2"
        step="0.01"
        onChange={handleChangeZoom}
      />
    </div>
  )
}

const zoomWidgetStyle = css`
  display: flex;

  position: fixed;
  left: 20px;
  bottom: 30px;

  width: 80px;
  height: 25px;
  background: grey;
  border-radius: 12.5px;
`

export default ZoomWidget
