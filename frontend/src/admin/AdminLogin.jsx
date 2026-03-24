import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1 className="admin-login__title">Admin Login</h1>
        <p className="admin-login__subtitle">PSY-DIVER Content Management</p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          <label className="admin-login__label">
            Benutzername / Username
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="admin-login__input"
              required
              autoFocus
            />
          </label>
          <label className="admin-login__label">
            Passwort / Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-login__input"
              required
            />
          </label>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? 'Anmelden…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  );
}
