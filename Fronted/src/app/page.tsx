"use client";
import Dashboards from "@/components/Dashboards";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useAuth();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
     router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <TailSpin
     
        visible={true}
        height="80"
        width="80"
        color="#4C38C2"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      
      />
      </div>
    );
  }

  return (
    <main className="grid grid-cols-[20%_80%] w-fit">
      <Sidebar />
      <Dashboards />
    </main>
  );
}
