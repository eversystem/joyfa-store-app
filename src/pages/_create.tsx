import { Header } from 'src/components/Header';
import { CreateForm } from 'src/components/CreateForm';
import { Footer } from 'src/components/Footer';

export const Create: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <CreateForm />
      </main>
      <Footer />
    </>
  );
};
