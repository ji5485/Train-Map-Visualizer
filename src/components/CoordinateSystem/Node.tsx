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
import { CoordinateSystemPathHighlightType } from 'types/CoordinateSystem.types'

type NodeProps = {
  row: number
  column: number
  nodeNumber: number
  trainPlatform: TrainPlatformType | null
  trainLine: TrainLineForNodeType
  highlightedComponents: CoordinateSystemPathHighlightType['highlightedComponents']
}

const Node: FunctionComponent<NodeProps> = function ({
  row,
  column,
  nodeNumber,
  trainPlatform,
  trainLine,
  highlightedComponents,
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

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
  }

  &:before {
    width: 100%;
    height: 2px;
  }

  &:after {
    width: 2px;
    height: 100%;
  }
`

export default Node
