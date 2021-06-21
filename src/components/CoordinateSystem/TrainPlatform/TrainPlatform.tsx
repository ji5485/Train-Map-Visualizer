import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'
import { TrainLineItemType } from 'types/Train.types'

type TrainPlatformProps = {
  platformName: string
  trainLine: TrainLineItemType
  isPreview: boolean
  isTransferPlatform: boolean
}

const TrainPlatform: FunctionComponent<TrainPlatformProps> = function ({
  platformName,
  trainLine: { name: lineName, color: lineColor },
  isPreview,
  isTransferPlatform,
}) {
  if (isTransferPlatform)
    return (
      <div css={trainPlatformStyle(lineColor, isPreview)}>{platformName}</div>
    )

  const colorHexValue = useGetTrainLineColorHexByName(lineColor)

  return (
    <div css={trainPlatformStyle(colorHexValue, isPreview)}>
      <div css={trainLineTextStyle}>{lineName}</div>
      <div css={trainPlatformTextStyle}>{platformName}</div>
    </div>
  )
}

const trainPlatformStyle = (colorHexValue: string, isPreview: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 10;

  width: 100px;
  height: 100px;
  border: 15px solid ${colorHexValue};
  border-radius: 50%;
  background: #ffffff;
  opacity: ${isPreview ? '0.3' : '1'};
`

const trainLineTextStyle = css`
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 1.3;
`

const trainPlatformTextStyle = css`
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.3;
`

export default TrainPlatform
