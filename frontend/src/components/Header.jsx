import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import logo from '/FINAL_psydiver_logo.png';

function Header({ customPages = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  // Returns 'active' if current path matches the base path or any custom sub-page for that group
  const isGroupActive = (basePath, group) => {
    const customPaths = customPages.filter(p => p.navGroup === group).map(p => `/${p.slug}`);
    return location.pathname === basePath || customPaths.includes(location.pathname) ? 'active' : '';
  };

  const isAboutActive = () => {
    const staticPaths = ['/about', '/about/patients', '/about/relatives', '/about/professionals'];
    const customPaths = customPages.filter(p => p.navGroup === 'about').map(p => `/${p.slug}`);
    return [...staticPaths, ...customPaths].includes(location.pathname) ? 'active' : '';
  };

  const getPageTitle = (page) => i18n.language === 'de' ? page.titleDe : page.titleEn;

  // Get custom pages for each group
  const pagesFor = (group) => customPages.filter(p => p.navGroup === group);
  const topCustomPages = pagesFor('top');

  // Helper: render a nav item that becomes a dropdown if it has custom sub-pages
  function NavItemWithOptionalDropdown({ to, label, group, staticChildren, activeClass }) {
    const subPages = pagesFor(group);
    const hasDropdown = staticChildren || subPages.length > 0;
    const computedActiveClass = activeClass !== undefined
      ? activeClass
      : (to ? isGroupActive(to, group) : '');

    if (!hasDropdown) {
      return (
        <li>
          <Link to={to} className={`nav-link ${isActive(to)}`} onClick={closeMenu}>
            {label}
          </Link>
        </li>
      );
    }

    return (
      <li className="nav-item-dropdown">
        {to
          ? <Link to={to} className={`nav-link ${computedActiveClass}`} onClick={closeMenu}>{label}</Link>
          : <span className={`nav-link ${computedActiveClass}`}>{label}</span>
        }
        <ul className="dropdown-menu">
          {staticChildren}
          {subPages.map(page => (
            <li key={page.id}>
              <Link to={`/${page.slug}`} className="dropdown-link" onClick={closeMenu}>
                {getPageTitle(page)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src={logo} alt="PSY-DIVER Logo" className="logo" />
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <ul className="nav-list">
              <li>
                <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
                  {t('nav.home')}
                </Link>
              </li>

              {/* Über das Projekt — always a dropdown (has static sub-items) */}
              <NavItemWithOptionalDropdown
                to="/about"
                label={t('nav.about')}
                group="about"
                staticChildren={<>
                  <li><Link to="/about/patients" className="dropdown-link" onClick={closeMenu}>{t('nav.forPatients')}</Link></li>
                  <li><Link to="/about/relatives" className="dropdown-link" onClick={closeMenu}>{t('nav.forRelatives')}</Link></li>
                  <li><Link to="/about/professionals" className="dropdown-link" onClick={closeMenu}>{t('nav.forProfessionals')}</Link></li>
                </>}
              />

              {/* Über Uns — dropdown with Team as first item */}
              <NavItemWithOptionalDropdown
                to={null}
                label={t('nav.aboutUs')}
                group="team"
                activeClass={
                  location.pathname === '/team' ||
                  pagesFor('team').map(p => `/${p.slug}`).includes(location.pathname)
                    ? 'active' : ''
                }
                staticChildren={
                  <li><Link to="/team" className="dropdown-link" onClick={closeMenu}>{t('nav.team')}</Link></li>
                }
              />

              {/* Neuigkeiten — dropdown only if custom pages added */}
              <NavItemWithOptionalDropdown
                to="/news"
                label={t('nav.news')}
                group="news"
                staticChildren={null}
              />

              {/* Dynamically added top-level tabs */}
              {topCustomPages.map(page => (
                <li key={page.id}>
                  <Link
                    to={`/${page.slug}`}
                    className={`nav-link ${isActive(`/${page.slug}`)}`}
                    onClick={closeMenu}
                  >
                    {getPageTitle(page)}
                  </Link>
                </li>
              ))}

              {/* Kontakt — dropdown only if custom pages added */}
              <NavItemWithOptionalDropdown
                to="/contact"
                label={t('nav.contact')}
                group="contact"
                staticChildren={null}
              />

              <li className="lang-switcher-item">
                <LanguageSwitcher />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
