import { FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateCoordinatesZoom } from 'state/coordinatesZoomState'

const ZoomWidget: FunctionComponent = function () {
  const [zoom, setZoom] = useStateCoordinatesZoom()

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
        step="0.001"
        onChange={handleChangeZoom}
      />
    </div>
  )
}

const zoomWidgetStyle = css`
  display: flex;

  position: fixed;
  right: 30px;
  bottom: 30px;

  width: 200px;
  height: 25px;
  background: grey;
  border-radius: 3px;
`

export default ZoomWidget
