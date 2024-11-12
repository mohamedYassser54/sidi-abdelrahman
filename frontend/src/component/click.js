import React, { useEffect, useState,useRef } from 'react'
import { useNavigate ,NavLink} from 'react-router-dom'
import stylesr from './css/Click.module.css';
// import imgPhone from './image/10.png'; 
// import imgPrinter from  './image/printer.png';
// import img from  './image/8.png';
// import img1 from  './image/9.png';
// import img2 from  './image/10.png';
// import img3 from  './image/11.png';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

function Click() {
  

    // const [selectedDevice, setSelectedDevice] = useState(null);
    // const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [formData, setData] = useState({
      name: "",
      price: "",
    });
    const [report, setReport] = useState('');
    const { t, i18n } = useTranslation();
  
    // const handleDepartmentChange = (Department) => {
    //   setSelectedDepartment({ Department});
    // };

    // const handleDeviceChange = (device, image) => {
    //   setSelectedDevice({ device, image });
    // };
  
    const handleReportChange = (e) => {
      setReport(e.target.value);
    };


  const navigate = useNavigate();

  //    useEffect(() => {
  
  //   const login = Cookies.get('login');
  //   if (login !== 'true') {
      
  //     navigate('/signin');
  //   }
  // }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const username = Cookies.get('username'); 
    
        const data = {
          // device: selectedDevice.device,
          // image: selectedDevice.image,
          // Department: selectedDepartment.Department,
          name: formData.name,
          price: formData.price,
          report: report,
          username: username,
          date: new Date().toISOString()
        };
    
        fetch('https://elfarida-server.vercel.app/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);


          setReport('');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      // window.location.reload()
      };
    
  
    return (
    
    <div className={stylesr.allclick} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", flexDirection: "column", }}>
        <form className={stylesr.arddds} onSubmit={handleSubmit}>
          <div className={stylesr.flexx}>
          <input type="text" placeholder='اسم  الشخص' required  onChange={(e) => setData({ ...formData, name: e.target.value })} value={formData.name}/>
          <input type="number" placeholder='الفلوس' required  onChange={(e) => setData({ ...formData, price: e.target.value })} value={formData.price}/>
          {/* <input type="text" /> */}
          </div>
          
          <textarea 
            value={report}
            onChange={handleReportChange}
            placeholder={t("اكتب التقرير هنا" )}
            className={stylesr.textareaa} 
          />
          
          
          <button type="submit" className={stylesr.btn}>{t("ارسال")}</button>
        </form>
      </div>
    );
  }
  
  export default Click;