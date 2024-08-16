import React, { useEffect, useState,useRef } from 'react'

import { useNavigate ,NavLink} from 'react-router-dom'

import Cookies from 'js-cookie';
import Aos from 'aos'
import  "aos/dist/aos.css" 
import { useTranslation } from 'react-i18next';

import "./css/home.css"
import styless from "./css/Home.module.css"


import { Swiper, SwiperSlide } from 'swiper/react';
// import img from './image/TV.png'
// import img2 from './image/fullscreen.png'
// import img3 from './image/3.jpg'
// import img4 from './image/homep.jpg'


// // doctor
// import img1 from './doctor/1.jpg'
// import img22 from './doctor/2.jpg'
// import img33 from './doctor/3.jpg'
// import img44 from './doctor/4.jpg'
// import img5 from './doctor/5.jpg'
// import img6 from './doctor/6.jpg'
// import img7 from './doctor/7.jpg'
// import img8 from './doctor/8.jpg'
// import img9 from './doctor/9.jpg'
// import img10 from './doctor/10.jpg'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/styles.css';

// import back from './video/1.mp4'
// import back1 from './video/2.mp4'
// import required modules
import { Autoplay, Pagination, Navigation ,EffectCoverflow} from 'swiper/modules';

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
 
    useEffect(()=>{
    Aos.init({duration:2000})
  },[])
 

  // useEffect(() => {
  
  //   const login = Cookies.get('login');
  //   if (login !== 'true') {
      
  //     navigate('/signin');
  //   }
  // }, [navigate]);

  const videoRef = useRef(null);


  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) { 
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { 
      videoRef.current.msRequestFullscreen();
    }
  };

 
  return (
    <div>
    <div className={styless.bodyy}>
   
</div>

<div className={styless.Tv} data-aos="fade-down">
{/* <img src={img} alt="" /> */}
{/* <video className={styless.testv} ref={videoRef} autoPlay muted loop>
        <source src={back1} type="video/mp4" />

      </video> */}
      {/* <button className={styless.buttonn} onClick={handleFullscreen}>
        <img src={img2} alt="" />
      </button> */}

      
</div>
</div>










   

  )
}

export default Home;


