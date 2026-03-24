import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';
import heroLogo from '/PsyDiver_Logo_reversed.png';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{t('home.title')}</h1>
              <p className="hero-subtitle">
                {t('home.subtitle')}
              </p>
              <div className="hero-buttons">
                <Link to="/about" className="btn btn-primary">
                  {t('common.learnMore')}
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  {t('common.getInTouch')}
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src={heroLogo} alt="PSY-DIVER Logo" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">{t('about.overview.title')}</h2>
          <div className="overview-content">
            <p dangerouslySetInnerHTML={{ __html: t('about.overview.para1') }}></p>
            <div className="overview-image">
              <img src={`${import.meta.env.BASE_URL}7_Dimensionen_ENG.png`} alt="7 Diversitätsdimensionen" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: t('about.overview.para2') }}></p>
          </div>

          {/* Partners Section */}
          <div className="partners-section">
            <p className="partners-text" dangerouslySetInnerHTML={{ __html: t('about.overview.partners') }}></p>
            <div className="partners-logos">
              <a href="https://innovationsfonds.g-ba.de/" target="_blank" rel="noopener noreferrer" className="partner-logo">
                <img src={`${import.meta.env.BASE_URL}partners/innovationsfonds.svg`} alt="Innovationsfonds des Gemeinsamen Bundesausschusses" />
              </a>
              <a href="https://www.dgppn.de/" target="_blank" rel="noopener noreferrer" className="partner-logo">
                <img src={`${import.meta.env.BASE_URL}partners/dgppn.svg`} alt="Deutsche Gesellschaft für Psychiatrie und Psychotherapie, Psychosomatik und Nervenheilkunde" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="target-audience">
        <div className="container">
          <h2 className="section-title">{t('home.targetAudience.title')}</h2>
          <div className="audience-grid">
            <div className="audience-card" style={{'--card-color': 'var(--color-cyan)'}}>
              <div className="audience-icon" aria-hidden="true">
                <img src="/pictograms/person.png" alt="" />
              </div>
              <h3>{t('home.targetAudience.forPatients.title')}</h3>
              <p>{t('home.targetAudience.forPatients.description')}</p>
              <Link to="/about/patients" className="btn btn-primary">
                {t('home.targetAudience.forPatients.button')}
              </Link>
            </div>

            <div className="audience-card" style={{'--card-color': 'var(--color-magenta)'}}>
              <div className="audience-icon" aria-hidden="true">
                <img src="/pictograms/family.png" alt="" />
              </div>
              <h3>{t('home.targetAudience.forRelatives.title')}</h3>
              <p>{t('home.targetAudience.forRelatives.description')}</p>
              <Link to="/about/relatives" className="btn btn-primary">
                {t('home.targetAudience.forRelatives.button')}
              </Link>
            </div>

            <div className="audience-card" style={{'--card-color': 'var(--color-yellow)'}}>
              <div className="audience-icon" aria-hidden="true">
                <img src="/pictograms/hospital.png" alt="" />
              </div>
              <h3>{t('home.targetAudience.forProfessionals.title')}</h3>
              <p>{t('home.targetAudience.forProfessionals.description')}</p>
              <Link to="/about/professionals" className="btn btn-primary">
                {t('home.targetAudience.forProfessionals.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.cta.title')}</h2>
            <p>
              {t('home.cta.description')}
            </p>
            <div className="cta-buttons">
              <Link to="/about" className="btn btn-primary">
                {t('home.cta.aboutBtn')}
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
