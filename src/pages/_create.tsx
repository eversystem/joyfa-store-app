import { Header } from 'src/components/Header';
import { CreateForm } from 'src/components/CreateForm';

export const Create: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <CreateForm />
      </main>
    </>
  );
};
