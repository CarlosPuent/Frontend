import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useUsers();
    
    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    const { id, username, password, email, admin, departmentName, positionName } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: !checked,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddUser(userForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <br />
            <div className="text-center mb-3">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.username}</p>
            </div>
            {id === 0 && (
                <div className="text-center mb-3">
                    <input
                        className="form-control d-inline w-75"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <p className="text-danger">{errors?.password}</p>
                </div>
            )}
            <div className="text-center mb-3">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.email}</p>
            </div>

            <div className="text-center mb-4">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Department Name"
                    name="departmentName"
                    value={departmentName}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.departmentName}</p>
            </div>

            <div className="text-center mb-5">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Position Name"
                    name="positionName"
                    value={positionName}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.positionName}</p>
            </div>

            <div className="form-check d-inline-block mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="adminCheckbox"
                    name="admin"
                    checked={admin}
                    onChange={onCheckboxChange}
                />
                <label htmlFor="adminCheckbox" className="form-check-label" style={{ color: "white" }}>
                    Admin
                </label>
            </div>
            <input type="hidden" name="id" value={id} />
            
            <div className="text-center">
                <button className="btn btn-primary" type="submit">
                    {id > 0 ? 'Editar' : 'Crear'}
                </button>

                {handlerCloseForm && (
                    <button className="btn btn-primary mx-2" type="button" onClick={onCloseForm}>
                        Cerrar
                    </button>
                )}
            </div>
        </form>
    );
};
