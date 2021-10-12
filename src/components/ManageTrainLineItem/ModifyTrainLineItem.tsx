import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import produce from 'immer'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../../state/Train/TrainMapState'
import {
  useManageTrainLineItem,
  useGetTrainLineItemById,
} from '../../state/Train/TrainLineItemState'
import { useGetCoordinatePlaneSize } from '../../state/CoordinateSystem/CoordinatePlaneSizeState'
import { useManageTrainMapGraph } from '../../state/Train/TrainMapGraphState'
import { TrainLineColorName } from '../../types/Train.types'
import useGetPositionByNodeNumber from '../../hooks/useGetPositionByNodeNumber'
import SelectTrainLineItemColor from '../ManageTrainLineItem/SelectTrainLineItemColor'
import ModifyNameOrRemove from './ModifyNameOrRemove'

type ModifyTrainLineItemProps = {
  id: string
}

const ModifyTrainLineItem: FunctionComponent<ModifyTrainLineItemProps> =
  function ({ id }) {
    const { width, height } = useGetCoordinatePlaneSize()
    const { checkNotExistNextNodeInCoord } = useGetPositionByNodeNumber()
    const { setTrainPlatformMatrix } = useManageTrainPlatform()
    const { setTrainLineMatrix } = useManageTrainLine()
    const { setTrainMapGraph } = useManageTrainMapGraph()
    const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()
    const selectedTrainLineItem = useGetTrainLineItemById(id)

    const isColorObj = (
      obj: { color: TrainLineColorName } | { name: string },
    ): obj is { color: TrainLineColorName } =>
      (obj as { color: TrainLineColorName }).color !== undefined

    const setTrainLineItemProperty = (
      propertyObject: { color: TrainLineColorName } | { name: string },
    ) => {
      setTrainLineItem(prev =>
        produce(prev, draft => {
          const index = draft.findIndex(item => item.id === id)
          draft[index] = { ...draft[index], ...propertyObject }
          return draft
        }),
      )

      setTrainPlatformMatrix(prev =>
        produce(prev, draft => {
          for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
              const trainPlatform = draft[row][column]

              if (
                trainPlatform === null ||
                !trainPlatform.line.find(item => item.id === id)
              )
                continue

              const index = trainPlatform.line.findIndex(item => item.id === id)
              trainPlatform.line[index] = {
                ...trainPlatform.line[index],
                ...propertyObject,
              }
            }
          }

          return draft
        }),
      )

      if (!isColorObj(propertyObject)) return
      const color = propertyObject.color

      setTrainLineMatrix(prev =>
        produce(prev, draft => {
          for (let nodeNumber = 0; nodeNumber < width * height; nodeNumber++) {
            if (
              !checkNotExistNextNodeInCoord(nodeNumber, 'right') &&
              draft[nodeNumber][nodeNumber + 1] !== null &&
              draft[nodeNumber + 1][nodeNumber] !== null &&
              draft[nodeNumber][nodeNumber + 1]!.lineItemId === id
            ) {
              draft[nodeNumber][nodeNumber + 1]!.color = color
              draft[nodeNumber + 1][nodeNumber]!.color = color
            }

            if (
              !checkNotExistNextNodeInCoord(nodeNumber, 'bottom') &&
              draft[nodeNumber][nodeNumber + width] !== null &&
              draft[nodeNumber + width][nodeNumber] !== null &&
              draft[nodeNumber][nodeNumber + width]!.lineItemId === id
            ) {
              draft[nodeNumber][nodeNumber + width]!.color = color
              draft[nodeNumber + width][nodeNumber]!.color = color
            }
          }
        }),
      )
    }

    const setTrainLineItemColor = (color: TrainLineColorName) =>
      setTrainLineItemProperty({ color })

    const setTrainLineItemName = (name: string) =>
      setTrainLineItemProperty({ name })

    const removeTrainLineItem = () => {
      const removeGraphEdgeIds: string[] = []

      setTrainPlatformMatrix(prev =>
        produce(prev, draft => {
          for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
              if (
                draft[row][column] === null ||
                !draft[row][column]!.line.find(item => item.id === id)
              )
                continue

              const filteredTrainLineList = draft[row][column]!.line.filter(
                item => item.id !== id,
              )

              if (filteredTrainLineList.length === 0) draft[row][column] = null
              else draft[row][column]!.line = filteredTrainLineList
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
              draft[nodeNumber][nodeNumber + 1]!.lineItemId === id
            ) {
              if (
                !removeGraphEdgeIds.includes(
                  draft[nodeNumber][nodeNumber + 1]!.graphEdgeId,
                )
              )
                removeGraphEdgeIds.push(
                  draft[nodeNumber][nodeNumber + 1]!.graphEdgeId,
                )

              draft[nodeNumber][nodeNumber + 1] = null
              draft[nodeNumber + 1][nodeNumber] = null
            }

            if (
              !checkNotExistNextNodeInCoord(nodeNumber, 'bottom') &&
              draft[nodeNumber][nodeNumber + width] !== null &&
              draft[nodeNumber + width][nodeNumber] !== null &&
              draft[nodeNumber][nodeNumber + width]!.lineItemId === id
            ) {
              if (
                !removeGraphEdgeIds.includes(
                  draft[nodeNumber][nodeNumber + width]!.graphEdgeId,
                )
              )
                removeGraphEdgeIds.push(
                  draft[nodeNumber][nodeNumber + width]!.graphEdgeId,
                )

              draft[nodeNumber][nodeNumber + width] = null
              draft[nodeNumber + width][nodeNumber] = null
            }
          }
        }),
      )

      setTrainMapGraph(prev =>
        produce(prev, draft => {
          for (
            let firstNodeNumber = 0;
            firstNodeNumber < width * height;
            firstNodeNumber++
          ) {
            for (
              let secondNodeNumber = firstNodeNumber + 1;
              secondNodeNumber < width * height;
              secondNodeNumber++
            ) {
              if (
                draft[firstNodeNumber][secondNodeNumber] === null ||
                !removeGraphEdgeIds.includes(
                  draft[firstNodeNumber][secondNodeNumber]!.id,
                )
              )
                continue

              const index = removeGraphEdgeIds.findIndex(
                id => id === draft[firstNodeNumber][secondNodeNumber]!.id,
              )
              removeGraphEdgeIds.splice(index, 1)

              draft[firstNodeNumber][secondNodeNumber] = null
              draft[secondNodeNumber][firstNodeNumber] = null
            }
          }
        }),
      )

      setTrainLineItem(prev =>
        produce(prev, draft => draft.filter(item => item.id !== id)),
      )
    }

    return (
      <div css={modifyTrainLineItemStyle}>
        <SelectTrainLineItemColor
          selectedTrainLineItem={selectedTrainLineItem}
          trainLineItem={trainLineItem}
          setTrainLineItemColor={setTrainLineItemColor}
        />
        <ModifyNameOrRemove
          trainLineItem={trainLineItem}
          prevName={selectedTrainLineItem.name}
          setTrainLineItemName={setTrainLineItemName}
          removeTrainLineItem={removeTrainLineItem}
        />
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
