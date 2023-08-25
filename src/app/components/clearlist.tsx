import React from 'react'

export const deleteAllTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/tasks/delete-all', {
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
