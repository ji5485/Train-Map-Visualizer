import { useState, FunctionComponent } from 'react'
import SelectTrainLine from 'components/AppendTrain/SelectTrainLine'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

const AppendTrainForm: FunctionComponent = function () {
  const [{ line }, setTrain] = useState({ line: '2' })
  console.log(setTrain)
  return (
    <div>
      <SelectTrainLine selectedTrainLineId={line} />
      <TrainLineItem name="1호선" color="indigo" />
    </div>
  )
}

export default AppendTrainForm
