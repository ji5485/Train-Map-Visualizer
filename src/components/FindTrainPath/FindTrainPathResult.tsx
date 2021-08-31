import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainPathSectionType } from 'types/TrainPath.types'

type FindTrainPathResultProps = {
  result: TrainPathSectionType[]
}

const FindTrainPathResult: FunctionComponent<FindTrainPathResultProps> = function ({
  result,
}) {
  console.log(result)
  return <div css={findTrainPathResultStyle}>abc</div>
}

const findTrainPathResultStyle = css``

export default FindTrainPathResult
