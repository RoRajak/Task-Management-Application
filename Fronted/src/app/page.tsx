"use client"
import Dashboards from "@/components/Dashboards";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  useAuth()
  const router=useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);
  return (
    <main className="grid grid-cols-[20%_80%] w-fit" >
      <Sidebar />
      <Dashboards/>
    </main>
  );
}
