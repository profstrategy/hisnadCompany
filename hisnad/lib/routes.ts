export const CLIENT_ROUTES = {
    PublicPages: {
        home: '/home',
        about: '/about',
        contact: '/contact',
        properties: {
            index:`/properties`,
            details: (id: string) => `/properties/${id}`,
            parallel: '/properties#inspection-form'
        },
        onboarding: {
            initialStep: '/onboarding/initial-step',
            finalStep: '/onboarding/final-step',
          },

          auth: {
            login: '/auth/login',
            forgotPassword: '/auth/forgot-password',
            password: {
              stepOne: '/password/step-one',
              stepTwo: '/password/step-two',
            },
          },
    },
    PrivatePages: {
        clientDashboard: {
        viewPackage: (id: string) => `/dashboard/packages/${id}`,
        },
    },
}