import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ReadAloud from './components/ReadAloud';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Partners from './pages/Partners';
import News from './pages/News';
import Contact from './pages/Contact';
import Imprint from './pages/Imprint';
import ForPatients from './pages/ForPatients';
import ForRelatives from './pages/ForRelatives';
import ForProfessionals from './pages/ForProfessionals';
import CustomPage from './pages/CustomPage';
import AdminLogin from './admin/AdminLogin';
import AdminButton from './admin/AdminButton';
import { AuthProvider } from './admin/AuthContext';
import './App.css';

function AppInner() {
  const { t, i18n } = useTranslation();
  const [customPages, setCustomPages] = useState([]);

  const fetchCustomPages = useCallback(async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      setCustomPages(data);
    } catch {
      // backend not running or no pages yet
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    fetchCustomPages();
  }, [fetchCustomPages]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <a href="#main-content" className="skip-link">
          {t('common.skipToMain')}
        </a>
        <Header customPages={customPages} />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/patients" element={<ForPatients />} />
            <Route path="/about/relatives" element={<ForRelatives />} />
            <Route path="/about/professionals" element={<ForProfessionals />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/admin" element={<AdminLogin />} />
            {/* Dynamic custom pages */}
            {customPages.map(page => (
              <Route
                key={page.slug}
                path={`/${page.slug}`}
                element={<CustomPage page={page} onDelete={fetchCustomPages} />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
        <ReadAloud />
        <AdminButton onContentChange={fetchCustomPages} />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
