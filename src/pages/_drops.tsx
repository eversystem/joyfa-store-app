import { Header } from 'src/components/Header';
import { RecentDrops } from 'src/components/RecentDrops';

export const Drops: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <RecentDrops />
      </main>
    </>
  );
};
