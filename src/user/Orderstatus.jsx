import React from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Getproduct from '../Redux/Getproduct';
import { useState,useEffect } from "react";
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './User.css'
const Orderstatus = () => {
  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])
  const steps = ['Order Placed','Order Confirmed', 'Shipped', 'Out for delivery','Delivered'];
  const [userData,setuserData] = useState({});
  const [orderData,setorderData] = useState([]);
  const [orderStatus,setorderStatus] = useState('');
  const callProfile = async() => {
    try {
      const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
      const data = await res;
      setuserData(data.data);
      // console.log(data.data);

    } catch (error) {
      console.log(error)
    }
}

  const getOrderdata = async () => {
    try {
    const data = await userData._id;
    const res = await axios.get(`${url}/getorder`,{
      params: {
        data:`${data}`
      }
    })
    setorderData(res.data.reverse());
    console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  
useEffect(()=>{
 callProfile();
},[])

useEffect(()=>{
 getOrderdata()
},[userData])

// useEffect(()=>{
//   orderData.map( (items)=>{
//     if (items.status===1) {
//       setorderStatus('Order Placed')
//     }
//    })
// },[orderData])

  return (
    <>
      <div className='py-[15vh]'>
        <div className='h-[90vh]'>
          {
            orderData.length!==0 ?
            <>
           { orderData.map(item=>item.order.map(items=>{
            return(
                <>
                <NavLink to={`/ordertrack/${item._id}/${items.id}`}>
                <div className='my-4 mx-[10vw] h-[18%]'>
                  <div className='card h-full flex items-center justify-around gap-4'>
                   <div className='relative w-[100px] h-[100px] mx-4  overflow-hidden rounded-md'>
                    <img src={items.image[0]} alt="thumnail" />
                   </div>
                   <div>
                    <span>{items.name.slice(0,35)}</span>
                   </div>
                   <div className='ml-[5vw] '>
                    <span className=' text-lg'>₹{items.sprice}</span>
                   </div>
                   <div className='ml-[5vw]'>
                    <span className=' border-2 h-[10px] inline-block mx-2 w-[10px] rounded-[50%] border-green-500 bg-green-500'></span>
                    <span className=' text-lg'>{items.status===0?steps[0]:items.status===1?steps[1]:items.status===2?steps[2]:
                      items.status===3?steps[3]:items.status===4?steps[4]:null}</span>
                   {
                    items.status===4 ? <div className='my-2'>
                   <NavLink to={`/review/${items.id}`} className='flex items-center gap-2'>
                   <FaStar size={20} color='blue'/>
                   <span className=' text-blue-700 font-semibold'> Rate & Review Product</span>
                   </NavLink>
                   </div>  : null
                   }               
                   </div>
                   
                  </div>
                </div>
               </NavLink>
                </>
              )
           }))
           } 
           </> : <>
           <div className='flex items-center justify-center text-lg font-medium'>
             <span>You do not have any orders</span>
           </div>
           </>
          }
        
        </div>
      </div>
    </>
  )
}

export default Orderstatus
