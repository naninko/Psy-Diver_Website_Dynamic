import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ForAudience.css';

function ForPatients() {
  const { t } = useTranslation();

  return (
    <div className="for-audience-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{t('forPatients.title')}</h1>
          <p className="page-subtitle">
            {t('forPatients.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="container">
          <div className="audience-content">
            <h2>{t('forPatients.whatIsThis.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('forPatients.whatIsThis.description') }}></p>

            <h2>{t('forPatients.whatWeOffer.title')}</h2>
            <div className="info-cards">
              <div className="info-card">
                <h3>{t('forPatients.card1.title')}</h3>
                <p>{t('forPatients.card1.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forPatients.card2.title')}</h3>
                <p>{t('forPatients.card2.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forPatients.card3.title')}</h3>
                <p>{t('forPatients.card3.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forPatients.card4.title')}</h3>
                <p>{t('forPatients.card4.description')}</p>
              </div>
            </div>

            <h2>{t('forPatients.participation.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forPatients.participation.method1.title')}</h4>
                <p>{t('forPatients.participation.method1.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forPatients.participation.method2.title')}</h4>
                <p>{t('forPatients.participation.method2.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forPatients.participation.method3.title')}</h4>
                <p>{t('forPatients.participation.method3.description')}</p>
              </div>
            </div>

            <h2>{t('forPatients.faq.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forPatients.faq.question1')}</h4>
                <p>{t('forPatients.faq.answer1')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forPatients.faq.question2')}</h4>
                <p>{t('forPatients.faq.answer2')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forPatients.faq.question3')}</h4>
                <p>{t('forPatients.faq.answer3')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forPatients.faq.question4')}</h4>
                <p>{t('forPatients.faq.answer4')}</p>
              </div>
            </div>
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
    </div>
  );
}

export default ForPatients;
