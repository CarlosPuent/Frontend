import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPositionPage } from "../pages/RegisterPositionPage"
import { PositionsPage } from "../pages/PositionsPage"
import { useSelector } from "react-redux"

export const PositionRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="positions" element={<PositionsPage />} />
                <Route path="positions/page/:page" element={<PositionsPage />} />

                {!isAdmin || <>
                    <Route path="positions/register" element={<RegisterPositionPage />} />
                    <Route path="positions/edit/:id" element={<RegisterPositionPage />} />
                </>
                }
                <Route path="/" element={<Navigate to="/positions" />} />
            </Routes>
        </>
    )
}