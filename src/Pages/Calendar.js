import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native-web';
import { CSSTransition } from 'react-transition-group';
import Sidebar from '../Components/Sidebar';
import { Context } from '../context/Context';
import '../scss/Pages/Calendar.scss'
const windowWidth = Dimensions.get('window').width;

function CalendarAdmin() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      place,
      date
    };
    try {
      const res = await axiosInstance.post("/events", newPost);
      window.location.replace("/календарь");
    } catch (err) {}
  };
  return (
    <>
      <div className="admin">
        <h1 className="page__title">Админ. панель/Календарь</h1>
        <div className="panel">
          <div className="calendar__panel">
            <h3 className="panel__title">Добавить событие</h3>
            <form onSubmit={handleSubmit}>
              <div className="input__item">
                <label className="input__label">Название события
                    <textarea onChange={e=>{setTitle(e.target.value)}} placeholder="Чемпионат России по боксу" rows={3}>
                    </textarea>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Место проведения
                    <input onChange={e=>{setPlace(e.target.value)}} placeholder="город Тула" type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Дата
                    <input onChange={e=>{setDate(e.target.value)}} placeholder="12.01.2021" type="text" />
                </label>
              </div>
              <button type="submit" className="save__button">Сохранить</button>
            </form>
          </div>

          <hr />
        </div>
      </div>
    </>
  )
}
function CalendarItem({item}){
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  const [popup, setPopup] = useState(false)
  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/events/${item._id}`);
      window.location.replace("/календарь");
    } catch (err) {}
  };
  return(
    <>
            <div className="calendar__item">
              <span><strong>{item.title}</strong></span>
              <span>{item.place}</span>
              <span>{item.date}</span>
              {user && <button onClick={()=>setPopup(true)} className="delete">Удалить</button>}
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
    </>
  )
}
function Month({itemsToShow,i}) {
  const [show, setShow] = useState(false)
  setTimeout(()=>setShow(true),500)
  return (
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="month">
        <h3 className="month__title">{itemsToShow[i][0].monthTitle}</h3>
        <hr />
        <div className="calendar-block">
          {itemsToShow[i].map((item,index)=>(
            <CalendarItem item={item}/>
          ))}
        </div>
      </div>
      </CSSTransition>
    </>
  )
}
export default function Calendar() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [show, setShow] = useState(false)
  // setTimeout(()=>setShow(true),500)
  
  const [events, setEvents] = useState([])
  const [main, setMain] = useState([])
  const [posts, setPosts] = useState([]);

  const monthesNames =['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/events");
      setEvents(res.data);
      const res2 = await axiosInstance.get("/main");
      setMain(res2.data);
      const res3 = await axiosInstance.get("/posts");
      setPosts(res3.data);
    };
    fetchPosts();
  },[]);
  useEffect(()=>{
    setShow(main && events && posts[0])
  },[main,events,posts])

  const monthes=[]
  if(events){
    events.map(function(item){
      let tmp=item.date.split('.')
      let num = Number(tmp[1])
      item.numDate=Number(tmp[2]+tmp[1]+tmp[0])
      item.monthTitle=monthesNames[num-1]+' '+tmp[2]
      monthes.push(item.monthTitle)
    })
  }
  events.sort((prev, next) => next.numDate - prev.numDate);
  const monthesUniq=monthes.filter(function(item, pos) {
    return monthes.indexOf(item) == pos;
  })
  let itemsToShow=[]
  monthesUniq.map((item,index)=>(
    itemsToShow.push(events.filter(i=>i.monthTitle===item))
  ))
  console.log(itemsToShow)
  return (
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="page-container calendar-page">
      
          <div className="content">
            {admin && <CalendarAdmin />}
            <h1 className="page__title">
              <span>Календарь событий</span>
              <img src="/images/calendar.svg" alt="" />
            </h1>
            <div className="calendar">
              {itemsToShow.map((arr,i)=>(
                <Month itemsToShow={itemsToShow} i={i}/>
              ))}
            </div>
          </div>
        {!(windowWidth < 1280) && main[0] && posts[0] && <Sidebar posts={posts} alert={main[0].alert} contacts slimmain={windowWidth < 1440} />}
      </div>
      </CSSTransition>
    </>
  )
}
