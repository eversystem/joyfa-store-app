import { Header } from 'src/components/Header';
import { RecentDrops } from 'src/components/RecentDrops';
import { Footer } from 'src/components/Footer';

export const DropsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <RecentDrops />
      </main>
      <Footer />
    </>
  );
};
