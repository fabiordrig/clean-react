import React, { FC, useContext } from 'react'
import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: FC = () => {
  const { state: { isLoading, mainError } } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner}/> }
      { mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span> }
    </div>
  )
}

export default FormStatus
