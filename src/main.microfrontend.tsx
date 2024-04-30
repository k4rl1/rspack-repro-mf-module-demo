import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';

function domElementGetter(): HTMLElement {
    return document.getElementById('my-app');
}

const router = createBrowserRouter(routes, { basename: '/template-webpack-react' });

export const { bootstrap, mount, unmount } = singleSpaReact({
    React,
    ReactDOMClient,
    renderType: 'createRoot',
    rootComponent: () => <RouterProvider router={router} />,
    domElementGetter,
    errorBoundary() {
        // https://reactjs.org/docs/error-boundaries.html
        return <div>This renders when a catastrophic error occurs</div>;
    },
});

export default {};
