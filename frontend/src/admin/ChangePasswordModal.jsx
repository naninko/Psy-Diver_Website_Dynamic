import { useState } from 'react';
import { useAuth } from './AuthContext';
import './Modal.css';

export default function ChangePasswordModal({ onClose }) {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      return setError('Die neuen Passwörter stimmen nicht überein.');
    }
    if (newPassword.length < 6) {
      return setError('Das neue Passwort muss mindestens 6 Zeichen haben.');
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--narrow" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">🔑 Passwort ändern</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        {success ? (
          <div className="modal__form">
            <p className="modal__success">✅ Passwort wurde erfolgreich geändert.</p>
            <div className="modal__actions">
              <button className="modal__btn modal__btn--save" onClick={onClose}>Schließen</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal__form">
            <label className="modal__label">
              Aktuelles Passwort
              <input type="password" value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="modal__input" required autoFocus />
            </label>
            <label className="modal__label">
              Neues Passwort
              <input type="password" value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="modal__input" required />
            </label>
            <label className="modal__label">
              Neues Passwort bestätigen
              <input type="password" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="modal__input" required />
            </label>

            {error && <p className="modal__error">{error}</p>}

            <div className="modal__actions">
              <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>
                Abbrechen
              </button>
              <button type="submit" className="modal__btn modal__btn--save" disabled={loading}>
                {loading ? 'Speichern…' : 'Passwort ändern'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
