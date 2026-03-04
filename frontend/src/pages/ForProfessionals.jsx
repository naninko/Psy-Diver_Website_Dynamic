import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ForAudience.css';

function ForProfessionals() {
  const { t } = useTranslation();

  return (
    <div className="for-audience-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{t('forProfessionals.title')}</h1>
          <p className="page-subtitle">
            {t('forProfessionals.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="container">
          <div className="audience-content">
            <h2>{t('forProfessionals.whatIsThis.title')}</h2>
            <p>{t('forProfessionals.whatIsThis.description')}</p>

            <h2>{t('forProfessionals.whatWeOffer.title')}</h2>
            <div className="info-cards">
              <div className="info-card">
                <h3>{t('forProfessionals.card1.title')}</h3>
                <p>{t('forProfessionals.card1.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forProfessionals.card2.title')}</h3>
                <p>{t('forProfessionals.card2.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forProfessionals.card3.title')}</h3>
                <p>{t('forProfessionals.card3.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forProfessionals.card4.title')}</h3>
                <p>{t('forProfessionals.card4.description')}</p>
              </div>
            </div>

            <h2>{t('forProfessionals.participation.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forProfessionals.participation.method1.title')}</h4>
                <p>{t('forProfessionals.participation.method1.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forProfessionals.participation.method2.title')}</h4>
                <p>{t('forProfessionals.participation.method2.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forProfessionals.participation.method3.title')}</h4>
                <p>{t('forProfessionals.participation.method3.description')}</p>
              </div>
            </div>

            <h2>{t('forProfessionals.faq.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forProfessionals.faq.question1')}</h4>
                <p>{t('forProfessionals.faq.answer1')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forProfessionals.faq.question2')}</h4>
                <p>{t('forProfessionals.faq.answer2')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forProfessionals.faq.question3')}</h4>
                <p>{t('forProfessionals.faq.answer3')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forProfessionals.faq.question4')}</h4>
                <p dangerouslySetInnerHTML={{ __html: t('forProfessionals.faq.answer4') }} />
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

export default ForProfessionals;
