import { DepartmentForm } from "./DepartmentForm"; 
import { useDepartments } from "../hooks/useDepartments"; 

export const DepartmentModalForm = () => {
    const { departmentSelected, handlerCloseForm } = useDepartments(); 

    return (
        <div className="modal fade show" style={{ display: "block", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {departmentSelected?.id > 0 ? 'Edit' : 'Save'} Department
                        </h5>
                        <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                    </div>
                    <div className="modal-body">
                        <DepartmentForm 
                            departmentSelected={departmentSelected} 
                            handlerCloseForm={handlerCloseForm} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
