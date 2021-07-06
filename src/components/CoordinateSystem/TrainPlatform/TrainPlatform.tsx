import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'
import { TrainLineItemType } from 'types/Train.types'

type TrainPlatformProps = {
  platformName: string
  trainLine: TrainLineItemType[]
  isPreview: boolean
}

const TrainPlatform: FunctionComponent<TrainPlatformProps> = function ({
  platformName,
  trainLine,
  isPreview,
}) {
  const trainLineColor =
    trainLine.length > 1
      ? `
        radial-gradient(circle at 50% 0, #e03131, rgba(0, 0, 0, 0) 70%),
        radial-gradient(circle at 6.7% 75%, #3b5bdb, rgba(0, 0, 0, 0) 70%),
        radial-gradient(circle at 93.3% 75%, #ffd43b, rgba(0, 0, 0, 0) 70%)
        beige
      `
      : useGetTrainLineColorHexByName(trainLine[0].color)

  if (trainLine.length > 1)
    return (
      <div css={trainPlatformStyle(trainLineColor, isPreview)}>
        <div css={trainPlatformContentStyle}>
          <div css={trainLineTextStyle}>환승역</div>
          <div css={trainPlatformTextStyle}>{platformName}</div>
        </div>
      </div>
    )

  return (
    <div css={trainPlatformStyle(trainLineColor, isPreview)}>
      <div css={trainPlatformContentStyle}>
        <div css={trainLineTextStyle}>{trainLine[0].name}</div>
        <div css={trainPlatformTextStyle}>{platformName}</div>
      </div>
    </div>
  )
}

const trainPlatformStyle = (trainLineColor: string, isPreview: boolean) => css`
  display: grid;
  place-items: center;
  position: relative;
  z-index: 10;
  width: 100px;
  height: 100px;
  background: ${trainLineColor};
  border-radius: 50%;
  opacity: ${isPreview ? '0.3' : '1'};
`

const trainPlatformContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ffffff;
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
