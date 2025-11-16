import React, { useState } from 'react'

const Dashboard:React.FC = () => {

  const [user,setUser] = useState('Bigyan Adhikari');

  return (
    <div>Welcome to Dashboard, {user}</div>
  )
}

export default Dashboard