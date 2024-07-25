import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Getproduct from '../Redux/Getproduct';
import Productpage from './Productpage';
const Category = () => {

  const {items} = useSelector((state)=>state.data);
  const disapatch = useDispatch();
  useEffect(()=>{disapatch(Getproduct())},[disapatch])
  const {category} = useParams();
  const categoryPrams = category.split('-');
  const subcategory = categoryPrams.slice(2,4).join('-')
 
  const [data,setdata] = useState([]);
  const [p_size,setp_size] = useState('');
  const [sort,setsort] = useState('');
  const [newData,setnewData] = useState([]);
  const sizes = [
    {id:1,name:'S'},
    {id:2,name:'M'},
    {id:3,name:'L'},
    {id:4,name:'XL'},
    
  ]


  const options = [
    {id:1,name:'Popular',value:'popular'},
    {id:2,name:'Price: High to Low',value:'highest'},
    {id:3,name:'Price: Low to High',value:'lowest'},
  ]


  
  const filter = async() => {
    try {
      const filterData = await items.filter((item)=>item.types===categoryPrams[0]&&item.subcategory===subcategory);
      setdata(filterData);
      setnewData(filterData);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    filter();
  },[items,category])
  
  const filterProduct = () => {
    try {
    const filterdata = data.filter((productItem)=>Object.entries(productItem.size).some(([key,value])=>key.includes(p_size)&&value!=='0'));
    setnewData(filterdata)
    } catch (error) {
      console.log(error)
    }
  }

  const shorting = (e) => {

    if (sort === 'lowest') { 
      const newshort = data.sort((a,b) => {
       return a.product_price - b.product_price
      })
      setsort(newshort);
     }
     if (sort === 'highest') { 
      const newshort = data.sort((a,b) => {
       return b.product_price - a.product_price 
      })
      setsort(newshort);
    }

  }

  useEffect(()=>{
   filterProduct();
   shorting();
  },[p_size,sort])
  

  return (
    <>
      <div className='flex items-center flex-col justify-start pt-[19vh] px-[5vw] mb-10'>
       <span className='w-full text-xl font-semibold'>{subcategory+' for '+categoryPrams[0]}</span>
         <div className='grid grid-cols-[20%,auto] gap-[5vw]'>
            <div>
             <div className='mt-4'>
             <span className=''>FILTERS</span>
             </div>
             <h1 className='text-md my-4 font-medium'>SIZE</h1>
              <div className='flex h-[40px] w-[250px] font-semibold '>
               {
                sizes.map((items)=>
                <>
                <button className={p_size === items.name  ? 'btn_color w-full btn_active mr-2' : 'btn_color w-full mr-2'} onClick={()=>{setp_size(items.name)}}>{items.name}</button>
                </>
                )
               }
              </div>
            </div>
            <div>
              <div className='flex items-center justify-end'>
                 <span>Sort By:</span>
                  <select name="sort" id="sort" onChange={(e)=>{shorting();setsort(e.target.value)}} className=' outline-none shadow-none border-none w-[10vw]'>
                    {
                      options.map(items =>
                      <>
                        <option value={items.value}>{items.name}</option>
                      </>
                      )
                    }
                  </select>
              </div>
              <div>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5'>
           {
                
              newData ? newData.map((elements,index) => { 
                    return <div><Productpage key={index} {...elements} /></div>

                }) : null
             }
           </div>
              </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default Category