import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import FindTrainPathForm from '../FindTrainPath/FindTrainPathForm'

const FindTrainPathContent: FunctionComponent = function () {
  return (
    <div css={findTrainPathContentStyle}>
      <FindTrainPathForm />
    </div>
  )
}

const findTrainPathContentStyle = css``

export default FindTrainPathContent
