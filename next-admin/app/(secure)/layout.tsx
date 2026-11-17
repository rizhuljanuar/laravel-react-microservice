'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Menu from '@/components/Menu';
import Navigation from '@/components/Navigation';
import { setUser } from '@/redux/userSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/user');
        dispatch(setUser(response.data.data));
        setIsAuthenticated(true);
      } catch {
        router.push('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    void checkAuth();
  }, [dispatch, router]);

  if (isCheckingAuth) {
    return (
      <main className="container py-5">
        <p>Checking your session...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navigation />

      <div className="container-fluid">
        <div className="row">
          <Menu />
          {children}
        </div>
      </div>
    </>
  );
}
