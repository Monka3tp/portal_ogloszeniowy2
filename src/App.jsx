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
import "bootstrap/dist/css/bootstrap.css"


const HomePage = () => <h2>Strona Główna</h2>;


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


const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, postsRoute, createPostRoute]),
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
