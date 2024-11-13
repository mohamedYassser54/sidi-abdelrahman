import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Container, Nav, Form, Button } from 'react-bootstrap';
import {NavLink,useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import './css/Navbars.css';
import Img from './image/icon.png'
// import Img1 from './image/earth.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const  Navbars = ({size}) => {
  const [login, setLogin] = useState(false);
  const [filter ,setFilter] = useState('');
  const navigator = useNavigate ()
  


  
  // useTranslation
  const { t, i18n } = useTranslation();
  const changeEn = () =>{
    i18n.changeLanguage('en')
}
const changeFr = () =>{
    i18n.changeLanguage('ar')
}


  const handleRemove = () =>{
    Cookies.remove("login");
    setLogin(false);
    navigator("/Signin")
    window.location.reload()
  }

  return (
    
    <Navbar expand="lg" className=" navbar navbar-dark ">
      <Container fluid>
        <NavLink to="/">
        <Navbar.Brand  className='icon' >
        <img
              alt=""
              src={Img}
              width="50"
              height="50"
              className="d-inline-block align-top br-5"
            />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll " className="Toggle"  />
        <Navbar.Collapse id="navbarScroll ">
          <Nav className="mr-auto  mx-auto my-lg-0 " style={{ maxHeight: '100px'}} navbarScroll>
            <NavLink to="/" className="NavLink"  >{t("الرئيسية")}</NavLink>
           
          
            <NavLink to="/Reports" className="NavLink">
            {t("رفع  التقرير ")}
            </NavLink>
            <NavLink to="/it" className="NavLink">
            {t("التقارير")}
            </NavLink>
            {/* <NavLink to="/Client" className="NavLink">
            {t("بيانات العميل ")}
            </NavLink> */}
            {/* <NavLink to="/Department" className="NavLink">
            {t("الاقسام")}
            </NavLink> */}
            {/* <NavLink to="/chatbot" className="NavLink">
            {t("الدعم")}
            </NavLink> */}
            {/* <NavLink  className="NavLink" onClick={handleRemove}>{t("تسجيل خروج")}</NavLink> */}
            {/* <DropdownButton
      id="dropdown-item-button"
      title={<img src={Img1} alt="Dropdown" className="dropdown-img" />}
      className="dropdown-button"
      variant="link"
    >
      <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
      <Dropdown.Item as="button" onClick={changeFr}>{t("Arabic")}</Dropdown.Item>
      <Dropdown.Item as="button" onClick={changeEn}>{t("English")}</Dropdown.Item>
      <Dropdown.Item as="button">Something else</Dropdown.Item>
    </DropdownButton> */}

            {/* <NavLink className="NavLink" onClick={changeFr}>{t("Arabic")}</NavLink>
            <NavLink className="NavLink" onClick={changeEn}>{t("English")}</NavLink> */}
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
}

export default Navbars;
