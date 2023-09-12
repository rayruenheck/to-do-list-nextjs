"use client";

import ProtectedRouteWrapper from "@/app/components/protectedroutewrapper";
import ToDoListPage from "@/app/components/todolistpage";



export default function ToDoList() {
  

  return (
    <ProtectedRouteWrapper>
      <ToDoListPage />
    </ProtectedRouteWrapper>
  )
} 
