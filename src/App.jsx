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
import DetailedAnnouncement from "./DetOgloszenie";
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

const postDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts/$id',
  component: DetailedAnnouncement,
  notFoundComponent: () => <div>Nie znaleziono ogłoszenia</div>
});

const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, postsRoute, createPostRoute, postDetailRoute]),
  defaultNotFoundComponent: () => <div>Nie znaleziono strony</div>,
});


function App() {
  return <RouterProvider router={router} />;
}

export default App;
