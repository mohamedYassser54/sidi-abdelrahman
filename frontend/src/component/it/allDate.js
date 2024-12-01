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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const amiriFontUrl = '/fonts/Cairo-VariableFont_slnt,wght.ttf'; 

const MyVerticallyCenteredModal = ({ show, onHide, doctorData }) => {

  const [services, setServices] = useState([]); // لتخزين البيانات من API
  const [searchTerm, setSearchTerm] = useState(''); // لتخزين النص المدخل في البحث


  
  const downloadReport = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    try {
        const fontBytes = await fetch(amiriFontUrl).then(res => {
            if (!res.ok) {
                throw new Error('Failed to load font');
            }
            return res.arrayBuffer();
        });

        console.log('Font loaded successfully');

        const arabicFont = await pdfDoc.embedFont(fontBytes, { subset: true });

        let page = pdfDoc.addPage([1000, 1400]);
        let yPosition = 1350;

        const drawText = (text, fontSize) => {
            page.drawText(text, {
                x: 50,
                y: yPosition,
                size: fontSize,
                font: arabicFont,
                color: rgb(0, 0, 0),
                maxWidth: 900,
            });
            yPosition -= fontSize + 15;
        };

        drawText('التقرير', 28);

        doctorData.forEach((item, i) => {
            if (yPosition < 150) {
                page = pdfDoc.addPage([1000, 1400]);
                yPosition = 1350;
                drawText('التقرير', 28);
            }

            const formattedDateTime = new Date(item.date).toLocaleString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

            drawText(`اسم الشخص: ${item.name}`, 20);
            drawText(`الفلوس: ${item.price}`, 20);
            drawText(`التاريخ: ${formattedDateTime}`, 20);
            page.drawLine({
              start: { x: 50, y: yPosition },
              end: { x: 950, y: yPosition },
              thickness: 2,
              color: rgb(0, 0, 0),
            });
            yPosition -= 30;
            drawText(`التقرير: ${item.text}`, 18);
        });

        const pdfBytes = await pdfDoc.save();
        console.log('PDF bytes created successfully');
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        console.log('Blob created successfully');
        
        saveAs(blob, 'report.pdf');

        console.log('PDF downloaded successfully');
    } catch (error) {
        console.error('Error creating PDF:', error);
    }
};

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
        <Button onClick={downloadReport} style={{ background: "#500c7f", border: "none" }}>Download PDF</Button>

      </Modal.Footer>
    </Modal>
  );
};

function AllDate() {
  const [services, setServices] = useState([]); // لتخزين البيانات من API
  const [searchTerm, setSearchTerm] = useState(''); // لتخزين النص المدخل في البحث


  const [status, setStatus] = useState(null);

  const [selectedDay, setSelectedDay] = useState('');



  const [selectedDate, setSelectedDate] = useState("");



  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState([]);
  const navigate = useNavigate();
  const [hiddenReports, setHiddenReports] = useState([]);

  const onHide = () => setModalShow(false);



// الحاله
 const updateStatus = async (userId, attendance) => {
  try {
    const response = await fetch('https://elfarida-server.vercel.app/updateAttendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, attendance }),
    });

    if (response.ok) {
      setStatus(attendance ? 'present' : 'absent');
    } else {
      console.error('Failed to update attendance');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// اختيار اليوم
const handleDayChange = (event) => {
  setSelectedDay(event.target.value);
};

// اختيار التاريخ
const handleDateChange = (e) => {
  setSelectedDate(e.target.value);
};



  useEffect(() => {
    fetch('https://elfarida-server.vercel.app/getuser')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
          setServices(data);

        } else {
          console.error('Expected data to be an array, but got:', data);
        }
      })
      .catch(err => console.log(err));

    const savedHiddenReports = localStorage.getItem('hiddenReportsss');
    if (savedHiddenReports) {
      setHiddenReports(JSON.parse(savedHiddenReports));
    }
  }, []);

   // تصفية البيانات بناءً على البحث
  //  const filteredServices = data.filter((service) =>
  //   service.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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

  // const handleHideReport = (id) => {
  //   const updatedHiddenReports = [...hiddenReports, id];
  //   setHiddenReports(updatedHiddenReports);
  //   localStorage.setItem('hiddenReports', JSON.stringify(updatedHiddenReports));
  // };
  const grandTotal = Object.keys(groupedData).reduce((total, name) => {
    const groupTotal = groupedData[name]
      .filter(item => !hiddenReports.includes(item.id)) 
      .reduce((sum, item) => sum + parseFloat(item.price), 0); 
    return total + groupTotal;
  }, 0);
  // const TotalClient = Object.keys(groupedData).reduce((total, name) => {
  //   const groupTotal = groupedData[name]
  //     .filter(item => !hiddenReports.includes(item.id)) 
  //     .reduce((sum, item) => sum + parseFloat(item.price), 0); 
  //   return total + groupTotal;
  // }, 0);
  return (
    <>

      {/* <div className={styleess.nav}> */}
        {/* <img src={img} alt="Icon" /> */}
        {/* <h5>El farida</h5>
      </div> */}
      <div className={styleess.bodyenplo}>
        <div className={styleess.tablee}>
          <div className={styleess.allsearch}>
            <h1>El farida</h1>
          
          <Form inline className='Search'>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" mr-sm-2 "
            />
          </Col>
          <Col xs="auto">
          {/* <Button type="submit" onClick={(e) => e.preventDefault()}>
          Submit
          </Button> */}
          </Col>
        </Row>
        
      </Form>

      <div>
      <label htmlFor="date-picker">اختر التاريخ:</label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {selectedDate && <p>التاريخ المختار: {selectedDate}</p>}
    </div>


      <div className={styleess.option}>
          <div className={styleess.selectbox}>
            <select className="option"
             value={selectedDay} 
             onChange={handleDayChange}
             defaultValue="">

              <option value="" disabled hidden>ايام السبوع</option>
              <option value="السبت">السبت</option>
              <option value="الأحد">الأحد</option>
              <option value="الأثنين">الأثنين</option>
              <option value="الثلاثاء">الثلاثاء</option>
              <option value="الاربعاء">الاربعاء</option>
              <option value="الخميس">الخميس</option>
            </select>
          </div>
        </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>لاسم</th>
                <th>الدكتور</th>
                <th>الفلوس</th>
                <th>الوقت</th>
                <th>رقم الهاتف</th>
                <th>اليوم</th>
                <th>التاريخ</th>
                <th>الحاله </th>
                {/* <th>تم دفع</th> */}
                {/* <th>اخفاء</th> */}
              </tr>
            </thead>
            
            <tbody>
    {Object.keys(groupedData).map(name => {
      const totalPrice = groupedData[name]
        .filter(item => !hiddenReports.includes(item.id)) 
        .reduce((sum, item) => sum + parseFloat(item.price), 0); 

      return (
        <React.Fragment key={name}>
          <tr>
            {/* <td colSpan="6">{name}</td> */}
          </tr>
          {groupedData[name]
  .filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) && 
     (selectedDay === '' || item.week === selectedDay)&&
     (selectedDate === '' || item.date === selectedDate)

  )
  .map((item) => 
    !hiddenReports.includes(item.id) && (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.username}</td>
        <td>{item.doctor}</td>
        <td>{item.price} LE</td>
        <td
  style={{
    color: (() => {
      const itemTime = new Date(); 
      const [hours, minutes] = item.time.split(':').map(Number); // استخراج الساعات والدقائق من `item.time`
      itemTime.setHours(hours, minutes, 0, 0); // إعداد وقت الشخص

      const currentTime = new Date(); // الوقت الحالي

      // حساب الفرق بالدقائق
      const diffInMinutes = (currentTime - itemTime) / 60000; 

      // إذا كان الوقت الحالي ضمن الفترة (0 إلى 5 دقائق)
      return diffInMinutes >= 0 && diffInMinutes <= 5 ? 'green' : 'black';
    })()
  }}
>
  {new Date(`1970-01-01T${item.time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}
</td>



        <td>{item.number} </td>
        <td>{item.week} </td>
        <td>{item.date} </td>

        <td>
  <button
    className={`${styleess.btnst} ${item.attendance === 1 ? styleess.green : ''}`}
  >
    تم الحضور
  </button>
  <button
    className={`${styleess.btnst} ${item.absence === 1 ? styleess.red : ''}`}
  >
    معتذر
  </button>
</td>



        {/* <td className='btnreport'>
          <Button 
            style={{ border: "none" }} 
            onClick={() => handleShowReports(item.id)}
          >
            Report
          </Button>
        </td> */}
        {/* <td>{formatDate(item.date)}</td> */}
        {/* <td>{item.price} LE</td> */}
        <td>
          {/* Uncomment the following button if needed */}
          {/* <Button onClick={() => handleHideReport(item.id)}>Hide</Button> */}
        </td>
      </tr>
    )
  )
}

          
          {/* <tr>
            <td colSpan="2">Total Price for {name}:</td>
            <td>{totalPrice} LE</td>
            <td colSpan="3"></td>
          </tr> */}
        </React.Fragment>
      );
    })}
    {/* Render the grand total */}
    {/* <tr>
      <td colSpan="2"> Total Cost:</td>
      <td>{grandTotal} LE</td>
      <td colSpan="3"></td>
    </tr> */}
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

export default AllDate;
