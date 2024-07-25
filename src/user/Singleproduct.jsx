import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './Singleproduct.css';
import { IoIosHeartEmpty } from "react-icons/io";
import {AiFillStar,AiFillThunderbolt} from 'react-icons/ai';
import {HiShoppingCart} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Getproduct from '../Redux/Getproduct';
import { addCart } from '../Redux/Cartslice';
import { addWatch,remove} from '../Redux/Watchlistslice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaStar,FaHeart } from "react-icons/fa";
import ImageMagnifier from './ImageMagnifier';


const Singleproduct = () => {
  const url ='http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
 const {items, loading, error} = useSelector((state)=>state.data);
 const disapatch = useDispatch();

 const cartItem = useSelector((state)=>state.cart);

 const watchList = useSelector((state)=>state.watchlist);
 
 useEffect(()=>{disapatch(Getproduct())},[disapatch])

const {id} = useParams();

const sizes = [
    {id:1,name:'S'},
    {id:2,name:'M'},
    {id:3,name:'L'},
    {id:4,name:'XL'},
  ]
const [show,setshow] = useState(false);
const [data,setdata] = useState([]);
const [review,setreview] = useState([]);
const [user,setuser] = useState([]);
const [wshow,setwshow] = useState(false);

const filterdata = async() => {
  try {
  const getData = await items.filter(e=>e._id===id);
  setdata(getData[0]);
  } catch (error) {
    console.log(error)
  }
}

// console.log(data)

useEffect(()=>{
    filterdata();
},[items])


const {
    _id,
    product_name,
    product_price,
    discription,
    category,
    product_stock,
    product_sprice,
    size,
    image,
    stock,
    status
  } = {...data}

const [c_size,setc_size] = useState(sizes[0]);
const [p_size,setp_size] = useState('');
const getSize = async() => {
    setc_size(size)
}

useEffect(()=>{
  getSize()
},[data])

const ndata = 
  {
   id:_id,name:product_name,sprice:product_sprice,price:product_price,image:image,size:p_size,sizes:size,quantity:1,stock:stock,status:0
  }


const handelCart = () => {
  if (p_size) {
    disapatch(addCart(ndata));
  }
  else{
    toast.warn('Please select size', {
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
  if(cartItem.length!==0){
    const findSize = cartItem.filter((item)=>item.id===_id);
    const newSize = [];
    for (let index = 0; index < findSize.length; index++) {
        newSize.push(findSize[index].size);
    }
    if (newSize.includes(p_size)) {
      setshow(true);
      console.log(newSize)
    }
    else{
      setshow(false);
    }
  }
},[p_size,cartItem])


useEffect(()=>{
 
    if(watchList.length!==0){
      const watchid = watchList.filter((item)=>item.id===_id);
      console.log(watchid)
      if (watchid.length!==0) {
        setwshow(true)
      }
      else{
        setwshow(false)
      }
    }
    else{
      setwshow(false)
    }
  

},[items,watchList])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows:false,
    slidesToScroll: 1,
    
  };


  const getReview = async() => {
    try {
      const res = await axios.get(`${url}/getreview`,{
        params:{
          data:`${id}`
        }
      });
      console.log(res.data)
      setreview(res.data)
    } catch (error) {
      
    }
  }

 const oneStar = review.filter((items)=>items.rating===1).length
 const twoStar = review.filter((items)=>items.rating===2).length
 const threeStar = review.filter((items)=>items.rating===3).length
 const fourStar = review.filter((items)=>items.rating===4).length
 const fiveStar = review.filter((items)=>items.rating===5).length

  var oneTotal = oneStar * 1;
  var twoTotal = twoStar * 2;
  var threeTotal = threeStar *3
  var fourTotal = fourStar * 4;
  var fiveTotal = fiveStar * 5;

  var totalClicks = (oneStar + twoStar + threeStar + fourStar + fiveStar);
  var totalStars = (oneTotal + twoTotal + threeTotal + fourTotal + fiveTotal);
  var avgStars = (totalStars/totalClicks);
  
  avgStars = avgStars.toPrecision(2);
  
  
  // if(avgStars.toString().split(".")[1]==0)
  //   avgStars = Number(avgStars).toPrecision(1);

  const getUser = async() => {
    try {
      const res = await axios.get(`${url}/getuser`)
      setuser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
   getReview();
   getUser();
  },[data])
 
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <>
    <div className='lg:grid lg:grid-cols-2 gap-3 py-[10vh] px-[5vw]'>
      <div className='relative'>
      <ToastContainer/>
      <div className="sticky inset-[14vh] my-9">
      <Slider {...settings}
      customPaging={(i) => {
      return <div>
        <img src={image[i]} alt="" className='carsule object-cover' />
      </div>;
         }}
      dotsClass="slick-dots custom-indicator"
      className="slides"
      >
      {
        image ?
        image.map((curnt, index) => {
          return (
            <>
         
              <div className='relative h-[100%] w-[80%] my-0 mx-auto pl-5' >
              {/* <img key={index} src={curnt} alt="" className='max-h-full absolute inset-0 m-auto max-w-full' /> */}
              <ImageMagnifier
                className={'cursor-none'}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={2.5}
                      src={curnt}
              />

              </div>
              
           </>
          )
          
        }) : null
      }
     </Slider>
     </div>
    
     </div>

     <div className='flex flex-col my-8 mx-2 pr-[10vw]'>
        <div className='mb-2'>
          <span className='text-xl font-semibold'>{category}</span>
          </div>
         <div className='relative mb-2'>
          <span className='text-md'>{product_name}</span>
          </div>

          {/* <div className='flex items-center my-3'>
          <span className='text-sm bg-green-700 rounded-sm mr-1 pl-1 text-white text-center flex items-center'>{rating}<AiFillStar size={12} className='inline text-center mx-1'/></span>
          <span className='text-md text-gray-500'>Rating</span>
          </div> */}
          <div className='flex my-2 items-center text-sm w-10 h-5 gap-1 rounded-sm justify-center font-bold bg-green-600 text-white'>
               <span>{avgStars}</span>
               <FaStar size={10}/>
               </div>
          <div className='flex items-center'>
          <span className='text-3xl font-medium'>₹{product_sprice}</span>
          <span className='text-lg font-medium line-through text-[#9B9B9B] mx-2'>₹{product_price}</span>
          <span className='text-md text-green-600 mx-2 font-bold'>{100-((product_sprice/product_price)*100).toFixed(0)}% OFF</span>
          </div>
          <div className='mt-2'>
          <span className='text-md'>Stocks available {product_stock}</span>
          </div>
          <div className='my-5 font-medium'>
          <h1 className='mb-2' >SELECT SIZE</h1>
          <div className='flex h-[40px] w-[250px] font-semibold '>
            {
             c_size?Object.entries(c_size).map(([key,value])=>
             <>
             <button className={p_size === key && value>0  ? 'btn_color w-full btn_active mr-2' :value<=0? 'btn_color bg-cross bg-contain cursor-not-allowed bg-center bg-no-repeat w-full  mr-2' :'btn_color w-full mr-2'} onClick={()=>{setp_size(value>0?key:null)}}>{key}</button>
             </>
             ):null
            }
          </div>
          </div>

    <div className='w-[120%] mt-2 cart_bg h-[50px]'>
     <div className='flex items-center gap-4 w-full h-full'>
     {
      show ? 
      <NavLink to={'/cart'}  className='text-white bg-orange-500 font-semibold  w-[40%] h-[50px] flex items-center justify-center'>
      <button  className='text-white gap-2 flex items-center justify-center'><HiShoppingCart size={20} />GO TO CART</button>
      </NavLink> :
      <button  className='text-white bg-yellow-500 gap-2 w-[40%] h-[50px] font-semibold flex items-center justify-center' onClick={handelCart} ><HiShoppingCart size={20} />ADD TO CART</button>
     }
      
    {
      wshow ? <button  className=' flex items-center gap-2 justify-center border border-black h-full w-[40%]' onClick={()=>disapatch(remove(id))}>WATCHLISTED<FaHeart size={20}  color='red'/></button>
      :
      <button  className=' flex items-center gap-2 justify-center border border-black h-full w-[40%]' onClick={()=>{disapatch(addWatch(ndata))}}><IoIosHeartEmpty size={20}/>WATCHLIST</button>
    }
    
     </div>
     </div>

     <div className='flex gap-16 justify-center items-center my-10'>
        <div className='flex flex-col justify-center items-center'>
        <div className='h-[72px] w-[72px]'>
        <img src="https://images.bewakoof.com/web/high-ventilation-1686726264.jpg" alt="logo" />
        </div>
        <span className='text-sm'>High Ventilation</span>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <div className='h-[72px] w-[72px] self-center'>
        <img src="https://images.bewakoof.com/web/Featherlight-1686726280.jpg" alt="logo" />
        </div>
        <span>Featherlight</span>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <div className='h-[72px] w-[72px] self-center'>
        <img src="https://images.bewakoof.com/web/Multi-seasonal-1686726312.jpg" alt="logo" />
        </div>
        <span>Multi Seasonal</span>
        </div>
     </div>

          <div className='my-2'>
          <h1 className='text-xl font-semibold'>Product Description</h1>
          <span className='text-md'>{discription}</span>
          </div>

        <div className='mt-6'>
          <h1 className='text-xl font-semibold'>Product Review</h1>
          <div className='flex justify-around items-center gap-4 my-4'>
             <div className='text-center'>
                <div className='flex items-center text-3xl font-bold gap-2'>
                <span>{avgStars}</span>
                <FaStar/>
                </div>
                <div className='text-sm text-neutral-500 font-semibold my-3'>
                  <span>{totalClicks} Ratings</span>
                </div>
             </div>
             <div className='text-sm font-bold'>
             <div className='flex w-[15rem] items-center gap-3'>
             <span className='mr-[-8px]'>5</span>
             <FaStar/>
              <div className="h-1 w-full bg-neutral-200">
               <div className="h-1 bg-green-500" style={{ width: `${(100*fiveStar)/totalClicks}%` }}></div>
               </div>
               <span>({fiveStar})</span>
             </div>
             <div className='flex w-[15rem] items-center gap-3'>
             <span className='mr-[-8px]'>4</span>
             <FaStar/>
              <div className="h-1 w-full bg-neutral-200">
               <div className="h-1 bg-green-500" style={{ width: `${(100*fourStar)/totalClicks}%` }}></div>
               </div>
               <span>({fourStar})</span>
             </div>
             <div className='flex w-[15rem] items-center gap-3'>
             <span className='mr-[-8px]'>3</span>
             <FaStar/>
              <div className="h-1 w-full bg-neutral-200">
               <div className="h-1 bg-green-500" style={{ width: `${(100*threeStar)/totalClicks}%` }}></div>
               </div>
               <span>({threeStar})</span>
             </div>
             <div className='flex w-[15rem] items-center gap-3'>
             <span className='mr-[-8px]'>2</span>
             <FaStar/>
              <div className="h-1 w-full bg-neutral-200">
               <div className="h-1 bg-orange-500" style={{ width: `${(100*twoStar)/totalClicks}%` }}></div>
               </div>
               <span>({twoStar})</span>
             </div>
             <div className='flex w-[15rem] items-center gap-3'>
             <span className='mr-[-8px]'>1</span>
             <FaStar/>
              <div className="h-1 w-full bg-neutral-200">
               <div className="h-1 bg-red-500" style={{ width: `${(100*oneStar)/totalClicks}%` }}></div>
               </div>
               <span>({oneStar})</span>
             </div>
          </div>
          </div>
          <div>
            {
              review.slice(0,4).map((item)=>
              <>
               <div className='my-8'>
               <div className='flex my-4 items-center text-sm w-10 h-5 p-1 gap-1 rounded-sm justify-center font-bold bg-green-600 text-white'>
               <span>{item.rating}</span>
               <FaStar size={10}/>
               </div>
                <span>{item.review}</span>
                <div className='text-sm font-semibold text-neutral-400 mt-4'>
               <span>{user.length!==0&&user.find(items=>items._id===item.user_id)?user.filter(items=>items._id===item.user_id)[0].name:null}</span>
                </div>
                <hr className='my-2'/>
               </div>
              
              </>
              )
            }
          </div>
          </div>
        </div>
     
      </div>

    </>
  )
}

export default Singleproduct