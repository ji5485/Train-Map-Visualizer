import { useState, FunctionComponent, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import { MdNoteAdd } from 'react-icons/md'
import { CoordinatePlaneSizeType } from '../../types/CoordinateSystem.types'
import { useSetCoordinatePlaneSize } from '../../state/CoordinateSystem/CoordinatePlaneSizeState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../../state/Train/TrainMapState'
import { useManageTrainMapGraph } from '../../state/Train/TrainMapGraphState'
import { useManageTrainLineItem } from '../../state/Train/TrainLineItemState'
import { useSetFloatingForm } from '../../state/FloatingForm/FloatingFormState'
import { useGetCoordinatePlaneSize } from '../../state/CoordinateSystem/CoordinatePlaneSizeState'

const CreateProjectMenu: FunctionComponent = function () {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [{ width, height }, setCoordinateSize] =
    useState<CoordinatePlaneSizeType>({
      width: 8,
      height: 5,
    })

  const { width: prevWidth, height: prevHeight } = useGetCoordinatePlaneSize()
  const setCoordinatePlaneSize = useSetCoordinatePlaneSize()
  const setFloatingForm = useSetFloatingForm()
  const { resetTrainPlatformMatrix } = useManageTrainPlatform()
  const { resetTrainLineMatrix } = useManageTrainLine()
  const { resetTrainMapGraph } = useManageTrainMapGraph()
  const { resetTrainLineItem } = useManageTrainLineItem()

  const handleVisibleForm = () => setIsVisible(prev => !prev)

  const handleSizeChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setCoordinateSize(prev => ({ ...prev, [name]: value }))

  const validateSize = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1,2}$/.test(value) ||
      parseInt(value) < 3 ||
      parseInt(value) > 20
    )
      setCoordinateSize(prev => ({ ...prev, [name]: 3 }))
    else setCoordinateSize(prev => ({ ...prev, [name]: parseInt(value) }))
  }

  const createNewProject = () => {
    resetTrainPlatformMatrix()
    resetTrainLineMatrix()
    resetTrainMapGraph()
    resetTrainLineItem()
    setCoordinatePlaneSize({ width, height })
    setFloatingForm(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div>
      <div css={createProjectMenuStyle} onClick={handleVisibleForm}>
        <MdNoteAdd />
        <span>새 프로젝트 생성</span>
      </div>

      {isVisible ? (
        <div css={createProjectBoxStyle}>
          <div css={createProjectFormStyle}>
            <div css={menuFormItemStyle}>
              <div>가로 노드 수</div>
              <input
                type="number"
                name="width"
                min="3"
                max="20"
                value={width}
                onChange={handleSizeChange}
                onBlur={validateSize}
              />
            </div>

            <div css={menuFormItemStyle}>
              <div>세로 노드 수</div>
              <input
                type="number"
                name="height"
                min="3"
                max="20"
                value={height}
                onChange={handleSizeChange}
                onBlur={validateSize}
              />
            </div>
          </div>

          <div css={createProjectWarnStyle}>
            {prevWidth !== 0 && prevHeight !== 0
              ? '기존 프로젝트는 복구할 수 없습니다.'
              : '최대 노드 길이는 20입니다.'}
          </div>

          <div css={createProjectButtonStyle} onClick={createNewProject}>
            프로젝트 만들기
          </div>
        </div>
      ) : null}
    </div>
  )
}

const createProjectMenuStyle = css`
  display: flex;
  align-items: center;
  margin: 0 -10px;
  padding: 10px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: 0.15s background;

  &:hover {
    background: #e9ecef;
  }

  svg {
    font-size: 1.3rem;
  }

  span {
    margin-left: 5px;
  }
`

const createProjectBoxStyle = css`
  margin-top: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

const createProjectFormStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-bottom: 15px;
`

const menuFormItemStyle = css`
  div {
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.7);
  }

  input {
    width: 100%;
    padding: 5px 0;
    border: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    font-size: 0.9rem;
    outline: none;
    transition: border-bottom 0.3s;

    &:focus {
      border-bottom: 2px solid rgba(0, 0, 0, 1);
    }
  }
`

const createProjectWarnStyle = css`
  margin-bottom: 5px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
  text-align: center;
`

const createProjectButtonStyle = css`
  width: 100%;
  padding: 8px;
  text-align: center;
  background: #1971c2;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  transition: 0.3s background;

  &:hover {
    background: #1864ab;
  }
`

export default CreateProjectMenu
