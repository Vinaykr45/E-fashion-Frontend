import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Productpage from './Productpage';
import Getproduct from '../Redux/Getproduct';
const Featureimg = () => {

  const {items, loading, error} = useSelector((state)=>state.data);
  console.log(items)
  const disapatch = useDispatch()
  useEffect(()=>{disapatch(Getproduct())},[disapatch])
  return (
   <>
    <div>
      <div className="flex items-center justify-center my-[5vh]">
        <span className='text-lg font-semibold'>LATEST PRODUCTS</span>
      </div>
      <div className='flex w-full gap-10 px-[3vw] mb-[5vh] flex-wrap'>
        {
          items.slice().reverse().slice(0,5).map((elements,index)=>{
            return(
              <>
              <Productpage key={index} {...elements}/>
              </>
            )
          })
        }
      </div>


      <div className="flex items-center justify-center my-[5vh]">
        <span className='text-lg font-semibold'>FEATURES PRODUCTS</span>
      </div>
      <div className='flex w-full gap-10 px-[3vw] mb-[5vh] flex-wrap'>
        {
          items.filter((items=>items.feature)).slice(0,5).map((elements,index)=>{
            return(
              <>
              <Productpage key={index} {...elements}/>
              </>
            )
          })
        }
      </div>

    </div>
   </>
  )
}

export default Featureimg