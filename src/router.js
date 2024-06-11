import { createBrowserRouter } from "react-router-dom";
import App from './App'
import VistaPrinciapl from "./routes/VistaPrinciapl";
import DetallePersonaje from "./routes/DetallePersonaje";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/vista_principal',
        element: <VistaPrinciapl/>
    },
    {
        path: '/detalle_personaje',
        element: <DetallePersonaje/>
    }
])