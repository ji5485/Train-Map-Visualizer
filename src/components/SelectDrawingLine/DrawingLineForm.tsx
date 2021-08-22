import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import DrawingLineItem from 'components/SelectDrawingLine/DrawingLineItem'
import { useGetDrawingLineList } from 'state/FloatingForm/DrawingLineListState'
import useSelectDrawingTrainLine from 'hooks/useSelectDrawingTrainLine'
import { TrainLineItemType } from 'types/Train.types'

const DrawingLineForm: FunctionComponent = function () {
  const drawingLineList = useGetDrawingLineList()
  const { selectDrawingLine } = useSelectDrawingTrainLine()

  const selectLine = (line: TrainLineItemType) => () => selectDrawingLine(line)

  return (
    <div css={drawingLineFormStyle}>
      {drawingLineList.map(item => (
        <DrawingLineItem
          color={item.color}
          selectLine={selectLine(item)}
          key={item.id}
        />
      ))}
    </div>
  )
}

const drawingLineFormStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  grid-gap: 10px;
`

export default DrawingLineForm
