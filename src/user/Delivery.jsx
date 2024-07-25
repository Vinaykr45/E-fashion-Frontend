import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import './Delivery.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


const Delivery = () => {

  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';

  const[data,setdata] = useState({
   id:'',firstname:'',lastname:'',address:'',city:'',state:'',pincode:'',phone:''
  })
  const [userData,setuserData] = useState({});
  const [select,setselect] = useState();


  const updateid = async() => {
    try {
      const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
      setdata({['id']:res.data._id})
    } catch (error) {
      console.log(error)
    }
  }

  const handeldata = async (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setdata({...data,[name]:value});
  } 
  console.log(data)

  useEffect(()=>{
    updateid();
  },[])


  
  const callProfile = async() => {
      try {
        const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
        const data = res;
        setuserData(data.data);
        // console.log(data.data);

      } catch (error) {
        console.log(error)
      }
 }

useEffect(()=>{
  callProfile();
},[])

 const habdelSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post(`${url}/addaddress`,{data},{ withCredentials: true })
    if(res.status===201){
     toast.success("Address add Sucessfully");
     setTimeout(() => {
      window.location.reload();
     }, 1000);
    }
  } catch (error) {
    console.log(error)
  }
 }

 const handellist = (items,index) => {
     setselect(index)
 }

  return (
    <div>
      <div className='delivery mt-10'>
        <div>
        <Toaster/>
            <ul>
              {
                userData.addres?userData.addres.map((items,index) =>
                  <>
                    <li className={select===index?' bg-[#1976d241] shadow-md p-4 mx-4 mb-4':'shadow-md p-4 mx-4 mb-4'} onClick={()=>handellist(items,index)}>
                    <h1>{items.firstname+' '+items.lastname}</h1>
                    <h2>{items.address+' '+items.city+' '+items.state}</h2>
                    <h2>{items.pincode+' '+items.phone}</h2>
                    </li>
                  </>
                ):null
              }
            </ul>
        </div>
        <div>
        <form className='flex gap-4 flex-col shadow-md p-10' onSubmit={habdelSubmit}>
        <div className='flex gap-8'>
          <div className='w-[50%]'>
          <TextField
            id="firstname"
            label="First Name"
            variant='outlined'
            name='firstname'
            value={data.firstname}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          <div className='w-[50%]'>
          <TextField
            id="lastname"
            label="Last Name"
            variant='outlined'
            name='lastname'
            value={data.lastname}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          </div>
          <div className='flex gap-8'>
          <div className='w-[100%]'>
          <TextField
            id="address"
            label="Address"
            variant='outlined'
            name='address'
            value={data.address}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          </div>
          <div className='flex gap-8'>
          <div className='w-[50%]'>
          <TextField
            id="city"
            label="City"
            variant='outlined'
            name='city'
            value={data.city}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          <div className='w-[50%]'>
          <TextField
            id="state"
            label="State"
            variant='outlined'
            name='state'
            value={data.state}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          </div>
          <div className='flex gap-8'>
          <div className='w-[50%]'>
          <TextField
            id="pincode"
            label="Pin Code"
            variant='outlined'
            type='number'
            value={data.pincode}
            name='pincode'
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          <div className='w-[50%]'>
          <TextField
            id="phone"
            label="Phone Number"
            variant='outlined'
            type='number'
            name='phone'
            value={data.phone}
            fullWidth
            onChange={handeldata}
            required
          />
          </div>
          </div>
          <div className='w-[20%] mt-4'>
          {
            select>=0 ? <NavLink to={`/checkout?step=3+${select}`}><button className=' text-white bg-blue-900 p-4 '>DELIVERD HERE</button></NavLink> :
            <button className=' text-white bg-blue-900 p-4 ' type='submit'>ADD ADDRESS</button>
          }
        </div>
        </form>
        </div>
        
      </div>
    </div>
  )
}

export default Delivery
