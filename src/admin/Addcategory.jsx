import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Addcategory = () => {

    const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
   
    const [data,setdata] = useState({
      types:'',cat_name:''
    })

    const type = [
        {id:1,name:'MEN'},
        {id:2,name:'WOMEN'},
        {id:3,name:'KIDS'},
      ]
    
      let name , value;
      
      const handel = (e) => {
        name = e.target.name;
        value = e.target.value;
        setdata({...data,[name]:value})
      }
// console.log(data)
      const postdata = async(e) =>{
        e.preventDefault();
       try {
      await axios.post(`${url}/addcategory`,{data})
      .then((response) => {
       if(response.status === 201){
        toast.success('Category added successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          setdata({types:'',cat_name:''})    
       }
      })
        
       } catch (error) {
        // console.log(error.response.data)
        if(error.response.status === 401){
        toast.warn(error.response.data, {
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
      }
      
  return (
    <>
              <div className='grid-2'>
              <ToastContainer />
              <div>
                <div className='flex items-center pl-[5vw] pt-[5vh]'>
                <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="type" className='text-md font-[600]'>Type for</label>
                  <select name="types" id="type" className='w-[240px] my-3 px-3' value={data.types} onChange={handel} required>
                  <option selected disabled value="">Select Type</option>
                  {
                    type.map((text) =>
                     <>
                     <option value={text.name}>{text.name}</option>
                     </>
                    )
                  }
                    
                  </select>
                  </div>
                  <div className='flex flex-col mx-8'> 
                  <label htmlFor="category anme" className='text-md font-[600]'>Category Name</label>
                  <input name='cat_name' type="text" value={data.cat_name} onChange={handel} placeholder='Enter Category Name..' className='w-[250px] h-9 my-3 px-2' required />
                  </div>
                  <div className='mx-8'>
                    <button className='text-lg font-[600] bg-blue-500 w-[100px] h-10 text-white rounded-md' onClick={postdata}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Addcategory