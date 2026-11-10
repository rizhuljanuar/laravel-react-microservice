'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirm: passwordConfirm,
    });
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Create an account</h1>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            name="first_name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="floatingFirstName">First name</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            name="last_name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor="floatingLastName">Last name</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordConfirm"
            name="password_confirm"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <label htmlFor="floatingPasswordConfirm">
            Confirm password
          </label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>

        <p className="mt-5 mb-3 text-body-secondary">© 2017–2026</p>
      </form>
    </main>
  );
}
