import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
const Dashboarditems = () => {

    const url = 'http://localhost:5000' || 'https://lazybuddyserver.onrender.com' ;

    const [data,setdata] = useState([]);
    const [user,setuser] = useState([]);

    const [chart,setchart] = useState({
      series: [],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Male','Female'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
    })

    const getdata = async() => {
        try {
            const fatch_data = await axios.get(`${url}/getproducts`);
            const fatch_user = await axios.get(`${url}/getuser`)
            setdata(fatch_data.data);
            setuser(fatch_user.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const filterGender = () => {
      const male = user.filter((items)=>items.gender==='male').length;
      const female = user.filter((items)=>items.gender==='female').length;
      let name = 'series'
      setchart({...chart,[name]:[male,female]})
    }

    console.log(chart)

    useEffect(()=>{
    getdata()
    },[])
 
    useEffect(()=>{
    filterGender()
    },[user])

  return (
    <>
      <div className='relative mt-[5vh]'>
        <div className='w-[80vw] h-[80vh]'>
          <div className='flex gap-10 items-center justify-center'>
            <div className='flex gap-2 items-center flex-col justify-center bg-yellow-500 w-[20vw] h-[15vh]'>
               <span className='text-white text-lg font-medium'>Total Products</span>
               <span className='text-white text-xl font-bold'>{data.length}</span>
            </div>
            <div className='flex gap-2 items-center flex-col justify-center bg-yellow-500 w-[20vw] h-[15vh]'>
               <span className='text-white text-lg font-medium'>Total Users</span>
               <span className='text-white text-xl font-bold'>{user.length}</span>
            </div>
            <div className='flex gap-2 items-center flex-col justify-center bg-yellow-500 w-[20vw] h-[15vh]'>
               <span className='text-white text-lg font-medium'>Total Stocks Avilable</span>
               <span className='text-white text-xl font-bold'>{data.reduce((a,{product_stock})=>a+product_stock,0)}</span>
            </div>
          </div>
          <div className='flex justify-between'>
          <div className='my-[5vh] ml-[5vw]'>
            <ReactApexChart options={chart.options} series={chart.series} type="pie" width={480} />
          </div>
          <div className='my-[8vh] mr-[7vw]'>
            <div className='bg-yellow-500 flex flex-col w-[20vw]'>
             <span className='text-white font-medium text-center text-xl my-2'>Latest User Registration</span>
               {
                user.map((items)=>
                <>
                  <span className='text-white p-1 px-4 text-lg'>{items.email}</span>
                </>
                )
               }
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboarditems