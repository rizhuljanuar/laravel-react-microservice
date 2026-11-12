'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import Menu from '../../components/Menu';
import Navigation from '../../components/Navigation';

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/user');
        setIsAuthenticated(true);
      } catch {
        router.push('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    void checkAuth();
  }, [router]);

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
