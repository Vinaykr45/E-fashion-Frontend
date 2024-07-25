import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { useEffect } from 'react';
import OTPInput, { ResendOTP } from "otp-input-react";
import Getproduct from '../Redux/Getproduct';
import imageLogin from '../image/login.jpg';
import './User.css';
import { FaUser,FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';
const Login = () => {
  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
  // const {items} = useSelector((state)=>state.data);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])

  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [show,setshow] = useState(false);
  const [sotp,setsotp] = useState(false);
  const [email,setemailid] = useState('');
  const [name,setname] = useState('');
  const [radio,setradio] = useState('');
  const [OTP, setOTP] = useState("");
  const [bshow,setbshow] = useState(false);
  const [data,setdata] = useState({
    name:'',gender:'',email:'',password:'',isUser:'customer'
  });
 const [login,setlogin] = useState({
  useremail:'',userpassword:''
 });

 const handelRadio = (radioValue) => {
  setSelectedRadio(selectedRadio === radioValue ? null : radioValue);
  let name='gender';
  let value=radioValue;
  setdata({...data,[name]:value})
 }
// console.log(radio)
const handelGender = (e) => {
  // console.log(e)
  let name=e.target.name;
  let value=e.target.value;
  setdata({...data,[name]:value})
}

 const handelForm = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setdata({...data,[name]:value})
 }
 
 const handelSubmit = async() => {
   const otpcheck = Cookie.get('otp');
   console.log(otpcheck)
   if(otpcheck===OTP){
    try {
      await axios.post(`${url}/adduser`,{data})
      .then((response)=>{
       if (response.status===201) {
         toast.success('User added successfully', {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           });
          setTimeout(() => {
           setdata({name:'',gender:'',email:'',password:''})
           setshow(false);
           setsotp(false);
          }, 3000);
       }
      })
    } catch (error) {
     if (error.response.status===401) {
       toast.warn(error.response.data, {
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
   }
 }

 const handelLogin = (e) => {
 const name = e.target.name;
 const value = e.target.value;
  setlogin({...login,[name]:value})
 }

const handelSubmitlogin = async(e) => {
  e.preventDefault();
  if(Object.values(login).length!==0){
    setbshow(true);
  }
  try {
    await axios.post(`${url}/login`,{login}, { withCredentials: true })
    .then((response)=>{
      console.log(response)
     if (response.status===201) {
       toast.success(response.data, {
         position: "top-center",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         });
        setTimeout(() => {
         setdata({name:'',gender:'',email:'',password:''})
         setshow(false);
         navigate('/');
        }, 2500);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
     }
    })
  } catch (error) {
    setbshow(false)
   if (error.response.status===401) {
     toast.warn(error.response.data, {
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
}

const sendotp = async(e) => {
  const emailid = e.target[3].value;
  const name = e.target[0].value;
  const data = 'registration';
  setemailid(emailid);
  setname(name);
 try {
  const res = await axios.post(`${url}/sendotp`,{emailid,name,data}, { withCredentials: true });
  if(res.status===200){
    toast.success('Otp Send to your email', {
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
 } catch (error) {
  console.log(error)
 }
}

const resendotp = () => {
  const emailid = email;
  const data = 'registration'
  try {
    const res = axios.post(`${url}/sendotp`,{emailid,name,data}, { withCredentials: true });
    if(res.status===200){
      toast.success('Otp Send to your email', {
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
   } catch (error) {
    console.log(error)
   }
}

const renderButton = (buttonProps) => {
  return (
    <button {...buttonProps}>
      {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec` : "Resend"}
    </button>
  );
};
const renderTime = () => React.Fragment;

  return (
   <>
     <div className=' pt-[10vh]'>
     <ToastContainer/>
        <div className='grid grid-cols-[55%,auto]'>
         <div className='relative w-full h-[90vh] bg-cover bg-opacity-10 bg-no-repeat bg-center' style={{backgroundImage:`url(${imageLogin})`}}>
            <div className='flex items-center justify-center pt-6'>
              <h1 className='text-[35px] font-semibold'>Welcome to E-Fashion</h1>
            </div>
         </div>
        {
        show ? 
        <div className='relative'>
         <div className='loginPage w-full'>
           <div className='flex gap-4 items-center justify-center flex-col'>
             <h1 className='text-3xl font-medium mt-8'>Sign up</h1>
             <h1 className='text-[#A0A0A3] text-lg'>for Latest trends, exciting offers and everything E-Fashion!</h1>
             <div className='flex gap-4 flex-col mt-4'>
             <form className='flex gap-4 flex-col mt-4' onSubmit={(e)=>{setbshow(true);setshow(false);setsotp(true);sendotp(e)}}>
             <div className='relative'>
                <input type="text" placeholder='Enter your fullname..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='name' value={data.name} onChange={handelForm} required />
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaUser/>}
                </span></span>
              </div>
             <div className='flex gap-4 items-center'>
             <div className='relative block cursor-pointer' onClick={()=>handelRadio('male')}>
                <div className={selectedRadio === 'male' ? 'w-[12vw] h-[7vh] border border-black rounded-md flex items-center justify-around bg-[#F6E6D9]' : 'w-[12vw] h-[7vh] border border-black rounded-md flex items-center justify-around'}>
                <input type='radio' name='gender' value='male' checked={selectedRadio === 'male'} className='h-full transform scale-125' onChange={(e)=>{setradio(e.target.value);handelGender(e)}} required />
                <label htmlFor="male" name='male' className='pr-14'>Male</label>
                </div>
                <span className='absolute top-0 bottom-0 right-5 w-[2vw]'><span className='Loginicon'>
                {<FaUser/>}
                </span></span>
              </div>
              <div className='relative block cursor-pointer' onClick={()=>handelRadio('female')}>
              <div className={selectedRadio === 'female' ? 'w-[12vw] h-[7vh] border border-black rounded-md flex items-center justify-around bg-[#F6E6D9]' : 'w-[12vw] h-[7vh] border border-black rounded-md flex items-center justify-around'}>
                <input type='radio' name='gender' value='female' checked={selectedRadio === 'female'} className='h-full transform scale-125' onChange={(e)=>{setradio(e.target.value);handelGender(e)}} required />
                <label htmlFor="female" name='female' className='pr-14'>Female</label>
                </div>
                <span className='absolute top-0 bottom-0 right-5 w-[2vw]'><span className='Loginicon'>
                {<FaUser/>}
                </span></span>
              </div>
             </div>
              <div className='relative'>
                <input type="text" placeholder='Enter your email..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='email' value={data.email} onChange={handelForm} required/>
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<MdEmail/>}
                </span></span>
              </div>
              <div className='relative'>
                <input type="password" placeholder='Enter your password..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='password' value={data.password} onChange={handelForm} required />
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaLock/>}
                </span></span>
              </div> 
              <div className='w-full flex items-center justify-center'>
                <button className={bshow?'bg-[#b3b4b4] text-white w-full rounded-md h-[7vh] text-lg font-medium':'bg-[#42A2A2] text-white w-full rounded-md h-[7vh] text-lg font-medium'} type='submit' disabled={bshow?true:false}>Sing up</button>
              </div>   
              </form>
              <div className='flex justify-center'>
                <span className=' cursor-pointer text-md font-semibold' onClick={()=>setshow(false)}>Already have account ?</span>
                {/* <span className=' cursor-pointer text-md font-semibold'>Forgot password</span> */}
              </div>        
             </div> 
           </div>
         </div> 
         </div>  
          : sotp?<>
          <div className='relative'>
            <div className='loginPage'>
            <div className='flex items-center justify-center flex-col gap-6'>
              <span className='text-xl font-semibold' >Enter OTP</span>
              <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" inputStyles={{width:'50px',height:'50px'}} disabled={false} />
               <ResendOTP onResendClick={() => resendotp()} renderButton={renderButton} renderTime={renderTime}/>
              <button className='bg-[#42A2A2] text-white w-full rounded-md h-[7vh] text-lg font-medium' onClick={handelSubmit}>Submit</button>
               </div>
            </div>
            </div>
          </>:
         <div className='relative'>
         <div className='loginPage w-full'>
           <div className='flex gap-4 items-center justify-center flex-col'>
             <h1 className='text-3xl font-medium mt-8'>Log in</h1>
             <h1 className='text-[#A0A0A3] text-lg'>for Latest trends, exciting offers and everything E-Fashion!</h1>
             <div className='flex gap-4 flex-col mt-4'>
             <form className='flex gap-4 flex-col mt-4' onSubmit={handelSubmitlogin}>
                <div className='relative'>
                <input type="text" placeholder='Enter your email..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='useremail' value={login.useremail} onChange={handelLogin} required />
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaUser/>}
                </span></span>
              </div>
              <div className='relative'>
                <input type="password" placeholder='Enter your password..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='userpassword' value={login.userpassword} onChange={handelLogin} required/>
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaLock/>}
                </span></span>
              </div> 
              <div className='w-full flex items-center justify-center'>
                <button className={bshow?'bg-[#b1b2b2] text-white w-full rounded-md h-[7vh] text-lg font-medium':'bg-[#42A2A2] text-white w-full rounded-md h-[7vh] text-lg font-medium'} disabled={bshow?true:false}>Log in</button>
              </div>  
              </form> 
              <div className='flex justify-between'>
                <span className=' cursor-pointer text-md font-semibold' onClick={()=>setshow(true)}>Create account</span>
                <Link to={'/forgots'}>
                <span className=' cursor-pointer text-md font-semibold'>Forgot password</span>
                </Link>
              </div>        
             </div> 
           </div>
         </div> 
         </div>  
        }
        </div>
     </div>
   </>
  )
}

export default Login