import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styleess from './cssemp/employee.module.css';
// import img from '../image/icon.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import fontkit from '@pdf-lib/fontkit';

const amiriFontUrl = '/fonts/Cairo-VariableFont_slnt,wght.ttf'; 

const MyVerticallyCenteredModal = ({ show, onHide, doctorData }) => {
  
//   const downloadReport = async () => {
//     const pdfDoc = await PDFDocument.create();
//     pdfDoc.registerFontkit(fontkit);

//     try {
//         const fontBytes = await fetch(amiriFontUrl).then(res => {
//             if (!res.ok) {
//                 throw new Error('Failed to load font');
//             }
//             return res.arrayBuffer();
//         });

//         console.log('Font loaded successfully');

//         const arabicFont = await pdfDoc.embedFont(fontBytes, { subset: true });

//         let page = pdfDoc.addPage([1000, 1400]);
//         let yPosition = 1350;

//         const drawText = (text, fontSize) => {
//             page.drawText(text, {
//                 x: 50,
//                 y: yPosition,
//                 size: fontSize,
//                 font: arabicFont,
//                 color: rgb(0, 0, 0),
//                 maxWidth: 900,
//             });
//             yPosition -= fontSize + 15;
//         };

//         drawText('التقرير', 28);

//         doctorData.forEach((item, i) => {
//             if (yPosition < 150) {
//                 page = pdfDoc.addPage([1000, 1400]);
//                 yPosition = 1350;
//                 drawText('التقرير', 28);
//             }

//             const formattedDateTime = new Date(item.date).toLocaleString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

//             drawText(`اسم الشخص: ${item.name}`, 20);
//             drawText(`الفلوس: ${item.price}`, 20);
//             drawText(`التاريخ: ${formattedDateTime}`, 20);
//             page.drawLine({
//               start: { x: 50, y: yPosition },
//               end: { x: 950, y: yPosition },
//               thickness: 2,
//               color: rgb(0, 0, 0),
//             });
//             yPosition -= 30;
//             drawText(`التقرير: ${item.text}`, 18);
//         });

//         const pdfBytes = await pdfDoc.save();
//         console.log('PDF bytes created successfully');
        
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         console.log('Blob created successfully');
        
//         saveAs(blob, 'report.pdf');

//         console.log('PDF downloaded successfully');
//     } catch (error) {
//         console.error('Error creating PDF:', error);
//     }
// };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{ color: "#500c7f" }}>
        Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {doctorData.map((item, i) => (
          <div key={i}>{item.text}</div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} style={{ background: "#500c7f", border: "none" }}>Close</Button>
        {/* <Button onClick={downloadReport} style={{ background: "#500c7f", border: "none" }}>Download PDF</Button> */}

      </Modal.Footer>
    </Modal>
  );
};

function Employee() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState([]);
  const navigate = useNavigate();
  const [hiddenReports, setHiddenReports] = useState([]);

  const onHide = () => setModalShow(false);

 
  const fetchData = async () => {
    try {
      const res = await fetch('https://elfarida-server.vercel.app/services');
      const data = await res.json();
  
      if (Array.isArray(data)) {
        // تصفية البيانات حسب القيمة hidden
        const filteredData = data.filter(item => item.hidden !== 1);
        setData(filteredData); // تعيين البيانات المصفاة
      } else {
        console.error('Expected data to be an array, but got:', data);
      }
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };
  

  const groupDataByUsername = (data) => {
    if (!Array.isArray(data)) {
      console.error('Expected data to be an array, but got:', data);
      return {};
    }
    
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.name]) {
        groupedData[item.name] = [item];
      } else {
        groupedData[item.name].push(item);
      }
    });
    return groupedData;
  };

  const groupedData = groupDataByUsername(data);

  // const handleRemove = async (id) => {
  //   try {
  //     await axios.delete(`https://elfarida-server.vercel.app/removetest/${id}`);
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Error deleting record:", err);
  //   }
  // };

  const handleShowReports = (reportId) => {
    const selectedReport = data.find(item => item.id === reportId);
    setSelectedDoctorData(selectedReport ? [selectedReport] : []);
    setModalShow(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



 const handleHideReport = async (id) => {
  console.log('Attempting to hide report with ID:', id);

  try {
    const response = await fetch(`https://elfarida-server.vercel.app/hideReport/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hidden: 1 }),
    });

    if (response.ok) {
      console.log('Report hidden successfully');
      setHiddenReports((prev) => [...prev, id]);
      // حفظ الحالة في localStorage أو sessionStorage
      localStorage.setItem('hiddenReports', JSON.stringify([...hiddenReports, id]));
      fetchData(); // إعادة تحميل البيانات بعد التحديث
    } else {
      const errorText = await response.text();
      console.error('Server error:', errorText);
    }
  } catch (error) {
    console.error('Failed to hide report:', error);
  }
};
useEffect(() => {
  const savedHiddenReports = localStorage.getItem('hiddenReports');
  if (savedHiddenReports) {
    setHiddenReports(JSON.parse(savedHiddenReports));
  }

  fetchData(); // تحميل البيانات عند بداية الجلسة
}, []);

  
  

  const grandTotal = Object.keys(groupedData).reduce((total, name) => {
    const groupTotal = groupedData[name]
      .filter(item => !hiddenReports.includes(item.id)) 
      .reduce((sum, item) => sum + parseFloat(item.price), 0); 
    return total + groupTotal;
  }, 0);
  return (
    <>
      {/* <div className={styleess.nav}> */}
        {/* <img src={img} alt="Icon" /> */}
        {/* <h5>El farida</h5> */}
      {/* </div> */}
      <div className={styleess.bodyenplo}>
        <div className={styleess.tablee}>
          <h1 className={styleess.h1}>
          El farida
                <h1> Mohamed</h1>
          </h1>
          <table>
            <thead>
              <tr>
                <th>id</th>
                {/* <th>لاسم</th> */}
                <th>الفلوس</th>
                <th>التقرير</th>
                <th>التاريخ</th>
                <th>اخفاء</th>
              </tr>
            </thead>
            
            <tbody>
    {Object.keys(groupedData).map(name => {
      const totalPrice = groupedData[name]
      .filter(item => item.hidden !== 1) // تصفية البيانات المخفية
      .reduce((sum, item) => sum + parseFloat(item.price), 0);

      return (
        <React.Fragment key={name}>
          <tr>
            <td colSpan="6">{name}</td>
          </tr>
          {groupedData[name].map(item => (
          item.hidden !== 1 && ( // عرض البيانات غير المخفية فقط
              <tr key={item.id}>
                <td>{item.id}</td>
                {/* <td>{item.name}</td> */}
                <td>{item.price} LE</td>
                <td>
                  <Button 
                      style={{ border: "none" }} 
                      onClick={() => handleShowReports(item.id)}
                  >
                    Report
                  </Button>
                </td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <Button onClick={() => handleHideReport(item.id)}>Hide</Button>
                </td>
              </tr>
            )
          ))}
          {/* <tr>
            <td colSpan="2">Total Price for {name}:</td>
            <td>{totalPrice} LE</td>
            <td colSpan="3"></td>
          </tr> */}
        </React.Fragment>
      );
    })}
    {/* Render the grand total */}
    <tr>
      <td colSpan="2"> Total Cost:</td>
      <td>{grandTotal} LE</td>
      <td colSpan="3"></td>
    </tr>
  </tbody>
          </table>
        </div>
      </div>
      <MyVerticallyCenteredModal 
        show={modalShow} 
        onHide={onHide} 
        doctorData={selectedDoctorData} 
      />
    </>
  );
}

export default Employee;