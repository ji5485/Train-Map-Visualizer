import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import { TRAIN_LINE_COLOR } from '../../utils/constants'
import { TrainLineColorName } from '../../types/Train.types'

type DrawingLineItemProps = {
  color: TrainLineColorName
  selectLine: () => void
}

const DrawingLineItem: FunctionComponent<DrawingLineItemProps> = function ({
  color,
  selectLine,
}) {
  return <div css={drawingLineItemStyle(color)} onClick={selectLine} />
}

const drawingLineItemStyle = (color: TrainLineColorName) => css`
  height: 50px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
  cursor: pointer;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(1.15);
  }
`

export default DrawingLineItem
