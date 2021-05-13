import React, { FC, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-content'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const enablesInput = (event: React.FocusEvent<HTMLInputElement>): void => { event.target.readOnly = false }

  const { errorState } = useContext(Context)

  const error = errorState[props.name]

  const getStatus = (): string => '🔴'

  const getTitle = (): string => error

  return (
    <div className={Styles.inputWrap}>
      <input readOnly {...props} onFocus={enablesInput}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
