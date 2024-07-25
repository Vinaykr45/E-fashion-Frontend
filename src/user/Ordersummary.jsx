import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch , useSelector } from 'react-redux';
import Getproduct from '../Redux/Getproduct';
import { NavLink } from "react-router-dom";
import './User.css'
const Ordersummary = (element) => {
  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
  const cartItem = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])
  const [userData,setuserData] = useState({});
  const [ammount,setammount] = useState();
  const callProfile = async() => {
    try {
      const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
      const data = res;
      setuserData(data.data.addres[element.data]);
    } catch (error) {
      console.log(error)
    }
}

useEffect(()=>{
callProfile();
setammount(cartItem.reduce((a,{sprice})=>a+sprice,0))
},[])



  return (
    <div>
        <div>
            <ul>
 
                    <li className='shadow-md p-4 mx-4 mb-4' >
                    <h1>{userData.firstname+' '+userData.lastname}</h1>
                    <h2>{userData.address+' '+userData.city+' '+userData.state}</h2>
                    <h2>{userData.pincode+' '+userData.phone}</h2>
                    </li>
  
            </ul>
        </div>

        <div className='grid cartGrid gap-10 px-[1vw]'>
             <div className='flex w-full flex-col gap-[2vh]'>
               {
                cartItem.map((item)=>
                <>
                <div className='card p-8'>
                  <div className='w-full flex gap-[15vw] items-center justify-around'>
                  <div className='w-[20vw]'>
                    <span hidden>{item.id}</span>
                    <span>{item.name.slice(0, 35)+'...'}</span>
                    <div>
                    <span className='text-xl font-medium'>₹{item.sprice}</span>
                    <span className='text-lg font-medium line-through text-[#9B9B9B] mx-2'>₹{item.price}</span>
                    </div>
                    <div>
                      <span className='text-md text-green-600'>You Saved ₹{(item.price-item.sprice).toFixed(0)}!</span>
                    </div> 
                    <div className='flex gap-[4vw]'>
                    <div className=' border border-[#1e1e1e68] w-fit px-1 my-4'>
                      <span className='flex items-center gap-1 cursor-pointer'>Size:
                        <span className=' font-medium'>{item.size}</span>
                        <span className='pt-1 font-normal'></span>
                      </span>
                      <div>
                      
                      </div>
                    </div>
                    <div className=' border border-[#1e1e1e68] w-fit px-1 my-4'>
                      <span className='flex items-center gap-1 cursor-pointer' >Qty:
                        <span className=' font-medium'>{item.quantity}</span>
                        <span className='pt-1 font-normal'></span>
                      </span>
                      <div>
                      
                      </div>
                    </div>
                    </div>
                   </div>
                    <div className='relative w-[160px] h-[160px] mx-4 overflow-hidden rounded-md'>
                      <img src={item.image[0]} alt="logo" />
                    </div>
                  </div>
                  
                    </div>
                </>
                )
               }
             </div>
             <div className='flex items-center gap-y-4 flex-col'>
             <div className='sticky inset-[14vh] card rounded-md p-5'>
             <div className='bg-[#EBEBEB] w-full mb-5'>
             <span className='text-md font-medium'>Product Summary</span>
             </div>
                <div className='grid gap-[5vw] grid-cols-2'>
                  <div className='flex gap-2 items-start flex-col'>
                     <span>Total MRP (Incl. of taxes)</span>
                     <span>Delivery Fee </span>
                     <span>Bag Discount </span>
                     <span>Subtotal </span>
                  </div>
                  <div className='flex gap-2 items-end flex-col'>
                  <span>₹{cartItem.reduce((a,{price})=>a+price,0)}</span>
                  <span className='text-green-500'>{cartItem.reduce((a,{sprice})=>a+sprice,0)>500 ? 'FREE' : '₹50'}</span>
                  <span>-₹{cartItem.reduce((a,{price})=>a+price,0)-cartItem.reduce((a,{sprice})=>a+sprice,0)}</span>
                  <span className='text-md font-medium'>₹{cartItem.reduce((a,{sprice})=>a+sprice,0)}</span>
                  </div>
                </div>
                <div className='flex items-end justify-end w-full h-[60px] my-[5vh] cursor-pointer'>
                   
                    
                    <NavLink to={`/checkout?step=4+${element.data}+${ammount}`}>
                     <span className='flex items-center justify-center rounded-sm bg-[#42A2A2] w-[10vw] h-[5vh] text-center text-white font-bold'>MAKE PAYMENT</span> 
                     </NavLink>
                     
                    
                  </div>
                   <div className='flex gap-5 justify-center items-center my-10 mb-[-1px]'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='h-[40px] w-[40px]'>
                    <img src="https://images.bewakoof.com/web/cart-badge-trust.svg" alt="logo" />
                    </div>
                    <span className='text-[10px] text-[#656464]'>100% SECURE PAYMENTS</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='h-[40px] w-[40px] self-center'>
                    <img src="https://images.bewakoof.com/web/cart-easy-return.svg" alt="logo" />
                    </div>
                    <span className='text-[10px] text-[#656464]'>EASY RETURNS & QUICK REFUNDS</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='h-[40px] w-[40px] self-center'>
                    <img src="https://images.bewakoof.com/web/quality-check.svg" alt="logo" />
                    </div>
                    <span className='text-[10px] text-[#656464]'>QUALITY ASSURANCE</span>
                    </div>
                 </div>

                </div>
             </div>
         </div>

    </div>
  )
}

export default Ordersummary
