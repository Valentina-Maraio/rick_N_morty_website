# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Marvel Characters App
## Introducción/Resumen
### Esta prueba consiste en la creación de una pequeña aplicación para obtener información sobre diferentes personajes de Marvel.


Marvel Characters App
Introducción/Resumen
Esta prueba consiste en la creación de una pequeña aplicación para obtener información sobre diferentes personajes de Marvel.

## Contenido
1. Características de la Aplicación
2. Diseño
3. Modos de Desarrollo y Producción
4. Presentación
5. Documentación y Utilidades
6. Descripción de las Vistas
 - Vista 1: Listado de personajes
 - Vista 2: Detalles de personaje
7. Stack Tecnológico
8. Requisitos
9. Instrucciones para Ejecutar la Aplicación
10. Arquitectura y Estructura del Proyecto

## Características de la Aplicación
- Vista Principal: Listado de 50 personajes o resultado de la búsqueda de personajes introducidos en el buscador.
- Vista de Detalle: Información detallada del personaje y los cómics en los que aparece.
- Responsive Design: Adaptabilidad a diferentes dispositivos.
- Modo Desarrollo y Producción: Diferenciación entre assets sin minimizar (desarrollo) y assets minimizados y concatenados (producción).
- Persistencia de Favoritos: Gestión y almacenamiento de personajes favoritos entre vistas.
- Accesibilidad y Usabilidad: Diseño accesible y fácil de usar.

## Diseño
### El diseño de las vistas sigue los estándares de responsive design y se adhiere a los diseños definidos en Figma:

- Diseños Figma para móviles
- Diseños Figma para escritorio

## Modos de Desarrollo y Producción
- Modo Desarrollo: Assets sin minimizar para facilitar la depuración.
- Modo Producción: Assets concatenados y minimizados para optimizar el rendimiento.

## Presentación
### El proyecto se presenta en un repositorio de código público (GitHub o Bitbucket) con la siguiente estructura y documentación:

- Código fuente de la aplicación.
- Archivo README detallando la ejecución, arquitectura, estructura y toda la información relevante del proyecto.

## Documentación y Utilidades
## API-REST

- URL de las peticiones: [Marvel API Gateway](http://gateway.marvel.com/v1/)
- Documentación de la API: [Documentación Marvel API](https://chatgpt.com/c/4022a1b1-6f5e-4003-bf1b-abfc110ca622#)
- Diseños e Iconos: [Enlace a recursos gráficos](https://chatgpt.com/c/4022a1b1-6f5e-4003-bf1b-abfc110ca622#)

## Descripción de las Vistas

### Vista 1 - Listado de personajes

- Interfaz: Sigue el diseño propuesto en Figma.
- Funcionalidad:
  - Mostrar los primeros 50 personajes.
  - Barra de búsqueda para filtrar personajes por nombre.
  - Contador de resultados actualizados en tiempo real.
  - Listado de resultados con imagen, nombre y opción de añadir a favoritos.
  - Redirección al detalle del personaje al hacer clic en un resultado.
  - Gestión de favoritos con persistencia y actualización del contador.

### Vista 2 - Detalles de personaje

- Interfaz: Sigue el diseño propuesto en Figma.
- Funcionalidad:
  - Mostrar imagen, título y descripción del personaje.
  - Opción de añadir el personaje a favoritos.
  - Listado de cómics ordenados por fecha de salida (primeros 20 cómics).

## Stack Tecnológico
- React: >= 17
- Node: >= 18
- CSS, SASS o StyledComponents: Para estilización.
- ContextAPI de React: Para gestión del estado.

## Instrucciones para Ejecutar la Aplicación

### Clonar el repositorio:

```
git clone <URL del repositorio>
cd nombre-del-repositorio
```

### Instalar dependencias:

```
npm install
```

### Modo Desarrollo:

````
npm run dev
````

### Modo Producción

````
npm run build
npm start
```