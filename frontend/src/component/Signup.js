import React,{useEffect, useState} from 'react'
import axios from 'axios';
// import Img from "./css/w.png"
import styles from "./css/signup.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
function Signup() {
  useEffect(()=>{
    $('#numberma').mask('000 0000 0000');
  }, []);
  const [formData,setData] = useState({
    username: "",
    email:"",
    password:"",
    number:"",
    country:"",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('https://fashion-server-mu.vercel.app/signup', formData)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.Message === "User already exists") {
          alert("User already exists");
         
          navigate('/signin');
        } else {
          navigate('/signin');
          alert("Data Inserted Successfully");
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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inp}>
          <input type="text" placeholder="Name" name="username" spellCheck="false" required onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" required onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" required onChange={handleChange} />
          <input type="text" placeholder="Mobile number" id="numberma" name="number" required onChange={handleChange} />
        </div>

        <div className={styles.option}>
          <div className={styles.selectbox}>
            <select className="option" name="country" required onChange={handleChange} defaultValue="">
              <option value="" disabled hidden>Select your governorate</option>
              <option value="Smouha">Smouha</option>
              <option value="Muharram Bey">Muharram Bey</option>
              <option value="Sidi Bishr">Sidi Bishr</option>
              <option value="Ibrahimiyyah">Ibrahimiyyah</option>
              <option value="Victoria">Victoria</option>
              <option value="Sporting">Sporting</option>
              <option value="Sidi Gaber">Sidi Gaber</option>
              <option value="Al-Mansheya">Al-Mansheya</option>
            </select>
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Register</button>
        </div>
        <div className={styles.texts}>
          <span> Already have an account? </span>
          <strong><NavLink to="/Signin">Sign in</NavLink> Here</strong>
        </div>
      </form>
    </div>
  </div>
);
}

export default Signup;


