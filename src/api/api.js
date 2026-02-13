const apiClient = async (url, options = {}) => {
    const { body, ...customConfig } = options;
    const headers = { 'Content-Type': 'application/json' };

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.ok) {
            return data;
        }

        throw new Error(data.message || 'Something went wrong');
    } catch (error) {
        return Promise.reject(error.message || error);
    }
};

import { config } from '../config';

const BASE_URL = config.api.baseUrl;
const TODOS_PATH = config.api.endpoints.todos;
const USERS_PATH = config.api.endpoints.users;

const TODOS_URL = `${BASE_URL}${TODOS_PATH}`;

export const todosApi = {
    getAll: () => apiClient(TODOS_URL),
    add: (todo) => apiClient(`${TODOS_URL}/add`, { body: todo }),
    update: (id, changes) => apiClient(`${TODOS_URL}/${id}`, { method: 'PUT', body: changes }),
    delete: (id) => apiClient(`${TODOS_URL}/${id}`, { method: 'DELETE' }),
    getByUser: (userId) => apiClient(`${TODOS_URL}/user/${userId}`),
};
