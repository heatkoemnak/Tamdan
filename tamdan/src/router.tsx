import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import { Tasks } from './components/Tasks';
import App from './App';
import NotFound from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
