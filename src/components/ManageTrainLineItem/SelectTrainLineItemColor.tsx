import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import { MdChangeCircle } from 'react-icons/md'
import { TrainLineItemType, TrainLineColorName } from '../../types/Train.types'
import { TRAIN_LINE_COLOR } from '../../utils/constants'
import useHandleClickOutSide from '../../hooks/useHandleClickOutSide'

type SelectTrainLineItemColorProps = {
  trainLineItem: TrainLineItemType[]
  selectedColor: TrainLineColorName
  changeTrainLineItemColor: (color: TrainLineColorName) => void
}

const AppendTrainLineItem: FunctionComponent<SelectTrainLineItemColorProps> =
  function ({ trainLineItem, selectedColor, changeTrainLineItemColor }) {
    const { ref, isVisible, showComponent, hideComponent } =
      useHandleClickOutSide()

    return (
      <div css={trainLineItemColorBoxStyle(selectedColor)}>
        {trainLineItem.length < Object.keys(TRAIN_LINE_COLOR).length - 1 ? (
          <div
            css={changeTrainLineItemColorButtonStyle}
            onClick={showComponent}
          >
            <MdChangeCircle />
          </div>
        ) : null}

        {isVisible ? (
          <div css={trainLineListStyle} ref={ref}>
            {Object.keys(TRAIN_LINE_COLOR)
              .filter(
                color =>
                  !trainLineItem
                    .map(item => item.color)
                    .includes(color as TrainLineColorName) &&
                  selectedColor !== color,
              )
              .map(unusedColor => (
                <div
                  css={trainLineItemStyle(unusedColor as TrainLineColorName)}
                  onClick={event => {
                    event.stopPropagation()
                    changeTrainLineItemColor(unusedColor as TrainLineColorName)
                    hideComponent()
                  }}
                  key={unusedColor}
                />
              ))}
          </div>
        ) : null}
      </div>
    )
  }

const trainLineItemColorBoxStyle = (color: TrainLineColorName) => css`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.1);
  }
`

const changeTrainLineItemColorButtonStyle = css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0);
  transition: color 0.3s;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`

const trainLineListStyle = css`
  position: absolute;
  top: 40px;
  left: 0;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

const trainLineItemStyle = (color: TrainLineColorName) => css`
  width: 25px;
  height: 25px;
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
