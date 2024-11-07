import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Logout from './components/Logout.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import AllPostsPage from './pages/AllPostsPage.jsx'
import PostPage from './pages/PostPage.jsx'
import CategoryPostsPage from './pages/CategoryPostsPage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/add-post',
        element: <AddPostPage />
      },
      {
        path: '/edit-post/:slug',
        element: <EditPostPage />
      },
      {
        path: '/all-posts',
        element: <AllPostsPage />
      },
      {
        path: '/post/:slug',
        element: <PostPage />
      },
      {
        path: '/posts/technology',
        element: <CategoryPostsPage category="Technology" />
      },
      {
        path: '/posts/psychology',
        element: <CategoryPostsPage category="Psychology" />
      },
      {
        path: '/posts/automobile',
        element: <CategoryPostsPage category="Automobile" />
      },
      {
        path: '/posts/world-geography',
        element: <CategoryPostsPage category="World Geography" />
      },
      
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router = {router} />

  </Provider>
)
