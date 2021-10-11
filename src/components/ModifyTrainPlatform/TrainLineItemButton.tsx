import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { TrainLineColorName } from '../../types/Train.types'
import { TRAIN_LINE_COLOR } from '../../utils/constants'

type TrainLineItemButtonProps = {
  id: string
  name: string
  color: TrainLineColorName
  canRemove: boolean
  removeTrainLine: (lineId: string) => void
}

const TrainLineItemButton: FunctionComponent<TrainLineItemButtonProps> =
  function ({ id, color, canRemove, removeTrainLine }) {
    return (
      <div css={trainLineItemButton(color, canRemove)}>
        {canRemove ? (
          <div
            css={trainLineItemRemoveButton}
            onClick={() => removeTrainLine(id)}
          >
            <AiOutlineCloseCircle />
          </div>
        ) : null}
      </div>
    )
  }

const trainLineItemButton = (
  color: TrainLineColorName,
  canRemove: boolean,
) => css`
  height: 40px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};

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
