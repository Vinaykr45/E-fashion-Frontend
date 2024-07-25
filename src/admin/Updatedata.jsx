import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Addproduct.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdClose } from "react-icons/io";

const Updatedata = ({elemets}) => {
  
  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';

  const size = [
    {id:1,name:'S'},
    {id:2,name:'M'},
    {id:3,name:'L'},
    {id:4,name:'XL'},
  ]

 

  const [fdata,setfdata] = useState([]);
  const [data,setdata] = useState([]);
  const [type,settype] = useState('');
  const [sizes,setsizes] = useState({S:'',M:'',L:'',XL:''});
  const [ctotal,setctotal] = useState('');
  const [newSize,setnewSize] = useState([])
  const [gsize,setgsize] = useState({})
  // const [c_size,setc_size] = useState(size[0]);
  const [img_url,setimg_url] = useState([]);
  const [checkbox,setcheckbox] = useState(false);
  const [ndata,setndata] = useState({
    types:'',category:'',subcategory:'',product_name:'',size:{},product_price:'',product_sprice:'',product_stock:'',image:{},discription:'',feature:'',_id:''
  });
 
  const unique_data = [...new Set(data.map(items => items.types))];
  // console.log(unique_data);

  const filter_category = data.filter(e => e.types === type)
  // console.log(filter_category)

  const get_data = async() =>{
         try {
          const fatch_data = await axios.get(`${url}/getcategory`);
          setdata(fatch_data.data);
          const fwait = await elemets;
          setfdata(fwait[0]);
        
         } catch (error) {
          console.log(error)
         }
  }

  useEffect(()=>{
    get_data();
  },[])



  const fput = async () => {
    
    let name = Object.keys(fdata)
    let value = Object.values(fdata)
    setndata({...fdata,[name]:value})
    setcheckbox(fdata.feature);
    setgsize(fdata.size);
    setsizes(gsize);
    const arimg = fdata.image;
    const uimg = async() =>{
       try {
        const cing = arimg.map(e=>e)
        setimg_url(cing)
       } catch (error) {
        
       }
    }
    uimg()
  }

  const handeltype = (e) => {
    // console.log(e.target.value)
    const type_val = e.target.value;
    const name = 'types'
    settype(e.target.value)
    setndata({...ndata,[name]:type_val})
  }

  const updatetype = () => {
    settype(fdata.types)
  }

  useEffect(()=>{
    fput();
    updatetype();
  },[data])

 const handelimage = (e) =>{
  // console.log(e.target.files);
    const file = e.target.files;
    if (file.length === 0 )return;
    for(let i = 0;i<file.length;i++){
      // if (file[i].type.split('/')[0] !== 'image') continue;
      // if (!img_url.some((e)=>e.name === file[i].name)){
      //   setimg_url((preview) => [
      //     ...preview,URL.createObjectURL(file[i])
      //   ])
      // }
      const fil = e.target.files[i]
      // console.log(fil)
      var reader = new FileReader();
      reader.readAsDataURL(fil);
      // console.log(reader)
      // console.log(reader.result)
      // setimg_url((preview) => [
      //       ...preview,reader.result
      //     ])
      reader.onload = (e) => {
        const iurl = e.target.result;
        setimg_url((preview) => [
                ...preview,iurl
              ])
          // console.log(e.target.result)
      }

    }
   ;
  }
 
// console.log(ndata)
  const removeimg = (index) => {
    // console.log(index)
    const newimg = img_url.filter((_,i)=>i!==index);
    setimg_url(newimg);
    
  }

  useEffect(()=>{
      const name = 'image'
      setndata({...ndata,[name]:img_url})
  },[img_url])

  let name ,value;
  const handel = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setndata({...ndata,[name]:value})
  }

  let cname ,cvalue;
  const handelSize = (e) => {
     cname = e.target.name;
     cvalue = e.target.value;
     setsizes({...sizes,[cname]:cvalue})
  }

  const sizeset = async() => {
    var sum = 0;
    for( var el in sizes ) {
    if( ndata.size.hasOwnProperty( el ) ) {
      sum += parseFloat( sizes[el] );
    }
  }
  setctotal(sum)
  }

 useEffect(()=>{
  let name = 'product_stock';
  setndata({...ndata,[name]:ctotal});
 },[ctotal])

useEffect(()=>{
  sizeset();
  const names = 'size';
  setndata({...ndata,[names]:sizes});
  
},[sizes])



 const handelcheck = (e) => {
  setcheckbox(e.target.checked);
}

useEffect(()=>{
  let name='feature';
  setndata({...ndata,[name]:checkbox})
},[checkbox])

console.log(ndata)

const postdata = async(e) =>{
  e.preventDefault();
 try {
await axios.post(`${url}/updateproducts`,{ndata})
.then((response) => {
 if(response.status === 201){
  toast.success('Data Updated successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    setndata({ types:'',category:'',subcategory:'',product_name:'',size:{},product_price:'',product_sprice:'',product_stock:'',image:{},discription:'',feature:'',id:''})    
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
})
  
 } catch (error) {
  // console.log(error.response.data)
  if(error.response.status === 401){
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
      <div>
           <div>
           <ToastContainer/>
                <div className='flex flex-wrap items-center pl-[5vw] pt-[5vh]'>
                <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="type" className='text-md font-[600]'>Type for</label>
                  <select name="types" id="type" className='w-[240px] my-3 px-3' value={ndata.types} onChange={handeltype} required>
                  <option selected disabled value="">Select Type</option>
                  {
                    unique_data.map((text) =>
                     <>
                     <option value={text}>{text}</option>
                     </>
                    )
                  }
                    
                  </select>
                  </div>
                  <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="category" className='text-md font-[600]'>Select Category</label>
                  <select name="category" id="category" className='w-[240px] my-3 px-3' onChange={handel} value={ndata.category} required>
                  <option selected disabled value="">Choose Category</option>
                  {
                    filter_category.map((text) =>
                     <>
                     <option value={text.cat_name}>{text.cat_name}</option>
                     </>
                    )
                  }
                    
                  </select>
                  </div>
                  <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="subcategory" className='text-md font-[600]'>Sub Category</label>
                  <input name='subcategory' type="text"  onChange={handel} value={ndata.subcategory} placeholder='Enter sub Category Name..' className='w-[250px] h-9 my-3 px-2' required />
                  </div>
                  <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="product" className='text-md font-[600]'>Product Name</label>
                  <input name='product_name' type="text"  onChange={handel} value={ndata.product_name} placeholder='Enter Product Name..' className='w-[250px] h-9 my-3 px-2' required />
                  </div>
                  <div className='flex flex-col mr-8 ml-5 w-[40vw] my-5'>
                  <label htmlFor="product" className='text-md font-[600]'>Enter Stocks Size</label>
                  <div className='flex h-7 gap-4 my-3'>
                 {
                  Object.entries(ndata.size).map( ([key,value]) =>
                    <> 
                       <label htmlFor={key} className='font-bold'>{key}</label>
                       <input name={key} type="number" value={value}  className='text-center w-[4vw]' onChange={handelSize}/>
                      {/* <button className={c_size === e.name ? 'btn_color w-full mx-1 btn_active' : 'btn_color w-full mx-1'} onClick={()=>{setc_size(e.name);let name='size'; setndata({...ndata,[name]:e.name})}}>{e.name}</button> */}
                    </>
                    )
                 }
                 <label htmlFor="Total" className='font-bold ml-1'>Total Stocks</label>
                 <input type="number" className='text-center w-[5vw]' name='product_stock' onChange={handel} disabled value={ndata.product_stock} />
                 </div>
                  </div>
                  <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="product" className='text-md font-[600]'>Orignal Price</label>
                  <input name='product_price' type="number"  onChange={handel} value={ndata.product_price} placeholder='Enter Product Original Price..' className='w-[250px] h-9 my-3 px-2' required />
                  </div>
                  <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="product" className='text-md font-[600]'>Selling Price</label>
                  <input name='product_sprice' type="number"  onChange={handel} value={ndata.product_sprice} placeholder='Enter Product Selling Price..' className='w-[250px] h-9 my-3 px-2' required />
                  </div>
                  {/* <div className='flex flex-col mr-8 ml-5'>
                  <label htmlFor="product" className='text-md font-[600]'>Stocks</label>
                  <input name='product_stock' type="number"  onChange={handel} value={ndata.product_stock} placeholder='Enter Product Stock..' className='w-[250px] h-9 my-3 px-2' required />
                  </div> */}
                  <div className='flex flex-col my-3 mr-8 ml-5'>
                  <label htmlFor="discription" className='text-md font-[600]'>Product Discription</label>
                  <textarea name="discription" id="discription" cols="28" rows="3" onChange={handel} value={ndata.discription} className='my-3 p-2 outline-none'></textarea>
                  {/* <input name='discription' type="text"  onChange={handel} value={ndata.value} placeholder='Enter Product Name..' className='w-[250px] h-9 my-3 px-2' required /> */}
                  </div>
                  <div className='flex flex-col mr-8 ml-5 w-[55%]'>
                  <label htmlFor="image" className='text-md font-[600]'>Choose Image</label>
                  <input name='image' type="file" multiple onChange={handelimage} className='w-[250px] h-9 my-3 px-2 border-none' required />
                   <div className='flex'>
                   {
                    img_url.map((src,index)=>{
                      return(
                        <>
                        <div className='relative close_div mx-2'>
                        <IoMdClose className='close cursor-pointer' onClick={()=>removeimg(index)}/>
                        <img src={src} width={60} height={60} alt="image_url" className='max-[60px]:'/>
                        </div>
                        </>
                      )
                    })
                   }
                   </div>
                  </div>
                  <div className='mr-8 ml-5 w-[24%] h-[90px] feature_p py-2 px-1' >
                  <div className='flex flex-row items-center mb-1'>
                  <input name='feature' type="checkbox" checked={checkbox} onChange={handelcheck} placeholder='Enter Product Selling Price..' className='w-[50px] h-5 ' required />
                  <label htmlFor="feature" className='text-md font-[600]'>Feature Product</label>
                  </div>
                 <div className='flex justify-end pl-12 mb-6'>
                  <span className='text-sm'>This product will appear on the home page</span>
                 </div>
                  </div>
                  <div className='flex items-center justify-center  my-5 w-full'>
                    <button className='text-lg font-[600] bg-blue-500 w-[50%] h-10 text-white rounded-md' onClick={postdata}>Update</button>
                  </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default Updatedata