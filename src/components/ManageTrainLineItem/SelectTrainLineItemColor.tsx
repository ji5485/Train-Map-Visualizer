import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineColor } from 'state/Train/TrainLineColorState'
import { useManageTrainLineItem } from 'state/Train/TrainLineItemState'
import { TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'

const SelectTrainLineItemColor: FunctionComponent = function () {
  const trainLineColor = useGetTrainLineColor()
  const { trainLineItem } = useManageTrainLineItem()

  return (
    <div css={selectTrainLineItemColorStyle}>
      {(Object.keys(trainLineColor) as TrainLineColorName[]).map(
        (color, index) => {
          const isSelectable = !trainLineItem.find(item => item.color === color)
          return (
            <div
              css={selectableColorBoxStyle(color, isSelectable)}
              key={index}
            />
          )
        },
      )}
    </div>
  )
}

const selectTrainLineItemColorStyle = css`
  display: flex;
  justify-content: space-between;
  height: 20px;
`

const selectableColorBoxStyle = (
  color: TrainLineColorName,
  isSelectable: boolean,
) => css`
  width: 25px;
  height: 25px;
  background: ${TRAIN_LINE_COLOR[color]};
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

export default SelectTrainLineItemColor
