"use client";

import ProtectedRouteWrapper from "@/app/components/protectedroutewrapper";
import ToDoListPage from "@/app/components/todolistpage";



export default function Home() {
  

  return (
    <ProtectedRouteWrapper>
      <ToDoListPage />
    </ProtectedRouteWrapper>
  )
} 
