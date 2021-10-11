import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import produce from 'immer'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../../state/Train/TrainMapState'
import {
  useManageTrainLineItem,
  useGetTrainLineItemById,
} from '../../state/Train/TrainLineItemState'
import { useGetCoordinatePlaneSize } from '../../state/CoordinateSystem/coordinatePlaneSizeState'
import { TrainLineColorName } from '../../types/Train.types'
import useGetPositionByNodeNumber from '../../hooks/useGetPositionByNodeNumber'
import SelectTrainLineItemColor from '../ManageTrainLineItem/SelectTrainLineItemColor'
import EnterTrainLineItemName from '../ManageTrainLineItem/EnterTrainLineItemName'

type ModifyTrainLineItemProps = {
  id: string
}

const ModifyTrainLineItem: FunctionComponent<ModifyTrainLineItemProps> =
  function ({ id }) {
    const { width, height } = useGetCoordinatePlaneSize()
    const { checkNotExistNextNodeInCoord } = useGetPositionByNodeNumber()
    const { setTrainPlatformMatrix } = useManageTrainPlatform()
    const { setTrainLineMatrix } = useManageTrainLine()
    const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()
    const selectedTrainLineItem = useGetTrainLineItemById(id)

    const setTrainLineItemColor = (color: TrainLineColorName) => {
      let prevColor: TrainLineColorName

      setTrainLineItem(prev =>
        produce(prev, draft => {
          const index = draft.findIndex(item => item.id === id)

          prevColor = draft[index].color
          draft[index].color = color
          return draft
        }),
      )

      setTrainPlatformMatrix(prev =>
        produce(prev, draft => {
          for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
              const trainPlatform = draft[row][column]

              if (trainPlatform === null) continue

              trainPlatform.line.forEach(item => {
                if (item.id !== id) return
                item.color = color
              })
            }
          }

          return draft
        }),
      )

      setTrainLineMatrix(prev =>
        produce(prev, draft => {
          for (let nodeNumber = 0; nodeNumber < width * height; nodeNumber++) {
            if (
              !checkNotExistNextNodeInCoord(nodeNumber, 'right') &&
              draft[nodeNumber][nodeNumber + 1] !== null &&
              draft[nodeNumber + 1][nodeNumber] !== null &&
              draft[nodeNumber][nodeNumber + 1]!.color === prevColor
            ) {
              draft[nodeNumber][nodeNumber + 1]!.color = color
              draft[nodeNumber + 1][nodeNumber]!.color = color
            }

            if (
              !checkNotExistNextNodeInCoord(nodeNumber, 'bottom') &&
              draft[nodeNumber][nodeNumber + width] !== null &&
              draft[nodeNumber + width][nodeNumber] !== null &&
              draft[nodeNumber][nodeNumber + width]!.color === prevColor
            ) {
              draft[nodeNumber][nodeNumber + width]!.color = color
              draft[nodeNumber + width][nodeNumber]!.color = color
            }
          }
        }),
      )
    }

    return (
      <div css={modifyTrainLineItemStyle}>
        <SelectTrainLineItemColor
          selectedTrainLineItem={selectedTrainLineItem}
          trainLineItem={trainLineItem}
          setTrainLineItemColor={setTrainLineItemColor}
        />
        <EnterTrainLineItemName />
      </div>
    )
  }

const modifyTrainLineItemStyle = css`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  padding: 10px;
`

export default ModifyTrainLineItem
