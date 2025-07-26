import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Director from '../../../components/Director';
import '../../globals.css';

export default function NewsSubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="shiftable subpage-header" />
      <Director as="main" id="app-container" className="shiftable">
        {children}
      </Director>
      <Footer className="shiftable" />
    </>
  );
} 