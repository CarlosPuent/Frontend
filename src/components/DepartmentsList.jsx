import { DepartmentRow } from "./DepartmentRow";
import { useDepartments } from "../hooks/useDepartments";
import { useAuth } from "../auth/hooks/useAuth";

export const DepartmentsList = () => {
    const { departments } = useDepartments();
    const { login } = useAuth();

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    {login.isAdmin && (
                        <>
                            <th>Update</th>
                            <th>Remove</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody style={{ color: "white" }}>
                {
                    departments.map(({ id, name }) => (
                        <DepartmentRow
                            key={id}
                            id={id}
                            name={name}
                        />
                    ))
                }
            </tbody>
        </table>
    );
};
