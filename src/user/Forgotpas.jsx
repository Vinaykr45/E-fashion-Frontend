import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import OTPInput, { ResendOTP } from "otp-input-react";
import Getproduct from '../Redux/Getproduct';
import axios from 'axios';
import Cookie from 'js-cookie';
import { FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
const Forgot = () => {
  const url ='http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(Getproduct())},[dispatch])
    
    const [show,setshow] = useState(false);
    const [email,setemailid] = useState('');
    const [OTP, setOTP] = useState("");
    const [sotp,setsotp] = useState(false);
    const [sbutton,setbutton] = useState(false);
    const handelForm = async(e) => {
      e.preventDefault();
      const email = e.target[0].value;
      setemailid(email);
      try {
        const res = await axios.post(`${url}/frogot`,{email}) 
        if (res.status===200) {
          const name = res.data.name;
          const emailid = res.data.email;
          const data = 'forgot password'
          console.log(name)
          const resp = await axios.post(`${url}/sendotp`,{emailid,name,data},{ withCredentials: true }) 
          if (resp.status===200) {
            setshow(true)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }


    const resendotp = async() => {
      try {
        const res = await axios.post(`${url}/frogot`,{email}) 
        if (res.status===200) {
          const name = res.data.name;
          const emailid = res.data.email;
          const data = 'forgot password';
          const resp = await axios.post(`${url}/sendotp`,{emailid,name,data},{ withCredentials: true }) 
          if (resp.status===200) {
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

    const handelSubmit = async() => {
      const otpcheck = Cookie.get('otp');
      console.log(otpcheck)
      if(otpcheck===OTP){
           setshow(false);
           setsotp(true);
           
          //  console.log('ji')
          }
    }


    const handelFormsubmit = async (e) => {
       e.preventDefault();
       const password = e.target[0].value;
       const cpassword = e.target[1].value;

       if (password===cpassword) {
         try {
          const res = await axios.post(`${url}/updatepass`,{password,email});
          if (res.status===200) {
            alert('password updated sucessfulld');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
         } catch (error) {
          console.log(error)
         }
       }
       else{
        alert('Password missmatch')
       }

    }

  return (
    <>
        <div className=' w-[100vw] h-[100vh]'>
        <ToastContainer/>
           <div className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
          {
            show ? <>
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
          </>:sotp ? 
            <>
              <div>
              <form onSubmit={(e)=>handelFormsubmit(e)} className='flex flex-col gap-4'>
              <div className='relative'>
                <input type="password" placeholder='Enter your new password..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='password' required />
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaLock/>}
                </span></span>
                </div>
                <div className='relative'>
                <input type="password" placeholder='Enter your confirm password..' className='w-[25vw] pl-14 rounded-md h-[6vh]' name='password' required />
                <span className='absolute inset-0 bg-[#f9e4d134] h-full rounded-md w-[3vw] border-[#1e1d1d5f] border'><span className='Loginicon'>
                {<FaLock/>}
                </span></span>
                </div>
                <div className='text-center'>
                  <button className='bg-orange-500 w-[50%] h-10 font-semibold text-white'>Submit</button>
                </div>
              </form>
              </div> 
              
            </> 
          :<div className='flex justify-center'>
               <form onSubmit={(e)=>{handelForm(e);setbutton(true)}} className='flex flex-col justify-center items-center w-[60%]'>
                 {/* <label htmlFor="email">Enter your email id</label> */}
                 <h1 className='text-xl my-2'>Forgot password?</h1>
                 <span className='w-full my-2' >Please enter the email address used to create your account, and well send you a OTP to reset your password..</span>
                 <input type="email" placeholder='Enetr your email id..' required className='my-2 w-[80%] h-10 px-2'/>
                 <button type='submit' className={sbutton?'my-4 bg-gray-500 w-[50%] h-10 text-white font-semibold':'my-4 bg-orange-500 w-[50%] h-10 text-white font-semibold'} disabled={sbutton?true:false}>Submit</button>
               </form>
               </div>
               }
           </div>
        </div>
    </>
  )
}

export default Forgot
