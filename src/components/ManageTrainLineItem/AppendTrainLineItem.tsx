import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
} from 'react'
import { css } from '@emotion/react'
import { TrainLineColorName, TrainLineItemType } from '../../types/Train.types'
import { TRAIN_LINE_COLOR } from '../../utils/constants'
import shortId from '../../utils/shortId'
import { useGetRandomUnusedColor } from '../../state/Train/TrainLineColorState'
import { useManageTrainLineItem } from '../../state/Train/TrainLineItemState'
import SelectTrainLineItemColor from './SelectTrainLineItemColor'

type TrainLineItemValidityType = {
  isValid: boolean
  error: string
}

type AppendTrainLineItemProps = {
  closeAppendForm: () => void
}

const AppendTrainLineItem: FunctionComponent<AppendTrainLineItemProps> =
  function ({ closeAppendForm }) {
    const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()
    const randomTrainLineColorName: TrainLineColorName =
      useGetRandomUnusedColor()
    const [trainLineItemForm, setTrainLineItemForm] =
      useState<TrainLineItemType>({
        id: shortId(),
        name: '',
        color: randomTrainLineColorName,
      })
    const [{ isValid, error }, setIsValid] =
      useState<TrainLineItemValidityType>({
        isValid: false,
        error: '',
      })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
      setTrainLineItemForm(prev => ({ ...prev, name: event.target.value }))

    const changeTrainLineItemColor = (color: TrainLineColorName) =>
      setTrainLineItemForm(prev => ({ ...prev, color }))

    const appendTrainLineItem = () => {
      setTrainLineItem(prev => [...prev, trainLineItemForm])
      closeAppendForm()
    }

    useEffect(() => {
      if (trainLineItemForm.name === '')
        setIsValid({ isValid: false, error: '' })
      else if (!/^[0-9가-힣]{2,5}$/.test(trainLineItemForm.name))
        setIsValid({
          isValid: false,
          error: '한글 및 숫자 2글자 ~ 5글자로 설정해주세요.',
        })
      else if (trainLineItem.find(item => item.name === trainLineItemForm.name))
        setIsValid({
          isValid: false,
          error: '해당 이름이 이미 사용 중입니다.',
        })
      else setIsValid({ isValid: true, error: '' })
    }, [trainLineItemForm.name])

    useEffect(() => {
      const usedTrainLineItemColors = trainLineItem.map(item => item.color)

      if (usedTrainLineItemColors.includes(trainLineItemForm.color))
        setIsValid({ isValid: false, error: '노선 색을 변경해주세요.' })
      else setIsValid(prev => ({ ...prev, error: '' }))
    }, [trainLineItem, trainLineItemForm.color])

    if (trainLineItem.length === Object.keys(TRAIN_LINE_COLOR).length)
      return null

    return (
      <Fragment>
        <div css={dividingLineStyle} />
        <div css={appendTrainLineItemFormStyle}>
          <SelectTrainLineItemColor
            trainLineItem={trainLineItem}
            selectedColor={trainLineItemForm.color}
            changeTrainLineItemColor={changeTrainLineItemColor}
          />
          <input
            css={trainLineItemNameInputStyle}
            type="text"
            placeholder="노선 이름"
            value={trainLineItemForm.name}
            onChange={handleChange}
          />
          <button
            css={createTrainLineItemButtonStyle(isValid)}
            onClick={isValid ? appendTrainLineItem : undefined}
          >
            추가하기
          </button>
        </div>
        {error !== '' ? (
          <div css={enterTrainLineItemNameErrorStyle}>{error}</div>
        ) : null}
      </Fragment>
    )
  }

const appendTrainLineItemFormStyle = css`
  display: grid;
  grid-template-columns: 30px 140px 1fr;
  grid-gap: 10px;
`

const dividingLineStyle = css`
  margin: 30px 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
`

const trainLineItemNameInputStyle = css`
  padding: 5px 0;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

const createTrainLineItemButtonStyle = (formIsValid: boolean) => css`
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

const enterTrainLineItemNameErrorStyle = css`
  margin-top: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
`

export default AppendTrainLineItem
