import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'
import { TrainLineColorName } from 'types/Train.types'

type DrawingLineItemProps = {
  color: TrainLineColorName
  selectLine: () => void
}

const DrawingLineItem: FunctionComponent<DrawingLineItemProps> = function ({
  color,
  selectLine,
}) {
  const colorHex = useGetTrainLineColorHexByName(color)

  return <div css={drawingLineItemStyle(colorHex)} onClick={selectLine} />
}

const drawingLineItemStyle = (colorHex: string) => css`
  height: 50px;
  border-radius: 5px;
  background: ${colorHex};
  cursor: pointer;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(1.15);
  }
`

export default DrawingLineItem
