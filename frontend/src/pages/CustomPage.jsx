import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../admin/AuthContext';
import EditPageModal from '../admin/EditPageModal';
import './CustomPage.css';

export default function CustomPage({ page, onDelete, onUpdate }) {
  const { i18n } = useTranslation();
  const { isAdmin, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const lang = i18n.language;

  const title = lang === 'de' ? page.titleDe : page.titleEn;
  const subtitle = lang === 'de' ? page.subtitleDe : page.subtitleEn;
  const content = lang === 'de' ? page.contentDe : page.contentEn;

  async function handleDelete() {
    if (!window.confirm(`Seite "${title}" wirklich löschen?`)) return;
    try {
      await fetch(`/api/pages/${page.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (onDelete) onDelete();
    } catch {
      alert('Fehler beim Löschen.');
    }
  }

  return (
    <>
      <div className="custom-page">
        {/* Page Header — same style as other pages */}
        <section className="page-header">
          <div className="container">
            <h1>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
            {isAdmin && (
              <div className="custom-page__admin-bar">
                <button className="custom-page__edit-btn" onClick={() => setEditing(true)}>
                  ✏️ Seite bearbeiten
                </button>
                <button className="custom-page__delete-btn" onClick={handleDelete}>
                  🗑 Seite löschen
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Page Content */}
        <section className="custom-page__body">
          <div className="container">
            <div
              className="custom-page__content"
              dangerouslySetInnerHTML={{ __html: content || '<p></p>' }}
            />
          </div>
        </section>

        {/* Members grid (e.g. advisory board) — stored separately so editing text never removes it */}
        {page.members && page.members.length > 0 && (
          <section className="page-members-section">
            <div className="container">
              {(lang === 'de' ? page.membersTitleDe : page.membersTitleEn) && (
                <h2 className="page-members-title">
                  {lang === 'de' ? page.membersTitleDe : page.membersTitleEn}
                </h2>
              )}
              <div className="persons-grid">
                {page.members.map((member, i) => {
                  const name = lang === 'de' ? member.nameDe : member.nameEn;
                  const role = lang === 'de' ? member.roleDe : member.roleEn;
                  return (
                    <div key={i} className="person-card">
                      <div className="person-card__photo">
                        {member.photo
                          ? <img src={member.photo} alt={name} />
                          : <span className="person-card__placeholder-icon">👤</span>
                        }
                      </div>
                      <div className="person-card__info">
                        <p className="person-card__name">{name}</p>
                        {role && <p className="person-card__role">{role}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      {editing && (
        <EditPageModal
          page={page}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); if (onUpdate) onUpdate(); }}
        />
      )}
    </>
  );
}
