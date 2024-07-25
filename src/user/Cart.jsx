import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { updateCart } from '../Redux/Cartslice';
import Getproduct from '../Redux/Getproduct';
import { remove } from '../Redux/Cartslice';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { addWatch } from '../Redux/Watchlistslice';
import axios  from 'axios';
import './User.css'
const Cart = () => {
  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
  const cartItem = useSelector((state)=>state.cart);
  // const {items} = useSelector((state)=>state.data);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])
  const quintity = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
  ]

  // const newPrice = [];
  const [check,setcheck] = useState();
  const [cartShow,setcartShow] = useState(false);
  const [cval,setcval] = useState([])
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [newPrice,setnewPrice] = useState([]);
  // const [csize,setcsize] = useState([]);
  const [show,setshow] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleOpenS = () => setOpens(true);
  const handleClose = () => setOpen(false);
  const handleCloses = () => setOpens(false);
  const [sizedata,setsizedata] = useState([]);
  const [watch,setwatch] = useState([]);
  useEffect(()=>{
   if (cartItem.length!==0) {
    setcartShow(true)
   }
  },[])

 

  const handelSize = (id,key,quantity,csize,sprice,price) => {
    const check = cartItem.find((item)=>item.id===id&&item.size===key);
    if(!check){
      console.log(newPrice)
      dispatch(updateCart({id:id,newSize:key,newQny:quantity,csize:csize,sprice:newPrice.sprice,price:newPrice.price}))
    }
    else if(check){
      toast.warn('Product size in already in cart', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
   
  }

const handelNewprice = async(id,size) => {
  try {
    const check = await cartItem.find((item)=>item.id===id&&item.size===size);
    
    if (show&&check) {
      setnewPrice({id:check.id,size:check.size,sprice:check.sprice,price:check.price});
      setshow(false)
     }
     if(check.id!==newPrice.id&&newPrice.sprice!==isNaN){
      setnewPrice({id:check.id,size:check.size,sprice:check.sprice,price:check.price});
        if (check.id===newPrice.id&&check.sprice>newPrice.sprice) {
          setshow(false);
        }
     }
  } catch (error) {
    console.log(error)
  }
  
}


 const handelQny = (id,size,quantity,csize,sprice,price) => {
 dispatch(updateCart({id:id,newSize:size,newQny:quantity,csize:csize,sprice:newPrice.sprice,price:newPrice.price}))
 }

 const handelRemove = (id,size) => {
  dispatch(remove({id:id,size:size}))
 }
 

 const checkUser = async() => {
  try {
     const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
     const data = await res;
     setcheck(data.data)
   } catch (error) {
     console.log(error)
   }
}

useEffect(()=>{
  checkUser();
},[])

const handelProductid = async(ids) => {
  //  console.log(ids)
   const sizeData = cartItem.filter((items)=>items.id===ids);
  //  console.log(sizeData[0].sizes)
   setsizedata(sizeData)
}

const handelProducts = async (ids) => {
  const data = await cartItem.filter((items)=>items.id===ids)[0];
  const ndata = 
  {
   id:data.id,name:data.name,sprice:data.sprice,price:data.price,image:data.image,size:data.size,sizes:data.sizes,quantity:1,stock:data.stock,status:0
  }
  setwatch(ndata)
}

// useEffect(()=>{
//    handelProducts()
// },[cartItem])
 
  return cartShow ? (
    <>
      <div className='pt-[20vh] pb-[10vh]'>
      <ToastContainer/>
         <div className='grid cartGrid gap-10 px-[10vw]'>
             <div className='flex w-full flex-col gap-[5vh]'>
               {
                cartItem.map((item,cartindex)=>
                <>
                <div className='card px-8 pt-4 border-2 border-gray-300 rounded-md'>
                  <div className='w-full flex gap-[15vw] items-center justify-around'>
                  <div className='w-[20vw]'>
                    <span hidden>{item.id}</span>
                    <span>{item.name.slice(0, 25)+'...'}</span>
                    <div>
                    <span className='text-xl font-medium'>₹{item.sprice}</span>
                    <span className='text-lg font-medium line-through text-[#9B9B9B] mx-2'>₹{item.price}</span>
                    </div>
                    <div>
                      <span className='text-md text-green-600'>You Saved ₹{(item.price-item.sprice).toFixed(0)}!</span>
                    </div> 
                    <div className='flex gap-[4vw]'>
                    <div className=' border border-[#1e1e1e68] w-fit px-1 my-4'>
                      <span className='flex items-center gap-1 cursor-pointer' onClick={()=>{handelNewprice(item.id,item.size);handelProductid(item.id);setcval({id:item.id,size:item.size,quantity:item.quantity,sprice:item.sprice,price:item.price});handleOpenS()}}>Size:
                        <span className=' font-medium'>{item.size}</span>
                        <span className='pt-1 font-normal'><FaAngleDown size={12}/></span>
                      </span>
                      <div>
                      <Modal
                      open={opens}
                      onClose={handleCloses}
                       >
                       <div className='flex items-center'>
                        <ul className='cartModal flex items-center justify-center gap-5 flex-col bg-white w-[10vw] py-[5vh]'>
                          <li className=' text-[#737373] mt-[-12px]' >Select Size</li>
                        {sizedata.length!==0&&
                          Object.entries(sizedata[0].sizes).map(([key,value])=>
                          <>
                            
                             {
                              value>0?<li className={ cval.size === key && value>0 ? 'text-[#4ac1f0] font-semibold':'font-semibold'} onClick={()=>{handelSize(cval.id,key,cval.quantity,cval.size,cval.sprice,cval.price);handleCloses();}}>{value>0?key:null}</li>:null
                             }
                          </>
                          )
                        }
                        </ul>
                       </div>
                       </Modal>
                      </div>
                    </div>
                    <div className=' border border-[#1e1e1e68] w-fit px-1 my-4'>
                      <span className='flex items-center gap-1 cursor-pointer' onClick={()=>{handelNewprice(item.id,item.size);handelProductid(item.id);setcval({id:item.id,size:item.size,quantity:item.quantity,csize:item.size,sprice:item.sprice,price:item.price});handleOpen()}}>Qty:
                        <span className=' font-medium'>{item.quantity}</span>
                        <span className='pt-1 font-normal'><FaAngleDown size={12}/></span>
                      </span>
                      <div>
                      <Modal
                      open={open}
                      onClose={handleClose}
                       >
                       <div className='flex items-center'>
                        <ul className='cartModal flex items-center justify-center gap-5 flex-col bg-white w-[10vw] py-[5vh]'>
                          <li className=' text-[#737373] mt-[-12px]'>Select Quantity</li>
                        {
                          sizedata.length!==0&&
                          Object.entries(sizedata[0].sizes).map(([key,value]) =>
                          <>
                             {
                              value>0&&sizedata[0].size===key?quintity.map((keys) =>
                          <>
                             {
                              keys.id<=value?<li className={cval.quantity === keys.id ? 'text-[#4ac1f0] font-semibold':'font-semibold'} onClick={()=>{handelQny(cval.id,cval.size,keys.id,cval.csize,cval.sprice,cval.price);handleClose()}}>{keys.id<=value?keys.id:null}</li>:null
                             }
                          </>
                          ) : null
                             }
                          </>
                          )
                        }
                        </ul>
                       </div>
                       </Modal>
                      </div>
                    </div>
                    </div>
                   </div>
                    <div className='relative w-[160px] h-[160px] mx-4 overflow-hidden rounded-md'>
                      <img src={item.image[0]} alt="logo" onLoad={()=>handelProducts(item.id)} />
                    </div>
                  </div>
                  <hr className='h-[2px] bg-gray-200 mt-4'/>
                  <div className='flex justify-center items-center h-[50px]'>
                      <div onClick={()=>{setcval({id:item.id+item.size})}} className='flex items-center justify-center border-r-2 border-gray-200 w-full h-full'>
                        <button onClick={handelRemove(cval.id)}>Remove</button>
                      </div>
                      <div onClick={()=>{setcval({id:item.id+item.size})}} className='flex items-center justify-center w-full h-full'>
                        {watch.length!==0?<button onClick={()=>{dispatch(addWatch(watch));handelRemove(cval.id)}}>Move to Wishlist</button>:null}
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
                   {
                    check ?
                     <NavLink to={'/checkout?step=2'}>
                     <span className='flex items-center justify-center rounded-sm bg-[#42A2A2] w-[10vw] h-[5vh] text-center text-white font-bold'>PLACE ORDER</span> 
                     </NavLink>
                     :
                     <NavLink to={'/login'}>
                    <span className='flex items-center justify-center rounded-sm bg-[#42A2A2] w-[10vw] h-[5vh] text-center text-white font-bold'>PLACE ORDER</span>
                    </NavLink>
                   }
                    
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
    </>
  ) : (
    <>
    <div className='relative pt-[20vh]'>
     <div className='flex items-center justify-center'>
      <span className='text-lg font-semibold'>Your Cart is Empty</span>
     </div>
     <div className='flex items-center justify-center'>
      <button>
        <NavLink to={'/'}>
        <span>Continue Shophing</span>
        </NavLink>
      </button>
     </div>
     </div>
    </>
   )
} 
export default Cart