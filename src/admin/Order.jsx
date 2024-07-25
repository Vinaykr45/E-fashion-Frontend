import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast,ToastContainer } from 'react-toastify';
const Order = () => {

 const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
 
 const [Orderdata,setOrder] = useState([]);
//  const [orderStatus,setorderStatus] = useState("");
//  const [stats,setstatus] = useState()

 const steps = ['Order Placed','Order Confirmed', 'Shipped', 'Out for delivery','Delivered'];

 const getData = async() => {
   try {
     const orders = await axios.get(`${url}/getallorder`)
     setOrder(orders.data.reverse())
   } catch (error) {
    console.log(error)
   }
 }

//  const status = () => {
//    Orderdata.map((items) => {
//     if (items.status===0) {
//         setorderStatus(steps[0])
//     }
//     if (items.status===1) {
//         setorderStatus(steps[1])
//     }
//     if (items.status===2) {
//         setorderStatus(steps[2])
//     }
//     if (items.status===3) {
//         setorderStatus(steps[3])
//     }
//     if (items.status===4) {
//         setorderStatus(steps[4])
//     }
//    }
//    )
//  }

useEffect(()=>{
  getData();
},[])

// useEffect(()=>{
//  status();
// },[Orderdata])

const handelSelect = async (id,e,pid) => {

let data 

if (steps[0]===e.target.value) {
  data = {id:id,status:0,pid:pid}
}
if (steps[1]===e.target.value) {
  data = {id:id,status:1,pid:pid}
}
if (steps[2]===e.target.value) {
  data = {id:id,status:2,pid:pid}
}
if (steps[3]===e.target.value) {
  data = {id:id,status:3,pid:pid}
}
if (steps[4]===e.target.value) {
  data = {id:id,status:4,pid:pid}
}

  try {
   const res = await axios.post(`${url}/updatestatus`,{data});
   if(res.status===200){
    toast.success('Status Update successfully', {
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
        window.location.reload();
      }, 4000);
   }
  } catch (error) {
    console.log(error)
  }
}
 
  return (
   <>
    <div>
        <div className="relative pl-[5vw] pt-[5vh] w-[90vw]">
        <ToastContainer/>
         <div className='flex gap-6'>
         <table className='border-separate text-center border-spacing-y-4 border-spacing-x-8 w-[85%]'>
         <tr>
          <th>S No.</th>
          <th>Order Id</th>
          <th>User Name</th>
          <th>Order Date</th>
          <th className='w-[30%]'>Product Name</th>
          <th>Price</th>
          <th>Status</th>
          </tr>
          
            {
              Orderdata.map((item,index)=>item.order.map((items)=>{
                return(
                    <>
                    <tr>
                    <td>{index+1}</td>
                    <td>{item.razorpay_order_id}</td>
                    <td>{item.address[0].firstname+' '+item.address[0].lastname}</td>
                    <td>{item.date.split('T')[0]}</td>
                    <td>{items.name.slice(0,30)}</td>
                    <td>{items.sprice}</td>
                    <td>
                    <select name="oreder" id="order" onChange={(e)=>handelSelect(item._id,e,items.id)}>
                    <option value={item.status} selected disabled>{items.status===0?steps[0]:items.status===1?steps[1]:items.status===2?steps[2]:
                      items.status===3?steps[3]:items.status===4?steps[4]:null}</option>
                        {
                            steps.filter((sitems,index)=>index>items.status?sitems:null).map((itemc)=>
                            <>
                                <option value={itemc}>{itemc}</option>
                            </>)
                        }
                    </select></td>
                    </tr>
                    </>
                )
              }))
            }
          
         </table>
         </div>
         </div>
    </div>
   </>
  )
}

export default Order
