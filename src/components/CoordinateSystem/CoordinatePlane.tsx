import { useEffect, useRef, FunctionComponent } from 'react'
import { css } from '@emotion/react'
import Node from '../CoordinateSystem/Node'
import {
  useGetCoordinatePlaneSize,
  useStateCoordinatePlaneZoom,
  useGetCalculatedCoordinatePlaneSize,
} from '../../state/CoordinateSystem/CoordinatePlaneSizeState'
import { useGetCoordinateSystemCurrentMode } from '../../state/CoordinateSystem/CoordinateSystemCurrentModeState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from '../../state/Train/TrainMapState'
import { useManageCoordinateSystemPathHighlight } from '../../state/CoordinateSystem/CoordinateSystemPathHightlightState'
import useScrollWithMouse from '../../hooks/useScrollWithMouse'
import { CURSOR_BY_CURRENT_MODE } from '../../utils/constants'

const CoordinatePlane: FunctionComponent = function () {
  const coordPlaneRef = useRef<HTMLDivElement | null>(null)
  useScrollWithMouse(coordPlaneRef)

  const currentMode = useGetCoordinateSystemCurrentMode()
  const { width, height } = useGetCoordinatePlaneSize()
  const [zoom] = useStateCoordinatePlaneZoom()
  const { width: calculatedWidth, height: calculatedHeight } =
    useGetCalculatedCoordinatePlaneSize()
  const {
    coordinateSystemPathHighlight: { highlight, highlightedComponents },
  } = useManageCoordinateSystemPathHighlight()

  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix } = useManageTrainLine()

  useEffect(() => {
    if (coordPlaneRef.current === null) return
    coordPlaneRef.current.style.cursor = CURSOR_BY_CURRENT_MODE[currentMode]
  }, [currentMode])

  return (
    <div ref={coordPlaneRef} css={coordPlaneStyle}>
      {width === 0 && height === 0 ? (
        <div css={coordPlaneInfoStyle}>
          <img
            src={process.env.PUBLIC_URL + '/img/append_project_image.svg'}
            alt="Append Project"
          />
          새 프로젝트를 생성해주세요.
        </div>
      ) : (
        <div
          css={coordPlaneBackgroundStyle}
          style={{
            width: `${calculatedWidth}px`,
            height: `${calculatedHeight}px`,
          }}
        >
          <div
            css={coordPlaneContentStyle}
            style={{
              width: `${width * 120}px`,
              height: `${height * 120}px`,
              transform: `scale(${zoom})`,
            }}
          >
            {[...Array<number>(height).keys()].map(
              (row: number, rowIndex: number) => (
                <div css={rowStyle} key={`row-${row}`}>
                  {[...Array<number>(width).keys()].map(
                    (column: number, columnIndex: number) => {
                      const nodeNumber = width * rowIndex + columnIndex

                      const trainLine = {
                        right:
                          columnIndex !== width - 1
                            ? trainLineMatrix[nodeNumber][nodeNumber + 1]
                            : null,
                        bottom:
                          rowIndex !== height - 1
                            ? trainLineMatrix[nodeNumber][nodeNumber + width]
                            : null,
                      }

                      return (
                        <Node
                          key={`${row}-${column}`}
                          row={row}
                          column={column}
                          nodeNumber={nodeNumber}
                          trainPlatform={trainPlatformMatrix[row][column]}
                          trainLine={trainLine}
                          highlight={highlight}
                          highlightedComponents={highlightedComponents}
                        />
                      )
                    },
                  )}
                </div>
              ),
            )}

            {highlight ? <div css={coordHighlightPlaneStyle} /> : null}
          </div>
        </div>
      )}
    </div>
  )
}

const coordPlaneStyle = css`
  flex: 1;
  display: flex;
  overflow: scroll;
  height: 100%;
  background: #e9ecef;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
  }
`

const coordPlaneBackgroundStyle = css`
  flex-shrink: 0;
  display: flex;
  margin: auto;
  padding: 100px 150px;
  background: #e9ecef;
  box-sizing: initial;
`

const coordPlaneInfoStyle = css`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  font-size: 2rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.3);
  user-select: none;

  img {
    width: 300px;
    margin-bottom: 30px;
  }
`

const coordPlaneContentStyle = css`
  background: #ffffff;
  transform-origin: 0% 0%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

const rowStyle = css`
  display: flex;
`

const coordHighlightPlaneStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
`

export default CoordinatePlane
