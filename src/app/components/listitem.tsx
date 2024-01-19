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
    


export default function ListItem({ prop, onDeleteTask, onCheckboxChange }: taskProp) {
  const [isChecked, setIsChecked] = useState(prop.is_completed);

  const handleCheck = async () => {
    try {
      const response = await fetch(`https://raytodolistapi.com/api/tasks/${prop.task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: !isChecked }),
      });

      if (response.status === 200) {
        setIsChecked(!isChecked);
        onCheckboxChange();
        console.log('Task updated successfully');
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://raytodolistapi.com/api/tasks/${prop.task_id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Item deleted');
        onDeleteTask(prop.task_id);
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex justify-between items-center border-2 mb-2 p-2 rounded w-full md:w-1/2 bg-white shadow-sm'>
      <label className='flex items-center cursor-pointer'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          className='hidden' // Hides the default checkbox
        />
        <span className={`checkbox-custom mr-2 ${isChecked ? 'checked' : ''}`}></span>
        <span className={`${isChecked ? 'line-through' : ''}`}>{prop.title}</span>
      </label>
      <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">X</button>
    </div>
  );
}
