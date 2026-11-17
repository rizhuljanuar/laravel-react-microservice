'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';
import { setUser } from '@/redux/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [errorInfo, setErrorInfo] = useState('');
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [successInfo, setSuccessInfo] = useState('');
  const [successPassword, setSuccessPassword] = useState('');

  const updateInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorInfo('');
    setSuccessInfo('');
    setIsSubmittingInfo(true);

    try {
      const response = await api.put('/users/info', {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      dispatch(setUser(response.data));
      setSuccessInfo('Profile updated.');
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
          requestError.response?.data?.message ?? 'Updating profile failed.';
        setErrorInfo(serverMessage);
      } else {
        setErrorInfo('Updating profile failed.');
      }
    } finally {
      setIsSubmittingInfo(false);
    }
  };

  const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorPassword('');
    setSuccessPassword('');
    setIsSubmittingPassword(true);

    try {
      await api.put('/users/password', {
        password,
        password_confirm: passwordConfirm,
      });
      setSuccessPassword('Password updated.');
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
          'Updating password failed.';
        setErrorPassword(serverMessage);
      } else {
        setErrorPassword('Updating password failed.');
      }
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <main className="col-md-10 px-4 py-3">
      <h1 className="h2">Profile</h1>

      <div className="card mt-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Update Password</h2>

          {errorPassword && (
            <p className="text-danger small" role="alert">
              {errorPassword}
            </p>
          )}

          {successPassword && (
            <p className="text-success small" role="status">
              {successPassword}
            </p>
          )}

          <form onSubmit={updatePassword}>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password_confirm">
                Password Confirm
              </label>
              <input
                className="form-control"
                type="password"
                id="password_confirm"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmittingPassword}
            >
              {isSubmittingPassword ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Update Profile</h2>

          {errorInfo && (
            <p className="text-danger small" role="alert">
              {errorInfo}
            </p>
          )}

          {successInfo && (
            <p className="text-success small" role="status">
              {successInfo}
            </p>
          )}

          <form onSubmit={updateInfo}>
            <div className="mb-3">
              <label className="form-label" htmlFor="first_name">
                First Name
              </label>
              <input
                className="form-control"
                id="first_name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="last_name">
                Last Name
              </label>
              <input
                className="form-control"
                id="last_name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmittingInfo}
            >
              {isSubmittingInfo ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
