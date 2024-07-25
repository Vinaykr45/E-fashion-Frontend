import React from 'react';
import { Footer } from "flowbite-react";
import { useLocation } from 'react-router';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import image from '../image/logobg.png'
const Footers = () => {
  const location = useLocation();
  const url = ['/admin','/cart','/checkout']
  const shouldHideFooter = url.some(path=>location.pathname.includes(path));
  console.log(shouldHideFooter)
  return shouldHideFooter?null: (
    <div className='px-[10vw] bg-[#181818]'>
    <Footer container className=' bg-transparent text-white'>
    <div className="w-full">
      <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <div>
          <Footer.Brand
            src={image}
            alt="Flowbite Logo"
            name="Flowbite"
            className='w-[150px] h-full mt-[-20px]'
          />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 text-xl font-bold dark:text-white">
          <div>
            <Footer.Title title="about" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">E-fashion</Footer.Link>
              {/* <Footer.Link href="#">Tailwind CSS</Footer.Link> */}
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Follow us" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Github</Footer.Link>
              {/* <Footer.Link href="#">Discord</Footer.Link> */}
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="E-fashion" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href="#" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="#" icon={BsGithub} />
          <Footer.Icon href="#" icon={BsDribbble} />
        </div>
      </div>
    </div>
  </Footer>
  </div>
  )
}

export default Footers
