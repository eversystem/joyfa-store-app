import { useAddress } from '@thirdweb-dev/react';
import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { ProfileView } from 'src/components/ProfileView';

export const ProfilePage: React.FC = () => {
  const address = useAddress();
  return (
    <>
      <Header />
      <main>{address && <ProfileView address={address} />}</main>
      <Footer />
    </>
  );
};
