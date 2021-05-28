import { FunctionComponent } from 'react'
import FormBox from 'components/AppendTrain/FormBox'
import SelectTrainLine from 'components/AppendTrain/SelectTrainLine'

const AppendTrainForm: FunctionComponent = function () {
  return (
    <div>
      <FormBox title="호선 선택">
        <SelectTrainLine />
      </FormBox>
    </div>
  )
}

export default AppendTrainForm
