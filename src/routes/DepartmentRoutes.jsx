import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { RegisterDepPage } from "../pages/RegisterDepPage"; 
import { DepartmentsPage } from "../pages/DepartmentsPage";
import { useSelector } from "react-redux";

export const DepartmentRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="departments/page/:page" element={<DepartmentsPage />} />

                {!isAdmin || <>
                    <Route path="departments/register" element={<RegisterDepPage />} />
                    <Route path="departments/edit/:id" element={<RegisterDepPage />} />
                </>
                }
                <Route path="/" element={<Navigate to="/departments" />} />
            </Routes>                               
        </>    
    );
};

{/* <>
<Navbar />
<Routes>
    <Route path="users" element={<UsersPage />} />
    <Route path="users/page/:page" element={<UsersPage />} />
    {/* <Route path="departments" element={<DepartmentsPage />} /> */}

//     {!isAdmin || <>
//         <Route path="users/register" element={<RegisterPage />} />
//         <Route path="users/edit/:id" element={<RegisterPage />} />
//     </>
//     }
//     <Route path="/" element={<Navigate to="/users" />} />
// </Routes>
// </>