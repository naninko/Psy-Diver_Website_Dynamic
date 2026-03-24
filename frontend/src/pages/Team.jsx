import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditablePageBody from './EditablePageBody';
import './Team.css';

function Team() {
  const { t } = useTranslation();
  const [titleOverride, setTitleOverride] = useState(null);
  const [subtitleOverride, setSubtitleOverride] = useState(null);

  // PSY-DIVER Team Members from LVR-IFuB
  const teamMembers = [
    {
      id: 1,
      name: t('team.members.member1.name'),
      role: t('team.members.member1.role'),
      image: `${import.meta.env.BASE_URL}Foto_Euphrosyne Gouzoulis-Mayfrank.jpg`
    },
    {
      id: 2,
      name: t('team.members.member2.name'),
      role: t('team.members.member2.role'),
      image: `${import.meta.env.BASE_URL}Foto_Soenke_Peters.jpg`
    },
    {
      id: 3,
      name: t('team.members.member3.name'),
      role: t('team.members.member3.role'),
      image: `${import.meta.env.BASE_URL}Foto_Svenja_Kratzke.jpg`
    },
    {
      id: 4,
      name: t('team.members.member4.name'),
      role: t('team.members.member4.role'),
      image: `${import.meta.env.BASE_URL}Ana_Staninska1.png`
    },
    {
      id: 5,
      name: t('team.members.member5.name'),
      role: t('team.members.member5.role'),
      image: `${import.meta.env.BASE_URL}Altina Aliu.jpeg`
    },
    {
      id: 6,
      name: t('team.members.member6.name'),
      role: t('team.members.member6.role'),
      image: `${import.meta.env.BASE_URL}Marisa Flaspoeler.jpg`
    },
    {
      id: 7,
      name: t('team.members.member9.name'),
      role: t('team.members.member9.role'),
      image: `${import.meta.env.BASE_URL}Marwan_Ahmed.jpg`
    },
    {
      id: 8,
      name: t('team.members.member7.name'),
      role: t('team.members.member7.role'),
      image: `${import.meta.env.BASE_URL}Foto_Carolin_Schuster.jpg`
    },
    {
      id: 9,
      name: t('team.members.member8.name'),
      role: t('team.members.member8.role'),
      image: `${import.meta.env.BASE_URL}Foto_Juergen_Zielasek.jpg`
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="container">
          <h1 className="team-title">{titleOverride || t('team.title')}</h1>
          <p className="team-subtitle">{subtitleOverride || t('team.subtitle')}</p>
        </div>
      </section>
      <EditablePageBody slug="team" onTitleChange={setTitleOverride} onSubtitleChange={setSubtitleOverride}>

      {/* Team Members Section */}
      <section className="team-members-section">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className={`team-card-image ${member.id === 5 ? 'team-card-image-scaled-large' : ''} ${[6, 8].includes(member.id) ? 'team-card-image-scaled' : ''} ${member.id === 7 ? 'team-card-image-top' : ''} ${member.id === 8 ? 'team-card-image-bottom' : ''}`}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="team-placeholder-image">
                      <span className="team-placeholder-icon" aria-hidden="true">👤</span>
                    </div>
                  )}
                </div>
                <div className="team-card-content">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </EditablePageBody>
    </div>
  );
}

export default Team;
