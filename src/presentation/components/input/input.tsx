import React, { FC, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-content'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const enablesInput = (event: React.FocusEvent<HTMLInputElement>): void => { event.target.readOnly = false }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const error = state[`${props.name}Error`]

  const getStatus = (): string => error ? '🔴' : '🟢'

  const getTitle = (): string => error || 'Tudo certo!'

  return (
    <div className={Styles.inputWrap}>
      <input readOnly {...props} onFocus={enablesInput} data-testid={props.name} onChange={handleChange}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
