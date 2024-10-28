import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";


export const UsersPage = () => {

    const { page } = useParams();
    const {
        users,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers(page);
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
                <UserModalForm />}
            <div className="container my-4">
            <video autoPlay muted loop>
                <source src="./src/video/video2.mp4" type="video/mp4" />
            </video>
                <h2 style={{color: "white"}}>Users App</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            New User
                        </button>}

                        {
                            users.length === 0
                            ? <div className="alert alert-warning">There are no users in the system!</div>
                            : <>
                                <UsersList />
                                <Paginator url="/users/page" paginator={paginator} />
                              </>                        
                        }
                    </div>
                </div>
            </div>
        </>
    );
}