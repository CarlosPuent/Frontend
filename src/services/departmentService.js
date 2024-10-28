import departmentsApi from "../apis/departmentsApi"; 

const BASE_URL = ''; 

export const findAll = async () => {
    try {
        const response = await departmentsApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findAllPages = async (page = 0) => {
    try {
        const response = await departmentsApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const save = async ({ name }) => {
    try {
        return await departmentsApi.post(BASE_URL, {
            name,
        });
    } catch (error) {
        throw error;
    }
}

export const update = async ({ id, name }) => {
    try {
        return await departmentsApi.put(`${BASE_URL}/${id}`, {
            name,
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await departmentsApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}
