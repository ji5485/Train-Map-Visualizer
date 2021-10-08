import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { FindTrainPathFormType } from 'types/FloatingForm.types'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import { useManageFindTrainPathForm } from 'state/FloatingForm/FindTrainPathState'
import TrainPlatformList from 'components/FindTrainPath/TrainPlatformList'
import TrainPlatformItem from 'components/FindTrainPath/TrainPlatformItem'

type FindTrainPathFormItemProps = {
  type: keyof FindTrainPathFormType
}

const FindTrainPathFormItem: FunctionComponent<FindTrainPathFormItemProps> =
  function ({ type }) {
    const [trainPlatformName, setTrainPlatformName] = useState<string>('')
    const { findTrainPathForm, setFindTrainPathForm } =
      useManageFindTrainPathForm()
    const { ref, isVisible, setIsVisible, showComponent } =
      useHandleClickOutSide()

    const handleChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) => setTrainPlatformName(value)

    const handleResetSelectedTrainPlatform = () =>
      setFindTrainPathForm(prev => ({ ...prev, [type]: null }))

    return (
      <div css={findTrainPathFormItemStyle(type)} ref={ref}>
        {findTrainPathForm[type] === null ? (
          <input
            css={findTrainPathFormItemInputStyle(type)}
            type="text"
            value={trainPlatformName}
            onChange={handleChange}
            onFocus={showComponent}
            placeholder={`${
              type === 'start' ? '출발' : '도착'
            }역을 입력해주세요.`}
          />
        ) : (
          <TrainPlatformItem
            trainPlatform={findTrainPathForm[type]!}
            iconType="cancel"
            onClick={handleResetSelectedTrainPlatform}
          />
        )}

        {isVisible && trainPlatformName !== '' ? (
          <TrainPlatformList
            type={type}
            trainPlatformName={trainPlatformName}
            handleClose={() => setIsVisible(false)}
            handleResetInput={() => setTrainPlatformName('')}
          />
        ) : null}
      </div>
    )
  }

const findTrainPathFormItemStyle = (type: keyof FindTrainPathFormType) => css`
  position: relative;
  ${type === 'destination' && 'border-top: 1px solid rgba(0, 0, 0, 0.15);'}
`

const findTrainPathFormItemInputStyle = (
  type: keyof FindTrainPathFormType,
) => css`
  width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: ${type === 'start' ? '20px 20px 0 0' : '0 0 20px 20px'};
  border: 0;
  font-size: 1rem;
  text-align: center;
  outline: none;
`

export default FindTrainPathFormItem
