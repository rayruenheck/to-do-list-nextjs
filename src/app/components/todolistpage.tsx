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
  
      const response = await fetch('https://52.90.245.69:5000/api/logout', {
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
        "https://52.90.245.69:5000/api/tasks/delete-completed",
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

    fetch("https://52.90.245.69:5000/api/tasks", {
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
    fetch(`https://52.90.245.69:5000/api/tasks?user_id=${user_id}`)
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
    <main className="w-full h-[100vh]">
      <div className="flex justify-end flex-col items-center h-1/2 w-full">
        <h1 className="relative row justify-self-start h-12">To-do list</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center items-center"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-2/3 md:w-1/2 lg:w-1/4 border-2 border-gray-400"
            type="text"
            placeholder="What would you like to add?"
          />
          <button className="ml-4">Add</button>
        </form>
        <div className="w-full flex justify-center items-center relative justify-self-end h-1/3 mt-12">
          <button
            className={`ml-4 border-2 h-10 w-10 ${
              filterMode === "all" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            all
          </button>
          <button
            className={`ml-4 border-2 h-10 w-16 ${
              filterMode === "active" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterChange("active")}
          >
            active
          </button>
          <button
            className={`ml-4 border-2 h-10 w-24 ${
              filterMode === "completed" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            completed
          </button>
          <button
            className="ml-4 text-[12px] flex items-end h-10"
            onClick={() => {
              deleteAllTasks(), setTasks([]);
            }}
          >
            clear list
          </button>
          <button
            className="ml-4 text-[12px] flex items-end h-10"
            onClick={() => {
              deleteCompletedTasks(), getTasks(), setTasks(tasks);
            }}
          >
            clear completed
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <ul className="w-2/3 flex flex-col md:items-center md:w-full lg:w-1/2">
          {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <ListItem
                prop={task}
                key={task.task_id}
                onDeleteTask={handleDeleteTask}
                onCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <li key={1}></li>
          )}
        </ul>
      </div>
      <button onClick={()=>{handleLogout()}}>Logout</button>
    </main>
  );
}
