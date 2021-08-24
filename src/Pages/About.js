import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native-web';
import { CSSTransition } from 'react-transition-group';
import '../scss/Pages/About.scss'
import Scroll from 'react-scroll';
import { newsContext } from '../context/newsContext';
import { Context } from '../context/Context';

const windowWidth = Dimensions.get('window').width;
var scroll = Scroll.animateScroll;

function StaffAdmin({staffToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [toAdd,settoAdd]=useState(null)
  const openPanelToAdd=()=>{
    settoAdd(true)
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      type,
      name,
      text,
      photo
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/staffs", newPost);
      window.location.replace("/онас");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      type,
      name,
      text
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
       await axiosInstance.put(`/staffs/${staffToEdit.data._id}`, {
        type:newPost.type,
        name:newPost.name,
        text:newPost.text,
        photo:newPost.photo
      });
      console.log(newPost)
      window.location.replace("/онас");
    } catch (err) {}
  };

  React.useEffect(()=>{
    if(staffToEdit){
      settoAdd(false)
      setType(staffToEdit.data.type)
      setName(staffToEdit.data.name)
      setText(staffToEdit.data.text)
    }
  },[staffToEdit])
  return (
    <>
       <button onClick={openPanelToAdd} className="to__add">+</button>
      {staffToEdit && !toAdd &&
        <div className="admin">
        <h1 className="page__title">Админ. панель/Сотрудники</h1>
        <div className="panel">
          <div className="news__panel">
            <h3 className="panel__title">Изменить сотрудника</h3>
            <form onSubmit={handleUpdate}>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
                {photo? '':
                <>
                  <img src={"/images/"+staffToEdit.data.photo} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <div className="input__item">
                <label className="input__label">Должность
                    <input value={type} onChange={e=>{setType(e.target.value)}} placeholder="директор центра" type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">ФИО
                    <input value={name} onChange={e=>{setName(e.target.value)}} placeholder="Иванов Иван Иванович" type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Текст
                    <textarea value={text} onChange={e=>{setText(e.target.value)}} placeholder="Введите текст" rows="5">
                    </textarea>
                </label>
              </div>
              <button type="submit" className="save__button">Сохранить</button>
            </form>
          </div>
          <hr />
        </div>
      </div>
      }
      <CSSTransition
                in={toAdd}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
        <div className="admin">
          <h1 className="page__title">Админ. панель/Сотрудники</h1>
          <div className="panel">
            <div className="news__panel">
              <h3 className="panel__title">Новый сотрудник</h3>
              <form onSubmit={handleSubmit}>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Должность
                    <input placeholder="директор центра" type="text" onChange={e=>{setType(e.target.value)}}/>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">ФИО
                    <input placeholder="Иванов Иван Иванович" type="text" onChange={e=>{setName(e.target.value)}} />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Текст
                    <textarea placeholder="Введите текст" rows="5" onChange={e=>{setText(e.target.value)}}>
                    </textarea>
                </label>
              </div>
              <button type="submit" className="save__button">Сохранить</button>
            </form>
            </div>
            <hr />
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

function HistoryAdmin({historyToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [toAdd,settoAdd]=useState(null)
  const openPanelToAdd=()=>{
    settoAdd(true)
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      date,
      title,
      text,
      photo
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/histories", newPost);
      window.location.replace("/онас");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      date,
      title,
      text
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
       await axiosInstance.put(`/histories/${historyToEdit.data._id}`, {
        date:newPost.date,
        title:newPost.title,
        text:newPost.text,
        photo:newPost.photo
      });
      console.log(newPost)
      window.location.replace("/онас");
    } catch (err) {}
  };

  React.useEffect(()=>{
    if(historyToEdit){
      settoAdd(false)
      setDate(historyToEdit.data.date)
      setTitle(historyToEdit.data.title)
      setText(historyToEdit.data.text)
    }
  },[historyToEdit])
  return (
    <>
      <button onClick={openPanelToAdd} className="to__add">+</button>
      {historyToEdit && !toAdd &&
      <div className="admin">
        <h1 className="page__title">Админ. панель/История</h1>
        <div className="panel">
          <div className="news__panel">
            <h3 className="panel__title">Изменить событие</h3>
            <form onSubmit={handleUpdate}>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
                {photo? '':
                <>
                  <img src={"/images/"+historyToEdit.data.photo} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <div className="input__item">
                <label className="input__label">Дата
                    <input value={date} placeholder="1976" type="text" onChange={e=>{setDate(e.target.value)}}/>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Заголовок
                    <input value={title} placeholder="Создание центра бокса в МГГУ" type="text" onChange={e=>{setTitle(e.target.value)}}/>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Текст
                    <textarea value={text}  placeholder="Введите текст" rows="10" onChange={e=>{setText(e.target.value)}}>
                    </textarea>
                </label>
              </div>
              <button type="submit" className="save__button">Сохранить</button>
            </form>
          </div>
          <hr />
        </div>
      </div>
      }
      <CSSTransition
                in={toAdd}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
        <div className="admin">
                <h1 className="page__title">Админ. панель/История</h1>
                <div className="panel">
                  <div className="news__panel">
                    <h3 className="panel__title">Добавить событие</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="input__item">
                        <label className="input__label file__upload">
                        {!photo &&<img src="/images/screpka.svg" alt="" />}
                          <span>Фотография {photo && <><br/> загружена</>}</span>
                          <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                        </label>
                      </div>
                      <div className="input__item">
                        <label className="input__label">Дата
                            <input placeholder="1976"  type="text" onChange={e=>{setDate(e.target.value)}}/>
                        </label>
                      </div>
                      <div className="input__item">
                        <label className="input__label">Заголовок
                            <input placeholder="Создание центра бокса в МГГУ" type="text" onChange={e=>{setTitle(e.target.value)}}/>
                        </label>
                      </div>
                      <div className="input__item">
                        <label className="input__label">Текст
                            <textarea placeholder="Введите текст" rows="10" onChange={e=>{setText(e.target.value)}}>
                            </textarea>
                        </label>
                      </div>
                      <button type="submit" className="save__button">Сохранить</button>
                    </form>
                  </div>
                  <hr />
                </div>
              </div>
      </CSSTransition>
    </>
  )
}

function AwardsAdmin({awardToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [title, setTitle] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState('');
  const [part, setPart] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [toAdd,settoAdd]=useState(null)
  const openPanelToAdd=()=>{
    settoAdd(true)
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      gold,
      silver,
      bronze,
      part,
      date,
      photo
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/awards", newPost);
      window.location.replace("/онас");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      gold,
      silver,
      bronze,
      part,
      date
    };
    if (photo) {
      const data =new FormData();
      const filename = Date.now() + photo.name;
      data.append("name", filename);
      data.append("file", photo);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
       await axiosInstance.put(`/awards/${awardToEdit.data._id}`, {
        title:newPost.title,
        gold:newPost.gold,
        silver:newPost.silver,
        bronze:newPost.bronze,
        part:newPost.part,
        date:newPost.date,
        photo:newPost.photo
      });
      console.log(newPost)
      window.location.replace("/онас");
    } catch (err) {}
  };

  React.useEffect(()=>{
    if(awardToEdit){
      settoAdd(false)
      setTitle(awardToEdit.data.title)
      setGold(awardToEdit.data.gold)
      setSilver(awardToEdit.data.silver)
      setBronze(awardToEdit.data.bronze)
      setDate(awardToEdit.data.date)
      setPart(awardToEdit.data.part)
    }
  },[awardToEdit])
  return (
    <>
       <button onClick={openPanelToAdd} className="to__add">+</button>
      {awardToEdit && !toAdd &&
        <div className="admin">
          <h1 className="page__title">Админ. панель/Достижения</h1>
          <div className="panel">
            <div className="awards__panel">
              <h3 className="panel__title">Редактировать достижение</h3>
              <form onSubmit={handleUpdate}>
                <div className="input__item">
                  <label className="input__label file__upload">
                    {!photo &&<img src="/images/screpka.svg" alt="" />}
                    <span>Фотография {photo && <><br/> загружена</>}</span>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                  </label>
                  {photo? '':
                  <>
                    <img src={"/images/"+awardToEdit.data.photo} alt="" className="old__image" />
                    <h5 className="input__label">Текущее изображение</h5>
                  </>
                  }
                </div>
                <div className="input__item">
                  <label className="input__label">Загловок (мероприятие)
                      <input value={title} placeholder="Чемпионат России по боксу в г. Тула" type="text" onChange={e=>{setTitle(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Победители (золото)
                      <input value={gold} placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setGold(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Призеры (серебро)
                      <input value={silver} placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setSilver(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Призёры (бронза)
                      <input value={bronze} placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setBronze(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Участники
                      <textarea value={part}  placeholder="Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий" rows="6" onChange={e=>{setPart(e.target.value)}}>
                      </textarea>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Дата
                      <input value={date} placeholder="01.01.2010" type="text" onChange={e=>{setDate(e.target.value)}}/>
                  </label>
                </div>
                <button type="submit" className="save__button">Сохранить</button>
              </form>
            </div>
            <hr />
          </div>
        </div>
      }
      <CSSTransition
                in={toAdd}
                timeout={1000}
                classNames="trans"
                unmountOnExit>

        <div className="admin">
          <h1 className="page__title">Админ. панель/Достижения</h1>
          <div className="panel">
            <div className="awards__panel">
              <h3 className="panel__title">Новое достижение</h3>
              <form onSubmit={handleSubmit}>
                <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Загловок (мероприятие)
                      <input  placeholder="Чемпионат России по боксу в г. Тула" type="text" onChange={e=>{setTitle(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Победители (золото)
                      <input  placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setGold(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Призеры (серебро)
                      <input  placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setSilver(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Призёры (бронза)
                      <input  placeholder="Иванов Дмитрий, Иванов Дмитрий" type="text" onChange={e=>{setBronze(e.target.value)}}/>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Участники
                      <textarea   placeholder="Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий, Иванов Дмитрий" rows="6" onChange={e=>{setPart(e.target.value)}}>
                      </textarea>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Дата
                      <input value={date} placeholder="01.01.2010" type="text" onChange={e=>{setDate(e.target.value)}}/>
                  </label>
                </div>
                <button type="submit" className="save__button">Сохранить</button>
              </form>
            </div>
            <hr />
          </div>
        </div>

                </CSSTransition>
    </>
  )
}

function PersonCard({staff}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [show, setShow] = useState(false)
  setTimeout(()=>setShow(true),500)

  const [popup, setPopup] = useState(false)
  const [staffToEdit,setStaffToEdit]=useContext( newsContext )

  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/staffs/${staff._id}`);
      window.location.replace("/онас");
    } catch (err) {}
  };
  const handleEdit = async () => {
    try {
      const res = await axiosInstance.get(`/staffs/${staff._id}`);
      setStaffToEdit(res)
    } catch (err) {}
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  };
  const { user } = useContext(Context);
  return (
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
        <div  className="person__card">
          <img src={staff.photo? "/images/"+staff.photo : "/images/person.svg"} alt="" className="person__img" />
          <div className="person-block">
            <span className="person__type">{staff.type}</span>
            <span className="person__name">{staff.name}</span>
          </div>
          <hr />
          <span className="person__text">{staff.text}</span>
          {user && <><button onClick={()=>setPopup(true)} className="delete">Удалить</button>
              <button onClick={handleEdit} className="edit">Ред.</button>
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
              </CSSTransition></>}
        </div>
      </CSSTransition>
      
    </>
  )
}
function AwardCard({post }) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  const [popup, setPopup] = useState(false)
  const [awardToEdit,setAwardToEdit]=useContext( newsContext )

  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/awards/${post._id}`);
      window.location.replace("/онас");
    } catch (err) {}
  };
  const handleEdit = async () => {
    try {
      const res = await axiosInstance.get(`/awards/${post._id}`);
      setAwardToEdit(res)
    } catch (err) {}
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  };
  return (
    <>
    
      <div className="award__card">
        <img src={"/images/"+post.photo} className="award__img" alt="" />
        <h4 className="award__title">{post.title}</h4>
        <div className="award-block">
          <div className="winners-block">
            <h5 className="winners__title">Победители и призеры</h5>
            <div className="winners">
              {post.gold && <div className="winners__item">
                <div className="ball gold"></div>
                <div className="winner__name">{post.gold}</div>
              </div>}
              {post.silver && <div className="winners__item">
                <div className="ball silver"></div>
                <div className="winner__name">{post.silver}</div>
              </div>}
              {post.bronze && <div className="winners__item">
                <div className="ball bronze"></div>
                <div className="winner__name">{post.bronze}</div>
              </div>}
            </div>
          </div>
          {post.part && <div className="players-block">
            <h5 className="winners__title">Участники</h5>
            <div className="players__text">{post.part}</div>
          </div>}
        </div>
        {user && <><button onClick={()=>setPopup(true)} className="delete">Удалить</button>
              <button onClick={handleEdit} className="edit">Ред.</button>
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
              </CSSTransition></>}
      </div>
    </>
  )
}
function HistoryItem({post}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [show, setShow] = useState(false)
  setTimeout(()=>setShow(true),500)

  const [popup, setPopup] = useState(false)
  const [historyToEdit,setHistoryToEdit]=useContext( newsContext )

  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/histories/${post._id}`);
      window.location.replace("/онас");
    } catch (err) {}
  };
  const handleEdit = async () => {
    try {
      const res = await axiosInstance.get(`/histories/${post._id}`);
      setHistoryToEdit(res)
    } catch (err) {}
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  };
  const { user } = useContext(Context);
  return (
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="history__item">
        <div className="history-title">
          <h3 className="history__year">{post.date}</h3>
          <h4 className="history__title">{post.title}</h4>
        </div>
        <div className="history__card">
          <img src={"/images/"+post.photo} alt="" className="history__img" />
          <div className="history-block">
            <hr />
            <p className="history__text">{post.text}
            </p>
          </div>
        </div>
        {user && <><button onClick={()=>setPopup(true)} className="delete">Удалить</button>
              <button onClick={handleEdit} className="edit">Ред.</button>
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
              </CSSTransition></>}
      </div>
      </CSSTransition>
    </>
  )
}
function AwardsYear({itemsToShow,i}){
  const [show, setShow] = useState(false)
  setTimeout(()=>setShow(true),500)

  return(
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
                        <div>
                        <h4 className="award__year">{itemsToShow[i][0].year}</h4>
                        <div className="awards">
                          
                          
                          {itemsToShow[i].map((post,index)=>(
                            <AwardCard key={index} post={post} />
                          ))}

                        </div>
                        </div>
                </CSSTransition>
                        
    </>
  )
}

export default function About() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [page, setPage] = useState('Сотрудники')
  const [show, setShow] = useState(false)

  const [staff, setStaff] = useState([])
  const [awards, setAwards] = useState([])
  const [histories, setHistories] = useState([])
  
  setTimeout(()=>setShow(true),500)

  useEffect(() => {
    const fetchPosts = async () => {
      const res1 = await axiosInstance.get("/staffs");
      const res2 = await axiosInstance.get("/awards");
      const res3 = await axiosInstance.get("/histories");
      setStaff(res1.data);
      setAwards(res2.data);
      setHistories(res3.data);
    };
    fetchPosts();
  },[]);
  const [staffToEdit,setStaffToEdit]=useState(null)
  const [historyToEdit, setHistoryToEdit]=useState(null)
  const [awardToEdit, setAwardToEdit]=useState(null)

  //AWARDS
  if(awards){
    awards.map(function(item){
      let tmp=item.date.split('.')
      item.year=Number(tmp[2])
    })
  }
  let years=[]
  if(awards){
    awards.map((item,index)=>{years.push((awards[index].year))})
  }
  const yearsUnique = years.filter(function(item, pos) {
    return years.indexOf(item) == pos;
  })
  yearsUnique.sort(function (a, b) {
    return b-a;
  });
  let itemsToShow=[]
  yearsUnique.map((item,index)=>(
    itemsToShow.push(awards.filter(i=>i.year===item))
  ))
  return (
    <>
    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="page-container about-page">
        {windowWidth < 1023 &&
          <>
            <h1 className="page__title">О нас</h1>
            <div className="about-buttons">
              <div onClick={() => setPage('Сотрудники')} className={page === 'Сотрудники' ? "about__button active_about__button" : "about__button"}>Сотрудники</div>
              <div onClick={() => setPage('Достижения')} className={page === 'Достижения' ? "about__button active_about__button" : "about__button"}>Достижения</div>
              <div onClick={() => setPage('История')} className={page === 'История' ? "about__button active_about__button" : "about__button"}>История</div>
            </div>
          </>
        }
        <div className="content">
          <div className="about-head">
            {windowWidth > 1023 &&
              <>
                <div className="about-buttons">
                  <div onClick={() => setPage('Сотрудники')} className={page === 'Сотрудники' ? "about__button active_about__button" : "about__button"}>Сотрудники</div>
                  <div onClick={() => setPage('Достижения')} className={page === 'Достижения' ? "about__button active_about__button" : "about__button"}>Достижения</div>
                  <div onClick={() => setPage('История')} className={page === 'История' ? "about__button active_about__button" : "about__button"}>История</div>
                </div>
                <h1 className="page__title">О нас</h1>
              </>
            }
          </div>
          <CSSTransition
                in={page === 'Сотрудники' || page === 'Достижения' || page === 'История'}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
          <div className="about">
            {page === 'Сотрудники' &&
              <>
              <newsContext.Provider value={[staffToEdit, setStaffToEdit]}>
                <div className="about-container">

                  {staff.map((post,index)=>(
                    <PersonCard key={index} staff={post}/>
                  ))}

                </div>
                {admin && <StaffAdmin staffToEdit={staffToEdit}/>}
              </newsContext.Provider>
              </>}
            {page === 'Достижения' &&
              <>
              <newsContext.Provider value={[awardToEdit, setAwardToEdit]}>
              
                  <div className="awards-container">

                    {itemsToShow.map((arr,i)=>(
                      <>
                        <AwardsYear itemsToShow={itemsToShow} i={i}/>
                      </>
                    ))}
                    
                  </div>
                {admin && <AwardsAdmin awardToEdit={awardToEdit}/>}

              </newsContext.Provider>
              </>}
            {page === 'История' &&
              <>
              <newsContext.Provider value={[historyToEdit, setHistoryToEdit]}>
                <div className="history-container">
                  <div className="history">

                    {histories.map((post,index)=>(
                      <HistoryItem key={index} post={post}/>
                    ))}

                  </div>
                </div>
                {admin && <HistoryAdmin historyToEdit={historyToEdit}/>}
              </newsContext.Provider>
              </>}
          </div>
          </CSSTransition>
        </div>
      </div>
      </CSSTransition>
    </>
  )
}