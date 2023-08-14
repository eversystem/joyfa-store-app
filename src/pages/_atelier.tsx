import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { Atelier } from 'src/components/Atelier';

export const AtelierPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Atelier />
      </main>
      <Footer />
    </>
  );
};
