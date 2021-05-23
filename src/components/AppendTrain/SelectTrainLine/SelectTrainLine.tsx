import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineType } from 'state/train/trainLineState'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

type SelectTrainLineProps = {
  selectedTrainLineId: string
}

const SelectTrainLine: FunctionComponent<SelectTrainLineProps> = function ({
  selectTrainLine,
}) {
  // TODO: Get Train Info By selectTrainLine with useGetTrainLineById Custom Hooks

  return (
    <div css={selectTrainLineStyle}>
      {id === '' ? (
        <input type="text" />
      ) : (
        <div css={selectedTrainLineStyle}>
          <TrainLineItem name={name} color={color} />
        </div>
      )}
    </div>
  )
}

const selectTrainLineStyle = css`
  width: 100%;
  height: 50px;
`

const selectedTrainLineStyle = css`
  border-radius: 10px;
  background: #f1f3f5;
`

export default SelectTrainLine
