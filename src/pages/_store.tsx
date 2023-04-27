import { Header } from 'src/components/Header';
import { NftList } from 'src/components/NftList';

export const Store: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <NftList />
      </main>
    </>
  );
};
