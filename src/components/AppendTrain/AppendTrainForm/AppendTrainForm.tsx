import { FunctionComponent } from 'react'
import { useStateTrainForm } from 'state/sideBar/trainFormState'
import FormBox from 'components/AppendTrain/FormBox'
import SelectTrainLine from 'components/AppendTrain/SelectTrainLine'

const AppendTrainForm: FunctionComponent = function () {
  const [{ line, name }, setTrainForm] = useStateTrainForm()
  console.log(setTrainForm, name)

  return (
    <div>
      <FormBox title="호선 선택">
        <SelectTrainLine selectedTrainLineId={line} />
      </FormBox>
    </div>
  )
}

export default AppendTrainForm
