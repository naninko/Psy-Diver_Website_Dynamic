import { useTranslation } from 'react-i18next';
import './Imprint.css';

function Imprint() {
  const { t } = useTranslation();

  return (
    <div className="imprint-page">
      <section className="page-header">
        <div className="container">
          <h1>{t('imprint.title')}</h1>
        </div>
      </section>

      <section className="imprint-content">
        <div className="container">
          {/* Angaben gemäß § 5 TMG */}
          <div className="imprint-section">
            <h2>{t('imprint.provider.title')}</h2>
            <p>LVR-Institut für Forschung und Bildung</p>
            <p>LVR-Klinik Köln</p>
            <p>Wilhelm-Griesinger-Straße 23</p>
            <p>51109 Köln, Germany</p>
          </div>

          <div className="imprint-section">
            <h2>{t('imprint.contact.title')}</h2>
            <p>
              E-Mail: <a href="mailto:psy-diver@lvr.de">psy-diver@lvr.de</a>
            </p>
          </div>

          <div className="imprint-section">
            <h2>{t('imprint.responsible.title')}</h2>
            <p>Dr. Sönke Johann Peters</p>
            <p>{t('imprint.responsible.role')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Imprint;
