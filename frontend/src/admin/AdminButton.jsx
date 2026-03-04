import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AddNewsModal from './AddNewsModal';
import AddPageModal from './AddPageModal';
import ChangePasswordModal from './ChangePasswordModal';
import './AdminButton.css';

export default function AdminButton({ onContentChange }) {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'news' | 'page' | 'password'

  if (!isAdmin) return null;

  function openModal(type) {
    setMenuOpen(false);
    setModal(type);
  }

  function closeModal() {
    setModal(null);
  }

  function handleSaved() {
    closeModal();
    if (onContentChange) onContentChange();
  }

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate('/');
  }

  return (
    <>
      {/* Floating button */}
      <div className="admin-fab-wrap">
        {menuOpen && (
          <div className="admin-fab-menu">
            <button className="admin-fab-menu__item" onClick={() => openModal('news')}>
              <span className="admin-fab-menu__icon">📰</span>
              Neuigkeit hinzufügen
            </button>
            <button className="admin-fab-menu__item" onClick={() => openModal('page')}>
              <span className="admin-fab-menu__icon">📄</span>
              Neue Seite erstellen
            </button>
            <button className="admin-fab-menu__item" onClick={() => openModal('password')}>
              <span className="admin-fab-menu__icon">🔑</span>
              Passwort ändern
            </button>
            <button className="admin-fab-menu__item admin-fab-menu__item--logout" onClick={handleLogout}>
              <span className="admin-fab-menu__icon">🚪</span>
              Abmelden
            </button>
          </div>
        )}
        <button
          className={`admin-fab ${menuOpen ? 'admin-fab--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Admin-Menü öffnen"
          title="Admin"
        >
          {menuOpen ? '✕' : '+'}
        </button>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="admin-fab-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      {/* Modals */}
      {modal === 'news' && (
        <AddNewsModal onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'page' && (
        <AddPageModal onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'password' && (
        <ChangePasswordModal onClose={closeModal} />
      )}
    </>
  );
}
