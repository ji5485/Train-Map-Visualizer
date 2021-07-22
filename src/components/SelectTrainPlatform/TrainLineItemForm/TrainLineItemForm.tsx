import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineItemType } from 'types/Train.types'
import { GrAdd } from 'react-icons/gr'
import TrainLineItemButton from 'components/SelectTrainPlatform/TrainLineItemButton'

type TrainLineItemFormProps = {
  line: TrainLineItemType[]
}

const TrainLineItemForm: FunctionComponent<TrainLineItemFormProps> = function ({
  line,
}) {
  const removeTrainLine = () => {
    console.log('clicked')
  }

  return (
    <div css={trainLineItemFormStyle}>
      {line.map(({ id, name, color }) => (
        <TrainLineItemButton
          name={name}
          color={color}
          onClick={removeTrainLine}
          key={id}
        />
      ))}

      <div css={appendLineButtonStyle}>
        <GrAdd />
      </div>
    </div>
  )
}

const trainLineItemFormStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  grid-gap: 10px;
`

const appendLineButtonStyle = css`
  display: grid;
  place-items: center;
  border: 3px dashed #adb5bd;
  border-radius: 5px;
  color: #adb5bd;
  cursor: pointer;
  transition: 0.15s border-color;

  &:hover {
    border-color: #495057;
  }
`

export default TrainLineItemForm
