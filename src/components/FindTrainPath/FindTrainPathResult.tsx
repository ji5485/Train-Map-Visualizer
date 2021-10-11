import { Fragment, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainPathSectionType } from '../../types/TrainPath.types'
import FindTrainPathResultSection from '../FindTrainPath/FindTrainPathResultSection'
import FindTrainPathResultTransfer from '../FindTrainPath/FindTrainPathResultTransfer'

type FindTrainPathResultProps = {
  result: TrainPathSectionType[]
  handleResetForm: () => void
}

const FindTrainPathResult: FunctionComponent<FindTrainPathResultProps> =
  function ({ result, handleResetForm }) {
    if (result.length === 0)
      return (
        <Fragment>
          <div css={findTrainPathResultNotExistsStyle}>
            경로가 존재하지 않습니다.
          </div>
          <div
            css={findTrainPathResultReturnButtonStyle}
            onClick={handleResetForm}
          >
            경로 재설정
          </div>
        </Fragment>
      )

    const totalTime = result.reduce(
      (total: number, section: TrainPathSectionType) => (total += section.time),
      0,
    )

    return (
      <div css={findTrainPathResultStyle}>
        <div css={findTrainPathResultTimeStyle}>
          총 {totalTime / 60 >= 1 ? `${Math.floor(totalTime / 60)}시간 ` : ''}
          {totalTime % 60 !== 0 ? `${totalTime % 60}분` : ''} 소요
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
        <div
          css={findTrainPathResultReturnButtonStyle}
          onClick={handleResetForm}
        >
          경로 재설정
        </div>
      </div>
    )
  }

const findTrainPathResultStyle = css`
  overflow: auto;
  position: relative;
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
`

const findTrainPathResultTimeStyle = css`
  font-size: 1.5rem;
  font-weight: 700;
`

const findTrainPathResultLineStyle = css`
  width: 100%;
  height: 1.5px;
  margin: 20px 0;
  background: rgba(0, 0, 0, 0.15);
`

const findTrainPathResultNotExistsStyle = css`
  padding: 30px 0;
  font-size: 1.2rem;
  text-align: center;
`

const findTrainPathResultReturnButtonStyle = css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 45px;
  margin-top: 20px;
  background: #1971c2;
  border-radius: 10px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  transition: 0.3s background;

  &:hover {
    background: #1864ab;
  }
`

export default FindTrainPathResult
