import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import './User.css';
import { addCart,updateCart } from '../Redux/Cartslice';
import { remove } from '../Redux/Watchlistslice';
import { RxCross2 } from "react-icons/rx";
import { Modal } from '@mui/material';
import Getproduct from '../Redux/Getproduct';
import './Singleproduct.css';
import { ToastContainer, toast } from 'react-toastify';
const Watchlist = () => {
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(Getproduct())},[dispatch])
    const watchList = useSelector((state)=>state.watchlist);
    const cartItem = useSelector((state)=>state.cart);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloses = () => setOpen(false);
    const [data,setdata] = useState([]);
    const [ids,setids] = useState('');
    const [p_size,setp_size] = useState('');

    const handelSize = (id) => {
      setids(id);
      const name='size';
      watchList.map((item)=>{
        if (item.id===ids) {
          setdata({...item,[name]:p_size})
        }
      })
    }
  
    const handelWatch = (e,id) => {
      const nid = id;
      const check = cartItem.find((item)=>item.id===nid&&item.size===p_size)
      if (!check) {
        dispatch(addCart(data));
        dispatch(remove(nid));
        e.preventDefault();
        e.stopPropagation()
      }
      if (check) {
        toast.warn('Product is already in cart', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    }
 
  useEffect(()=>{
    handelSize();
  },[p_size,data])

  return watchList.length!==0 ? (
    <>
    <div className='pt-[15vh]'>
    <div className='flex wfull gap-4 pl-[3vw] pr-[4vw] mb-[4vh] flex-wrap'>
    <ToastContainer/>
            {
    watchList.map((items)=>
            <>
            <NavLink to={`/singleproduct/${items.id}`}>
             <div className='card relative border-1 0px 5px 15px] pb-4 rounded-sm overflow-hidden'>
            <div className=' absolute top-0 right-0 z-10 p-2' onClick={(e)=>{dispatch(remove(items.id));e.preventDefault();e.stopPropagation()}}>
            <RxCross2/>
            </div>
            <div className='relative h-[320px] w-[255px]  my-0 mx-auto overflow-hidden' >
                <img className='max-h-full absolute inset-0 m-auto max-w-full h-full  w-full transition ease-in-out delay-150 hover:scale-105' src={items.image[0]} alt={items.name} />
            </div>
            <div className='flex items-center justify-between px-4 my-auto'>
              {/* <span className='text-[14px] text-[#4F5362] font-semibold'>{category}</span> */}
              {/* <span className='text-[#4F5362] z-5 mt-3'><IoIosHeartEmpty size={20}/></span> */}
            </div>
            <div className='flex items-center justify-start px-4 my-auto'>
              <span className='text-[12px]'>{items.name.slice(0, 35)+'...'}</span>
            </div>
            <div className='flex items-center px-4 gap-3 justify-start'>
            <span className='text-lg font-semibold'>₹{items.sprice}</span>
            <span className='text-[#A4A4A4] line-through'>₹{items.price}</span>
            <span className='text-[#0BBB59] '>{100-((items.sprice/items.price)*100).toFixed(0)+'% OFF'}</span>
            </div>
            <hr className='my-2'/>
            <div className='flex justify-center items-center h-5 ' onClick={(e)=>{handleOpen();e.preventDefault();e.stopPropagation()}}>
              <span className='text-md font-semibold text-blue-500'>ADD TO CART</span>
            </div>
        </div>    
        </NavLink>

        <div>
                      <Modal
                      open={open}
                      onClose={handleCloses}
                       >
                       <div className='cartModal flex items-center flex-col bg-white p-6'>
                        <ul className=' flex items-center justify-center gap-5  w-[20vw] py-[4vh] font-semibold text-center overflow-hidden'>
                          {/* <li className=' text-[#737373] mt-[-12px]'></li> */}
                        {
                          Object.entries(items.sizes).map(([key,value])=>
                          <>
                             <li className={ value>0 && p_size === key ? 'btn_color flex items-center justify-center w-full h-10 btn_active mx-2' :value<=0? 'btn_color flex items-center justify-center bg-cross bg-contain cursor-not-allowed bg-center bg-no-repeat h-10 w-full mx-2' :'btn_color flex items-center justify-center w-full h-10 mx-2'} onClick={()=>{setp_size(value>0?key:null);handelSize(items.id)}}>{key}</li>
                          </>
                          )
                        }
                        </ul>
                        <div className='w-full text-center'>
                          <button className={p_size?'w-[50%] bg-orange-500 h-10 text-white font-semibold':'w-[50%] bg-slate-300 h-10 text-white font-semibold'} onClick={p_size?(e)=>handelWatch(e,items.id):null}>Done</button>
                        </div>
                       </div>
                       </Modal>
                      </div>
                </>
                )
            }
        </div>
       
        </div>
    </>
  ):(
    <>
      <div className='pt-[10vh] flex items-center justify-center p-10'>
      <span className='text-center my-11'>
      <h1>The Watchlist is Empty</h1>
      </span>
      </div>
    </>
  )
}

export default Watchlist
