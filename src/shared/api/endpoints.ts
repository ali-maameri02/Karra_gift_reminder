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
   clients: {
    base: "/api/clients",

    getById: (clientId: string) =>
      `/api/clients/${clientId}`,

    recipients: {
      base: (clientId: string) =>
        `/api/clients/${clientId}/recipients`,

      // confirmUpcomingGift: (
      //   clientId: string,
      //   recipientId: string          // hadi ta3na wela khatina el 3omdaaaaan
      // ) =>
      //   `/api/clients/${clientId}/recipients/${recipientId}/confirm-upcoming-gift`,
    },
  },
   deliveries: {
    base: "/api/deliveries",

    assign: "/api/deliveries/assign",

    tracking: (deliveryId: string) =>
      `/api/deliveries/${deliveryId}/tracking`,
  },
  notifications: {
    base: "/api/notifications",
  },
  orders: {
    base: "/api/orders",
    place: "/api/orders/place",
    status: "/api/orders/status",

    byId: (orderId: string) =>
      `/api/orders/${orderId}`,

    track: (orderId: string) =>
      `/api/orders/track/${orderId}`,
  },
   packs: {
    base: "/api/packs",

    byId: (packId: string) =>
      `/api/packs/${packId}`,
  },
    payments: {
    base: "/api/payments",
    byId: (paymentId: string) =>
      `/api/payments/${paymentId}`,
  },
} as const;
