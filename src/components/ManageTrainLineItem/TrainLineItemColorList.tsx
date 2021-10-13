import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import { IoMdCloseCircle } from 'react-icons/io'
import { HiCheckCircle } from 'react-icons/hi'
import { useGetTrainLineColor } from '../../state/Train/TrainLineColorState'
import { TrainLineColorName, TrainLineItemType } from '../../types/Train.types'
import { TRAIN_LINE_COLOR } from '../../utils/constants'

type TrainLineItemColorListProps = {
  selectedTrainLineItem: TrainLineItemType
  trainLineItem: TrainLineItemType[]
  setTrainLineItemColor: (color: TrainLineColorName) => void
}

const TrainLineItemColorList: FunctionComponent<TrainLineItemColorListProps> =
  function ({
    selectedTrainLineItem: { color: selectedTrainLineItemColor },
    trainLineItem,
    setTrainLineItemColor,
  }) {
    const trainLineColor = useGetTrainLineColor()

    return (
      <div css={trainLineItemColorListStyle}>
        {(Object.keys(trainLineColor) as TrainLineColorName[]).map(
          (color, index) => {
            const isSelectable = !trainLineItem.find(
              item => item.color === color,
            )

            return (
              <div
                css={selectableColorBoxStyle(color, isSelectable)}
                onClick={
                  isSelectable ? () => setTrainLineItemColor(color) : undefined
                }
                key={index}
              >
                {color === selectedTrainLineItemColor ? (
                  <HiCheckCircle />
                ) : !isSelectable ? (
                  <IoMdCloseCircle />
                ) : null}
              </div>
            )
          },
        )}
      </div>
    )
  }

const trainLineItemColorListStyle = css`
  display: flex;
  justify-content: space-between;
`

const selectableColorBoxStyle = (
  color: TrainLineColorName,
  isSelectable: boolean,
) => css`
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
  font-size: 0.9rem;
  color: #ffffff;
  cursor: ${isSelectable ? 'pointer' : 'no-drop'};
  transition: filter 0.3s;

  ${isSelectable
    ? `
    &:hover {
      filter: brightness(1.15);
    }
  `
    : ''}
`

export default TrainLineItemColorList
