'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/app/types';

const Navigation = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data.data);
      } catch {
        // tiket mati sudah ditangani layout secure; navbar cukup diam
      }
    };

    loadData();
  }, []);

  const logout = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/logout');
      router.push('/login');
    } catch (requestError) {
      if (
        axios.isAxiosError(requestError) &&
        requestError.response?.status === 401
      ) {
        router.push('/login');
        return;
      }

      if (axios.isAxiosError(requestError)) {
        const serverMessage =
          requestError.response?.data?.message ?? 'Sign out failed.';
        setError(serverMessage);
      } else {
        setError('Sign out failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 justify-content-between">
      <span className="navbar-brand mb-0 h1">Next Admin</span>

      {error && (
        <span className="text-danger small" role="alert">
          {error}
        </span>
      )}

      {user && (
        <Link className="btn btn-outline-light" href="/profile">
          {user.first_name} {user.last_name}
        </Link>
      )}

      <button
        className="btn btn-outline-light"
        type="button"
        onClick={logout}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing out...' : 'Sign out'}
      </button>
    </nav>
  );
};

export default Navigation;
