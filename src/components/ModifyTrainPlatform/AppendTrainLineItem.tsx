import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineItemType, TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'
import { GrAdd } from 'react-icons/gr'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import { useManageModifyTrainPlatformForm } from 'state/FloatingForm/ModifyTrainPlatformState'

type AppendTrainLineItemProps = {
  line: TrainLineItemType[]
}

const AppendTrainLineItem: FunctionComponent<AppendTrainLineItemProps> = function ({
  line,
}) {
  const { setModifyTrainPlatformForm } = useManageModifyTrainPlatformForm()
  const {
    ref,
    isVisible,
    showComponent,
    hideComponent,
  } = useHandleClickOutSide()

  const appendTrainLineItem = (lineItem: TrainLineItemType) => {
    setModifyTrainPlatformForm(({ line, ...rest }) => ({
      line: [...line, lineItem],
      ...rest,
    }))
    hideComponent()
  }

  return (
    <div css={appendLineButtonStyle} onClick={showComponent}>
      <GrAdd />

      {isVisible && line.length !== 0 ? (
        <div css={trainLineListStyle} ref={ref}>
          {line.map(lineItem => {
            const { id, color } = lineItem

            return (
              <div
                css={trainLineItemStyle(color)}
                onClick={event => {
                  event.stopPropagation()
                  appendTrainLineItem(lineItem)
                }}
                key={id}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

const appendLineButtonStyle = css`
  position: relative;
  display: grid;
  place-items: center;
  border: 3px dashed #adb5bd;
  border-radius: 5px;
  color: #adb5bd;
  cursor: pointer;
  transition: 0.15s border-color;

  &:hover {
    border-color: #495057;
  }
`

const trainLineListStyle = css`
  position: absolute;
  top: -3px;
  left: calc(100% + 10px);
  display: flex;
  padding: 5px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const trainLineItemStyle = (color: TrainLineColorName) => css`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.15);
  }

  & + div {
    margin-left: 5px;
  }
`

export default AppendTrainLineItem
