import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { IoClose } from 'react-icons/io5'
import { TrainLineColorName } from 'types/Train.types'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'

type TrainLineItemButtonProps = {
  name: string
  color: TrainLineColorName
  canRemove: boolean
  removeTrainLine: () => void
}

const TrainLineItemButton: FunctionComponent<TrainLineItemButtonProps> = function ({
  color,
  canRemove,
  removeTrainLine,
}) {
  const colorHex = useGetTrainLineColorHexByName(color)

  return (
    <div css={trainLineItemButton(colorHex)}>
      <div css={trainLineItemRemoveButton} onClick={removeTrainLine}>
        <IoClose />
      </div>
      {canRemove ? (
        <div css={trainLineItemRemoveButton} onClick={removeTrainLine} />
      ) : null}
    </div>
  )
}

const trainLineItemButton = (colorHex: string) => css`
  position: relative;
  height: 40px;
  border-radius: 5px;
  background: ${colorHex};
  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.15);
  }
`

const trainLineItemRemoveButton = css`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e03131;
  color: #ffffff;
`

export default TrainLineItemButton
