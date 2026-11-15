'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/app/types';
import Delete from './Delete';
import Paginator from './Paginator';

const Users = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setLastPage(response.data.meta.last_page);
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

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

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
        <>
          <Link className="btn btn-primary btn-sm mb-3" href="/users/create">
            Add User
          </Link>

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
                        <Link
                          className="btn btn-outline-primary btn-sm"
                          href={`/users/${user.id}/edit`}
                        >
                          Edit
                        </Link>
                        <Delete
                          endpoint="users"
                          id={user.id}
                          onError={setError}
                          onDelete={handleDelete}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Paginator
            lastPage={lastPage}
            onPageChange={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default Users;
