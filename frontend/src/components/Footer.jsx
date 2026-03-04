import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import logo from '/FINAL_psydiver_logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/team">{t('nav.team')}</Link></li>
              <li><Link to="/news">{t('nav.news')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><a href="https://ifub.lvr.de/de/nav_main/impressum.html" target="_blank" rel="noopener noreferrer">{t('nav.imprint')}</a></li>
              <li><a href="https://ifub.lvr.de/de/nav_main/datenschutz.html" target="_blank" rel="noopener noreferrer">{t('nav.privacy')}</a></li>
              <li><a href="https://ifub.lvr.de/de/nav_main/barrierefreiheit.html" target="_blank" rel="noopener noreferrer">{t('nav.accessibility')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <address>
              <p>
                <strong>{t('footer.projectLead')}</strong><br />
                {t('footer.projectRole')}
              </p>
              <p>
                Email: <a href="mailto:psy-diver@lvr.de">
                  psy-diver@lvr.de
                </a>
              </p>
            </address>
          </div>

          <div className="footer-section">
            <h4>{t('footer.timeline')}</h4>
            <p>
              <strong>{t('footer.duration')}:</strong><br />
              {t('footer.durationValue')}
            </p>
            <p className="location">
              <strong>{t('footer.location')}:</strong><br />
              {t('footer.locationValue').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('footer.locationValue').split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logos">
            <img src={logo} alt="PSY-DIVER Logo" className="footer-logo" />
          </div>
          <p className="copyright">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
