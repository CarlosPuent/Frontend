import { useEffect, useState } from "react";
import { useDepartments } from "../hooks/useDepartments";

export const DepartmentForm = ({ departmentSelected, handlerCloseForm }) => {
    
    const { initialDepartmentForm, handlerAddDepartment, errors } = useDepartments();

    const [departmentForm, setDepartmentForm] = useState(initialDepartmentForm);
    const { id, name } = departmentForm;

    useEffect(() => {
        setDepartmentForm(departmentSelected || initialDepartmentForm);
    }, [departmentSelected, initialDepartmentForm]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setDepartmentForm({
            ...departmentForm,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await handlerAddDepartment(departmentForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setDepartmentForm(initialDepartmentForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="name">Department Name</label>
                <input
                    className="form-control"
                    placeholder="Department Name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
                {errors?.name && <p className="text-danger">{errors.name}</p>}
            </div>
            <input type="hidden" name="id" value={id} />
            
            <div className="text-center">
                <button className="btn btn-primary" type="submit">
                    {id > 0 ? 'Edit' : 'Create'}
                </button>

                {handlerCloseForm && (
                    <button className="btn btn-secondary mx-2" type="button" onClick={onCloseForm}>
                        Close
                    </button>
                )}
            </div>
        </form>
    );
};
