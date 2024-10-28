import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import logo from '../../img/logo.png';
import perfil from '../../img/perfil.png';
import './Navbar.css';

export const Navbar = () => {
    const { login, handlerLogout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <span className="nav-item nav-link text-pri mx-3">
                    <img src={logo} alt="User" />
                    <a className="navbar-brand" href="#">User Management</a>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{ color: "white" }} to="/">
                                Users
                            </NavLink>
                        </li>
                        {login?.isAdmin && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users/register">
                                        Save User
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/departments/register">
                                        Save Department
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/positions/register">
                                        Save Position
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-pri mx-3">
                        <img src={perfil} alt="User" />
                        {login?.user?.username}
                    </span>
                    <button onClick={handlerLogout} className="btn btn-outline-success">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};
