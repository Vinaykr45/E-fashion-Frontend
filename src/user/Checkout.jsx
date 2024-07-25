import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Getproduct from '../Redux/Getproduct';
import Typography from '@mui/material/Typography';
import Delivery from './Delivery';
import Ordersummary from './Ordersummary';
import Payment from './Payment';

const steps = ['Login', 'Delivery address', 'Order Summery','Payment'];

const Checkout = () => {
   
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(Getproduct())},[dispatch])
  const [activeStep, setActiveStep] = React.useState(0);
  
  const location = useLocation();
  const queary=new URLSearchParams(location.search);
//  console.log(location)
 
  const steper = queary.get("step");
  const seprate = steper.split(" ");
  const step = seprate[0];
  const address = seprate[1];
  const amount = seprate[2];


  return (
    <div className=' pt-24 px-10'>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
           
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
           
            <Box sx={{ flex: '1 1 auto' }} />
            
            
            
          </Box>
          <div>
           {
            step == 4 ? <Payment data={{amount:amount,address:address}}/> : <>
            {
                step==2?<Delivery/>:<Ordersummary data={address}/>
              }
            </>
           }  
            </div>

        </React.Fragment>
      )}
    </Box>
    </div>
  )
}

export default Checkout
