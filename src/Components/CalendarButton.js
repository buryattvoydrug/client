
import React from 'react'
import { Dimensions } from 'react-native-web';
import { Link } from 'react-router-dom';
import '../scss/Components/CalengarButton.scss'

const windowWidth = Dimensions.get('window').width;

export default function CalendarButton() {
  return (
    <>
      <Link to={windowWidth<1024? '/расписание':'/календарь'} className="calendar__button">
        <span>{windowWidth<1024? 'Расписание занятий':'Календарь событий'}</span>
        <img src={windowWidth<1024? "/images/time.svg" :"/images/calendar.svg"} alt="" />
      </Link>
    </>
  )
}
