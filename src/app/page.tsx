"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react'


export default function Home() {

    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    

    
      const response = await fetch('https://raytodolistapi.com/api/login-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email' : email.toLowerCase(),
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
      
        
        <div className='m-5 h-[100vh] w-full flex justify-center items-center '>
          
        <form onSubmit={handleLogin} className='flex justify-center w-4/5 h-4/5 md:h-3/5 md:w-3/5 flex-col items-center border-2 lg:w-1/3 lg:h-3/4 bg-white rounded-md shadow-md'>
          <div className='h-1/5 text-[40px]'>Welcome</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 md:h-[75px] rounded-md w-2/3 border-gray-400 mb-8 bg-white md:placeholder:text-[30px]'
            type='text'
            name='email'
            placeholder='demo@demo.com'
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='md:placeholder:text-[30px] md:h-[75px] border-2 rounded-md w-2/3 border-gray-400 mb-8 bg-white'
            type='password'
            name='password'
            placeholder='123'
            required
          />
          <div className=' flex  mb-8 w-2/3 justify-between'>
          <div className='text-sm'>dont have an account?</div>
          <a href="/register" className='text-sm text-blue-4600 font-bold '> Register Here</a> 
          </div>
          <button className='border-2 w-2/3  md:h-[75px] bg-blue-400 rounded-2xl' type='submit'>
            Login
          </button>
        </form>
        </div>
      
      
  )
}
