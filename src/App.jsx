import {
  RouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import Header from "./Header";
import Announcement from "./Ogloszenia";
import AddAnnouncement from "./DodajOgloszenie";
import DetailedAnnouncement from "./DetOgloszenie";

import Account from "./Account";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { UserProvider } from "./UserContext";

import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.css"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootRoute = createRootRouteWithContext()({
  component: () => (
    <>
      <Header />
      <div style={{ padding: "10px", marginTop: "50px" }}>
        <Outlet />
      </div>
    </>
  ),
});

const mainRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Announcement
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: Announcement,
});

const createPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-post",
  component: AddAnnouncement,
});

const postDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts/$id',
  component: DetailedAnnouncement,
  notFoundComponent: () => <div>Nie znaleziono ogłoszenia</div>
});

const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
    component: Register
});

const router = createRouter({
  routeTree: rootRoute.addChildren([mainRoute, postsRoute, createPostRoute, postDetailRoute, accountRoute, loginRoute, registerRoute]),
  defaultNotFoundComponent: () => <div>Nie znaleziono strony</div>,
});


function App() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <UserProvider>
                <RouterProvider router={router}/>
                <ToastContainer position="bottom-right" />
            </UserProvider>
        </motion.div>
    );
}

export default App;
