import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
// import { useManageTrainPlatform } from 'state/Train/TrainMapState'
// import { useManageTrainLineItem } from 'state/Train/TrainLineItemState'
import SelectTrainLineItemColor from 'components/ManageTrainLineItem/SelectTrainLineItemColor'

const ModifyTrainLineItem: FunctionComponent = function () {
  // const { trainPlatformMatrix } = useManageTrainPlatform()
  // const { trainLineItem } = useManageTrainLineItem()

  return (
    <div css={modifyTrainLineItemStyle}>
      <SelectTrainLineItemColor />
    </div>
  )
}

const modifyTrainLineItemStyle = css`
  width: 100%;
  padding: 10px;
`

export default ModifyTrainLineItem
