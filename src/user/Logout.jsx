import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
const Logout = () => {
    const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';

    const navigate = useNavigate();
    
    const handelSubmit = async() => {
        try {
          await axios.get(`${url}/logout`,{ withCredentials: true })
          .then((response)=>{
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
                navigate('/login');
               }, 2500);
               setTimeout(() => {
                window.location.reload();
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

  return (
    <>
        <div className='flex items-center justify-center'>
             <ToastContainer/>
                <button className='bg-orange-500 w-[50%] h-10 text-white font-semibold text-lg' onClick={handelSubmit}>Logout</button>
            
        </div>
    </>
  )
}

export default Logout