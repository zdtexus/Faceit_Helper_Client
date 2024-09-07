import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider/index';
import { Layout } from './components/layout';
import  Search  from './pages/search'; 
import  PlayerStats  from './pages/playerStats';
import  PlayerMatches  from './pages/playerMatches';
import PlayerMaps  from './pages/playerMaps';
import  Ranking  from './pages/ranking'; 
import  Esea  from './pages/esea';
import  PlayerBans  from './pages/playerBans';
import  PlayerPage  from './pages/player'; 
import  TgBot  from './pages/tg-bot';
import RedirectToHome  from './pages/notFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: ":nickname",
        element: <PlayerPage />,
        children: [
          { path: "stats", element: <PlayerStats /> },
          { path: "bans", element: <PlayerBans /> },
          { path: "matches", element: <PlayerMatches /> },
          { path: "maps", element: <PlayerMaps /> }
        ]
      },
      { path: "ranking", element: <Ranking /> },
      { path: "esea", element: <Esea /> },
      { path: "tg-bot", element: <TgBot /> },
      { path: "*", element: <RedirectToHome /> },
      { path: ":nickname/", element: <RedirectToHome /> }
    ]
  }
]);

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.");
}
