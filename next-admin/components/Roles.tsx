'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Role } from '@/app/types';

const Roles = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);

  const loadRoles = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.get('/roles');
      setRoles(response.data.data);
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
          requestError.response?.data?.message ?? 'Failed to load roles.';
        setError(serverMessage);
      } else {
        setError('Failed to load roles.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const del = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await api.delete(`/roles/${id}`);

      setRoles(roles.filter((role) => role.id !== id));
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
          requestError.response?.data?.message ?? 'Failed to delete role.';
        setError(serverMessage);
      } else {
        setError('Failed to delete role.');
      }
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="col-md-10">
      {isLoading && <p>Loading roles...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">{error}</p>
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={loadRoles}
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <Link className="btn btn-primary btn-sm mb-3" href="/roles/create">
            Add Role
          </Link>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                return (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link
                          className="btn btn-outline-primary btn-sm"
                          href={`/roles/${role.id}/edit`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          type="button"
                          onClick={() => del(role.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Roles;
