import axios from "axios";

const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export const getAdverts = () => {
    return api.get('/adverts');
};

export const signup = payload => {
    return api.post('/users/signup', payload);
};

export const login = payload => {
    return api.post('/users/login', payload);
};

export const createForm = payload => {
    return api.post('/forms', payload);
};

export const createAdvert = payload => {
    return api.post('/adverts', payload);
};

export const deleteAdvert = (id, payload) => {
    return api.delete(`/adverts/${id}`, payload);
};

const apis = {
    getAdverts,
    signup,
    login,
    createForm,
    createAdvert,
    deleteAdvert
};

export default apis;