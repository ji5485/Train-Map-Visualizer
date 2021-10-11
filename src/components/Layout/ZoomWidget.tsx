import { FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { FaSearch } from 'react-icons/fa'
import { useStateCoordinatePlaneZoom } from '../../state/CoordinateSystem/coordinatePlaneZoomState'

const ZoomWidget: FunctionComponent = function () {
  const [zoom, setZoom] = useStateCoordinatePlaneZoom()

  const handleChangeZoom = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setZoom(parseFloat(value))

  return (
    <div css={zoomWidgetStyle}>
      <div css={zoomValueBoxStyle}>
        <FaSearch />
        <span>{Math.round(zoom * 100)}%</span>
      </div>
      <input
        type="range"
        value={zoom}
        min="0.1"
        max="2"
        step="0.001"
        onChange={handleChangeZoom}
        css={zoomInputStyle}
      />
    </div>
  )
}

const zoomWidgetStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  right: 40px;
  bottom: 40px;

  width: 230px;
  height: 30px;
  padding: 0 10px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const zoomValueBoxStyle = css`
  display: flex;
  align-items: center;
  line-height: 1.1;
  font-size: 0.9rem;

  span {
    width: 37px;
    margin-left: 3px;
    text-align: center;
  }
`

const zoomInputStyle = css`
  width: 140px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 3px;
    background: #212529;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    margin-top: -7.5px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: #212529;
  }
`

export default ZoomWidget
