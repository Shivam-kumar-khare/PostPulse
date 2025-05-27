import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import store from "./store/store.js";
import { Provider, useSelector } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { AuthLayout, Login } from './components/index.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddPostPage, AllPostPage, EditPostPage, HomePage, LoginPage, Post_Page, SignupPage } from "./pages/index.js";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage  />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post_Page />,
      },
    ]

  }
])



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
