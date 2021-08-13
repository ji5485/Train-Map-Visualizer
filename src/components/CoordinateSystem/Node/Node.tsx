import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useAppendTrainPlatform from 'hooks/useAppendTrainPlatform'
import useDrawTrainLine from 'hooks/useDrawTrainLine'
import TrainPlatform from 'components/CoordinateSystem/TrainPlatform'
import TrainLine from 'components/CoordinateSystem/TrainLine'
import {
  TrainPlatformType,
  TrainLineForNodeType,
  TrainLineDirectionForNodeType,
  TrainLineDirection,
} from 'types/Train.types'

type NodeProps = {
  row: number
  column: number
  nodeNumber: number
  trainPlatform: TrainPlatformType | null
  trainLine: TrainLineForNodeType
}

const Node: FunctionComponent<NodeProps> = function ({
  row,
  column,
  nodeNumber,
  trainPlatform,
  trainLine,
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const {
    visibleTrainPlatformPreview,
    previewTrainPlatform: { platformName, selectedTrainLine },
  } = useAppendTrainPlatform(row, column, nodeNumber, nodeRef, trainPlatform)
  const { isDrawingCurrentNode, currentDrawingLine } = useDrawTrainLine(
    nodeNumber,
    nodeRef,
    trainPlatform,
  )

  return (
    <div ref={nodeRef} css={nodeStyle}>
      {visibleTrainPlatformPreview && (
        <TrainPlatform
          nodeNumber={nodeNumber}
          platformName={platformName}
          trainLine={selectedTrainLine}
          isPreview
        />
      )}

      {trainPlatform !== null && (
        <TrainPlatform
          nodeNumber={nodeNumber}
          platformName={trainPlatform.name}
          trainLine={trainPlatform.line}
          isPreview={false}
        />
      )}

      {isDrawingCurrentNode && (
        <TrainLine
          nodeNumber={nodeNumber}
          color={currentDrawingLine.color}
          direction={currentDrawingLine.direction}
        />
      )}

      {Object.keys(trainLine).map((direction, index) => {
        const line = trainLine[direction as TrainLineDirectionForNodeType]

        return line === null ? null : (
          <TrainLine
            nodeNumber={nodeNumber}
            color={line.color}
            direction={direction as TrainLineDirection}
            key={index}
          />
        )
      })}
    </div>
  )
}

const nodeStyle = css`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  position: relative;
  width: 120px;
  height: 120px;

  background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    );
`

export default Node
