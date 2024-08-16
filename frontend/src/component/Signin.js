import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
// import img2 from './image/model.png';
// import img3 from './image/left.png';
// import img4 from './image/left2.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from "./css/signup.module.css";
import { useTranslation } from 'react-i18next';

function Signin() {
  const { t, i18n } = useTranslation();

  const [login, setLogin] = useState(false);
  const [formData, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = Cookies.get('login');
    if (loggedIn === 'true') {
      setLogin(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://technical-support-seven.vercel.app/loginDoctor', formData);
      const responseData = response.data;
  
      if (responseData && responseData.Message === "Logged in successfully") {
        alert("Data is correct");
        Cookies.set('login', true, { expires: 7 * 24 });
        Cookies.set('username', formData.username, { expires: 7 * 24 });
        setLogin(true);
        navigate("/Reports");
      } else {
        alert("Wrong password or email");
      }
      console.log(response);
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  useEffect(() => {
    document.body.classList.add(styles.signinBody);
    return () => {
      document.body.classList.remove(styles.signinBody);
    };
  }, []);

  const [imageMoved, setImageMoved] = useState(false);

  const handleInputFocus = () => {
    setImageMoved(true);
  };
  const handleInputFocus2 = () => {
    setImageMoved(false);
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.signbox}>
        {/* <span className={styles.iconimage}>
          <img src={img3} alt="" className={imageMoved ? styles.moved : ''} style={{ boxShadow: "none", width: "23px", height: "23px", position: "relative", left: "60px", top: "60px" }} />
          <img src={img2} alt="" />
          <img src={img4} alt="" className={imageMoved ? styles.moved : ''} style={{ boxShadow: "none", width: "23px", height: "23px", position: "relative", right: "60px", top: "60px" }} />
        </span> */}
        <h1>{t("تسجيل الدخول")} </h1>
        <div>
          {login ? (
            navigate("/home")
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className={styles.inp}>
                  <input
                    type="username"
                    placeholder={t("اسم المستخدم")}
                    name="username"
                    required
                    value={formData.username}
                    onChange={(e) => setData({ ...formData, username: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder={t("كلمة السر")}
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) => setData({ ...formData, password: e.target.value })}
                    onFocus={handleInputFocus}
                    onBlur={handleInputFocus2}
                  />
                </div>
                <div className={styles.btn}>
                  <button type="submit" name="submit">{t("تسجيل الدخول")}</button>
                </div>
              </form>
            
            </>
          )}
        </div>
      </div>
      
    </div>
    <NavLink className="btnlink" to="/home">
<button>
    
    <span class="circle1"></span>
    <span class="circle2"></span>
    <span class="circle3"></span>
    <span class="circle4"></span>
    <span class="circle5"></span>
    <span class="text">{t("الرئيسية")}</span>
</button>
</NavLink>
    </>
  );
}

export default Signin;
