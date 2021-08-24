import React from 'react'
import '../scss/Components/Person.scss'
export default function Person({type,name,img,iscontacts,phone,mail}) {
  console.log(img)
  return (
    <>
      <div className="person__item">
        <img src={img? "http://app.box-misis.ru/api/images/"+img : '/images/person.svg'} alt="" className="person__img" />
        <div className="person-block">
          <span className="person__type">{type}</span>
          <span className="person__name">{name}</span>
          {iscontacts &&
            <>
              <a className="person__phone" href={"tel:"+phone}>{phone}</a>
              <a className="person__mail" href={"mailto:"+mail}>{mail}</a>
            </>
          }
        </div>
      </div>
    </>
  )
}
