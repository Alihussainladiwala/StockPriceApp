import React from 'react'
import "./NavBar.css"

function NavBar({title}) {
  return (
    <div className='navbar'>
      <h1 className='navbar-title'>{title}</h1>
    </div>
  )
}

export default NavBar