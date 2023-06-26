import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Drops } from './pages/_drops';
import { Nft } from './pages/_nft';
import { Create } from './pages/_create';
import { Profile } from './pages/_profile';
import { ProfileE } from './pages/_profile_edit';
import { UserProfile } from './pages/_user_profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Drops />} />
      <Route path="drops" element={<Drops />} />
      <Route path="create" element={<Create />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/edit" element={<ProfileE />} />
      <Route path="user/:address" element={<UserProfile />} />
      <Route path="nft">
        <Route path=":id" element={<Nft />} />
      </Route>
    </Route>,
  ),
);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
