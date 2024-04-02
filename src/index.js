import React from "react"
import ReactDOM from "react-dom/client"
import { Link, RouterProvider, createHashRouter } from "react-router-dom"
import App from "./App"

const router = createHashRouter([
    {
        path: "/",
        element: 
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
        </>
    },
    {
        path: "/about",
        element: <h1>About</h1>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router={router}/>
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
)