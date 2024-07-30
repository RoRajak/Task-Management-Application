"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('https://task-management-application-vj6i.onrender.com/api/check-session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: { valid: boolean } = await response.json();

        if (!data.valid) {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/signin');
      }
    };

    checkSession();
  }, [router]);
};

export default useAuth;
