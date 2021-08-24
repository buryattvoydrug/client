import axios from 'axios';
import { useContext, useRef } from 'react'
import {Context} from '../context/Context'

export default function Login() {
  const axiosInstance=axios.create({baseURL:process.env.REACT_APP_API_URL})

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      alert('Неверный логин или пароль!')
    }
  };
  function clearLocal(){
    localStorage.removeItem("user")
    console.log(localStorage, 'очищено')
    window.location.replace("/");
  }
  console.log(localStorage)
  return (
    <>
      <div className="page-container main-page">
        <div className="admin">
          <div className="panel">
            <h1 className="page__title">Админ. панель/Войти</h1>
            <form onSubmit={handleSubmit}>
              <div className="input__item">
                <label className="input__label">Логин
                  <input ref={userRef} type="text" />
                </label>
              </div>
              <div className="input__item">
                <label className="input__label">Пароль
                  <input ref={passwordRef} type="password" />
                </label>
              </div>
              <button type="submit" disabled={isFetching} className="save__button">Войти</button>
            </form>
          </div>
          <div className="panel">
            <h1 className="page__title">Админ. панель/Выйти</h1>
            <div onClick={()=>clearLocal()} className="save__button">Выйти</div>
          </div>
        </div>
      </div>
    </>
  )
}
