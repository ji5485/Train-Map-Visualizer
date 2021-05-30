import { FunctionComponent } from 'react'
import FormBox from 'components/AppendTrain/FormBox'
import SelectTrainLine from 'components/AppendTrain/SelectTrainLine'
import EnterTrainPlatformName from 'components/AppendTrain/EnterTrainPlatformName'

const AppendTrainForm: FunctionComponent = function () {
  return (
    <div>
      <FormBox title="호선 선택">
        <SelectTrainLine />
      </FormBox>
      <FormBox title="역 이름 입력">
        <EnterTrainPlatformName />
      </FormBox>
    </div>
  )
}

export default AppendTrainForm
