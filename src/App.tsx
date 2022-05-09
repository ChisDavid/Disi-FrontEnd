import { initializeIcons } from '@fluentui/react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './Utils/router';

export const App = () => {
  initializeIcons();
  const navbarRouters = useRoutes(routes);
  return navbarRouters;
};
