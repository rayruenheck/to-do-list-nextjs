"use client";

import { useEffect, useState } from "react";

import { task } from "./listitem";
import ListItem from "./listitem";
import { deleteAllTasks } from "./clearlist";

import { useRouter } from "next/navigation";

export default function ToDoListPage() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filterMode, setFilterMode] = useState<string>("all");
  const router = useRouter()

  const date = new Date();
  const strDate = date.toISOString();
  const user_id = localStorage.getItem('user_id')

  

  const handleLogout = async () => {
    try {
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id')
  
      const response = await fetch('https://raytodolistapi.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        router.push('/');
      } 
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred during logout');
    }
  };
  const deleteCompletedTasks = async () => {
    try {
      const response = await fetch(
        "https://raytodolistapi.com/api/tasks/delete-completed",
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        getTasks();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = (taskIdToDelete: number) => {
    const updatedTasks = tasks.filter(
      (task) => task.task_id !== taskIdToDelete
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    const task: task = {
      dt: strDate,
      task_id: Math.floor(Math.random() * 1000000),
      title: inputValue,
      description: "This is a new task",
      is_completed: false,
      user_id: localStorage.getItem('user_id') || ''
    };

    fetch("https://raytodolistapi.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        throw new Error("Failed to add task");
      })
      .then(() => {
        setInputValue("");
        getTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTasks = () => {
    fetch(`https://raytodolistapi.com/api/tasks?user_id=${user_id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Failed to fetch tasks");
      })
      .then((data) => {
        data.sort(
          (a: any, b: any) =>
            new Date(a.dt).getTime() - new Date(b.dt).getTime()
        );

        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTasks();
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTask();
  }

  const handleCheckboxChange = () => {
    getTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterMode === "all") {
      return true;
    } else if (filterMode === "active") {
      return !task.is_completed;
    } else if (filterMode === "completed") {
      return task.is_completed;
    }
    return false;
  });

  const handleFilterChange = (newFilter: string) => {
    setFilterMode(newFilter);
  };

  return (
    <main className="flex flex-col w-full h-screen bg-gray-100">
      <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">To-do List</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
      </header>
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl mb-4">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
            type="text"
            placeholder="What would you like to add?"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
        </form>
        <div className="flex space-x-2 mb-4">
          {['all', 'active', 'completed'].map(mode => (
            <button
              key={mode}
              onClick={() => handleFilterChange(mode)}
              className={`px-3 py-1 border ${filterMode === mode ? 'bg-blue-500 text-white' : 'bg-white'} rounded hover:bg-blue-600 hover:text-white`}
            >
              {mode}
            </button>
          ))}
          <button onClick={deleteAllTasks} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Clear List</button>
          <button onClick={deleteCompletedTasks} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Clear Completed</button>
        </div>
        <ul className="w-full max-w-2xl space-y-2">
          {filteredTasks.map((task) => (
            <ListItem
              key={task.task_id}
              prop={task}
              onDeleteTask={handleDeleteTask}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
