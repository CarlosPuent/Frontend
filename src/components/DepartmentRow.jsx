import { useAuth } from "../auth/hooks/useAuth";
import { useDepartments } from "../hooks/useDepartments";

export const DepartmentRow = ({ id, name }) => {
    const { handlerDepartmentSelectedForm, handlerRemoveDepartment } = useDepartments();
    const { login } = useAuth();

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>

            {login.isAdmin && (
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handlerDepartmentSelectedForm({ id, name })}
                        >
                            Update
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handlerRemoveDepartment(id)}
                        >
                            Remove
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};


