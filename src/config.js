/**
 * Application Configuration
 * 
 * This file serves as the single source of truth for all configuration values.
 * It abstracts the environment variables (import.meta.env) away from the rest of the application.
 * 
 * If we ever switch to loading config from a JSON file or API at runtime, 
 * we only need to update this file.
 */

export const config = {
    api: {
        baseUrl: import.meta.env.VITE_BASE_URL || 'https://dummyjson.com',
        endpoints: {
            todos: import.meta.env.VITE_TODOS_PATH || '/todos',
            users: import.meta.env.VITE_USERS_PATH || '/users',
            login: import.meta.env.VITE_LOGIN_PATH || '/login',
            logging: import.meta.env.VITE_LOGGING_PATH || '/logging',
        },
    },
    // Future config sections can go here (e.g., featureFlags, analytics, etc.)
};
