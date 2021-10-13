import { useState, Fragment, FunctionComponent } from 'react'
import { css } from '@emotion/react'
import TrainLineItemList from './TrainLineItemList'
import AppendTrainLineItem from './AppendTrainLineItem'

const ManageTrainLineItemForm: FunctionComponent = function () {
  const [isVisibleAppendForm, setIsVisibleAppendForm] = useState<boolean>(false)

  return (
    <Fragment>
      <TrainLineItemList />
      {isVisibleAppendForm ? (
        <AppendTrainLineItem
          closeAppendForm={() => setIsVisibleAppendForm(false)}
        />
      ) : (
        <div
          css={appendTrainLineItemButtonStyle}
          onClick={() => setIsVisibleAppendForm(true)}
        >
          노선 추가하기
        </div>
      )}
    </Fragment>
  )
}

const appendTrainLineItemButtonStyle = css`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  }
`

export default ManageTrainLineItemForm
