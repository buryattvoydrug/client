import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/NewsItem.scss'
import {newsContext} from '../context/newsContext'
import Scroll from 'react-scroll';
import { Context } from '../context/Context'

var scroll = Scroll.animateScroll;



export default function NewsItem({widget,wide,widenews,post}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  const [show, setShow] = useState(false)
  const [popup, setPopup] = useState(false)
  const [postToEdit,setPostToEdit]=useContext(newsContext)

  setTimeout(()=>setShow(true),500)

  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/posts/${post._id}`);
      window.location.replace("/новости");
    } catch (err) {}
  };
  const handleEdit = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${post._id}`);
      setPostToEdit(res)
    } catch (err) {}
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  };
  return (
    <>
      {widenews?
        <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
            <div className="news__item widenews__item">
              <img src={"/images/"+post.photo} alt="" className="news__img" />
              {/* <img src="/images/item.jpg" alt="" className="news__img" /> */}
              <div className="news__block">
                <h3 className="news__title">{post.title}</h3>
                <p className="news__text">{post.text}</p>
                {/* <h3 className="news__title">Выпускник НИТУ «МИСиС» Андрей Замковой — бронзовый призер Олимпиады в Токио</h3> */}
                {/* <p className="news__text">Российский боксер Андрей Замковой завоевал для страны 39-ю медаль Олимпийских игр в Токио.</p> */}
              </div>
              {!widget && user && <><button onClick={()=>setPopup(true)} className="delete">Удалить</button>
              <button onClick={handleEdit} className="edit">Ред.</button></>}
              <CSSTransition
                in={popup}
                timeout={1000}
                classNames="popup"
                unmountOnExit>
                <div>
                  <div className="delete_pop_up">
                    <h4>Вы действительно хотите удалить новость?</h4>
                    <div className="buttons">
                      <button onClick={handleDelete} className="popup__button">Да</button>
                      <button  onClick={()=>setPopup(false)} className="popup__button">Нет</button>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            </div>
      </CSSTransition>
      :
      <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
          <div  className={wide? "news__item wide_news__item":" news__item"}>
            <img src={"/images/"+post.photo} alt="" className="news__img" />
            <h3 className="news__title">{post.title}</h3>
            <p className="news__text">{post.text}</p>
            {!widget && user && <><button onClick={()=>setPopup(true)} className="delete">Удалить</button>
              <button onClick={handleEdit} className="edit">Ред.</button></>}
            <CSSTransition
                in={popup}
                timeout={1000}
                classNames="popup"
                unmountOnExit>
                <div>
                  <div className="delete_pop_up">
                    <h4>Вы действительно хотите удалить новость?</h4>
                    <div className="buttons">
                      <button onClick={handleDelete} className="popup__button">Да</button>
                      <button  onClick={()=>setPopup(false)} className="popup__button">Нет</button>
                    </div>
                  </div>
                </div>
              </CSSTransition>
          </div>
          
      </CSSTransition>}
      
    </>
  )
}
