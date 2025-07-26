'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './CookieBanner.module.css';
import Button from '../Button/Button';
import Text from '../Text';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    functional: false
  });
  
  const pathname = usePathname();

  // Function to open settings from cookie page
  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  // Expose function globally for use on cookie page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { openCookieSettings: () => void }).openCookieSettings = openSettings;
    }
  }, [openSettings]);

  const applyConsentSettings = useCallback((settings: CookieConsent) => {
    // Apply analytics consent
    if (settings.analytics) {
      // Enable analytics cookies
      enableAnalytics();
    } else {
      // Disable analytics cookies
      disableAnalytics();
    }

    // Apply functional consent
    if (settings.functional) {
      // Enable functional cookies
      enableFunctional();
    } else {
      // Disable functional cookies
      disableFunctional();
    }
  }, []);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
        // Apply consent settings
        applyConsentSettings(parsedConsent);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setShowBanner(true);
      }
    }
  }, [applyConsentSettings]);

  const enableAnalytics = () => {
    // Enable Vercel Analytics, Next.js Analytics, etc.
    if (typeof window !== 'undefined') {
      // Example: Enable Vercel Analytics
      // window.va = window.va || function () { (window.va.q = window.va.q || []).push(arguments) };
    }
  };

  const disableAnalytics = () => {
    // Disable analytics cookies
    if (typeof window !== 'undefined') {
      // Example: Disable Vercel Analytics
      // window.va = function() { return; };
    }
  };

  const enableFunctional = () => {
    // Enable functional cookies (Supabase, etc.)
  };

  const disableFunctional = () => {
    // Disable functional cookies
  };

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      functional: true
    };
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    applyConsentSettings(newConsent);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      functional: false
    };
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    applyConsentSettings(newConsent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    applyConsentSettings(consent);
    setShowSettings(false);
    setShowBanner(false);
  };

  const handleChangeConsent = (type: keyof CookieConsent, value: boolean) => {
    if (type === 'necessary') return; // Cannot change necessary cookies
    setConsent(prev => ({ ...prev, [type]: value }));
  };

  const handleRevokeConsent = () => {
    localStorage.removeItem('cookie-consent');
    setShowBanner(true);
    setConsent({
      necessary: true,
      analytics: false,
      functional: false
    });
    applyConsentSettings({
      necessary: true,
      analytics: false,
      functional: false
    });
  };

  // Don't render anything if banner and settings are closed
  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className={styles.banner}>
          <div className={styles.content}>
            <Text as="h3" fontMid style={{ marginBottom: '1rem' }}>
              Cookie-Einstellungen
            </Text>
            <Text as="p" style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
              Wir verwenden Cookies, um unsere Website zu verbessern und Ihnen eine bessere Nutzererfahrung zu bieten. 
              Technisch notwendige Cookies sind für den ordnungsgemäßen Betrieb der Website erforderlich. 
              Analyse- und funktionale Cookies helfen uns, die Website zu optimieren.
            </Text>
            <div className={styles.buttons}>
              <Button 
                text="Nur notwendige Cookies" 
                onClick={handleAcceptNecessary}
                style={{ marginRight: '1rem' }}
              />
              <Button 
                text="Alle Cookies akzeptieren" 
                onClick={handleAcceptAll}
              />
            </div>
            <div className={styles.links}>
              <Button 
                text="Detaillierte Einstellungen" 
                onClick={() => setShowSettings(true)}
                underline
                style={{ marginRight: '1rem' }}
              />
              <Button 
                href="/cookies" 
                text="Cookie-Richtlinie" 
                underline
                target="_blank"
              />
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className={styles.settings}>
          <div className={styles.content}>
            <Text as="h3" fontMid style={{ marginBottom: '1rem' }}>
              Detaillierte Cookie-Einstellungen
            </Text>
            
            <div className={styles.cookieGroup}>
              <div className={styles.cookieHeader}>
                <Text as="h4" style={{ margin: 0 }}>
                  Technisch notwendige Cookies
                </Text>
                <input 
                  type="checkbox" 
                  checked={consent.necessary} 
                  disabled 
                  className={styles.checkbox}
                />
              </div>
              <Text as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                Diese Cookies sind für den ordnungsgemäßen Betrieb der Website erforderlich und können nicht deaktiviert werden.
              </Text>
            </div>

            <div className={styles.cookieGroup}>
              <div className={styles.cookieHeader}>
                <Text as="h4" style={{ margin: 0 }}>
                  Analyse-Cookies
                </Text>
                <input 
                  type="checkbox" 
                  checked={consent.analytics} 
                  onChange={(e) => handleChangeConsent('analytics', e.target.checked)}
                  className={styles.checkbox}
                />
              </div>
              <Text as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                Diese Cookies helfen uns, die Nutzung der Website zu verstehen und zu verbessern.
              </Text>
            </div>

            <div className={styles.cookieGroup}>
              <div className={styles.cookieHeader}>
                <Text as="h4" style={{ margin: 0 }}>
                  Funktionale Cookies
                </Text>
                <input 
                  type="checkbox" 
                  checked={consent.functional} 
                  onChange={(e) => handleChangeConsent('functional', e.target.checked)}
                  className={styles.checkbox}
                />
              </div>
              <Text as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung.
              </Text>
            </div>

            <div className={styles.buttons}>
              <Button 
                text="Einstellungen speichern" 
                onClick={handleSaveSettings}
                style={{ marginRight: '1rem' }}
              />
              <Button 
                text="Abbrechen" 
                onClick={() => setShowSettings(false)}
              />
            </div>

            <div className={styles.links}>
              <Button 
                href="/cookies" 
                text="Cookie-Richtlinie" 
                underline
                target="_blank"
                style={{ marginRight: '1rem' }}
              />
              <Button 
                text="Alle Cookies ablehnen" 
                onClick={handleRevokeConsent}
                underline
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 