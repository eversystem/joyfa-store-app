import { Header } from 'src/components/Header';
import { NftList } from 'src/components/NftList';

export const Drops: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <NftList />
      </main>
    </>
  );
};
