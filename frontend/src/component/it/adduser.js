import React,{useEffect, useState} from 'react'
import axios from 'axios';
// import Img from "./css/w.png"
import styles from "../css/signup.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
function Employeetable() {
  useEffect(()=>{
    $('#numberma').mask('000 0000 0000');
  }, []);
  const [formData,setData] = useState({
    username: "",
    doctor: "",
    price:"",
    time:"",
    number:"",
    week:"",
    date:"",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('https://elfarida-server.vercel.app/adduser', formData)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.Message === "User already exists") {
          alert("User already exists");
          navigate('/Employeetable');
        } else {
          // navigate('/signin');
          alert("Data Inserted Successfully");
         window.location.reload()

        }
      })
      .catch((err) => console.log(err));
  };
 useEffect(()=>{
  document.body.classList.add(styles.signinBody);

  return()=>{
    document.body.classList.remove(styles.signinBody);
  }
 },[])
  return (
    <div className={styles.container}>
    <div className={styles.signbox}>
      <span className={styles.iconimage}>
        {/* <img src={Img} alt="" /> */}
      </span>
      <h1>add client</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inp}>
          <input type="text" placeholder="Name" name="username" spellCheck="false" required onChange={handleChange} />
          <input type="text" placeholder="Price" name="price" required onChange={handleChange} />
          <input type="time" placeholder="time" name="time" required onChange={handleChange} />
          <input type="text" placeholder="Mobile number" id="numberma" name="number" required onChange={handleChange} />
          <input type="date" placeholder="date"  name="date" required onChange={handleChange} />
        </div>

        <div className={styles.option}>
          <div className={styles.selectbox}>
            <select className="option" name="doctor" required onChange={handleChange} defaultValue="">
              <option value="" disabled hidden>Doctor</option>
              <option value="احمد">احمد</option>
              <option value="مروه">مروه</option>
              <option value="رشا">رشا</option>
              <option value="سلمي">سلمي</option>
              <option value="هاجر">هاجر</option>
              <option value="هدي">هدي</option>
            </select>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.selectbox}>
            <select className="option" name="week" required onChange={handleChange} defaultValue="">
              <option value="" disabled hidden>week</option>
              <option value="السبت">السبت</option>
              <option value="الأحد">الأحد</option>
              <option value="الأثنين">الأثنين</option>
              <option value="الثلاثاء">الثلاثاء</option>
              <option value="الاربعاء">الاربعاء</option>
              <option value="الخميس">الخميس</option>
            </select>
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Register</button>
        </div>
       
      </form>
    </div>
  </div>
);
}

export default Employeetable;


