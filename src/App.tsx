import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { DropsPage } from './pages/_drops';
import { NftPage } from './pages/_nft';
import { CreatePage } from './pages/_create';
import { ProfilePage } from './pages/_profile';
import { ProfileEditPage } from './pages/_profile_edit';
import { UserProfilePage } from './pages/_user_profile';
import { AtelierPage } from './pages/_atelier';
import { CollectionsPage } from './pages/_collections';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<DropsPage />} />
      <Route path="drops" element={<DropsPage />} />
      <Route path="create" element={<CreatePage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="profile/edit" element={<ProfileEditPage />} />
      <Route path="user/:address" element={<UserProfilePage />} />
      <Route path="nft">
        <Route path=":id" element={<NftPage />} />
      </Route>
      {/* [TODO] */}
      <Route path="mystudio">
        <Route path="atelier" element={<AtelierPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="nft/:contract/:id" element={<NftPage />} />
      </Route>
    </Route>,
  ),
);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
