'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Permission } from '@/app/types';

const RoleEdit = ({ id }: { id: number }) => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const permissionCall = await api.get('/permissions');
        setPermissions(permissionCall.data.data);

        const roleCall = await api.get(`/roles/${id}`);
        const role = roleCall.data.data;

        setName(role.name);
        setSelected(
          role.permissions.map((permission: Permission) => permission.id)
        );
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
            requestError.response?.data?.message ?? 'Failed to load role.';
          setError(serverMessage);
        } else {
          setError('Failed to load role.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const check = (permissionId: number) => {
    if (selected.includes(permissionId)) {
      setSelected(selected.filter((item) => item !== permissionId));
      return;
    }

    setSelected([...selected, permissionId]);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.put(`/roles/${id}`, {
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
          requestError.response?.data?.message ?? 'Failed to update role.';
        setError(serverMessage);
      } else {
        setError('Failed to update role.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Edit Role</h1>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && permissions.length > 0 && (
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
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RoleEdit;
