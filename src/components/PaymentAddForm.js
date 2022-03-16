import { useState } from 'react'

import { db } from '../firebase/config'
import { collection,addDoc } from 'firebase/firestore'
import { useAuthContext } from '../hooks/useAuthContext'


export default function PaymentAddForm() {
  const [paymentName, setPaymentName] = useState('')
  const [price,setPrice] = useState(0)
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(paymentName,price)


    
    const ref = collection(db,'payments')

    await addDoc(ref,{
      title:paymentName,
      price:price,
      uid: user.uid
    })

    setPaymentName('')
    setPrice(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a New Payment:</span>
        <input 
          required
          type="text"
          onChange={(e) => setPaymentName(e.target.value)}
          value={paymentName}
        />
      </label>
      <label>
        <span>Add a Price:</span>
        <input 
          required
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </label>
      <button>Add</button>
    </form>
  )
}
