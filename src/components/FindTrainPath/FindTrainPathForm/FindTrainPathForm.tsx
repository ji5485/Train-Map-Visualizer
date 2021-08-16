import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import FindPathTrainFormItem from 'components/FindTrainPath/FindTrainPathFormItem'

const FindTrainPathForm: FunctionComponent = function () {
  return (
    <div css={findTrainPathFormStyle}>
      <FindPathTrainFormItem type="start" />
      <FindPathTrainFormItem type="destination" />
    </div>
  )
}

const findTrainPathFormStyle = css``

export default FindTrainPathForm
