import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { RiScreenshot2Fill } from 'react-icons/ri'
import html2canvas from 'html2canvas'

const CaptureProjectMenu: FunctionComponent = function () {
  const trainMapDOM =
    document.getElementById('root')!.children[0].children[0].children[0]
  const isActiveCapture = trainMapDOM.className.includes('Background')

  const handleCapture = async () => {
    if (!isActiveCapture) return

    const result = await html2canvas(trainMapDOM as HTMLElement)
    const link = document.createElement('a')

    document.body.appendChild(link)
    link.href = result.toDataURL('image/png')
    link.download = 'TrainMap.png'
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div css={captureProjectMenuStyle(isActiveCapture)} onClick={handleCapture}>
      <RiScreenshot2Fill />
      <span>노선도 이미지 저장</span>
    </div>
  )
}

const captureProjectMenuStyle = (isActiveCapture: boolean) => css`
  display: flex;
  align-items: center;
  margin: 0 -10px;
  padding: 10px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.7);

  svg {
    font-size: 1.3rem;
  }

  span {
    margin-left: 5px;
  }

  ${isActiveCapture &&
  `
    cursor: pointer;
    transition: 0.15s background;

    &:hover {
      background: #e9ecef;
    }
  `}
`

export default CaptureProjectMenu
