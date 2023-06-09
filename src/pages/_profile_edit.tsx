import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { ProfileEdit } from 'src/components/ProfileEdit';

export const ProfileE: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <ProfileEdit />
      </main>
      <Footer />
    </>
  );
};
