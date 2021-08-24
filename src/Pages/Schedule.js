import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native-web';
import Sidebar from '../Components/Sidebar';
import Person from '../Components/Person';
import '../scss/Pages/Schedule.scss'
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Scroll from 'react-scroll';
import { newsContext } from '../context/newsContext';
import { Context } from '../context/Context';

var scroll = Scroll.animateScroll;

const windowWidth = Dimensions.get('window').width;

function ScheduleAdmin({groupToEdit}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState(0);
  const [time3, setTime3] = useState(0);
  const [toAdd,settoAdd]=useState(null)

  const openPanelToAdd=()=>{
    settoAdd(true)
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      image,
      photo,
      type,
      name,
      day1,
      day2,
      day3,
      time1,
      time2,
      time3
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
    if (image) {
      const data =new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/groups", newPost);
      window.location.replace("/расписание");
    } catch (err) {}
  };

  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      image,
      type,
      name,
      day1,
      day2,
      day3,
      time1,
      time2,
      time3
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
    if (image) {
      const data =new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    
    try {
       await axiosInstance.put(`/groups/${groupToEdit.data._id}`, {
        title:newPost.title,
        image:newPost.image,
        type:newPost.type,
        name:newPost.name,
        day1:newPost.day1,
        day2:newPost.day2,
        day3:newPost.day3,
        time1:newPost.time1,
        time2:newPost.time2,
        time3:newPost.time3
      });
      console.log(newPost)
      window.location.replace("/расписание");
    } catch (err) {}
    console.log()
  };
  React.useEffect(()=>{
    if(groupToEdit){
      settoAdd(false)
      setTitle(groupToEdit.data.title)
      // setImage(groupToEdit.data.image)
      // setPhoto(groupToEdit.data.photo)
      setType(groupToEdit.data.type)
      setName(groupToEdit.data.name)
      setDay1(groupToEdit.data.day1)
      setDay2(groupToEdit.data.day2)
      setDay3(groupToEdit.data.day3)
      setTime1(groupToEdit.data.time1)
      setTime2(groupToEdit.data.time2)
      setTime3(groupToEdit.data.time3)
      console.log(document.querySelectorAll('[name="day"]'))
    }
  },[groupToEdit])
  
  return (
    <>
      <button onClick={openPanelToAdd} className="to__add">+</button>
      {groupToEdit && !toAdd &&
      <>
      <div className="admin edit__admin">
        <h1 className="page__title">Админ. панель/Расписание</h1>
        <div className="panel">
          <div className="schedule__panel">
            <h3 className="panel__title">Редактировать группу</h3>
            <form onSubmit={handleUpdate}>
              <div className="input__item">
                <label className="input__label">Заголовок группы
                  <input value={title} onChange={e=>{setTitle(e.target.value)}} placeholder="Группа новичков" type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!image &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {image && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </label>
                {image? '':
                <>
                  <img src={"/images/"+groupToEdit.data.image} alt="" className="old__image" />
                  <h5 className="input__label">Текущее изображение</h5>
                </>
                }
              </div>
              <h3 className="panel__title inside__title">Тренер</h3>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
                {photo? '':
                <>
                  <img src={"/images/"+groupToEdit.data.photo} alt="" className="old__image" />
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
              <div className="time__panel">
                <h3 className="panel__title">Время</h3>
                <p className="panel__subtitle">Не трогать поле, если не нужно редактировать</p>
                <div className="input__item">
                  <label className="input__label">Занятие 1
                    <input value={time1} onChange={e=>{setTime1(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball1" value="пн" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball1" className="ball">пн</label>

                      <input id="ball2" value="вт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball2" className="ball">вт</label>

                      <input id="ball3" value="ср" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball3" className="ball">ср</label>
                      
                      <input id="ball4" value="чт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball4" className="ball">чт</label>
                      
                      <input id="ball5"  value="пт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball5" className="ball">пт</label>
                      
                      <input id="ball6" value="сб" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball6" className="ball">сб</label>

                      <input id="ball7" value="вс" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball7" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="input__item">
                  <label className="input__label">Занятие 2 (если нет занятия вписать 0)
                    <input value={time2} onChange={e=>{setTime2(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball21" value="пн" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball21" className="ball">пн</label>

                      <input id="ball22" value="вт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball22" className="ball">вт</label>

                      <input id="ball23" value="ср" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball23" className="ball">ср</label>
                      
                      <input id="ball24" value="чт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball24" className="ball">чт</label>
                      
                      <input id="ball25"  value="пт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball25" className="ball">пт</label>
                      
                      <input id="ball26" value="сб" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball26" className="ball">сб</label>

                      <input id="ball27" value="вс" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball27" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="input__item">
                  <label className="input__label">Занятие 3 (если нет занятия вписать 0)
                    <input value={time3} onChange={e=>{setTime3(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball31" value="пн" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball31" className="ball">пн</label>

                      <input id="ball32" value="вт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball32" className="ball">вт</label>

                      <input id="ball33" value="ср" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball33" className="ball">ср</label>
                      
                      <input id="ball34" value="чт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball34" className="ball">чт</label>
                      
                      <input id="ball35"  value="пт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball35" className="ball">пт</label>
                      
                      <input id="ball36" value="сб" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball36" className="ball">сб</label>

                      <input id="ball37" value="вс" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball37" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                
              </div>
              <button type="submit" className="save__button">Сохранить</button>
            </form>
          </div>
          <hr />
        </div>
      </div>
      </>
        }
        <CSSTransition
                in={toAdd}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="admin">
        <h1 className="page__title">Админ. панель/Расписание</h1>
        <div className="panel">
          <div className="schedule__panel">
            <h3 className="panel__title">Новая группа</h3>
            <form onSubmit={handleSubmit}>
              <div className="input__item">
                <label className="input__label">Заголовок группы
                  <input value={title} onChange={e=>{setTitle(e.target.value)}} placeholder="Группа новичков" type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!image &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {image && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </label>
              </div>
              <h3 className="panel__title inside__title">Тренер</h3>
              <div className="input__item">
                <label className="input__label file__upload">
                  {!photo &&<img src="/images/screpka.svg" alt="" />}
                  <span>Фотография {photo && <><br/> загружена</>}</span>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                </label>
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
              <div className="time__panel">
                <h3 className="panel__title">Время</h3>
                <p className="panel__subtitle">Выбрать нужные дни, вписать часы (9:00 - 18:00)</p>
                <div className="input__item">
                  <label className="input__label">Занятие 1
                    <input value={time1} onChange={e=>{setTime1(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball1" value="пн" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball1" className="ball">пн</label>

                      <input id="ball2" value="вт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball2" className="ball">вт</label>

                      <input id="ball3" value="ср" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball3" className="ball">ср</label>
                      
                      <input id="ball4" value="чт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball4" className="ball">чт</label>
                      
                      <input id="ball5"  value="пт" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball5" className="ball">пт</label>
                      
                      <input id="ball6" value="сб" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball6" className="ball">сб</label>

                      <input id="ball7" value="вс" onChange={e=>{setDay1(e.target.value)}} name="day" type="radio"/>
                      <label for="ball7" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="input__item">
                  <label className="input__label">Занятие 2 (если нет занятия вписать 0)
                    <input value={time2} onChange={e=>{setTime2(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball21" value="пн" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball21" className="ball">пн</label>

                      <input id="ball22" value="вт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball22" className="ball">вт</label>

                      <input id="ball23" value="ср" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball23" className="ball">ср</label>
                      
                      <input id="ball24" value="чт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball24" className="ball">чт</label>
                      
                      <input id="ball25"  value="пт" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball25" className="ball">пт</label>
                      
                      <input id="ball26" value="сб" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball26" className="ball">сб</label>

                      <input id="ball27" value="вс" onChange={e=>{setDay2(e.target.value)}} name="day2" type="radio"/>
                      <label for="ball27" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="input__item">
                  <label className="input__label">Занятие 3 (если нет занятия вписать 0)
                    <input value={time3} onChange={e=>{setTime3(e.target.value)}} placeholder="Впишите время занятия" type="text" />
                  </label>
                  <div className="input__item">
                  <div className="working">
                    <div className="balls">
                      <input id="ball31" value="пн" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball31" className="ball">пн</label>

                      <input id="ball32" value="вт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball32" className="ball">вт</label>

                      <input id="ball33" value="ср" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball33" className="ball">ср</label>
                      
                      <input id="ball34" value="чт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball34" className="ball">чт</label>
                      
                      <input id="ball35"  value="пт" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball35" className="ball">пт</label>
                      
                      <input id="ball36" value="сб" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball36" className="ball">сб</label>

                      <input id="ball37" value="вс" onChange={e=>{setDay3(e.target.value)}} name="day3" type="radio"/>
                      <label for="ball37" className="ball">вс</label>
                    </div>
                  </div>
                </div>
                </div>
                
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


function Group({title,photo,type,name,image,day1,time1,day2,time2,day3,time3,group}) {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const [groupToEdit,setGroupToEdit]=useContext(newsContext)
  const [popup, setPopup] = useState(false)

  const handleDelete = async () => {
    setPopup(false)
    try {
      await axiosInstance.delete(`/groups/${group._id}`);
      window.location.replace("/расписание");
    } catch (err) {}
  };
  const handleEdit = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${group._id}`);
      setGroupToEdit(res)
    } catch (err) {}
    setTimeout(()=>scroll.scrollTo(document.querySelector('.admin').offsetTop-100),100)
  };
  const { user } = useContext(Context);
  return (
    <>
      <div className="group">
        <div className="group-block">
          <h4 className="group__title">{title}</h4>
          <hr />
          <Person type={type} name={name} img={photo} />
        </div>
        {!(windowWidth < 1440 && windowWidth > 1023) &&
          <div className="group-block">
            <img className="group__img" src={"/images/"+image} alt="" />
          </div>}
        <div className="group-block">
          <div className="time__item">
            <div className="ball">{day1}</div>
            <span>{time1}</span>
          </div>
          {(time2!=='0' || day2!=='0') && <div className="time__item">
            <div className="ball">{day2}</div>
            <span>{time2}</span>
          </div>}
          { (time3!=='0' || day3!=='0') && <div className="time__item">
            <div className="ball">{day3}</div>
            <span>{time3}</span>
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
                    <h4>Вы действительно хотите удалить группу?</h4>
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

export default function Schedule() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const { user } = useContext(Context);
  console.log(user)
  const [admin, setAdmin] = useState(user)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  // setTimeout(()=>setShow(true),500)
  // setTimeout(()=>setShow1(true),800)
  const [groupToEdit,setGroupToEdit]=useState(null)

  const [groups, setGroups] = useState([])
  const [main, setMain] = useState([])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/groups");
      const res2 = await axiosInstance.get("/main");
      const res3 = await axiosInstance.get("/posts");
      setPosts(res3.data);
      setMain(res2.data);
      setGroups(res.data);
    };
    fetchPosts();
  },[]);
  useEffect(()=>{
    setShow(main && groups && posts[0])
    setTimeout(()=>setShow1(main && groups && posts[0]),200)
  },[main,groups,posts])
  console.log(main)

  return (
    <>
    <newsContext.Provider value={[groupToEdit, setGroupToEdit]}>

    <CSSTransition
                in={show}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
      <div className="page-container schedule-page">
        <div className="content">
          <h1 className="page__title">
            <span>Расписание занятий</span>
            <img src="/images/time.svg" alt="" />
          </h1>
          <CSSTransition
                in={show1}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
            <div className="schedule">
              {groups.map((post,index)=>(
                <Group key={index} 
                       group={post}
                       title={post.title}
                       photo={post.photo}
                       type={post.type}
                       name={post.name}
                       image={post.image}
                       day1={post.day1}
                       time1={post.time1}
                       day2={post.day2}
                       time2={post.time2}
                       day3={post.day3}
                       time3={post.time3} />
              ))}
            </div>
          </CSSTransition>
          {admin && <ScheduleAdmin groupToEdit={groupToEdit}/>}
        </div>
        {!(windowWidth < 1280) && main[0] &&  posts[0] && <Sidebar posts={posts} contacts alert={main[0].alert} slimmain={windowWidth < 1440} />}
      </div>
      </CSSTransition>
      </newsContext.Provider>
    </>
  )
}
