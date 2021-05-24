import { FunctionComponent, ReactNode } from 'react'
import { jsx, css } from '@emotion/react'

type FormBoxProps = {
  title: string
  children: ReactNode
}

const FormBox: FunctionComponent<FormBoxProps> = function ({
  title,
  children,
}) {
  return (
    <div css={formBoxStyle}>
      <div css={formBoxTitleStyle}>{title}</div>
      {children}
    </div>
  )
}

const formBoxStyle = css`
  width: 100%;
`

const formBoxTitleStyle = css`
  margin-bottom: 15px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

export default FormBox
