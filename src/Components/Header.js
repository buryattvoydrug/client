import React, { useState } from 'react'
import { Button, Dimensions } from 'react-native-web';
import { Link } from 'react-router-dom';
import '../scss/Components/Header.scss'
import Alert from './Alert';
import CalendarButton from '../Components/CalendarButton'
import { CSSTransition } from 'react-transition-group';
const windowWidth = Dimensions.get('window').width;

export default function Header() {
  const [menu, setMenu] = useState(false)

  const toggleMenu=()=>{
    setMenu(!menu)
    if (document.body.style.overflowY !== "hidden") {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }
  return (
    <>
      <
        ader className={menu?"active_header":''}>
        <Link to="/"  className="logo">
          <strong>Центр бокса</strong> НИТУ МИСиС
        </Link>
        {windowWidth<1024? 
        <nav>
          <div className="lang__button">
            <img src="/images/en.png" alt="" />
          </div>
          <button className={menu?"nav__button active__button":"nav__button"} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </nav>
        :
        <nav className="menu">
          <ul className="nav">
            <li className="nav__link schedule__link"><Link to="/расписание">Расписание занятий</Link></li>
            <li className="nav__link "><Link to="/новости">Новости</Link></li>
            <li className="nav__link "><Link to="/онас">О нас</Link></li>
            <li className="nav__link "><Link to="/контакты">Контакты</Link></li>
          </ul>
          {/* <div className="lang__button">
            <img src="/images/en.png" alt="" />
          </div> */}
        </nav>
        }
          <CSSTransition
                in={menu}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
          <nav className="menu">
            <ul className="nav">
              <li onClick={toggleMenu} className="nav__link "><Link to="/">Главная</Link></li>
              <li onClick={toggleMenu} className="nav__link "><Link to="/онас">О нас</Link></li>
              <li onClick={toggleMenu} className="nav__link "><Link to="/новости">Новости</Link></li>
              <li onClick={toggleMenu} className="nav__link "><Link to="/контакты">Контакты</Link></li>
              <li onClick={toggleMenu} className="nav__link schedule__link"><Link to="/календарь">Календарь</Link></li>
            </ul>
            <Alert/>
            <div onClick={toggleMenu}><CalendarButton/></div>
            {/* <div className="lang__button">
              <img src="/images/en.png" alt="" />
            </div> */}
          </nav>
        </CSSTransition>
      </>
    </>
  )
}
