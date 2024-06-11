import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <Link to='/'>Home</Link>
    <Link to='/vista_principal'>Vista Principal</Link>
    <Link to='/detalle_personaje'>Detalle Personaje</Link>
    </>
  )
}

export default Navbar