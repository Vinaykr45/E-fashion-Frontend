import React from 'react'
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Getproduct from '../Redux/Getproduct';
import { useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
const Review = () => {
  const url ='http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
 const {items, loading, error} = useSelector((state)=>state.data);
 const disapatch = useDispatch();
 useEffect(()=>{disapatch(Getproduct())},[disapatch]);
 
 const {id} = useParams();
 const [data,setdata] = useState([]);
 const [rating,setrating] = useState(null);
 const [hover,sethover] = useState(null);
 const [ndata,setndata] = useState({userid:"",productid:"",rating:"",review:""})

const filterdata = async() => {
  try {
  const getData = await items.filter(e=>e._id===id);
  setdata(getData[0]);
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
 filterdata();
},[items])

const [userData,setuserData] = useState({});
 const callProfile = async() => {
      try {
        const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
        const data = await res;
        setuserData(data.data);
        console.log(data.data);

      } catch (error) {
        console.log(error)
      }
 }

 useEffect(()=>{
  callProfile();
 },[])


const {product_name,image}={...data}

useEffect(()=>{
  try {
    if (userData) {
      const name = 'userid'
      setndata({...ndata,[name]:userData._id})
    }
  } catch (error) {
    console.log(error)
  }

},[userData])

useEffect(()=>{
  try {
    if(data){
      const name = 'productid'
      setndata({...ndata,[name]:data._id})
    }
  } catch (error) {
    console.log(error)
  }
},[data])

useEffect(()=>{
  try {
    if(rating){
      const name = 'rating'
      setndata({...ndata,[name]:rating})
    }
  } catch (error) {
    console.log(error)
  }
},[rating])

const handelPost = (e) => {
  const value = e.target.value;
  const name = e.target.name;
  setndata({...ndata,[name]:value})
  console.log(ndata)
  
}

const handelSubmit = async() => {
  if (ndata.rating!==" "&&ndata.review!==" ") {
    try {
      const res = await axios.post(`${url}/review`,{ndata});
      if (res.status===200) {
        toast.success('Review Submited Sucessfully')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error)
    }
  }
  else{
    toast.error("Please fill all the details")
  }
}

  return (
    <>
        <div className='pt-[10vh]'>
            <div>
            <Toaster/>
                <div className='flex items-center justify-between px-10 shadow-md py-4 m'>
                    <span className='text-xl font-bold'>Ratings & Reviews</span>
                  {data&&data.length!==0 ? <div className='flex items-center gap-4'> 
                    <span className='text-md font-medium'>{product_name.slice(0,30)}</span>
                    <div className='relative w-[90px] h-[90px] overflow-hidden rounded-md'>
                        <img src={image[0]} alt="thumbnail" />
                    </div>
                    </div>:null}
                </div>
               <div className='flex w-[100vw] h-[70vh]'>
                  <div className=' w-[25%] overflow-hidden px-8 my-4 h-[100%] shadow-lg'>
                    <div className='flex flex-col gap-4'>
                        <span className='text-xl font-semibold'>What makes a good review</span>
                        <hr />
                        <span className='text-md font-medium'>Have you used this product? </span>
                        <span> Your review should be about your experience with the product.</span>
                        <span className='text-md font-medium'>Why review a product?
                        </span>
                        <span>
                        Your valuable feedback will help fellow shoppers decide!</span>
                        <span className='text-md font-medium'>
                        How to review a product?
                        </span>
                        <span>
                        Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.
                        </span>
                    </div>
                  </div>
                  <div className=' w-[70%] h-full'>
                      <div className='mx-4 py-8 px-4 h-full'>
                          <span className='text-lg font-medium'>Rate this Product</span>
                         <div className='flex items-center gap-3 mb-6'>
                          <span className='flex gap-2 my-2'>{[...Array(5)].map((item,index)=>{
                            const currentRating = index + 1;
                            return(
                              <>
                              <label>
                                <input type="radio" className=' hidden' name='rating' value={currentRating} onClick={(e)=>setrating(currentRating)}/>
                                <FaStar className=' cursor-pointer'
                                 size={24} 
                                 color={currentRating<=(hover||rating)?'#ffc107':'#e4e5e9'}
                                 onMouseEnter={()=>sethover(currentRating)}
                                 onMouseLeave={()=>sethover(null)}
                                />
                               </label>
                              </>
                            )
                          })}</span>
                          <div>
                                <span className='text-md font-medium'>{rating===1?<><span className=' text-red-500'>Very Bad</span></>:rating===2?<><span className=' text-red-500'>Bad</span></>:rating===3?<><span className=' text-green-500'>Good</span></>:
                                rating===4?<><span className=' text-green-500'>Very Good</span></>:rating===5?<><span className=' text-green-500'>Exclent</span></>:null
                                }</span>
                          </div>
                        </div>
                        <hr />
                        <div className='h-[50%] mt-4'>
                          <span className='text-lg font-medium'>Review this product</span>
                          <div className='h-full my-6'>
                            <textarea onChange={handelPost} value={ndata.review} name="review" id="review" className='w-full h-[90%] p-2 border-gray-300' placeholder='Description...'></textarea>
                          </div>
                          <button className='text-white font-medium float-right bg-orange-500 w-[20%] h-[40px]' onClick={handelSubmit}>Submit</button>
                        </div>
                      </div>
                  </div>
               </div>
            </div>
        </div>
    </>
  )
}

export default Review
