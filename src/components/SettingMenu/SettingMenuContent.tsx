import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import CreateProjectMenu from 'components/SettingMenu/CreateProjectMenu'
import CaptureProjectMenu from 'components/SettingMenu/CaptureProjectMenu'
import ProjectDescription from 'components/SettingMenu/ProjectDescription'

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
