import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
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
    <div css={trainLineItemButton(colorHex, canRemove)}>
      {canRemove ? (
        <div css={trainLineItemRemoveButton} onClick={removeTrainLine}>
          <AiOutlineCloseCircle />
        </div>
      ) : null}
    </div>
  )
}

const trainLineItemButton = (colorHex: string, canRemove: boolean) => css`
  height: 40px;
  border-radius: 5px;
  background: ${colorHex};

  ${canRemove
    ? `
    cursor: pointer;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(1.15);
    }
  `
    : ''}
`

const trainLineItemRemoveButton = css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: #e03131;
  font-size: 1.3rem;
  opacity: 0;
  transition: 0.3s opacity;

  &:hover {
    opacity: 1;
  }
`

export default TrainLineItemButton
