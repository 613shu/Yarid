import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import GamePage from "../pages/GamePage";
import { ProtectedRouts } from "./ProtectedRouts";
import type { Profile } from "../typs/userType";
import { DecorationPage } from "../pages/DecorationPage";
import { ProductPage } from "../pages/ProductsPage";
import {  AddStallPage } from "../pages/AddStallPage";



export const routs = createBrowserRouter(
    [
        {

            path: "/", element: <App />, children: [
                { path: "/login", element: <ProtectedRouts Profiles={["Guest"]} />, children: [{ path: "", element: <LoginPage /> }] },
                { path: "/register", element: <ProtectedRouts Profiles={["Guest"]} />, children: [{ path: "", element: <RegisterPage /> }] },
                { path: "*", element: <h3 style={{ backgroundColor: "red" }}>אין כאן כלום</h3> },
                {
                    path: "/game", element: <ProtectedRouts Profiles={["ADMIN", "Gvir", "MERCHANT"]} />,
                    children: [
                        { path: "", element: <GamePage /> },

                        {
                            path: "decoration", element: <DecorationPage/>
                        },
                        {
                            path: "products", element: <ProductPage/>
                        },
                        {
                            path: "addStall", element: <ProtectedRouts Profiles={["Gvir", "MERCHANT"]} />,
                            children: [{ path: "", element: <AddStallPage /> }]
                        }
                    ]
                }

            ]


        }

    ]
)