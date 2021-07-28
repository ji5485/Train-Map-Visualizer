import { useState, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetSelectTrainPlatformForm } from 'state/FloatingForm/SelectTrainPlatformFormState'

const ModifyTrainPlatformError: FunctionComponent = function () {
  const [error, setError] = useState<string>('')
  const { name, line } = useGetSelectTrainPlatformForm()

  if (error === '') return null

  return <div css={modifyTrainPlatformErrorStyle}></div>
}

const modifyTrainPlatformErrorStyle = css``

export default ModifyTrainPlatformError
