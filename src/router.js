import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Details from "./routes/Details";
import Favorites from "./routes/Favorites";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/details',
        element: <Details/>
    },
    {
        path: '/favorites',
        element: <Favorites/>
    }
])