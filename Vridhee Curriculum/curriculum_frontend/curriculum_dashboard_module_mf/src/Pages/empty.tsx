import React from 'react'
import Dashboard from './dashboard'
import TODO from './todo'

export const Empty = () => {
    console.log(localStorage.getItem('token'),"token")
  return (
    <div>
{/* {localStorage.getItem('token') ?  */}
<div>
<Dashboard/>
  </div>

  {/* :''} */}

  
    </div>
  )
}
