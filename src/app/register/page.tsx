"use client"
import { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const user = {
      user_id: Math.floor(Math.random() * 1000000),
      email: email,
      username: username,
      password: password,
    };

    
      const response = await fetch('http://52.90.245.69:5000/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        alert('User registered successfully');
      } else if (response.status === 400) {
        alert('username already exists')
      } else {
        alert('Failed to register user');
      }
  }

  return (
    <div className='h-[100vh] w-full flex justify-center items-center flex-col'>
      <form onSubmit={handleRegister} className='h-1/2 w-3/4 flex flex-col justify-center items-center border-2'>
        <div>Register</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border-2 mb-4 mt-4'
          type='email'
          name='email'
          placeholder='Email'
        />
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
          Register
        </button>
      </form>
    </div>
  );
}