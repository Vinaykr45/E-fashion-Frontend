import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from '@mui/material/Modal';
import Updatedata from './Updatedata';
import Swal from 'sweetalert2'
import './Products.css'

const Products = () => {

  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com'; 

  const [data,setdata] = useState([]);
  const [ndata,setndata] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataid,setdataid] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const get_data = async() =>{
    try {
     const fatch_data = await axios.get(`${url}/getproducts`)
     setdata(fatch_data.data)
   
    } catch (error) {
     console.log(error)
    }
}

useEffect(()=>{
get_data();
},[])

const handelicon = (items) => {

  const filter_data = data.filter(e => e._id === items)
  setndata(filter_data)
  

}

const handelDelete = (items) => {
  const filter_data = data.filter(e => e._id === items)
  const deldata = filter_data[0]._id;
  setdataid(filter_data[0]._id)
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios.post(`${url}/deletedata`,{deldata});
      } catch (error) {
        console.log(error)
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  });
}


  return (
    <>
      <div>
        <div className="relative pl-[5vw] pt-[5vh] w-[90vw]">
         <div className='flex gap-6'>
         <table className='border-separate text-center border-spacing-y-4 border-spacing-x-8 w-[85%]'>
         <tr>
          <th>S No.</th>
          <th>Type</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th className='w-[30%]'>Product Name</th>
          <th>Price</th>
          {/* <th>Size</th> */}
          <th>Stock</th>
          <th>Edit</th>
          <th>Delete</th>
          </tr>
           {
            data.map((items,index)=>{
              return(
                <>
                    <tr>
                    <td hidden>{items._id}</td>
                    <td>{index+1}</td>
                    <td>{items.types}</td>
                    <td>{items.category}</td>
                    <td>{items.subcategory}</td>
                    <td>{items.product_name}</td>
                    <td>{items.product_sprice}</td>
                    {/* <td>{items}</td> */}
                    <td>{items.product_stock}</td>
                    <td><FaRegEdit className='text-green-500 m-auto cursor-pointer'size={20} onClick={()=>{handleOpen();handelicon(items._id)}} /></td>
                    <td><MdDeleteOutline className='text-red-500 m-auto cursor-pointer' onClick={()=>handelDelete(items._id)} size={23}/></td>
                    </tr>
                </>
              )
            })
           }
           </table>
           </div>
        </div>
        <div>
        <Modal
        open={open}
        onClose={handleClose}
        >
       <div className='modle'>
        <Updatedata elemets={ndata}/>
       </div>
      </Modal>
        </div>
      </div>
    </>
  )
}

export default Products