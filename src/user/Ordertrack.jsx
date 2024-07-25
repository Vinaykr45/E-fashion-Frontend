import React from 'react'
import { useParams } from 'react-router'
import { useState,useEffect } from "react";
import axios from 'axios';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useDispatch , useSelector } from 'react-redux';
import Getproduct from '../Redux/Getproduct';

const Ordertrack = () => {
  const steps = ['Order Placed','Order Confirmed', 'Shipped', 'Out for delivery','Delivered'];
  var {id,pid} = useParams();
  const [orderData,setorderData] = useState([]);
//   const [orderStatus,setorderStatus] = useState('');
  const [userData,setuserData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [step,setstep] = useState(0)
  const [date,setdate] = useState('')

  const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com';

  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])

  const callProfile = async() => {
    try {
      const res = await axios.get(`${url}/userprofile`,{ withCredentials: true })
      const data = await res;
      setuserData(data.data);
      // console.log(data.data);

    } catch (error) {
      console.log(error)
    }
}
  const getOrderdata = async () => {
    try {
    const data = await userData._id;
    const res = await axios.get(`${url}/getorder`,{
      params: {
        data:`${data}`
      }
    })
    const ndata = res.data.filter((item)=>item._id===id);
   
    const fdata = ndata[0].order.filter(item=>item.id===pid)
   
    setorderData(ndata);
    setstep(fdata[0].status)
    // orderData.map((item)=>item.order.map((items)=>setstep(items.status)) )
    const dates = ndata[0].date.split('T')[0];
    const dat  = new Date(`${dates}`);
    const next_date = new Date(dat.setDate(dat.getDate() + 7)).toString();
    setdate(next_date)
    // console.log(orderData)
    } catch (error) {
      console.log(error)
    }
  }

  
useEffect(()=>{
    callProfile();
   },[])

  useEffect(()=>{
    getOrderdata()
   },[userData])

  return (
    <>
    <div className='pt-[15vh] bg-[#F1F3F6] h-[100vh]'>
      {
        orderData.map((items,index)=>
        <>
            <div className='bg-white flex rounded-sm mx-[8vw] p-4 shadow-md'>
               <div>
                    <span className='text-lg font-semibold'>Delivery Address</span>
                    <h1>{items.address[0].firstname+' '+items.address[0].lastname}</h1>
                    <h2>{items.address[0].address+' '+items.address[0].city+' '+items.address[0].state}</h2>
                    <h2>{items.address[0].pincode}</h2>
                    <h2 className=' font-medium'>Phone Number</h2>
                    <h2>{items.address[0].phone}</h2>
               </div>
               <div className='w-[70%]'>
                  <div className='float-right'>
                  <span className='flex '>
                  <h2 className='text-md font-medium'>Order Id </h2>
                  <span className='text-md font-normal'>{":"+" "+items.razorpay_order_id}</span>
                  </span>
                  <div className='my-6'>
                  <h2 className='text-md font-medium'>Delivery Estimated Date</h2>
                  <samp className='text-green-600 text-lg my-2'>{date.slice(0,15)}</samp>
                  </div>
                  </div>
               </div>
            </div>
        </>
        )
      }
   <div className='mx-[8vw] mt-8'>
   <Stepper
      orientation="horizontal"
      sx={{
        '--Stepper-verticalGap': '2.5rem',
        '--StepIndicator-size': '1.5rem',
        '--Step-gap': '1rem',
        '--Step-connectorInset': '-0.5rem',
        '--Step-connectorRadius': '1rem',
        '--Step-connectorThickness': '4px',
        '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
        [`& .${stepClasses.completed}`]: {
          '&::after': { bgcolor: 'success.solidBg' },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: '4px solid',
            borderColor: '#fff',
            boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.softDisabledColor',
        },
        [`& .${typographyClasses['title-sm']}`]: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '10px',
        },
      }}
      activeStep={step}
    >

     {
      steps.map((label,index)=>{

        const stepProps = {};
        const labelProps = {};

        return(
        <Step
        orientation="vertical"
        completed={index<step?true:false}
        active={index>step?true:false}
        indicator={
          <StepIndicator variant="solid" color={index<=step?'success':null} className=' delay-75'>
            {index<=step?<CheckRoundedIcon />:null}
          </StepIndicator>
        }
        key={label} {...stepProps}
       
      >
       <Typography {...labelProps}>
        {label}
       </Typography>
      </Step>

        )
       
      }   
      )
     }
     
    </Stepper>
</div> 
    </div>
    </>
  )
}

export default Ordertrack
