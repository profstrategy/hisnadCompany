export const CLIENT_ROUTES = {
    PublicPages: {
        home: '/home',
        about: {
          index: '/about',
          details: (id: string) => `/about/${id}`
        },
        contact: '/contact',
        properties: {
            index:`/properties`,
            details: (id: string) => `/properties/${id}`,
            selectProperty: ({ propertyId, userId }: { propertyId: string, userId: string }) => `/properties/${propertyId}/${userId}`,
            parallel: '/properties#inspection-form'
        },
        onboarding: {
            initialStep: '/onboarding/initial-step',
            finalStep: (userId?: string) =>  `/onboarding/final-step/${userId}`,
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
        overview: '/client-dashboard/overview'
        },
        adminDashboard: {
          overview: '/admin-dashboard/overview'
        }
    },
}