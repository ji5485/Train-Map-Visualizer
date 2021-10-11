import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import CreateProjectMenu from '../SettingMenu/CreateProjectMenu'
import CaptureProjectMenu from '../SettingMenu/CaptureProjectMenu'
import ProjectDescription from '../SettingMenu/ProjectDescription'

const SettingMenuContent: FunctionComponent = function () {
  return (
    <div css={settingMenuContentStyle}>
      <CreateProjectMenu />
      <CaptureProjectMenu />
      <ProjectDescription />
    </div>
  )
}

const settingMenuContentStyle = css``

export default SettingMenuContent
