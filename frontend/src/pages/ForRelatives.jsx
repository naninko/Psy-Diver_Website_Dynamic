import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ForAudience.css';

function ForRelatives() {
  const { t } = useTranslation();

  return (
    <div className="for-audience-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{t('forRelatives.title')}</h1>
          <p className="page-subtitle">
            {t('forRelatives.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="container">
          <div className="audience-content">
            <h2>{t('forRelatives.whatIsThis.title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('forRelatives.whatIsThis.description') }}></p>

            <h2>{t('forRelatives.whatWeOffer.title')}</h2>
            <div className="info-cards">
              <div className="info-card">
                <h3>{t('forRelatives.card1.title')}</h3>
                <p>{t('forRelatives.card1.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forRelatives.card2.title')}</h3>
                <p>{t('forRelatives.card2.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forRelatives.card3.title')}</h3>
                <p>{t('forRelatives.card3.description')}</p>
              </div>
              <div className="info-card">
                <h3>{t('forRelatives.card4.title')}</h3>
                <p>{t('forRelatives.card4.description')}</p>
              </div>
            </div>

            <h2>{t('forRelatives.participation.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forRelatives.participation.method1.title')}</h4>
                <p>{t('forRelatives.participation.method1.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.participation.method2.title')}</h4>
                <p>{t('forRelatives.participation.method2.description')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.participation.method3.title')}</h4>
                <p>{t('forRelatives.participation.method3.description')}</p>
              </div>
            </div>

            <h2>{t('forRelatives.faq.title')}</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h4>{t('forRelatives.faq.question1')}</h4>
                <p>{t('forRelatives.faq.answer1')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.faq.question2')}</h4>
                <p>{t('forRelatives.faq.answer2')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.faq.question3')}</h4>
                <p>{t('forRelatives.faq.answer3')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.faq.question4')}</h4>
                <p>{t('forRelatives.faq.answer4')}</p>
              </div>
              <div className="faq-item">
                <h4>{t('forRelatives.faq.question5')}</h4>
                <p>{t('forRelatives.faq.answer5')}</p>
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

export default ForRelatives;
