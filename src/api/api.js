const BASE_URL = 'https://dummyjson.com';

const apiClient = async (endpoint, options = {}) => {
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
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (response.ok) {
            return data;
        }

        throw new Error(data.message || 'Something went wrong');
    } catch (error) {
        return Promise.reject(error.message || error);
    }
};

export const todosApi = {
    getAll: () => apiClient('/todos'),
    add: (todo) => apiClient('/todos/add', { body: todo }),
    update: (id, changes) => apiClient(`/todos/${id}`, { method: 'PUT', body: changes }),
    delete: (id) => apiClient(`/todos/${id}`, { method: 'DELETE' }),
    getByUser: (userId) => apiClient(`/todos/user/${userId}`),
};

// Example of how easy it is to add a new API resource:
// export const usersApi = {
//     getAll: () => apiClient('/users'),
//     getById: (id) => apiClient(`/users/${id}`),
// };
