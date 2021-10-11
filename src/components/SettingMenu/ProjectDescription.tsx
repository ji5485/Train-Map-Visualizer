import { FunctionComponent } from 'react'
import { css } from '@emotion/react'

const ProjectDescription: FunctionComponent = function () {
  return (
    <div css={projectDescriptionStyle}>
      Copyright 2021. Hyeon Do Ju all rights reserved.
      <br />
      <a href="https://github.com/ji5485/Train-Map-Visualizer" target="_blank">
        Project Description
      </a>
      ·
      <a href="https://ji5485.github.io/" target="_blank">
        Developer Blog
      </a>
    </div>
  )
}

const projectDescriptionStyle = css`
  margin-top: 30px;
  color: #495057;
  font-size: 0.7rem;
  font-weight: 300;
  text-align: center;

  a {
    color: inherit;
  }
`

export default ProjectDescription
