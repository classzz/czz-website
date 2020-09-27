import React from 'react'
import {Link} from 'react-router-dom'
function NotFound(){
  return (
    <div className="notfound">
      <div className="container">
        <h3>Page Not Found</h3>
        <p><Link to="/">Go back</Link></p>
      </div>
    </div>
  )
}

export default NotFound