import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Store } from './pages/_store';
import { Nft } from './pages/_nft';
import { Create } from './pages/_create';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Store />} />
      <Route path="store" element={<Store />} />
      <Route path="create" element={<Create />} />
      <Route path="nft">
        <Route path=":id" element={<Nft />} />
      </Route>
    </Route>,
  ),
);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
