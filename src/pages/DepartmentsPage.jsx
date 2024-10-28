import { useEffect } from "react";
import { DepartmentModalForm } from "../components/DepartmentModalForm";
import { DepartmentsList } from "../components/DepartmentsList";
import { useDepartments } from "../hooks/useDepartments";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const DepartmentsPage = () => {

    const { page } = useParams();
    const {
        departments,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenForm,
        getDepartments,
    } = useDepartments();

    const { login } = useAuth();

    useEffect(() => {
        getDepartments(page);
    }, [, page]);
    
    if (isLoading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>

            {!visibleForm ||
                <DepartmentModalForm />}
            <div className="container my-4">
            <video autoPlay muted loop>
                <source src="./src/video/video2.mp4" type="video/mp4" />
            </video>
                <h2 style={{color: "white"}}>Departments App</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            New Department
                        </button>}

                        {
                            departments.length === 0
                            ? <div className="alert alert-warning">There are no departments in the system!</div>
                            : <>
                                <DepartmentsList />
                                <Paginator url="/departments/page" paginator={paginator} />
                              </>                        
                        }
                    </div>
                </div>
            </div>
        </>
    );
}