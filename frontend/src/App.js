import React,{useState,useEffect, lazy, Suspense,startTransition } from 'react';

import { Routes,Route,BrowserRouter} from "react-router-dom";



import Navbars from './component/Navbars';
import Footer from './component/footer';


import Signup from './component/Signup'
import Signin from './component/Signin'
import Loading from './component/Loading.js';
import NotFound from './component/NotFound.js'
// import './component/css/Cards.css'
import './App.css';



const Home = lazy(()=> import('./component/Home.js'))
const Click = lazy(()=> import('./component/click.js'))
const IT = lazy(()=> import('./component/it/Employee.js'))
const ITP = lazy(()=> import('./component/it/testP.js'))
const Client = lazy(()=> import('./component/client.js'))
const Adduser = lazy(()=> import('./component/it/adduser.js'))
const Employeetable = lazy(()=> import('./component/it/Employeetable.js'))
// const  Chatbot = lazy(()=> import('./component/chatbot/chat.js'))
// const  Pages = lazy(()=> import('./component/page.js'))
// const  Department = lazy(()=> import('./component/Department.js'))




const App = ()=>{
 

  return (
    
    <BrowserRouter>
    
    <div className="App">
    
      
   
        <Routes>
      
        {/* <Route path="/" element={<Signup/>}/> */}
        <Route path="/SignupUser" element={<Signup/>}/>
        {/* <Route path="/" element={<Signin/>}/> */}
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/ITP" element={<ITP/>}/>
        <Route path="/adduser" element={<Adduser/>}/>
        <Route path="/Employeetable" element={<Employeetable/>}/>

         <Route path="*" element={
          <div>
          <Navbars />
         <NotFound/>
         </div>
         }/>
          
         {/* chatbot */}
     

          {/* Home */}
      
          <Route path="/" element={
            <React.Suspense fallback={<Loading/>}>
            <div>
          <Navbars />
                    
           < Home />
          
          
          {/* <Footer/> */}
          </div>
          </React.Suspense>
        }/>

          <Route path="/Reports" element={
            <React.Suspense fallback={<Loading/>}>
            <div>
          <Navbars />
                    
           < Click />
          
          
          {/* <Footer/> */}
          </div>
          </React.Suspense>
        }/>

     

          <Route path="/IT" element={
            <React.Suspense fallback={<Loading/>}>
            <div>
          <Navbars />
                    
           < IT />
          
          
          {/* <Footer/> */}
          </div>
          </React.Suspense>
        }/>
          <Route path="/Client" element={
            <React.Suspense fallback={<Loading/>}>
            <div>
          <Navbars />
                    
           < Client />
          
          
          {/* <Footer/> */}
          </div>
          </React.Suspense>
        }/>
        
       

        </Routes>
        
    </div>
    
    {/* <Footer/> */}
    </BrowserRouter>
    
  );
}

export default App;
