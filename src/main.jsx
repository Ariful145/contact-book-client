import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/Users.jsx";
import Update from "./components/Update.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App></App>,
   },
   {
      path: "/users",
      element: <Users></Users>,
      loader: () => fetch("https://contact-book-server.vercel.app"),
   },
   {
      path: "/update/:id",
      element: <Update></Update>,
      loader: ({ params }) =>
         fetch(`https://contact-book-server.vercel.app/${params.id}`),
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
