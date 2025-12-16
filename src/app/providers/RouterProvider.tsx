import { RouterProvider as RRProvider } from 'react-router-dom';
import { router } from '../routing/AppRouter'; // ✅ import 'router', not 'AppRouter'

export const RouterProvider = () => {
  return <RRProvider router={router} />;
};