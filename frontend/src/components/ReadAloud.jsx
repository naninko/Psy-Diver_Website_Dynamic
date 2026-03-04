import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ReadAloud.css';

function ReadAloud() {
  const { i18n } = useTranslation();
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Stop reading when component unmounts or language changes
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [i18n.language]);

  // Process text for better pronunciation
  const processTextForSpeech = (text) => {
    // Replace PSY-DIVER with phonetic spelling
    // PSY = "sigh" (like Greek psi), DIVER = English "diver"
    return text.replace(/PSY-DIVER/gi, 'Sigh-Diver');
  };

  const getPageText = () => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return '';

    // Clone the content to avoid modifying the actual DOM
    const clone = mainContent.cloneNode(true);

    // Remove elements that shouldn't be read
    const elementsToRemove = clone.querySelectorAll('button, script, style, nav, .read-aloud-btn');
    elementsToRemove.forEach(el => el.remove());

    return clone.textContent || '';
  };

  const handleRead = () => {
    if (isReading && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isReading && isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start reading
      window.speechSynthesis.cancel();

      const rawText = getPageText();
      if (!rawText.trim()) return;

      // Process text for correct pronunciation
      const text = processTextForSpeech(rawText);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'de' ? 'de-DE' : 'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsReading(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  };

  return (
    <div className="read-aloud-container">
      <button
        className={`read-aloud-btn ${isReading ? 'reading' : ''}`}
        onClick={handleRead}
        aria-label={isReading ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Read page aloud'}
        title={isReading ? (isPaused ? 'Resume' : 'Pause') : 'Read aloud'}
      >
        {isReading ? (
          isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
      {isReading && (
        <button
          className="read-aloud-btn stop-btn"
          onClick={handleStop}
          aria-label="Stop reading"
          title="Stop"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M6 6h12v12H6z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default ReadAloud;
