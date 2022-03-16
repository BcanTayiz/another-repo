import { db } from "../firebase/config"
import { doc,deleteDoc } from "firebase/firestore"

import React,{useRef} from "react";





export default function PaymentList({ payments }) {


  let navRef = useRef();
  
  let totalPrice = 0
  let allProducts = []

  const handleClick = async (id) => {
    const ref = doc(db,'payments',id)
    await deleteDoc(ref)
    console.log(payments)
  }

  return (
    <main>
    <div className="book-list">
      <main >
        {payments.map(payment => (
          <section 
           key={payment.id} onClick={() => handleClick(payment.id)} className="add-form">
            <li style={{backgroundColor:'coral'}} className="element">Product Name: {payment.title}</li>
            <li  className="element" >Product Price: {payment.price}  </li>
          </section>
          
        ))}
        {
          payments.map(payment => {
            totalPrice += Number(payment.price)
            allProducts.push(payment.title)
          })
        }
        <section>
            <h3>Total Price: {totalPrice}</h3>
        </section>
      </main>
    </div>
    </main>
  )
}