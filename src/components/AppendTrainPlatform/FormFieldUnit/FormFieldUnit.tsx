import { FunctionComponent, ReactNode } from 'react'
import { jsx, css } from '@emotion/react'

type FormFieldUnitProps = {
  title: string
  children: ReactNode
}

const FormFieldUnit: FunctionComponent<FormFieldUnitProps> = function ({
  title,
  children,
}) {
  return (
    <div css={formFieldUnitStyle}>
      <div css={formFieldUnitTitleStyle}>{title}</div>
      {children}
    </div>
  )
}

const formFieldUnitStyle = css`
  width: 100%;

  & + & {
    margin-top: 30px;
  }
`

const formFieldUnitTitleStyle = css`
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

export default FormFieldUnit
