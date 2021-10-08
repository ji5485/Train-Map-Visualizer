import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { RiSubwayLine } from 'react-icons/ri'
import { TrainPathSectionType } from 'types/TrainPath.types'
import { TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'
import { useGetTrainLineItemByColor } from 'state/Train/TrainLineItemState'

type FindTrainPathResultSectionProps = {
  section: TrainPathSectionType
}

const FindTrainPathResultSection: FunctionComponent<FindTrainPathResultSectionProps> =
  function ({ section: { start, destination, line, time, pass } }) {
    const { name, color } = useGetTrainLineItemByColor(line)

    return (
      <div css={findTrainPathResultSectionStyle}>
        <div css={findTrainPathResultTrainLineVertexStyle(color)} />
        <div css={findTrainPathResultPlatformStyle}>{start.name}역 승차</div>

        <div css={findTrainPathResultTrainLineEdgeStyle(color)} />
        <div css={findTrainPathResultInfoStyle}>
          <div css={findTrainPathResultInfoLineStyle}>
            <div css={findTrainPathResultInfoIconStyle(color)}>
              <RiSubwayLine />
            </div>
            {name}
          </div>
          <div css={findTrainPathResultInfoContentStyle}>
            {pass.length > 1 ? `${String(pass.length - 1)}개 역 이동 / ` : null}
            {time / 60 >= 1 ? `${Math.floor(time / 60)}시간 ` : ''}
            {time % 60 !== 0 ? `${time % 60}분` : ''} 소요
          </div>
        </div>

        <div css={findTrainPathResultTrainLineVertexStyle(color)} />
        <div css={findTrainPathResultPlatformStyle}>
          {destination!.name}역 하차
        </div>
      </div>
    )
  }

const findTrainPathResultSectionStyle = css`
  display: grid;
  grid-template-columns: 15px 1fr;
  grid-template-rows: repeat(auto, 3);
  grid-column-gap: 10px;
  position: relative;
`

const findTrainPathResultTrainLineVertexStyle = (
  color: TrainLineColorName,
) => css`
  align-self: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 3px solid ${TRAIN_LINE_COLOR[color]};
  background: #ffffff;
  z-index: 1;
`

const findTrainPathResultTrainLineEdgeStyle = (
  color: TrainLineColorName,
) => css`
  margin: 0 auto;
  width: 3px;
  height: calc(100% + 20px);
  background: ${TRAIN_LINE_COLOR[color]};
  transform: translateY(-10px);
`

const findTrainPathResultPlatformStyle = css`
  font-size: 1.1rem;
  font-weight: 300;
`

const findTrainPathResultInfoStyle = css`
  padding: 25px 0;
`

const findTrainPathResultInfoLineStyle = css`
  display: flex;
  align-items: center;
`

const findTrainPathResultInfoIconStyle = (color: TrainLineColorName) => css`
  display: grid;
  place-items: center;
  margin-top: 1px;
  margin-right: 3px;
  font-size: 1.1rem;
  color: ${TRAIN_LINE_COLOR[color]};
`

const findTrainPathResultInfoContentStyle = css`
  margin-top: 3px;
  font-size: 0.85rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.7);
`

export default FindTrainPathResultSection
