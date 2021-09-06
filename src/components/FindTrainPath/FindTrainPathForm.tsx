import { useState, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import FindPathTrainFormItem from 'components/FindTrainPath/FindTrainPathFormItem'
import { useManageFindTrainPathForm } from 'state/FloatingForm/FindTrainPathState'
import { useManageCoordinateSystemPathHighlight } from 'state/CoordinateSystem/coordinateSystemPathHightlightState'
import useFindTrainLinePath from 'hooks/useFindTrainLinePath'
import { TrainPathSectionType } from 'types/TrainPath.types'
import FindTrainPathResult from 'components/FindTrainPath/FindTrainPathResult'

const FindTrainPathForm: FunctionComponent = function () {
  const {
    findTrainPathForm: { start, destination },
    resetFindTrainPathForm,
  } = useManageFindTrainPathForm()
  const {
    setCoordinateSystemPathHighlight,
    resetCoordinateSystemPathHighlight,
  } = useManageCoordinateSystemPathHighlight()
  const { findLineWithSelectedPlatforms } = useFindTrainLinePath()
  const [{ isVisible, result }, setResultForm] = useState<{
    isVisible: boolean
    result: TrainPathSectionType[]
  }>({
    isVisible: false,
    result: [],
  })
  const formIsValid = start !== null && destination !== null

  const findTrainPath = () => {
    if (!formIsValid) return

    const { platforms, sections } = findLineWithSelectedPlatforms(
      start!.nodeNumber,
      destination!.nodeNumber,
    )

    if (platforms.length !== 0) {
      const highlightedLinesId = sections.reduce<string[]>(
        (result, section) => {
          const linesId = section.pass.map(line => line.id)
          return [...result, ...linesId]
        },
        [],
      )

      setCoordinateSystemPathHighlight({
        highlight: true,
        highlightedComponents: {
          platforms,
          lines: highlightedLinesId,
        },
      })
    }

    setResultForm({
      isVisible: true,
      result: sections,
    })
  }

  const handleResetForm = () => {
    resetFindTrainPathForm()
    setResultForm({ isVisible: false, result: [] })
    resetCoordinateSystemPathHighlight()
  }

  if (isVisible)
    return (
      <FindTrainPathResult result={result} handleResetForm={handleResetForm} />
    )

  return (
    <div>
      <div css={findTrainPathFormBoxStyle}>
        <FindPathTrainFormItem type="start" />
        <FindPathTrainFormItem type="destination" />
      </div>

      <div
        css={findPathButtonStyle(formIsValid)}
        onClick={formIsValid ? findTrainPath : undefined}
      >
        경로 찾기
      </div>
    </div>
  )
}

const findTrainPathFormBoxStyle = css`
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

const findPathButtonStyle = (formIsValid: boolean) => css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  background: ${formIsValid ? '#1971c2' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  font-weight: 800;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
`

export default FindTrainPathForm
