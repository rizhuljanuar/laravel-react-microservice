'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Role } from '@/app/types';

const UserEdit = ({ id }: { id: number }) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const roleCall = await api.get('/roles');
        setRoles(roleCall.data.data);

        const userCall = await api.get(`/users/${id}`);
        const user = userCall.data.data;

        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setRoleId(user.role?.id ?? 0);
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
            requestError.response?.data?.message ?? 'Failed to load user.';
          setError(serverMessage);
        } else {
          setError('Failed to load user.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Edit User</h1>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && roles.length > 0 && (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="first-name">
              First Name
            </label>
            <input
              className="form-control"
              id="first-name"
              onChange={(event) => setFirstName(event.target.value)}
              required
              type="text"
              value={firstName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="form-control"
              id="last-name"
              onChange={(event) => setLastName(event.target.value)}
              required
              type="text"
              value={lastName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              onChange={(event) => setRoleId(parseInt(event.target.value, 10))}
              value={roleId}
            >
              <option value={0}>Select a role</option>
              {roles.map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEdit;
