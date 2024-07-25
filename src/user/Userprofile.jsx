import React, { useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import Getproduct from '../Redux/Getproduct';
import axios from 'axios';
import male from '../image/male.png';
import female from '../image/woman.png';
import Logout from './Logout';
import { FaUser , FaAngleRight} from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
const Userprofile = () => {
 const url ='http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
 const dispatch = useDispatch();
 useEffect(()=>{dispatch(Getproduct())},[dispatch])
 const [userData,setuserData] = useState({});
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


useEffect(()=>{
 callProfile();
},[])

  return (
    <>
      <div className='pt-[14vh] w-[100vw] h-[100vh] bg-[#f0f0f0]'>
      <div className='flex p-8'>
        <div className='w-[25%] flex flex-col text-lg font-semibold bg-white mx-5 shadow-lg rounded-md'>
         <div className='flex items-center mx-8 mt-5'>
         <FaUser className=' text-blue-500'/>
         <button className='mx-4' >Profile</button>
         </div>
        {
          userData.isUser==='admin' ? 
         <NavLink to={'/admin/dashboard'}>
         <div className='flex items-center mx-8 mt-5 w-full'>
         <BsFillBoxFill size={20} className=' text-blue-500'/>
         <button className='mx-4' >DASHBOARD</button>
         <div className=' w-[40%]'>
         <FaAngleRight className='float-right' />
         </div>
         </div>
         </NavLink>
          :
         <NavLink to={'/orderstatus'}>
         <div className='flex items-center mx-8 mt-5 w-full'>
         <BsFillBoxFill size={20} className=' text-blue-500'/>
         <button className='mx-4' >MY ORDERS</button>
         <div className=' w-[40%]'>
         <FaAngleRight className='float-right' />
         </div>
         </div>
         </NavLink>

        }
        </div> 
        <div className='flex flex-col w-[75%] gap-4 px-[10vw] p-8 bg-white'>
        <div className='flex justify-center w-full mb-8'>
        <img src={userData.gender === 'male' ? male:female} alt="image" className='w-[125px]' />
        </div>
        <div className='flex items-center justify-between'>
         <h1>Name</h1>
         <h1>{userData.name}</h1>
        </div>
        <div className='flex items-center justify-between'>
         <h1>Gender</h1>
         <h1>{userData.gender}</h1>
        </div>
        <div className='flex items-center justify-between'>
         <h1>Email</h1>
         <h1>{userData.email}</h1>
        </div>
        <div className='my-10'>
        <Logout/>
        </div>
        </div> 
      </div>
      </div>
    </>
  )
}

export default Userprofile