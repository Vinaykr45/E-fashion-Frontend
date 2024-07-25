import React, { useState,useEffect } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch , useSelector } from 'react-redux';
import Getproduct from '../Redux/Getproduct';
import { useNavigate } from 'react-router';

const Payment = (element) => {
    const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
    const ammount = element.data.amount;
    const cartItem = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(Getproduct())},[dispatch])
    const [userData,setuserData] = useState({});
    const [usernData,setusernData] = useState({});
    const [data,setdata] = useState()
    const [show,setshow] = useState(false)

   const nevigation = useNavigate()

   const manageOrder = () => {
    cartItem.map((items)=>{
      const name = Object.keys(items.sizes)
      const value = Object.values(items.sizes)
      const nsize = Object.entries(items.sizes).filter(([keys,value])=>keys===items.size) 
      console.log(nsize)
      setdata({...data,[name]:value})
    })
   }

    const callProfile = async() => {
      try {
        const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
        const data = res;
        setuserData(data.data.addres[element.data.address]);
        setusernData(data.data);
      } catch (error) {
        console.log(error)
      }
  }

console.log(userData.phone)
    const handelOrder = async() => {
        try {
          const res = await axios.post(`${url}/order`,{ ammount }).then((res)=>res.data)
          const data = await res
          console.log(data);
          handlePaymentVerify(data.data)

        } catch (error) {
          console.log(error)
        }
      }


      const handlePaymentVerify = async (data) => {
        const options = {
            key: ({}).RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "E-Fashion",
            description: "Test Mode",
            order_id: data.id,
            prefill:{
              name:userData.firstname+''+userData.lastname,
              contact:userData.phone
            },
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = axios.post(`${url}/verify`,{
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userid:usernData._id,
                        address:[userData],
                        order:cartItem
                    })
                    // console.log(res)
                    const verifyData = await res;
                    // console.log(verifyData.data.message)
                    if (verifyData.data.message) {
                        localStorage.removeItem('cartItem')
                        toast.success(verifyData.data.message)
                       setTimeout(() => {
                        nevigation('/orderstatus');
                        window.location.reload();
                       }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // theme: {
            //     color: "#5f63b8"
            // }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
        
    }

 useEffect(()=>{
    callProfile();
    manageOrder();
 },[])

  return (
    <div>
    <Toaster/>
    <div>
    </div>
    <div className='w-full flex justify-center'>
        <div className='flex flex-col gap-4'>
        <span className='text-xl font-semibold'>Choose Payment Method</span>
          <div className='text-center'>
           <input type="radio" id='online' className='text-lg font-semibold' onClick={()=>setshow(true)} />
           <label htmlFor="online" className='mx-2 text-lg font-semibold cursor-pointer'>Online Payment</label>
           <div>
           <button onClick={handelOrder} className={show?'text-center font-medium h-8 my-8 text-white w-[100%] bg-orange-500':'text-center font-medium h-8 my-8 text-white w-[100%] bg-slate-500'} disabled={show?false:true}>Pay Now</button>
           </div>
           </div>
           </div>
    </div>
    </div>
  )
}

export default Payment
