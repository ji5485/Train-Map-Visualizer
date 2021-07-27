import { forwardRef } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineItemType, TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'

type AppendTrainLineItemListProps = {
  line: TrainLineItemType[]
  appendTrainLineItem: (lineItem: TrainLineItemType) => void
}

const AppendTrainLineItemList = forwardRef<
  HTMLDivElement,
  AppendTrainLineItemListProps
>(({ line, appendTrainLineItem }, ref) => {
  return (
    <div css={appendTrainLineItemListStyle} ref={ref}>
      {line.length !== 0
        ? line.map(lineItem => {
            const { id, color } = lineItem
            return (
              <div
                css={trainLineItemStyle(color)}
                onClick={event => {
                  event.stopPropagation()
                  appendTrainLineItem(lineItem)
                }}
                key={id}
              />
            )
          })
        : null}
    </div>
  )
})

const appendTrainLineItemListStyle = css`
  position: absolute;
  top: -3px;
  left: calc(100% + 10px);
  display: flex;
  padding: 5px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const trainLineItemStyle = (color: TrainLineColorName) => css`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.15);
  }

  & + div {
    margin-left: 5px;
  }
`

export default AppendTrainLineItemList
