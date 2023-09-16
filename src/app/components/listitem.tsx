"use client"
import React, { useState } from 'react'

export interface task {
    dt:string
    task_id: number
    title: string
    description: string
    is_completed: boolean
    user_id: string
  }

interface taskProp {
    prop : task
    onDeleteTask: (taskId: number) => void
    onCheckboxChange: () => void
}
    


export default function ListItem ({ prop, onDeleteTask, onCheckboxChange }: taskProp) {

    const [isChecked, setIsChecked] = useState(prop.is_completed)

    const handleCheck = () => {

        setIsChecked(!isChecked)       
    
        fetch(`https://www.raytodolistapi.com/api/tasks/${prop.task_id}`, {
            method: 'PUT',
            headers: {
                        'Content-Type': 'application/json',
                    },
            body: JSON.stringify({ is_completed: !isChecked }),
        }).then((response) => {
            
            if (response.status === 200) {
                onCheckboxChange()
              console.log('task updated succesfully')
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      const handleDelete = () => {
        fetch(`https://www.raytodolistapi.com/api/tasks/${prop.task_id}`, {
          method: 'DELETE'
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Item deleted')
              onDeleteTask(prop.task_id)
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };


  return (
    <div className='flex justify-start md:justify-center items-center border-2 mb-2 rounded w-full md:w-1/2 '>
    <input className='ml-2'
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}/>
    <li className='ml-3'>{prop.title}</li>
    <button onClick={handleDelete} className="w-full  text-black flex justify-end mr-4">X</button>
    </div>
  )
}
