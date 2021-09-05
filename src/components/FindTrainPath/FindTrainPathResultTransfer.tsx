import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineType } from 'types/Train.types'
import { useGetTrainLineItemByColor } from 'state/Train/TrainLineItemState'

type FindTrainPathResultTransferProps = {
  from: TrainLineType
  to: TrainLineType
}

const FindTrainPathResultTransfer: FunctionComponent<FindTrainPathResultTransferProps> = function ({
  from,
  to,
}) {
  const fromTrainLine = useGetTrainLineItemByColor(from.color)
  const toTrainLine = useGetTrainLineItemByColor(to.color)

  return (
    <div css={findTrainPathResultTransferStyle}>
      <div css={findTrainPathResultTransferLineStyle} />
      <div css={findTrainPathResultTransferInfoStyle}>
        {fromTrainLine.name}에서 {toTrainLine.name}으로 환승
      </div>
    </div>
  )
}

const findTrainPathResultTransferStyle = css`
  display: grid;
  grid-template-columns: 15px 1fr;
  grid-gap: 10px;
  position: relative;
`

const findTrainPathResultTransferLineStyle = css`
  margin: 0 auto;
  width: 3px;
  height: calc(100% + 20px);
  background-image: linear-gradient(
    0deg,
    #ffffff,
    #ffffff 30%,
    #868e96 30%,
    #868e96 100%
  );
  background-size: 3px 8px;
  transform: translateY(-10px);
`

const findTrainPathResultTransferInfoStyle = css`
  padding: 15px 0;
  font-size: 0.85rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.7);
`

export default FindTrainPathResultTransfer
