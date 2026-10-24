export const BASE_URL: string = import.meta.env.VITE_API_URL;

export const API_PATHS = {
AUTH: {
REGISTER: "/api/auth/register",
LOGIN: "/api/auth/login",
GETUSER: (id: string) => `/api/auth/${id}`,
},
} as const;
