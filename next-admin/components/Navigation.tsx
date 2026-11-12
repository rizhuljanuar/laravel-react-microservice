'use client';

import api from '@/lib/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navigation = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
