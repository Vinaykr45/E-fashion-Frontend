import React, { useEffect, useState } from 'react';
import './Navbar.css';
import icon from '../image/logo.png';
import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';
    const cartItem  = useSelector((state)=>state.cart);
    const watchList  = useSelector((state)=>state.watchlist);
    const {items} = useSelector((state)=>state.data);
    const location = useLocation();
    const shouldHideNavbar = location.pathname.startsWith('/admin');
    const [colorChange,setcolorChange] = useState(false);
    const [top,settop] = useState([]);
    const [bottom,setbottom] = useState([]);
    const [winter,setwinter] = useState([]);
    const [searchValue,setsearchValue] = useState([]);
    const [inputValue,setinputValue] = useState(null)
    const [check,setcheck] = useState();
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setcolorChange(true);
        } else {
            setcolorChange(false);
        }
    };
    window.addEventListener("scroll", changeNavbarColor);
//   console.log(top)
   const handelFilter = (e) => {
      const value = e.target.value;
      const topCategory = items.filter((items)=>items.types===value&&items.category==='Topwear');
      const topuniqueCategory = [...new Set(topCategory.map(item=>item.subcategory))];
      settop({type:topCategory[0].types,category:topCategory[0].category,subcategory:topuniqueCategory})
      const bottomCategory = items.filter((items)=>items.types===value&&items.category==='Bottomwear');
      const bottomuniqueCategory = [...new Set(bottomCategory.map(item=>item.subcategory))];
      setbottom({type:bottomCategory[0].types,category:bottomCategory[0].category,subcategory:bottomuniqueCategory})
      const winterCategory = items.filter((items)=>items.types===value&&items.category==='Winterwear');
      const winteruniqueCategory = [...new Set(winterCategory.map(item=>item.subcategory))];
      setwinter(winteruniqueCategory)
   }

   const checkUser = async() => {
      try {
         const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
         const data = await res;
         setcheck(data.data)
         // console.log(data.data);
 
       } catch (error) {
         console.log(error)
       }
   }

   useEffect(()=>{
   checkUser();
   },[])

   const handelSearch = async(e) =>{
     const value = e.target.value;
     setinputValue(value)
     try {
      const serachData = await axios.get(`${url}/searchproducts`,{
         params:{
            title:value
         }
      });
      console.log(serachData.data)
      setsearchValue(serachData.data);
      if (value.length===0) {
         setsearchValue([])
      }
     } catch (error) {
      console.log(error)
     }
   }

  return shouldHideNavbar&&items ? null : (
    <>
        <div className={colorChange ?"main flex justify-evenly items-center w-[100vw] navchnage bg-[#ffffff] z-10 fixed":"main flex justify-evenly items-center w-[100vw] bg-[#F6E6D9] z-10 fixed"}>
        <div className='flex items-center h-[60px] gap-10 w-[80%] my-2'>
            <div className='icon m-5 p-4'>
             <Link to={'/'}>
               <img src={icon} alt="logo" />
            </Link>
            </div>
            <div className='text-lg w-[35%]'>
                <ul className='flex justify-start items-center gap-5'>
                    <li className='relative group'>
                    <button className=' hover:opacity-50' value='MEN' onMouseEnter={handelFilter}>MEN</button>
                    <div className={colorChange ? 'mt-[8.4px] absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform':
                     'absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform'
                    }>
                     <div className="relative top-6 p-6 px-[4vw] bg-white shadow-xl w-full">
                     <div className={colorChange ? "w-14 h-1 -mt-1 bg-yellow-500 transform absolute top-0  translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm":
                       "w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm"
                     }></div>
                      <div className='relative z-10'>
                         <div className='grid grid-cols-3 gap-[5vw]'>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Topwear</p>
                              <ul>
                                 {
                                   Object.entries(top.length!==0?top.subcategory:top).map(([key,value])=>
                                    <>
                                    {console.log(key,value)}
                                    <NavLink to={`/category/${top.type+'-'+top.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Bottomwear</p>
                              <ul>
                              {
                                   Object.entries(bottom.length!==0?bottom.subcategory:bottom).map(([key,value])=>
                                    <>
                                    <NavLink to={`/category/${bottom.type+'-'+bottom.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Winterwear</p>
                              <ul>
                                 {
                                    winter.map((element)=>
                                    <>
                                       <li className='my-1 text-[16px]'>{element}</li> 
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                         </div>
                      </div>
                     </div>
                    </div>
                    </li>
                    <li className='relative group'>
                    <button className=' hover:opacity-50' value='WOMEN' onMouseEnter={handelFilter}>WOMEN</button>
                    <div className={colorChange ? 'mt-[8.4px] absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform':
                     'absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform'
                    }>
                     <div className="relative top-6 p-6 px-[4vw] bg-white shadow-xl w-full">
                     <div className={colorChange ? "w-14 h-1 -mt-1 bg-yellow-500 transform absolute top-0  translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm":
                       "w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm"
                     }></div>
                      <div className='relative z-10'>
                         <div className='grid grid-cols-3 gap-[5vw]'>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Topwear</p>
                              <ul>
                              {
                                   Object.entries(top.length!==0?top.subcategory:top).map(([key,value])=>
                                    <>
                                    <NavLink to={`/category/${top.type+'-'+top.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Bottomwear</p>
                              <ul>
                              {
                                   Object.entries(bottom.length!==0?bottom.subcategory:bottom).map(([key,value])=>
                                    <>
                                    <NavLink to={`/category/${bottom.type+'-'+bottom.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Winterwear</p>
                              <ul>
                                 {
                                    winter.map((element)=>
                                    <>
                                       <li className='my-1 text-[16px]'>{element}</li> 
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                         </div>
                      </div>
                     </div>
                    </div>
                    </li>
                    <li className='relative group'>
                    <button className=' hover:opacity-50' value='KIDS' onMouseEnter={handelFilter}>KIDS</button>
                    <div className={colorChange ? 'mt-[8.4px] absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform':
                     'absolute top-0 -left-40 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 y-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[40vw] transform'
                    }>
                     <div className="relative top-6 p-6 px-[4vw] bg-white shadow-xl w-full">
                     <div className={colorChange ? "w-14 h-1 -mt-1 bg-yellow-500 transform absolute top-0  translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm":
                       "w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[6rem] duration-500 ease-in-out rounded-sm"
                     }></div>
                      <div className='relative z-10'>
                         <div className='grid grid-cols-3 gap-[5vw]'>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Topwear</p>
                              <ul>
                              {
                                   Object.entries(top.length!==0?top.subcategory:top).map(([key,value])=>
                                    <>
                                    {console.log(key,value)}
                                    <NavLink to={`/category/${top.type+'-'+top.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Bottomwear</p>
                              <ul>
                              {
                                   Object.entries(bottom.length!==0?bottom.subcategory:bottom).map(([key,value])=>
                                    <>
                                    <NavLink to={`/category/${bottom.type+'-'+bottom.category+'-'+value}`}>
                                       <li className='my-1 mb text-[16px]'>{value}</li> 
                                    </NavLink>
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                           <div>
                              <p className=' font-semibold mb-4 text-[16px]'>Winterwear</p>
                              <ul>
                                 {
                                    winter.map((element)=>
                                    <>
                                       <li className='my-1 text-[16px]'>{element}</li> 
                                    </>
                                    )
                                 }
                              </ul>
                           </div>
                         </div>
                      </div>
                     </div>
                    </div>
                    </li>
                </ul>
            </div>
            <div className='second_div flex w-[35%] gap-2 items-center'>
                <div className='search h-[40px] w-[85%] z-50'>
                     <i className='icon_sc'><CiSearch size={20}/></i>
                     <input type="text" placeholder='Seacrh any products...' value={inputValue}  className='h-[40px]' onChange={handelSearch}/>
                    
                </div>
               
                <div className='flex gap-4 items-center'>
                   { check ? <Link to={'/userprofile'} className='flex gap-5 items-center'>
                    <span className='text-lg cursor-pointer w-[6vw]'>{'Hi '+check.name.slice(0,6)+'...'}</span>
                    </Link> :
                    <Link to={'/login'} className='flex gap-4 items-center'>
                    <span className='text-lg cursor-pointer'>Login</span>
                    </Link>
                    }
               <Link to={'/watchlist'}>
               <div className='flex items-center justify-center lg:col-start-6 cursor-pointer '>
                  <samp><IoIosHeartEmpty size={25}/></samp>
                   <div className='relative'>
                   <div className={watchList.length!==0 ? 'cart_amount':'hidden'}>{watchList.length+watchList.reduce((a,{quantity})=>a+quantity,0)-watchList.length}</div>
                   </div>
                </div> 
                </Link>    
                <Link to={'/cart'}>
                <div className='flex items-center justify-center lg:col-start-6 cursor-pointer '>
                  <samp><BsBag size={20}/></samp>
                   <div className='relative'>
                   <div className={cartItem.length!==0 ? 'cart_amount':'hidden'}>{cartItem.length+cartItem.reduce((a,{quantity})=>a+quantity,0)-cartItem.length}</div>
                   </div>
                </div>
                </Link>
                    
                </div>
            </div>
        </div>
       {
         searchValue.length!==0&&<div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-[36px] right-[372px] z-10 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto max-w-[17rem] w-[17rem]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                
                {/*body*/}
                <div className="relative p-2 px-4 flex-auto">
                  <p className="my-2 text-blueGray-500 text-lg leading-relaxed">
                   {
                     searchValue.slice(0,5).map((items)=><>
                        <div className='flex flex-col gap-2 text-md font-semibold' onClick={()=>{setsearchValue([]);setinputValue('')}}>
                        <NavLink to={`/category/${items.types+'-'+items.category+'-'+items.subcategory}`}>
                        <span>{items.types+'  '+items.subcategory}</span>
                        </NavLink>
                        <hr />
                        </div>
                     </>)
                   }
                  </p>
                </div>
                
              </div>
            </div>
          </div>
       }
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </div>
    </>
  )
}

export default Navbar