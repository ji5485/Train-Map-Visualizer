import { FunctionComponent, useMemo } from 'react'
import { jsx, css } from '@emotion/react'
import { FindTrainPathFormType } from 'types/FloatingForm.types'
import { useManageFindTrainPathForm } from 'state/FloatingForm/FindTrainPathState'
import { useManageTrainPlatform } from 'state/Train/TrainMapState'
import { TrainPlatformType } from 'types/Train.types'
import TrainPlatformItem from 'components/FindTrainPath/TrainPlatformItem'

type TrainPlatformListProps = {
  type: keyof FindTrainPathFormType
  trainPlatformName: string
  handleClose: () => void
  handleResetInput: () => void
}

const TrainPlatformList: FunctionComponent<TrainPlatformListProps> = function ({
  type,
  trainPlatformName,
  handleClose,
  handleResetInput,
}) {
  const { trainPlatformMatrix } = useManageTrainPlatform()
  const {
    findTrainPathForm,
    setFindTrainPathForm,
  } = useManageFindTrainPathForm()

  const selectableTrainPlatformList = useMemo<TrainPlatformType[]>(() => {
    const usedPlatform =
      findTrainPathForm[type === 'start' ? 'destination' : 'start']
    const usedPlatformNodeNumber =
      usedPlatform === null ? null : usedPlatform.nodeNumber

    const trainPlatformList = trainPlatformMatrix.reduce<TrainPlatformType[]>(
      (result, trainPlatformLine) => {
        const initialValue: TrainPlatformType[] = []

        const trainPlatforms = trainPlatformLine.reduce<TrainPlatformType[]>(
          (list, trainPlatform) => {
            if (
              trainPlatform !== null &&
              trainPlatform.nodeNumber !== usedPlatformNodeNumber
            )
              list = [...list, trainPlatform]

            return list
          },
          initialValue,
        )

        return [...result, ...trainPlatforms]
      },
      [],
    )

    return trainPlatformList
  }, [])

  const selectTrainPlatform = (trainPlatform: TrainPlatformType) => {
    setFindTrainPathForm(prev => ({ ...prev, [type]: trainPlatform }))
    handleResetInput()
    handleClose()
  }

  if (selectableTrainPlatformList.length === 0)
    return (
      <div css={emptyTrainPlatform}>선택 가능한 역이 존재하지 않습니다.</div>
    )

  return (
    <div css={trainPlatformListStyle}>
      {selectableTrainPlatformList.map((trainPlatform: TrainPlatformType) =>
        trainPlatform.name.includes(trainPlatformName) ? (
          <TrainPlatformItem
            trainPlatform={trainPlatform}
            iconType="check"
            onClick={() => selectTrainPlatform(trainPlatform)}
            key={trainPlatform.id}
          />
        ) : null,
      )}
    </div>
  )
}

const trainPlatformListStyle = css`
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 10;

  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  background: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
`

const emptyTrainPlatform = css`
  position: absolute;
  top: 40px;
  left: 0px;
  z-index: 10;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100px;
  background: #f8f9fa;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  font-weight: 800;
`

export default TrainPlatformList
