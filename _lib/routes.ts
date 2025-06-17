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
      initialStep: "/onboarding/initial-step",
      finalStep: (userId?: string) => `/onboarding/final-step/${userId}`,
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
      viewPackage: (id: string) => `/dashboard/packages/${id}`,
      overview: "/client-dashboard/overview",
    },
    adminDashboard: {
      overview: "/admin-dashboard/overview",
    },
  },
};
