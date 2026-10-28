import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import GamePage from "../pages/GamePage";
import { ProtectedRouts } from "./ProtectedRouts";
import { DecorationPage } from "../pages/DecorationPage";
import { ProductPage } from "../pages/ProductsPage";
import { AddStallPage } from "../pages/AddStallPage";
import { HomePage } from "../pages/HomePage";
import Link from "../components/System/Link";
import { AdminPage } from "../pages/AdminPage";
import { CloseLayout } from "../components/System/CloseLayout";

export const routs = createBrowserRouter(
    [
        {
            path: "/", element: <App />, children: [
                { path: "/login", element: <ProtectedRouts Profiles={["Guest"]} />, children: [{ path: "", element: <LoginPage /> }] },
                { path: "/register", element: <ProtectedRouts Profiles={["Guest"]} />, children: [{ path: "", element: <RegisterPage /> }] },
                { path: "", element: <HomePage /> },
                { path: "/admin", element: <ProtectedRouts Profiles={["ADMIN"]} />, children: [{ path: "", element: <AdminPage /> }] },
                { path: "*", element: <div data-title="אבדנו בדרך" className="fair-panel fair-gate mx-auto w-fit text-center"><p className="text-6xl">🧭</p><h3 className="fair-title mt-3 text-2xl">אין כאן כלום</h3><Link to="/" content="חזרה לכיכר" className="fair-btn mt-6" /></div> },
                {
                    path: "/game", element: <ProtectedRouts Profiles={["ADMIN", "Gvir", "MERCHANT"]} />,
                    children: [
                        {
                            path: "", element: <GamePage />, children: [
                                {
                                    element: <CloseLayout />, children: [
                                        { path: "decoration", element: <DecorationPage /> },
                                        { path: "products", element: <ProductPage /> },
                                        {
                                            path: "addStall", element: <ProtectedRouts Profiles={["Gvir", "MERCHANT"]} />,
                                            children: [{ path: "", element: <AddStallPage /> }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
)