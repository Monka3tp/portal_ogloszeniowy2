import React from "react";
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

// Strona główna
const HomePage = () => <h2>Strona Główna</h2>;

// Tworzymy główną trasę (root)
const rootRoute = createRootRouteWithContext()({
  component: () => (
    <>
      <Header />
      <div style={{ padding: "10px" }}>
        <Outlet />
      </div>
    </>
  ),
});

// Definiujemy podstrony
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
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

// Tworzymy router
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, postsRoute, createPostRoute]),
});

// Renderujemy aplikację
function App() {
  return <RouterProvider router={router} />;
}

export default App;
