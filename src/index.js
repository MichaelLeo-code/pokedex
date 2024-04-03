import React from "react"
import ReactDOM from "react-dom/client"
import { Link, RouterProvider, createHashRouter, Outlet } from "react-router-dom"
import App from "./App"
import Pokemons from "./Pokemons"

const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "/:pageId",
                element: <Pokemons/>
            }
        ] 
    },
    {
        path: "/about",
        element: <h1>About</h1>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)