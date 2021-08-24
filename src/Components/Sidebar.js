import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert'
import NewsItem from './NewsItem';

export default function Sidebar({posts,alert,wide,contacts,slimmain}) {
  const [active, setActive] = useState(posts[0]);
  const [isChanged, setIsChanged] = useState(true);
  useEffect(()=>{
    if(posts){
          for (let i=0;i<=1000;i++){
            setTimeout(()=>{
              setIsChanged(false)
              setTimeout(()=>{setActive(posts[i%posts.length])},300)
              setIsChanged(false)
              setTimeout(()=>{setIsChanged(true)},300)
            },7000*i)
          }
    }
  },[])
  return (
    <>
      <div className={wide? "sidebar wide-sidebar":"sidebar"}>
        <Alert alert={alert} slim={!contacts&&slimmain}/>
        {active && posts[0] &&
          <CSSTransition
                in={isChanged}
                timeout={1000}
                classNames="trans"
                unmountOnExit>
                  <>
                    <NewsItem widget wide={wide} post={active}/>
                  </>
                </CSSTransition>
        }
      </div>
    </>
  )
}
