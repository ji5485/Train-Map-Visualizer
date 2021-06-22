import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useManageTrainPlatform from 'hooks/useManageTrainPlatform'
import useDrawTrainLine from 'hooks/useDrawTrainLine'
import TrainPlatform from 'components/CoordinateSystem/TrainPlatform'
import TrainLine from 'components/CoordinateSystem/TrainLine'
import {
  TrainPlatformType,
  TrainLineDirection,
  TrainLineType,
  TrainLineByDirection,
} from 'types/Train.types'

type NodeProps = {
  row: number
  column: number
  nodeNumber: number
  trainPlatform: TrainPlatformType | null
  trainLine: TrainLineByDirection
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
      {trainLinePreviewMode === 'preview' && previewTrainLine !== null && (
        <TrainLine
          color={previewTrainLine.color}
          direction={previewTrainLine.direction}
        />
      )}

      {Object.values(trainLine).every(value => value !== null) &&
        // Object.entries(trainLine).map(
        //   ([direction, line]: [TrainLineDirection, TrainLineType | null]) => {
        //     if (line === null) return
        //     else return <TrainLine color={line.color} direction={direction} />
        //   },
        // )}
        // TODO: Object.keys로 바꿔보기
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
