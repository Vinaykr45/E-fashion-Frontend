import React, { useState , useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from 'react-icons/fa6';
import { useDispatch,useSelector } from 'react-redux';
import { addWatch } from '../Redux/Watchlistslice';
import './User.css'
const Productpage = (elements) => {

  const watchList = useSelector((state)=>state.watchlist)
  const dispatch = useDispatch();

  const [show,setshow] = useState(false);
  const [pshow,setpshow] = useState(false);

  const {_id,product_name,product_sprice,product_price,image,category,size,stock,status}=elements;
  const ndata = 
  {
   id:_id,name:product_name,sprice:product_sprice,price:product_price,image:image,size:'',sizes:size,quantity:1,stock:stock,status:0
  }
 

  useEffect(()=>{
 
    if(watchList.length!==0){
      const watchid = watchList.filter((item)=>item.id===_id);
      console.log(watchid)
      if (watchid.length!==0) {
        setshow(true)
      }
      else{
        setshow(false)
      }
    }
    else{
      setshow(false)
    }
  

},[elements,watchList])

  return (
    <>
        <NavLink to={`/singleproduct/${_id}`}>
        <div className='card relative border-1 0px 5px 15px] pb-4 rounded-sm overflow-hidden'>
            <div className='relative h-[320px] w-[255px]  my-0 mx-auto overflow-hidden' onMouseEnter={()=>setpshow(true)} onMouseLeave={()=>setpshow(false)} >
                <img className='max-h-full absolute inset-0 m-auto max-w-full h-full  w-full transition ease-in-out delay-150 hover:scale-105' src={pshow?image[1]:image[0]} alt={product_name} />
            </div>
            <div className='flex items-center justify-between px-4 my-auto'>
              <span className='text-[14px] text-[#4F5362] font-semibold'>{category}</span>
              <span className='text-[#4F5362] z-5 mt-3' onClick={(e)=>{!show&&dispatch(addWatch(ndata));e.preventDefault();e.stopPropagation()}}>{!show?<IoIosHeartEmpty size={20}/>:<FaHeart size={20} color='red'/>}</span>
            </div>
            <div className='flex items-center justify-start px-4 my-auto'>
              <span className='text-[12px]'>{product_name.slice(0, 35)+'...'}</span>
            </div>
            <div className='flex items-center px-4 gap-3 justify-start'>
            <span className='text-lg font-semibold'>₹{product_sprice}</span>
            <span className='text-[#A4A4A4] line-through'>₹{product_price}</span>
            <span className='text-[#0BBB59] '>{100-((product_sprice/product_price)*100).toFixed(0)+'% OFF'}</span>
            </div>
        </div>    
        </NavLink>
        
 </>
  )
}

export default Productpage