import React from 'react'
import '../scss/Components/Alert.scss'
export default function Alert({slim,alert}) {
  return (
    <>
      <div className={slim? "alert slim-alert":"alert"}>
        <div className="alert__icon">!</div>
        <div className="alert__text">{alert}</div>
      </div>
    </>
  )
}
