import React from 'react'

import PaymentAddForm from './PaymentAddForm'
import PaymentList from './PaymentList'


export default function DataContainer({payments}) {
  return (
    <div className="form-container">
        <PaymentAddForm/>
        {payments && <PaymentList payments={payments}/>}
    </div>
  )
}
