'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface DeleteProps {
  id: number;
  endpoint: string;
  onDelete: (id: number) => void;
  onError: (message: string) => void;
}

const Delete = ({ id, endpoint, onDelete, onError }: DeleteProps) => {
  const router = useRouter();

  const del = async () => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await api.delete(`/${endpoint}/${id}`);

      onDelete(id);
    } catch (requestError) {
      if (
        axios.isAxiosError(requestError) &&
        requestError.response?.status === 401
      ) {
        router.push('/login');
        return;
      }

      if (axios.isAxiosError(requestError)) {
        onError(
          requestError.response?.data?.message ?? 'Failed to delete record.'
        );
      } else {
        onError('Failed to delete record.');
      }
    }
  };

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      type="button"
      onClick={del}
    >
      Delete
    </button>
  );
};

export default Delete;
