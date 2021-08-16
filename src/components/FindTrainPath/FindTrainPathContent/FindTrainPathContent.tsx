import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import FindTrainPathForm from 'components/FindTrainPath/FindTrainPathForm'

const FindTrainPathContent: FunctionComponent = function () {
  return (
    <div css={findTrainPathContentStyle}>
      <FindTrainPathForm />
    </div>
  )
}

const findTrainPathContentStyle = css``

export default FindTrainPathContent
