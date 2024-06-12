import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import BookStore from './components/BookStore';

function App() {

  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <><Signup /></>
    },
    {
      path: '/login',
      element: <><Login /></>
    },
    {
      path: '/',
      element: <><BookStore /></>
    },
  ])
  return (
    <RouterProvider router={router} >

    </RouterProvider>

  )
}

export default App
