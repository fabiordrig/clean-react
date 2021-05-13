import React, { FC } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const enablesInput = (event: React.FocusEvent<HTMLInputElement>): void => { event.target.readOnly = false }

  return (
    <div className={Styles.inputWrap}>
      <input readOnly {...props} onFocus={enablesInput}/>
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Input
