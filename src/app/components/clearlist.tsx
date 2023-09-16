import React from 'react'

export const deleteAllTasks = async () => {
  const user_id = localStorage.getItem('user_id')
    try {
      const response = await fetch(`https://raytodolistapi.com/api/tasks/delete-all?user_id=${user_id}`, {
        method: 'POST',
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
