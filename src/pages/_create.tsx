import { Header } from 'src/components/Header';
import { CreateForm } from 'src/components/CreateForm';
import { Footer } from 'src/components/Footer';

export const CreatePage: React.FC = () => {
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
