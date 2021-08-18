import { FunctionComponent, useMemo } from 'react'
import { jsx, css } from '@emotion/react'
import { FindTrainPathFormType } from 'types/FloatingForm.types'
import { useManageFindTrainPathForm } from 'state/FloatingForm/FindTrainPathState'
import { useManageTrainPlatform } from 'state/Train/TrainMapState'

type TrainPlatformListProps = {
  type: keyof FindTrainPathFormType
  trainPlatformName: string
}

const TrainPlatformList: FunctionComponent<TrainPlatformListProps> = function ({
  type,
  trainPlatformName,
}) {
  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { findTrainPathForm } = useManageFindTrainPathForm()

  const selectableTrainPlatform = useMemo(() => {
    const usedPlatformNodeNumber = findTrainPathForm[type]

    // TODO: Developing Train Platform List Without Selected Train Platform
  }, [])

  return <div css={trainPlatformListStyle}>{trainPlatformName}</div>
}

const trainPlatformListStyle = css`
  position: absolute;
  left: 0;
  top: 45px;
  z-index: 10;

  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  background: #f8f9fa;
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

export default TrainPlatformList
