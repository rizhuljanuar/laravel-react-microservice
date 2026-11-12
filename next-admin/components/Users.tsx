'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/app/types';
import api from '@/lib/api';

const Users = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
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
          requestError.response?.data?.message ?? 'Failed to load users.';
        setError(serverMessage);
      } else {
        setError('Failed to load users.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="col-md-10">
      {isLoading && <p>Loading users...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">{error}</p>
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={loadUsers}
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.name}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
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
      )}
    </div>
  );
};

export default Users;
