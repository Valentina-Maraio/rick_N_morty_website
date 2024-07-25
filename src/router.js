import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const Details = lazy(() => import('./pages/Details'));
const Favorites = lazy(() => import('./pages/Favorites'));

const Loading = () => <div>Loading...</div>;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/details/:characterID',
        element: (
            <Suspense fallback={<Loading />}>
                <Details />
            </Suspense>
        ),
    },
    {
        path: '/favorites',
        element: (
            <Suspense fallback={<Loading />}>
                <Favorites />
            </Suspense>
        ),
    }
]);
