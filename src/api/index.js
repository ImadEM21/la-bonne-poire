import axios from "axios";

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
}

const apis = {
    getAdverts,
    signup,
    login
};

export default apis;