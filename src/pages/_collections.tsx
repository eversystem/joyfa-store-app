import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { Collections } from 'src/components/Collections';

export const CollectionsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Collections />
      </main>
      <Footer />
    </>
  );
};
