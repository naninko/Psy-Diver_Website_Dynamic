import { useTranslation } from 'react-i18next';
import './Partners.css';

function Partners() {
  const { t } = useTranslation();

  return (
    <div className="partners">
      <section className="page-header">
        <div className="container">
          <h1>{t('partners.title')}</h1>
          <p className="page-subtitle">{t('partners.subtitle')}</p>
        </div>
      </section>

      <section className="lead-institution">
        <div className="container">
          <h2 className="section-title">{t('partners.leadInstitution.title')}</h2>
          <div className="lead-card">
            <div className="institution-header">
              <h3>{t('partners.leadInstitution.name')}</h3>
              <p className="institution-name">{t('partners.leadInstitution.clinic')}</p>
            </div>
            <div className="institution-content">
              <p>{t('partners.leadInstitution.para1')}</p>
              <p>{t('partners.leadInstitution.para2')}</p>
            </div>
            <div className="institution-details">
              <div className="detail-item">
                <h4>{t('partners.leadInstitution.address')}</h4>
                <p>{t('partners.leadInstitution.addressValue')}</p>
              </div>
              <div className="detail-item">
                <h4>{t('partners.leadInstitution.contact')}</h4>
                <p>
                  Email: <a href="mailto:psy-diver@lvr.de">
                    psy-diver@lvr.de
                  </a>
                </p>
              </div>
              <div className="detail-item">
                <h4>{t('partners.leadInstitution.location')}</h4>
                <p>{t('partners.leadInstitution.locationValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-lead">
        <div className="container">
          <h2 className="section-title">{t('partners.projectLead.title')}</h2>
          <div className="lead-profile">
            <div className="profile-content">
              <h3>{t('partners.projectLead.name')}</h3>
              <p className="profile-title">{t('partners.projectLead.role')}</p>
              <p className="profile-description">{t('partners.projectLead.description')}</p>
              <div className="profile-expertise">
                <h4>{t('partners.projectLead.expertiseTitle')}</h4>
                <ul>
                  <li>{t('partners.projectLead.expertise1')}</li>
                  <li>{t('partners.projectLead.expertise2')}</li>
                  <li>{t('partners.projectLead.expertise3')}</li>
                  <li>{t('partners.projectLead.expertise4')}</li>
                  <li>{t('partners.projectLead.expertise5')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-lvr">
        <div className="container">
          <h2 className="section-title">{t('partners.aboutLVR.title')}</h2>
          <div className="lvr-content">
            <div className="lvr-description">
              <p>{t('partners.aboutLVR.description')}</p>
            </div>

            <div className="lvr-features">
              <div className="feature-card">
                <div className="feature-icon">🏥</div>
                <h4>{t('partners.aboutLVR.healthcare.title')}</h4>
                <p>{t('partners.aboutLVR.healthcare.description')}</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔬</div>
                <h4>{t('partners.aboutLVR.research.title')}</h4>
                <p>{t('partners.aboutLVR.research.description')}</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h4>{t('partners.aboutLVR.inclusive.title')}</h4>
                <p>{t('partners.aboutLVR.inclusive.description')}</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h4>{t('partners.aboutLVR.education.title')}</h4>
                <p>{t('partners.aboutLVR.education.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="network-info">
        <div className="container">
          <h2 className="section-title">{t('partners.network.title')}</h2>
          <div className="network-stats">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <p>{t('partners.network.inpatient')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">170,000+</div>
              <p>{t('partners.network.outpatient')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">3 {t('home.projectInfo.durationDesc').split('-')[0]}</div>
              <p>{t('partners.network.duration')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">€1M+</div>
              <p>{t('partners.network.funding')}</p>
            </div>
          </div>
          <div className="network-description">
            <p>{t('partners.network.description')}</p>
          </div>
        </div>
      </section>

      <section className="collaboration-section">
        <div className="container">
          <h2 className="section-title">{t('partners.collaboration.title')}</h2>
          <div className="collaboration-content">
            <p>{t('partners.collaboration.description')}</p>
            <a href="/contact" className="btn btn-primary">{t('common.contactUs')}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Partners;
