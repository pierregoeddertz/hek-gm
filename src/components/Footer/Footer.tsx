import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className}`.trim()}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.copy}>© {new Date().getFullYear()} HEK-GM. Alle Rechte vorbehalten.</p>
          <div className={styles.links}>
            <Link href="/imprint" className={styles.link}>Impressum</Link>
            <Link href="/privacy-policy" className={styles.link}>Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 