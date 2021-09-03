import { Fragment, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainPathSectionType } from 'types/TrainPath.types'
import FindTrainPathResultSection from 'components/FindTrainPath/FindTrainPathResultSection'
import FindTrainPathResultTransfer from 'components/FindTrainPath/FindTrainPathResultTransfer'

type FindTrainPathResultProps = {
  result: TrainPathSectionType[]
}

const FindTrainPathResult: FunctionComponent<FindTrainPathResultProps> = function ({
  result,
}) {
  if (result.length === 0) return <div>null</div>

  const totalTime = result.reduce(
    (total: number, section: TrainPathSectionType) => (total += section.time),
    0,
  )

  return (
    <div>
      <div css={findTrainPathResultTimeStyle}>
        총 {totalTime / 60 >= 1 ? `${Math.floor(totalTime / 60)}시간 ` : ''}
        {totalTime % 60 !== 0 ? `${totalTime % 60}분` : ''}
      </div>
      <div css={findTrainPathResultLineStyle} />
      {result.map((section: TrainPathSectionType, index: number) => (
        <Fragment key={index}>
          <FindTrainPathResultSection section={section} />
          {index < result.length - 1 ? (
            <FindTrainPathResultTransfer
              from={section.line}
              to={result[index + 1].line}
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  )
}

const findTrainPathResultTimeStyle = css`
  font-size: 1.5rem;
  font-weight: 800;
`

const findTrainPathResultLineStyle = css`
  width: 100%;
  height: 1.5px;
  margin: 20px 0;
  background: rgba(0, 0, 0, 0.15);
`

export default FindTrainPathResult
