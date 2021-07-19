import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetSelectTrainPlatformForm } from 'state/FloatingForm/SelectTrainPlatformFormState'
import TrainLineItemForm from 'components/SelectTrainPlatform/TrainLineItemForm'

const SelectTrainPlatformForm: FunctionComponent = function () {
  const { name } = useGetSelectTrainPlatformForm()

  return (
    <div css={selectTrainPlatformFormStyle}>
      <TrainLineItemForm />
      {name}
    </div>
  )
}

const selectTrainPlatformFormStyle = css``

export default SelectTrainPlatformForm
