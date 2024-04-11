import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createHashRouter, Navigate } from "react-router-dom"
import App from "./App"
import Pokemons from "./Pokemons"
import Test from "./i_tried_but_too_tired"
import './styles.css'; 

const router = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/1" replace />

    },
    {
        path: "/:pageId",
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
        element: <App/>,
        children:[
            {
                path: "/about",
                element:
                <>
                    <div style={{textAlign: 'center', position: 'fixed', top: '45%', left: '50%', transform: 'translate(-50%, -60%)', width: '50%'}}>  
                        <h2>About</h2>
                        <p>Michael Leo made this app. I wanted to make the pokecards look like actual deck cards,
                            thus when you click them, I wanted to make it feel like 'taking' them.
                            I wanted animation to go from their current position (whatever it was) to the very center of the screen.
                            I tried but I'm just too tired fighting with CSS, which I am not a pro at. Probably JS render has to be involved.
                            Going to be honest, I am kind angry with CSS. Worth considering using some libraries or frameworks... But I like custom too much!
                        </p>
                    </div>
                </>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)