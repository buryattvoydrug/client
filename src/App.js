import Header from "./Components/Header";
import About from "./Pages/About";
import Calendar from "./Pages/Calendar";
import Contacts from "./Pages/Contacts";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import News from "./Pages/News";
import Schedule from "./Pages/Schedule";
import {BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'

import './scss/Interface.scss'
import { useContext } from "react";
import { Context, ContextProvider } from "./context/Context";
function App() {
  const location = useLocation();
  
  return (
    <>
    <ContextProvider>
      <BrowserRouter>
        <div className={location.pathname=='/'? "wrapper main-wrapper":"wrapper"}> 
          <div className="container">
            <Header/>
            <Switch location={location} key={location.key}>
              <Route exact path="/"><Main/></Route>
              <Route exact path="/login"><Login/></Route>
              <Route exact path="/онас"><About/></Route>
              <Route exact path="/расписание"><Schedule/></Route>
              <Route exact path="/контакты"><Contacts/></Route>
              <Route exact path="/календарь"><Calendar/></Route>
              <Route exact path="/новости"><News/></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ContextProvider>
      
    </>
  );
}

export default App;
