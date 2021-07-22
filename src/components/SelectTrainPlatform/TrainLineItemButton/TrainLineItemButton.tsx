import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineColorName } from 'types/Train.types'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'

type TrainLineItemButtonProps = {
  name: string
  color: TrainLineColorName
  onClick: () => void
}

const TrainLineItemButton: FunctionComponent<TrainLineItemButtonProps> = function ({
  color,
  onClick,
}) {
  const colorHex = useGetTrainLineColorHexByName(color)

  return <div css={trainLineItemButton(colorHex)} onClick={onClick} />
}

const trainLineItemButton = (colorHex: string) => css`
  height: 40px;
  border-radius: 5px;
  background: ${colorHex};
  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.15);
  }
`

export default TrainLineItemButton
