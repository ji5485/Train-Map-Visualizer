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

const findTrainPathFormStyle = css`
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

export default FindTrainPathForm
