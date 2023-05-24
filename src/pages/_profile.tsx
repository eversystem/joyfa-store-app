import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { ProfileView } from 'src/components/ProfileView';

export const Profile: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <ProfileView />
      </main>
      <Footer />
    </>
  );
};
