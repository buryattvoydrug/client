import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native-web';
import { CSSTransition } from 'react-transition-group';
import Maps from '../Components/Maps';
import Person from '../Components/Person';
import Sidebar from '../Components/Sidebar';
import { Context } from '../context/Context';
import { newsContext } from '../context/newsContext';
import '../scss/Pages/Contacts.scss'
const windowWidth = Dimensions.get('window').width;

function ContactsAdmin({postToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [type1, setType1] = useState("");
  const [name1, setName1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [post1, setPost1] = useState("");
  const [type2, setType2] = useState("");
  const [name2, setName2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [post2, setPost2] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      type1,
      type2,
      name1,
      name2,
      phone1,
      phone2,
      post1,
      post2,
      time,
      days
    };
    if (photo1) {
      const data =new FormData();
      const filename = Date.now() + photo1.name;
      data.append("name", filename);
      data.append("file", photo1);
      newPost.photo1 = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    if (photo2) {
      const data =new FormData();
      const filename = Date.now() + photo2.name;
      data.append("name", filename);
      data.append("file", photo2);
      newPost.photo2 = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
       await axiosInstance.put(`/contacts/${postToEdit._id}`, {
        type1:newPost.type1,
        type2:newPost.type2,
        name1:newPost.name1,
        name2:newPost.name2,
        phone1:newPost.phone1,
        phone2:newPost.phone2,
        post1:newPost.post1,
        post2:newPost.post2,
        time:newPost.time,
        days:newPost.days,
        photo1:newPost.photo1,
        photo2:newPost.photo2
      });
      console.log(newPost)
      window.location.replace("/контакты");
    } catch (err) {}
  };
  React.useEffect(()=>{
    if(postToEdit){
      setType1(postToEdit.type1)
      setType2(postToEdit.type2)
      setName1(postToEdit.name1)
      setName2(postToEdit.name2)
      setPhone1(postToEdit.phone1)
      setPhone2(postToEdit.phone2)
      setPost1(postToEdit.post1)
      setPost2(postToEdit.post2)
      setTime(postToEdit.time)
      setDays(postToEdit.days)
    }
  },[postToEdit])
  React.useEffect(()=>{
    console.log(days)
  },[days])
  return (
    <>
      <div className="admin">
        <h1 className="page__title">Админ. панель/Контакты</h1>
        <form onSubmit={handleUpdate}>
        <div className="panel">
          <div className="contact__panel">
            <h3 className="panel__title">Контакт 1</h3>
              <div className="input__item">
              <label className="input__label file__upload">
                  {!photo1 &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo1 && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto1(e.target.files[0])}/>
                </label>
                {photo1? '':
                <>
                  <img src={postToEdit.photo1? "/images/"+postToEdit.photo1 : "/images/person.svg"} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <div className="input__item">
                <label className="input__label">Должность
                <input value={type1} onChange={e=>setType1(e.target.value)} placeholder="директор центра" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">ФИО
                <input value={name1} onChange={e=>setName1(e.target.value)} placeholder="Иванов Иван Иванович" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">Телефон
                <input value={phone1} onChange={e=>setPhone1(e.target.value)} placeholder="+7-(905)-766-86-12" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">Почта
                <input value={post1} onChange={e=>setPost1(e.target.value)} placeholder="abc@mail.ru" type="text" /></label>
              </div>
          </div>
          <div className="contact__panel">
            <h3 className="panel__title">Контакт 2 (если не нужен, вписать 0 в Должность)</h3>
              <div className="input__item">
              <label className="input__label file__upload">
                  {!photo2 &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo2 && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto2(e.target.files[0])}/>
                </label>
                {photo2? '':
                <>
                  <img src={postToEdit.photo2? "/images/"+postToEdit.photo2 : "/images/person.svg"} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <div className="input__item">
                <label className="input__label">Должность
                <input value={type2} onChange={e=>setType2(e.target.value)} placeholder="директор центра" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">ФИО
                <input value={name2} onChange={e=>setName2(e.target.value)} placeholder="Иванов Иван Иванович" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">Телефон
                <input value={phone2} onChange={e=>setPhone2(e.target.value)} placeholder="+7-(905)-766-86-12" type="text" /></label>
              </div>
              <div className="input__item">
                <label className="input__label">Почта
                <input value={post2} onChange={e=>setPost2(e.target.value)} placeholder="abc@mail.ru" type="text" /></label>
              </div>
          </div>
          <hr />
          <div className="time__panel">
            <h3 className="panel__title">Время работы</h3>
            <p className="panel__subtitle">Выбрать нужные дни, вписать часы (9:00 - 18:00)</p>
              <div className="input__item">
                <label className="input__label">Время работы
                <input value={time} onChange={e=>setTime(e.target.value)} placeholder="9:00 - 18:00" type="text" /></label>
              </div>
              <div className="input__item">
              <div className="working">
                    <div className="balls">
                      <input id="ball1" value="пн"  onChange={(e)=>setDays(days =>[...days, e.target.value])} type="radio"/>
                      <label for="ball1" className="ball">пн</label>

                      <input id="ball2" value="вт" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball2" className="ball">вт</label>

                      <input id="ball3" value="ср" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball3" className="ball">ср</label>
                      
                      <input id="ball4" value="чт" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball4" className="ball">чт</label>
                      
                      <input id="ball5"  value="пт" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball5" className="ball">пт</label>
                      
                      <input id="ball6" value="сб" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball6" className="ball">сб</label>

                      <input id="ball7" value="вс" onChange={(e)=>setDays(days =>[...days, e.target.value])}  type="radio"/>
                      <label for="ball7" className="ball">вс</label>
                    </div>
                  </div>
                {/* <label className="input__label">Дни</label>
                <div className="working">
                  <div className="balls">
                    <div className="ball">пн</div>
                    <div className="ball">вт</div>
                    <div className="ball">ср</div>
                    <div className="ball">чт</div>
                    <div className="ball">пт</div>
                    <div className="ball disabled__ball">сб</div>
                    <div className="ball disabled__ball">вс</div>
                  </div>
                </div> */}
              </div>
              <button type="submit" className="save__button">Сохранить</button>
          </div>
          <hr />
        </div>
        </form>
      </div>
    </>
  )
}

export default function Contacts() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  const [contacts, setContacts] = useState([])

  const [main, setMain] = useState([])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/main");
      setMain(res.data);
      const res2 = await axiosInstance.get("/contacts");
      setContacts(res2.data);
      const res3 = await axiosInstance.get("/posts");
      setPosts(res3.data);
    };
    fetchPosts();
  },[]);
  useEffect(()=>{
    setShow(main && posts[0])
    setTimeout(()=>setShow1(main && posts[0]),200)
  },[main,posts])
  const [postToEdit,setPostToEdit]=useState(null)
  const allDays=['пн','вт','ср','чт','пт','сб','вс']
  console.log(contacts)
  return (
    <>
    {contacts.length && <newsContext.Provider value={[postToEdit, setPostToEdit]}>

    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="page-container contacts-page">
        <div className="content">
          <h1 className="page__title">Контакты</h1>
          <CSSTransition
                in={show1}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
          <div className="contacts">
            <div className="map-block">
              <div className="map">
              <Maps zoom={windowWidth<1023? 16 :17} center={'55.727601859271815, 37.60560121509337'} left={'55.72644374610638, 37.60279509865106'}
                right={'55.729020491073435, 37.6083440497393'} overlay="/images/overlay.svg"
              />
              </div>
              <div className="adress">
                <span className="metro">
                  <img src="/images/metro.png" alt="" className="metro__img" />
                  Октябрьская кольцевая
                </span>
                <span>Ленинский проспект, 6с7</span>
              </div>
            </div>
            <div className="contacts-block">
              <div className="persons-contacts">
                <Person iscontacts type={contacts[0].type1} name={contacts[0].name1} phone={contacts[0].phone1} mail={contacts[0].post1} img={contacts[0].photo1} />
                {contacts[0].type2!=='0' && <Person iscontacts type={contacts[0].type2} name={contacts[0].name2} phone={contacts[0].phone2} mail={contacts[0].post2} img={contacts[0].photo2} />}
              </div>
              <div className="working">
                <span className="time">{contacts[0].time}</span>
                <hr />
                <div className="balls">
                  {allDays.map((item,index)=>(
                    <div className={contacts[0].days.some(i=>i==item)? "ball" : "ball disabled__ball"}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </CSSTransition>
          {admin && <ContactsAdmin postToEdit={contacts[0]}/>}
        </div>
        {!(windowWidth < 1280) && posts[0] && <Sidebar posts={posts} alert={main[0].alert} contacts slimmain={windowWidth < 1440} />}
      </div>
      </CSSTransition>
      </newsContext.Provider>}
    </>
  )
}
