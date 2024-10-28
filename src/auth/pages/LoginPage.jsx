import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import './LoginPage.css';

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {

    const { handlerLogin } = useAuth();
    
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Validation Error', 'Username and password required', 'error');
        }
        handlerLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
        <div>
            <video autoPlay muted loop>
                <source src="./src/video/video2.mp4" type="video/mp4" />
            </video>
            <div className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <input
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={onInputChange}
                                />
                                <input
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    type="submit">
                                    Go
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}