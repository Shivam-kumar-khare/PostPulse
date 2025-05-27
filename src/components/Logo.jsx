import React from 'react'
import logopng from '../assets/logo.png'

function Logo({width="100px"}) {
  return (
    <div><img width="50px" src={logopng} alt="Pogo" /></div>
  )
}

export default Logo