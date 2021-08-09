import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useManageModifyTrainLineForm } from 'state/FloatingForm/ModifyTrainLineState'
import SelectedTrainLine from 'components/ModifyTrainLine/SelectedTrainLine'
import ModifyTrainLineTime from 'components/ModifyTrainLine/ModifyTrainLineTime'

const ModifyTrainLineForm: FunctionComponent = function () {
  const {
    modifyTrainLineForm: { selectedTrainLine, connectedTrainPlatform, time },
    // setModifyTrainLineForm,
  } = useManageModifyTrainLineForm()

  if (selectedTrainLine === null || connectedTrainPlatform.length === 0)
    return null

  return (
    <div css={modifyTrainLineFormStyle}>
      <SelectedTrainLine
        selectedTrainLine={selectedTrainLine}
        connectedTrainPlatform={connectedTrainPlatform}
      />
      <ModifyTrainLineTime time={time} />
    </div>
  )
}

const modifyTrainLineFormStyle = css``

export default ModifyTrainLineForm
