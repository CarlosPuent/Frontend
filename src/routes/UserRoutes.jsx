import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useSelector } from "react-redux"
import { RegisterDepPage } from "../pages/RegisterDepPage"

export const UserRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                <Route path="users/page/:page" element={<UsersPage />} />

                {!isAdmin || <>
                    <Route path="users/register" element={<RegisterPage />} />
                    {/*<Route path="departments/register" element={<RegisterDepPage />} />*/}
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                
                </>
                }
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    )
}