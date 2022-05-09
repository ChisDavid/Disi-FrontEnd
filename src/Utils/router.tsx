import 'antd/dist/antd.css';
import { Home } from '../Pages/Home/Home';
import { LogIn } from '../Pages/LogIn/LogIn';
import { MainPage } from '../Pages/MainPage/MainPage';
import { SubscriptionPage } from '../Pages/SubscriptionPage/SubscriptionPage';
import { Pages } from './enums';

export interface IRoute {
    path: string;
    element: JSX.Element;
};

export const routes: IRoute[] = [
    { path: Pages.Main, element: <MainPage /> },
    { path: Pages.Home, element: <Home /> },
    { path: Pages.LogIn, element: <LogIn /> },
    { path: Pages.Subscription, element: <SubscriptionPage /> },
    { path: '*', element: <MainPage /> },
];