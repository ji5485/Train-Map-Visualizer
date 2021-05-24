import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

const TrainLineList: FunctionComponent = function () {
  return (
    <div css={trainLineListStyle}>
      <TrainLineItem name="1호선" color="indigo" />
      <TrainLineItem name="1호선" color="indigo" />
      <TrainLineItem name="1호선" color="indigo" />
      <TrainLineItem name="1호선" color="indigo" />
    </div>
  )
}

const trainLineListStyle = css`
  position: absolute;
  top: 50px;
  left: 0px;

  width: 100%;
  max-height: 200px;
  background: #f8f9fa;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

export default TrainLineList
