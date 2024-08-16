import React from 'react'
// import image from './image/err.png'
import cssNot from'./css/NotFound.module.css'
function NotFound() {
  return (
    <div className={cssNot.back}>
       <div className={cssNot.blob}>
        {/* <img src={image} /> */}
      </div>
      <div className={cssNot.All}>
      <h1 className={cssNot.err}>404</h1>
      <h5>Page not Not Found</h5>
      </div>
    </div>
  )
}

export default NotFound
