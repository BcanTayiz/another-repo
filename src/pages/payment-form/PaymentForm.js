import React,{useState,useRef,useEffect} from 'react'
import styles from './Payment.module.css'

import date from 'date-and-time';

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { db } from '../../firebase/config'
import { collection,addDoc } from 'firebase/firestore'

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

// Credit card synthax verification function
const checkCreditCard = (cardNumber,cardEndDateMonthYear,cvv,cardFullName,cardStart) => {
    let con1 = false
    let con2 = false
    let con3 = false
    let con4 = false
    con4 = false
    console.log(cardNumber.trim())
    try{
        if(Number(cardNumber.replace(/\s/g,'')) && (cardNumber.replace(/\s/g,'').length == 16) 
        && (cardNumber.replace(/\s/g,'')[0] == cardStart))  {
            con1 = true
        }else{
            
        }
        let date = cardEndDateMonthYear.split('/')
        console.log(date)
        let months = ['01','02','03','04','05','06','07','08','09','10','11','12']
        if(months.includes(date[0])){
            con2 = true
        }
        if(Number(date[1]) > 1900 && Number(date[1] < Number(new Date().getFullYear()) + 10)){
            con2 = true
        }else{
            con2 = false
        }
        let cvvCheck = cvv.split('')
        if(cvvCheck.length === 3){
            con3 = true
        }else{
            con3 = false
        }
        console.log(cvvCheck) 
        cvvCheck.forEach(num => {
           
            try{
                if(Number(num)<10){
                    
                }
            }catch{
                con3 = false
            }
        })
        console.log("ERROR ERROR")
        let fullname = cardFullName.replace(/\s/g,'').split('')
        console.log(fullname)
        for(let i = 0;i<fullname.length;  ){
            if(!isLetter(fullname[i])){
                con4 = false
            }else{
                i++
            }
        }
        console.log('Last Phase of Card Validation')
        console.log(con1,con2,con3,con4)
    }catch(err){
        console.log(err)
        console.log(con1,con2,con3,con4)
        return false
    }

    console.log('final check')
    if(con1,con2,con3,con4){
        return true
    }else{
        return false
    }
    

}

export default function PaymentForm() {

    const {user} = useAuthContext()

    const {documents:payments } = useCollection('payments',['uid','==',user.uid])

    let {documents:purchases } = useCollection('creditCard',['uid','==',user.uid])
    
    // firebase pull data as collections from data base
    

    let totalPrice = 0
    if(payments){
        payments.map(e => {
            totalPrice += Number(e.price)
        })
    }

    const now = new Date();

    const [cardNumberSpec,setCardNumberSpec] = useState(0)


    const [cardNumber, setCardNumber] = useState('')
    const [cardEndDateMonthYear, setCardEndDateMonthYear] = useState('')
    const [cvv,setCVV] = useState('')
    const [cardFullName,setCardFullName] = useState('')

    // you can see the variables for credit card

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(cardNumber,cardEndDateMonthYear,cvv,cardFullName)
        console.log(purchases,"payment form documents")

    if(checkCreditCard(cardNumber,cardEndDateMonthYear,cvv,cardFullName,cardNumberSpec)){
        const ref = collection(db,'creditCard')
        await addDoc(ref,{
            fullname:cardFullName,
            cardNumber:cardNumber,
            CardEndDateMonthYear:cardEndDateMonthYear,
            cvv:cvv,
            totalPrice:totalPrice,  
            date:date.format(now, 'ddd, MMM DD YYYY'),
            uid: user.uid
          })
    }else{
        //alert('Please Enter a valid credit card')
        console.log('Wrong Card Info')
    }

    setCardFullName('')
    setCardNumber(0)
    setCardEndDateMonthYear('')
    setCVV(0)
    totalPrice = 0
    
    
    
  }




    

  return (
    <div className="container mt-2">
    <div className="row">
        <div className={styles.cardContainer} >
            <div className="card p-3" onClick={() => setCardNumberSpec(4)}>
                <div className="img-box"> <img className={styles.img} src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt=""/> </div>
                <div className="number"> <label className="fw-bold" htmlFor="">**** **** **** 1060</label> </div>
                <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
            </div>
        </div>
        <div className={styles.cardContainer} onClick={() => setCardNumberSpec(5)}>
            <div className="card p-3">
                <div className="img-box"> <img className={styles.img} src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" alt=""/> </div>
                <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
                <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
            </div>
        </div>
        <div className={styles.cardContainer} onClick={() => setCardNumberSpec(6)}>
            <div className="card p-3">
                <div className="img-box"> <img className={styles.img} src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png" alt="" /> </div>
                <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
                <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
            </div>
        </div>
        <h4>Selected Card: {cardNumberSpec === 4 ? 'Visa' : cardNumberSpec === 5 ? 'Master' : 'Discover'}</h4>

        <div className="col-12 mt-4">
            <div className="card p-3">
                <p className="mb-0 fw-bold h4">Payment Methods</p>
            </div>
        </div>
        <div className="col-12">
            <div className="card p-3">
                <div className="card-body border p-0">
                    <p> <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample"> <span className="fw-bold">PayPal</span> <span className="fab fa-cc-paypal"> </span> </a> </p>
                    <div className="collapse p-3 pt-0" id="collapseExample">
                        <div className="row">
                            <div className="col-8">
                                <p className="h4 mb-0">Summary</p>
                                <p className="mb-0"><span className="fw-bold">Product:</span><span className="c-green">: Name of product</span></p>
                                <p className="mb-0"><span className="fw-bold">Price:</span><span className="c-green">:${totalPrice}</span></p>
                                <p className="mb-0">Total Expense Value is shown at above</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body border p-0">
                    <p> <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample"> <span className="fw-bold">Credit Card</span> <span className=""> <span className="fab fa-cc-amex"></span> <span className="fab fa-cc-mastercard"></span> <span className="fab fa-cc-discover"></span> </span> </a> </p>
                    <div className="collapse show p-3 pt-0" id="collapseExample">
                        <div className="row">
                            <div className="col-lg-5 mb-lg-0 mb-3">
                                <p className="h4 mb-0">Summary</p>
                                <p className="mb-0"><span className="fw-bold">Product:</span><span className="c-green">: Name of product</span> </p>
                                <p className="mb-0"> <span className="fw-bold">Price:</span> <span className="c-green">:${totalPrice}</span> </p>
                                <p className="mb-0">Total Expense Value is shown at above</p>
                            </div>
                            <div className="col-lg-7" >
                                <form action="" className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form__div"> <input  onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} type="text" className="form-control" placeholder=" " /> <label htmlFor='' className="form__label">Card Number</label> </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form__div"> <input  onChange={(e) => setCardEndDateMonthYear(e.target.value)} value={cardEndDateMonthYear}  type="text" className="form-control" placeholder=" "/> <label htmlFor='' className="form__label">MM / yy</label> </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form__div"> <input onChange={(e) => setCVV(e.target.value)} value={cvv}  type="password" className="form-control" placeholder=" "/> <label htmlFor='' className="form__label">cvv code</label> </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form__div"> <input onChange={(e) => setCardFullName(e.target.value)} value={cardFullName}  type="text" className="form-control" placeholder=" "/> <label htmlFor='' className="form__label">name on the card</label> </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100">Sumbit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <PaymentHistory />
        </section>
    </div>
</div>
  )
}


const PaymentHistory = () => {

    const {user} = useAuthContext()
    let {documents:purchases } = useCollection('creditCard',['uid','==',user.uid])

    
    if(purchases){
        return (
            purchases.map(purchase => (
                <div key={purchase.id} className='payment-history'>
                    <h2>Owner: {purchase.fullname}</h2>

                    <section>
                        <p> {purchase.totalPrice}</p>
                    </section>
                </div>
            ))
        
      )
       
    }
    else{
        return(
            <div>
                <h2>No History</h2>
            </div>
        )
    } 
   
}