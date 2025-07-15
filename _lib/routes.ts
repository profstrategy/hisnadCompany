export const CLIENT_ROUTES = {
  PublicPages: {
    home: "/home",
    about: {
      index: "/about",
      details: (id: string) => `/about/${id}`,
    },
    contact: "/contact",
    properties: {
      index: `/properties`,
      onboarded: (slug: string, userId?: string | null) => {
        const baseUrl = `/properties/${encodeURIComponent(slug)}`;
        if (userId) {
          return `${baseUrl}/${encodeURIComponent(userId)}`;
        } else {
          return baseUrl;
        }
      },
      parallel: "/properties#inspection-form",
    },
    onboarding: {
      confirmAccess: '/onboarding/new-user/confirm-access',
      initialStep: "/onboarding/new-user/initial-step",
      finalStep: (userId?: string) => `/onboarding/new-user/final-step/${userId}`,
    },

    auth: {
      login: "/auth/login",
      forgotPassword: "/auth/forgot-password",
      resetPassword: '/auth/reset-password'
    },

    make_payment: (initializPaymentId: string, size:string | null, plan:string | null) => `/make-payment/${initializPaymentId}?size=${size}?plan=${plan}`,
  },
  PrivatePages: {
    clientDashboard: {
      overview: "/client-dashboard/overview",
      payments: "/client-dashboard/view-payments",
      properties: "/client-dashboard/view-properties",
      profile: '/client-dashboard/view-profile'
    },
    adminDashboard: {
      overview: "/admin-dashboard/overview",
    },
  },
};
