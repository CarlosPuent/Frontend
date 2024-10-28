import { createSlice } from "@reduxjs/toolkit";

export const initialDepartmentForm = {
    id: 0,
    name: '',
};

const initialErrors = {
    name: '',
};

export const departmentsSlice = createSlice({
    name: 'departments',
    initialState: {
        departments: [],
        paginator: {},
        departmentSelected: initialDepartmentForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
    },
    reducers: {
        addDepartment: (state, action) => {
            state.departments = [
                ...state.departments,
                {
                    ...action.payload,
                }
            ];
            state.departmentSelected = initialDepartmentForm;
            state.visibleForm = false;
        },
        removeDepartment: (state, action) => {
            state.departments = state.departments.filter(dept => dept.id !== action.payload);
        },
        updateDepartment: (state, action) => {
            state.departments = state.departments.map(dept => {
                if (dept.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return dept;
            });
            state.departmentSelected = initialDepartmentForm;
            state.visibleForm = false;
        },
        loadingDepartments: (state, { payload }) => {
            state.departments = payload.content;
            state.paginator = payload;
            state.isLoading = false;
        },
        onDepartmentSelectedForm: (state, { payload }) => {
            state.departmentSelected = payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.departmentSelected = initialDepartmentForm;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload;
        }
    }
});

export const {
    addDepartment,
    removeDepartment,
    updateDepartment,
    loadingDepartments,
    onDepartmentSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = departmentsSlice.actions;
