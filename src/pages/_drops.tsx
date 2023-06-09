import { Header } from 'src/components/Header';
import { RecentDrops } from 'src/components/RecentDrops';
import { Footer } from 'src/components/Footer';

export const Drops: React.FC = () => {
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
