import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { ProfileView } from 'src/components/ProfileView';
import { useParams } from 'react-router-dom';

export const UserProfilePage: React.FC = () => {
  const { address } = useParams();
  return (
    <>
      <Header />
      <main>{address && <ProfileView address={address} />}</main>
      <Footer />
    </>
  );
};
