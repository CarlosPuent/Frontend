import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({ id, username, email, admin, departmentName, positionName }) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useAuth();

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{departmentName}</td> 
            <td>{positionName}</td> 

            {!login.isAdmin || (
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handlerUserSelectedForm({
                                id,
                                username,
                                email,
                                admin,
                                departmentName,
                                positionName
                            })}
                        >
                            Update
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            Remove
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};
