import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/details/:characterID',
        element: <Details/>
    },
    {
        path: '/favorites',
        element: <Favorites/>
    }
])