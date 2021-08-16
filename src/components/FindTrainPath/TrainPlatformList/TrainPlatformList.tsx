import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const TrainPlatformList: FunctionComponent = function () {
  return <div css={trainPlatformListStyle}>abc</div>
}

const trainPlatformListStyle = css`
  position: absolute;
  top: 45px;
  z-index: 10;

  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  background: #f8f9fa;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
`

export default TrainPlatformList
