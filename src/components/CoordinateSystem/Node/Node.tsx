import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useManageTrainPlatform from 'hooks/useManageTrainPlatform'
import useDrawTrainLine from 'hooks/useDrawTrainLine'
import TrainPlatform from 'components/CoordinateSystem/TrainPlatform'
import TrainLine from 'components/CoordinateSystem/TrainLine'
import {
  TrainPlatformType,
  TrainLineInNodeType,
  TrainLineDirectionInNodeType,
} from 'types/Train.types'

type NodeProps = {
  row: number
  column: number
  nodeNumber: number
  trainPlatform: TrainPlatformType | null
  trainLine: TrainLineInNodeType
  previewTrainLine: TrainLineInNodeType
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
  } = useManageTrainPlatform(row, column, nodeRef, trainPlatform)
  const {
    trainLinePreviewMode,
    previewTrainLine,
    currentDrawingLine,
  } = useDrawTrainLine(
    row,
    column,
    nodeNumber,
    nodeRef,
    trainPlatform,
    trainLine,
  )

  return (
    <div ref={nodeRef} css={nodeStyle}>
      {visibleTrainPlatformPreview && (
        <TrainPlatform
          platformName={platformName}
          trainLine={selectedTrainLine}
          isPreview
          isTransferPlatform={false}
        />
      )}
      {trainPlatform !== null && (
        <TrainPlatform
          platformName={trainPlatform.name}
          trainLine={trainPlatform.line[0]}
          isPreview={false}
          isTransferPlatform={trainPlatform.isTransferPlatform}
        />
      )}

      {trainLinePreviewMode === 'drawing' && (
        <TrainLine
          color={currentDrawingLine.color}
          direction={currentDrawingLine.direction}
        />
      )}
      {/* {trainLinePreviewMode === 'preview' && previewTrainLine !== null && (
        // TODO: Preview Train Line 구현하기
        <TrainLine
          color={previewTrainLine.color}
          direction={previewTrainLine.direction}
        />
      )} */}

      {Object.keys(trainLine).map((direction, index) => {
        const line = trainLine[direction as TrainLineDirectionInNodeType]

        return line === null ? null : (
          <TrainLine
            color={line.color}
            direction={line.direction}
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
