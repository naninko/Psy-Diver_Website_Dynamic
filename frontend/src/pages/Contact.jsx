import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nE-Mail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:psy-diver@lvr.de?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p className="page-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>{t('contact.getInTouch.title')}</h2>
              <p>
                {t('contact.getInTouch.description')}
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-text">
                    <h4>{t('contact.details.projectLead')}</h4>
                    <p>Dr. Sönke J. Peters (er/ ihm)</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-text">
                    <h4>{t('contact.details.address')}</h4>
                    <p>
                      LVR-Institut für Forschung und Bildung<br />
                      c/o LVR-Klinik Köln<br />
                      Wilhelm-Griesinger-Straße 23<br />
                      51109 Köln, Germany
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-text">
                    <h4>{t('contact.details.email')}</h4>
                    <p>
                      <a href="mailto:psy-diver@lvr.de">
                        psy-diver@lvr.de
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>{t('contact.form.title')}</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">
                    {t('contact.form.name')} <span className="required">{t('contact.form.required')}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    {t('contact.form.email')} <span className="required">{t('contact.form.required')}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    {t('contact.form.subject')} <span className="required">{t('contact.form.required')}</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.subjectPlaceholder')}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    {t('contact.form.message')} <span className="required">{t('contact.form.required')}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('contact.form.messagePlaceholder')}
                    aria-required="true"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  {t('contact.form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
