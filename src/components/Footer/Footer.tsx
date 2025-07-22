import Link from 'next/link';
import Director from '../Director';
import Unit from '../Unit';
import Text from '../Text';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className}`.trim()}>
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 1 }}>
        <Director direction="h 1 1" style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <Text style={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} HEK-GM. Alle Rechte vorbehalten.
          </Text>
          <Director direction="h 1 1" gapX style={{ alignItems: 'center' }}>
            <Link href="/impressum" className={styles.link}>
              <Text style={{ opacity: 0.6 }}>Impressum</Text>
            </Link>
            <Link href="/datenschutz" className={styles.link}>
              <Text style={{ opacity: 0.6 }}>Datenschutz</Text>
            </Link>
          </Director>
        </Director>
      </Unit>
    </footer>
  );
} 