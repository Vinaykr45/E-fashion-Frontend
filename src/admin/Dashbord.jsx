import {React,useState,useEffect} from 'react';
import './Dashboard.css';
import img from '../image/logo.png';
import { BiCategory } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import {Link, NavLink, Outlet} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashbord = () => {
  const url ='http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
  const navigate = useNavigate();
  const elemets = [
    {id:1,name:'Dashboard',icon:<BiCategory/>,link:"/admin/dashboard"},
    {id:2,name:'Add Category',icon:<BiCategory/>,link:"/admin/addcategory"},
    {id:3,name:'Add Products',icon:<BiCategory/>,link:"/admin/addproduct"},
    {id:4,name:'Orders',icon:<BiCategory/>,link:"/admin/orders"},
    {id:5,name:'Products',icon:<BsBag/>,link:"/admin/products"},
   
  ]


const [userData,setuserData] = useState({});
 const callProfile = async() => {
      try {
        const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
        const data = await res;
        setuserData(data.data);
      } catch (error) {
        console.log(error)
      }
 }

//  const redirect = async () => {
//     if (Object.keys(userData).length<=0) {
//       setTimeout(() => {
//         if (userData.isUser!=='admin') {
//           console.log(userData)
//           navigate('/login')
//         }
//       }, 2000);
//     }
    
//  }

useEffect(()=>{
 callProfile();
},[])

// useEffect(()=>{
//  redirect()
// },[userData])

  return userData.isUser==='admin'&&(
    <>
      <div className='w-[100vw]'>
        <div className='dashboard_grid '>
            <div className='grid-1 '>
            <div className='fixed top-1 w-[15%] h-full overflow-hidden shadow-lg'>
            <Link to={'/'}>
              <div className='flex items-center h-[100px] justify-center'><img src={img} alt="icons" className='w-[80%] logo' /></div>
            </Link>
              {
                elemets.map((e)=>
                   <>
                   <NavLink to={e.link}>
                   <div className='flex items-center my-2 text-lg font-semibold mx-4 cursor-pointer text-[#868698] button_bg'> 
                   <span className='mx-3'>{e.icon}</span>
                   <button className='text text-md'>{e.name}</button>
                   </div>
                   
                   </NavLink>
                  
                   </>
                  
                )
              }
            </div>
            </div>
            <div className=' bg-[#fcfafa]'>
            <h1 className='text-xl font-[600] my-4 mx-5'>Dashboard</h1>
              {
               <>
               <Outlet/>
               </>
              
              }
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashbord