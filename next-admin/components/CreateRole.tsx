'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Permission } from '@/app/types';

const CreateRole = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const response = await api.get('/permissions');
        setPermissions(response.data.data);
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
            requestError.response?.data?.message ??
            'Failed to load permissions.';
          setError(serverMessage);
        } else {
          setError('Failed to load permissions.');
        }
      } finally {
        setIsLoadingPermissions(false);
      }
    };

    loadPermissions();
  }, []);

  const check = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/roles', {
        name: name,
        permissions: selected,
      });

      router.push('/roles');
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
          requestError.response?.data?.message ?? 'Failed to create role.';
        setError(serverMessage);
      } else {
        setError('Failed to create role.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Create Role</h1>

      {isLoadingPermissions && <p>Loading permissions...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoadingPermissions && permissions.length > 0 && (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              id="name"
              onChange={(event) => setName(event.target.value)}
              required
              type="text"
              value={name}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Permissions</label>
            {permissions.map((permission) => {
              return (
                <div className="form-check" key={permission.id}>
                  <input
                    checked={selected.includes(permission.id)}
                    className="form-check-input"
                    id={`permission-${permission.id}`}
                    onChange={() => check(permission.id)}
                    type="checkbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`permission-${permission.id}`}
                  >
                    {permission.name}
                  </label>
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating...' : 'Create Role'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRole;
