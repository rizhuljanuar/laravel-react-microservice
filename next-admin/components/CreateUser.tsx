'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Role } from '@/app/types';
import api from '@/lib/api';

const CreateUser = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
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
        setIsLoadingRoles(false);
      }
    };

    loadRoles();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/users', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        role_id: roleId,
      });

      router.push('/users');
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
          requestError.response?.data?.message ?? 'Failed to create user.';
        setError(serverMessage);
      } else {
        setError('Failed to create user.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Create User</h1>

      {isLoadingRoles && <p>Loading roles...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoadingRoles && roles.length > 0 && (
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

          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateUser;
