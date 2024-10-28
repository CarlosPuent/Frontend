import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { DepartmentForm } from "../components/DepartmentForm"
import { useDepartments } from "../hooks/useDepartments";

export const RegisterDepPage = () => {

    const { departments = [], initialDepForm } = useDepartments();

    const [depSelected, setDepSelected] = useState(initialDepForm);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const department = departments.find(d => d.id == id) || initialDepForm;
            setDepSelected(department);
        }
    }, [id])

    return (
        <div className="container my-4">
            
            <h4 style={{color: "white"}}>{ departmentSelected.id > 0 ? 'Editar' : 'Registrar'} Department</h4>
            <div className="row">
                <div className="col">
                    <DepartmentForm departmentSelected={depSelected} />
                </div>
            </div>
        </div>
    )
}