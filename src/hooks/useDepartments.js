import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAllPages, remove, save, update } from "../services/departmentService";
import { useDispatch, useSelector } from "react-redux";
import {
    initialDepartmentForm,
    addDepartment,
    removeDepartment,
    updateDepartment,
    loadingDepartments,
    onDepartmentSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError
} from "../store/slices/users/departmentsSlice"; 
import { useAuth } from "../auth/hooks/useAuth";

export const useDepartments = () => {
    
    const { departments, departmentSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.departments);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login, handlerLogout } = useAuth();

    const getDepartments = async (page = 0) => {
        try {
            const result = await findAllPages(page);
            dispatch(loadingDepartments(result.data));
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    const handlerAddDepartment = async (department) => {
        let response;
        try {
            if (department.id === 0) {
                response = await save(department);
                dispatch(addDepartment(response.data));
            } else {
                response = await update(department);
                dispatch(updateDepartment(response.data));
            }

            Swal.fire(
                department.id === 0 ? 'Department Saved' : 'Department Updated',
                department.id === 0 ? 'The department has been created!' : 'The department has been updated!',
                'success'
            );
            handlerCloseForm();
            navigate('/departments');
        } catch (error) {
            if (error.response?.status === 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response?.status === 500 && error.response.data?.message?.includes('constraint')) {
                if (error.response.data?.message?.includes('UK_departmentName')) {
                    dispatch(loadingError({ name: 'Department name already exists!' }));
                }
            } else if (error.response?.status === 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    };

    const handlerRemoveDepartment = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this record?',
            text: "Careful, the department will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeDepartment(id));
                    Swal.fire('Department deleted!', 'The department has been successfully deleted!', 'success');
                } catch (error) {
                    if (error.response?.status === 401) {
                        handlerLogout();
                    }
                }
            }
        });
    };

    const handlerUpdateDepartment = (department) => {
        dispatch(onDepartmentSelectedForm(department));
        dispatch(onOpenForm());
    };

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
        dispatch(initialDepartmentForm());
    };

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({})); // Reinicia los errores al cerrar el formulario
    };

    return {
        departments,
        departmentSelected,
        initialDepartmentForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerOpenForm,
        getDepartments,
        handlerRemoveDepartment,
        handlerUpdateDepartment,
        handlerCloseForm,
        handlerAddDepartment,
    };
};
