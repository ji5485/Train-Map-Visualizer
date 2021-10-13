import { useState, useEffect, FunctionComponent, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import { TrainLineItemType } from '../../types/Train.types'

type TrainLineItemNameValidityType = {
  isValid: boolean
  error: string
}

type ModifyNameOrRemoveProps = {
  trainLineItem: TrainLineItemType[]
  prevName: string
  setTrainLineItemName: (name: string) => void
  removeTrainLineItem: () => void
}

const ModifyNameOrRemove: FunctionComponent<ModifyNameOrRemoveProps> =
  function ({
    trainLineItem,
    prevName,
    setTrainLineItemName,
    removeTrainLineItem,
  }) {
    const [currentName, setCurrentName] = useState<string>(prevName)
    const [{ isValid, error }, setNameIsValid] =
      useState<TrainLineItemNameValidityType>({
        isValid: false,
        error: '',
      })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
      setCurrentName(event.target.value)

    useEffect(() => {
      if (currentName === prevName)
        setNameIsValid({ isValid: false, error: '' })
      else if (currentName === '' || !/^[0-9가-힣]{2,5}$/.test(currentName))
        setNameIsValid({
          isValid: false,
          error: '한글 및 숫자 2글자 ~ 5글자로 설정해주세요.',
        })
      else if (trainLineItem.find(item => item.name === currentName))
        setNameIsValid({
          isValid: false,
          error: '해당 이름이 이미 사용 중입니다.',
        })
      else setNameIsValid({ isValid: true, error: '' })
    }, [currentName])

    return (
      <div>
        <div css={enterTrainLineItemNameFormStyle}>
          <input
            type="text"
            css={enterTrainLineItemNameInputStyle}
            value={currentName}
            onChange={handleChange}
          />
          <button
            css={enterTrainLineItemNameButtonStyle(isValid)}
            onClick={() => setTrainLineItemName(currentName)}
          >
            변경
          </button>
          <button
            css={removeTrainLineItemButtonStyle}
            onClick={removeTrainLineItem}
          >
            삭제
          </button>
        </div>
        {error !== '' ? (
          <div css={enterTrainLineItemNameErrorStyle}>{error}</div>
        ) : null}
      </div>
    )
  }

const enterTrainLineItemNameFormStyle = css`
  display: flex;
  gap: 5px;
`

const enterTrainLineItemNameInputStyle = css`
  width: 140px;
  padding: 5px 0;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

const enterTrainLineItemNameButtonStyle = (formIsValid: boolean) => css`
  padding: 0 10px;
  background: ${formIsValid ? '#1971c2' : 'rgba(0, 0, 0, 0.2)'};
  border: 0;
  border-radius: 5px;
  font-weight: 700;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
`

const removeTrainLineItemButtonStyle = css`
  padding: 0 10px;
  background: #fa5252;
  border: 0;
  border-radius: 5px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.15);
  }
`

const enterTrainLineItemNameErrorStyle = css`
  margin-top: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
`

export default ModifyNameOrRemove
