"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react'


export default function page() {

    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    

    
      const response = await fetch('http://127.0.0.1:5000/api/login-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username' : username,
            'password' : password
        }),
        credentials: 'include'
      });

      if (response.status === 200) {
        const data = await response.json()
        const loggedInUsername = data.username
        alert(`User ${loggedInUsername} logged in`);
        router.push(`/${loggedInUsername}/to-do-list`)
      }  else {
        alert('user not logged in');
      }
  }
  
  
  
    return (
        <div className='h-[100vh] w-full flex justify-center items-center flex-col'>
        <form onSubmit={handleLogin} className='h-1/2 w-3/4 flex flex-col justify-center items-center border-2'>
          <div>Login</div>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 mb-4'
            type='text'
            name='username'
            placeholder='Username'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 mb-4'
            type='password'
            name='password'
            placeholder='Password'
          />
          <button className='border-2 w-1/2 bg-blue-400' type='submit'>
            Login
          </button>
        </form>
      </div>
  )
}
