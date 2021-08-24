import React, { useContext, useEffect, useState } from 'react'
import CalendarButton from '../Components/CalendarButton'
import { Dimensions } from 'react-native-web'
import Sidebar from '../Components/Sidebar'
import '../scss/Pages/Main.scss'
import { CSSTransition } from 'react-transition-group';
import axios from 'axios'
import renderHTML from "react-render-html";
import { newsContext } from '../context/newsContext'
import { Context } from '../context/Context'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainAdmin({postToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [alert, setAlert] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      subtitle,
      alert
    };
    try {
       await axiosInstance.put(`/main/${postToEdit._id}`, {
        title:newPost.title,
        subtitle:newPost.subtitle,
        alert:newPost.alert
      });
      window.location.replace("/");
    } catch (err) {}
  };
  React.useEffect(()=>{
    if(postToEdit){
      setTitle(postToEdit.title) 
      setSubtitle(postToEdit.subtitle)
      setAlert(postToEdit.alert)
    }
  },[postToEdit])
  
  return (
    <>
      <div className="admin">
        <h1 className="page__title">Админ. панель/Главная</h1>
        <div className="panel">
          <div className="awards__panel">
              <form onSubmit={handleUpdate}>
                <h3 className="panel__title">Объявление</h3>
                  <div className="input__item">
                    <label className="input__label">Заголовок
                        <textarea value={alert} onChange={e=>setAlert(e.target.value)} placeholder="В спортивном комплексе производится наладка оборудования. Занятий в январе не будет." rows={6} type="text"></textarea>
                    </label>
                  </div>
                <h3 className="panel__title inside__title">Главная</h3>
                <div className="input__item">
                  <label className="input__label">Заголовок (обернуть в span каждую строку)
                      <textarea value={title} onChange={e=>setTitle(e.target.value)} placeholder="Только настоящий бокс без компромиссов" type="text" ></textarea>
                  </label>
                </div>
                <div className="input__item">
                  <label className="input__label">Подзаголовок
                      <input value={subtitle} onChange={e=>setSubtitle(e.target.value)} placeholder="Мы тренируем чемпионов с 1999 года." type="text" />
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


export default function Main() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [show, setShow] = useState(false)
  const [main, setMain] = useState([])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/main");
      setMain(res.data);
      const res2 = await axiosInstance.get("/posts");
      setPosts(res2.data);
    };
    fetchPosts();
  },[]);
  console.log(posts)

  useEffect(()=>{
    setShow(main && posts[0])
  },[main,posts])
  const [postToEdit,setPostToEdit]=useState(null)
  return (
    <>
      <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit
              >
        <div className="page-container main-page">
                <newsContext.Provider value={[postToEdit, setPostToEdit]}>
                {main[0] &&
                <>
                  <div className="content">
                    <h1 className="main__title">
                      {renderHTML(main[0].title)}
                    </h1>
                    <h4 className="main__subtitle">{main[0].subtitle}</h4>
                  </div>
                <Sidebar posts={posts} alert={main[0].alert} slimmain={windowWidth<1440 && windowHeight<850} wide={windowWidth>1439 && windowHeight>850}/>
                </>}
                </newsContext.Provider>
        </div>
      </CSSTransition>
      <CalendarButton/>
      <div className="page-container main-page">
        {admin && <MainAdmin postToEdit={main[0]}/>}
      </div>
    </>
  )
}
