import React from "react";
// router dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//protected rotes
import ProtectedRotes from "./components/ProtectedRotes";

//layout
import MainLayout from "./layout/MainLayout";

//navigate
import { Navigate } from "react-router-dom"

//pages
import Home from "./pages/Home";
import Cart from './pages/Cart'
import Create from './pages/Create'
import Statics from './pages/Statics'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from "./pages/Single";

//context
import { GlobalContext } from "./context/useContextGlobal";
import { useContext } from "react";
import { useEffect } from "react";

//firebase

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

//action 

import {action as signupAction} from './pages/Register'
import {action as signinAction} from './pages/Login'

//loader
import { loader as singleLoader } from "./pages/Single";


export default function App() {

  const {user , dispatch , authChange} = useContext(GlobalContext);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRotes user={user}>
          <MainLayout />
        </ProtectedRotes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/statics",
          element: <Statics />,
        },
        {
          path: "/single/:id",
          element: <Single/>,
          loader: singleLoader
        },
      ],
    },
    {
      path: "/login",
      element:user ? <Navigate to="/" /> : <Login />,
      action: signinAction,
    },
    {
      path: "/register",
      element:user ? <Navigate to="/" /> : <Register />,
      action: signupAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type:"SIGN_IN",
        payload:user,
      })
      dispatch({
        type:"AUTH_CHANGE",
      })
    });
  }, [])

  return <>{authChange && <RouterProvider router={routes}/>}</>;
}
