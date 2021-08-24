import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native-web';
import '../scss/Pages/News.scss'
import NewsItem from '../Components/NewsItem';
import { CSSTransition } from 'react-transition-group';
import {newsContext} from '../context/newsContext'
import axios from "axios";
import Scroll from 'react-scroll';
import { Context } from '../context/Context';

var scroll = Scroll.animateScroll;

const windowWidth = Dimensions.get('window').width;
function NewsAdmin({postToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [toAdd,settoAdd]=useState(null)

  const openPanelToAdd=()=>{
    settoAdd(true)
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      text
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/новости");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      text
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
       await axiosInstance.put(`/posts/${postToEdit.data._id}`, {
        title:newPost.title,
        text:newPost.text,
        photo:newPost.photo
      });
      console.log(newPost)
      window.location.replace("/новости");
    } catch (err) {}
  };

  React.useEffect(()=>{
    if(postToEdit){
      settoAdd(false)
      setTitle(postToEdit.data.title)
      setText(postToEdit.data.text)
    }
  },[postToEdit])
  

  return (
    <>
       <button onClick={openPanelToAdd} className="to__add">+</button>
      {postToEdit && !toAdd &&
      
      <div className="admin edit__admin">
        <h1 className="page__title">Админ. панель/Новости</h1>
        <div className="panel">
          <div className="news__panel">
            <h3 className="panel__title"> Редактировать новость</h3>
            <form onSubmit={handleUpdate}>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!file &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {file && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                </label>
                {file? '':
                <>
                  <img src={"/images/"+postToEdit.data.photo} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <div className="input__item">
                <label className="input__label">Заголовок
                    <textarea value={title} onChange={e=>{setTitle(e.target.value)}} placeholder="Выпускник НИТУ «МИСиС» Андрей Замковой — бронзовый призер Олимпиады в Токио" rows="10">
                    </textarea>
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Текст
                    <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Российский боксер Андрей Замковой завоевал для страны 39-ю медаль Олимпийских игр в Токио." rows="10">
                    </textarea>
                </label>
              </div>
            {/* <div className="save__button add__button">+</div> */}
            <button type="submit" className="save__button">Сохранить</button>
          </form>
          </div>
          <hr />
        </div>
      </div>
      }
      {/* {toAdd &&  */}
      <CSSTransition
                in={toAdd}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
          <div className="admin edit__admin">
            <h1 className="page__title">Админ. панель/Новости</h1>
            <div className="panel">
              <div className="news__panel">
                <h3 className="panel__title"> Добавить новость</h3>
                <form onSubmit={handleSubmit}>
                  <div className="input__item">
                  <label className="input__label file__upload">
                      {!file &&<img src="/images/screpka.svg" alt="" />}
                      <span>Фотография {file && <><br/> загружена</>}</span>
                      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                  </div>  
                  <div className="input__item">
                    <label className="input__label">Заголовок
                        <textarea value={title} onChange={e=>{setTitle(e.target.value)}} placeholder="Выпускник НИТУ «МИСиС» Андрей Замковой — бронзовый призер Олимпиады в Токио" rows="10">
                        </textarea>
                    </label>
                  </div>
                  <div className="input__item">
                    <label className="input__label">Текст
                        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Российский боксер Андрей Замковой завоевал для страны 39-ю медаль Олимпийских игр в Токио." rows="10">
                        </textarea>
                    </label>
                  </div>
                {/* <div className="save__button add__button">+</div> */}
                <button type="submit" className="save__button">Добавить</button>
              </form>
              </div>
              <hr />
            </div>
          </div>
      </CSSTransition>
      {/* } */}
    </>
  )
}

export default function News() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [show, setShow] = useState(false)
  const [postToEdit,setPostToEdit]=useState(null)
  const [posts, setPosts] = useState([]);

  setTimeout(()=>setShow(true),500)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  },[]);
  
  return (
    <>
    <newsContext.Provider value={[postToEdit, setPostToEdit]}>
    <div className="page-container news-page">
        <div className="content">
          
          <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
                <div>
                  <h1 className="page__title">
                    Новости
                  </h1>
                  <div className="news">
                    {posts.slice(0).reverse().map((post,index)=>(
                      <NewsItem widenews={(windowWidth>1439 || (windowWidth<1439 && windowWidth>1023))&&(index%9)%4==0 || (index%4)%3==0 && windowWidth<1439 && windowWidth>1023} post={post} key={post._id}/>
                    ))}
                  </div>
                </div>
            
          </CSSTransition>
          {admin && <NewsAdmin postToEdit={postToEdit} />}
        </div>
      </div>
    </newsContext.Provider>
      
    </>
  )
}
