import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {
    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <table className="table">
            <thead>
                <tr style={{ color: "white" }}>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Department</th> 
                    <th>Position</th>
                    {!login.isAdmin || (
                        <>
                            <th>Update</th>
                            <th>Remove</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody style={{ color: "white" }}>
                {
                    users.map(({ id, username, email, admin, departmentName, positionName }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                            departmentName={departmentName} 
                            positionName={positionName} 
                        />
                    ))
                }
            </tbody>
        </table>
    );
};
