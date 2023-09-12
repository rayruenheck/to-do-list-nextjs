"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react'


export default function Home() {

    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    

    
      const response = await fetch('https://52.90.245.69:5000/api/login-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email' : email,
            'password' : password
        }),
        credentials: 'include'
      });

      if (response.status === 200) {
        const data = await response.json()
        const accessToken = data.access_token
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('user_id', data.user_id )
        const loggedInUsername = data.username
        alert(`User ${loggedInUsername} logged in`);

        const token = localStorage.getItem('access_token')
        if (!token) {
          alert('Please log in first.');
          return;
        }
      
        
        router.push(`/${data.username}/to-do-list`);
      }  else {
        alert('user not logged in');
      }
  }
  
  
  
    return (
        <div className='h-[100vh] w-full flex justify-center items-center flex-col'>
          <div>dont have an account?</div>
          <a href="/register"> Register Here</a>
          <div> or try email: demo@demo.com password: 123</div>
        <form onSubmit={handleLogin} className='h-1/2 w-3/4 flex flex-col justify-center items-center border-2'>
          <div>Login</div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 mb-4'
            type='text'
            name='email'
            placeholder='Email'
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
