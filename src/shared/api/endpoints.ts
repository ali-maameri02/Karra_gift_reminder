export const ENDPOINTS = {
  users: {
    register: "/api/users/register",
    login: "/api/users/login",
    logout: "/api/users/logout",

    logoutAll: (userId: string) =>
      `/api/users/${userId}/logout-all`,

    logoutOthers: (userId: string) =>
      `/api/users/${userId}/logout-others`,

    changePassword: (userId: string) =>
      `/api/users/${userId}/change-password`,

    forgotPassword: "/api/users/forgot-password",
    resetPassword: "/api/users/reset-password",

    verify: (userId: string) =>
      `/api/users/${userId}/verify`,

    getById: (userId: string) =>
      `/api/users/${userId}`,

    profile: {
      get: (userId: string) =>
        `/api/users/${userId}/profile`,
      update: (userId: string) =>
        `/api/users/${userId}/profile`,
    },

    sessions: (userId: string) =>
      `/api/users/${userId}/sessions`,
  },
} as const;
