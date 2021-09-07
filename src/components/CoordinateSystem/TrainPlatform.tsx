import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineItemType } from 'types/Train.types'
import {
  TRANSFER_TRAIN_PLATFORM_COLOR,
  TRAIN_LINE_COLOR,
} from 'utils/constants'
import useSelectCoordComponent from 'hooks/useSelectCoordComponent'

type TrainPlatformProps = {
  nodeNumber: number
  platformName: string
  trainLine: TrainLineItemType[]
  isPreview: boolean
  isHighlighted: boolean
}

const TrainPlatform: FunctionComponent<TrainPlatformProps> = function ({
  nodeNumber,
  platformName,
  trainLine,
  isPreview,
  isHighlighted,
}) {
  const trainPlatformRef = useRef<HTMLDivElement | null>(null)
  useSelectCoordComponent('platform', trainPlatformRef, nodeNumber, null)

  return (
    <div
      css={trainPlatformStyle(
        trainLine.length > 1
          ? TRANSFER_TRAIN_PLATFORM_COLOR
          : TRAIN_LINE_COLOR[trainLine[0].color],
        isPreview,
        isHighlighted,
      )}
      ref={trainPlatformRef}
    >
      <div css={trainPlatformContentStyle}>
        <div css={trainLineTextStyle}>
          {trainLine.length > 1 ? '환승역' : trainLine[0].name}
        </div>
        <div css={trainPlatformTextStyle}>{platformName}</div>
      </div>
    </div>
  )
}

const trainPlatformStyle = (
  trainLineColor: string,
  isPreview: boolean,
  isHighlighted: boolean,
) => css`
  display: grid;
  place-items: center;
  position: relative;
  z-index: ${isHighlighted ? '30' : '10'};
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
