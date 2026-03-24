import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditablePageBody from './EditablePageBody';
import './About.css';

function About() {
  const { t } = useTranslation();
  const [titleOverride, setTitleOverride] = useState(null);
  const [subtitleOverride, setSubtitleOverride] = useState(null);

  return (
    <div className="about">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{titleOverride || t('about.title')}</h1>
          <p className="page-subtitle">
            {subtitleOverride || t('about.subtitle')}
          </p>
        </div>
      </section>
      <EditablePageBody slug="about" onTitleChange={setTitleOverride} onSubtitleChange={setSubtitleOverride}>

      {/* Projektübersicht / Project Overview */}
      <section className="overview-section">
        <div className="container">
          <h2 className="section-title">{t('about.overview.title')}</h2>
          <div className="overview-content">
            {t('about.overview.text').split('\n\n').map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
          </div>
        </div>
      </section>

      {/* Ziele / Goals */}
      <section className="goals-section">
        <div className="container">
          <h2 className="section-title">{t('about.goals.title')}</h2>
          <div className="goals-grid">
            <div className="goal-card" style={{'--card-color': 'var(--color-cyan)'}}>
              <div className="goal-number" aria-hidden="true">01</div>
              <h3>{t('about.goals.goal1.title')}</h3>
              <p>{t('about.goals.goal1.description')}</p>
            </div>

            <div className="goal-card" style={{'--card-color': 'var(--color-magenta)'}}>
              <div className="goal-number" aria-hidden="true">02</div>
              <h3>{t('about.goals.goal2.title')}</h3>
              <p>{t('about.goals.goal2.description')}</p>
            </div>

            <div className="goal-card" style={{'--card-color': 'var(--color-yellow)'}}>
              <div className="goal-number" aria-hidden="true">03</div>
              <h3>{t('about.goals.goal3.title')}</h3>
              <p>{t('about.goals.goal3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hintergrund / Background */}
      <section className="background-section">
        <div className="container">
          <h2 className="section-title">{t('about.background.title')}</h2>
          <div className="background-content">
            {t('about.background.text').split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Studiendesign & Zielpopulation / Study Design & Target Population */}
      <section className="study-design-section">
        <div className="container">
          <h2 className="section-title">{t('about.studyDesign.title')}</h2>
          <div className="study-design-content">
            <p>{t('about.studyDesign.text')}</p>
          </div>
        </div>
      </section>

      {/* Förderer / Kooperationspartner / Funders / Cooperation Partners */}
      <section className="funders-partners-section">
        <div className="container">
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
      </section>

      {/* Kontakt / Contact */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="contact-cta-content">
            <h2 className="section-title">{t('about.contactSection.title')}</h2>
            <p className="contact-cta-text">
              {t('about.contactSection.text').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('about.contactSection.text').split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            <Link to="/contact" className="btn btn-secondary">
              {t('common.getInTouch')}
            </Link>
          </div>
        </div>
      </section>
      </EditablePageBody>
    </div>
  );
}

export default About;
