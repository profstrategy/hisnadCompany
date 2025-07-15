export const routes = {
    client_routes: {
        property: (id:string) =>  `/user-api/selected-property/${id}`
    }
}

/**
 * Generates a base query key from a route string by converting it to PascalCase
 *
 * @param route - The API route string to convert (e.g. 'core/admin/user-admin/')
 * @returns A PascalCase string suitable for use as a React Query key (e.g. 'CoreAdminUserAdmin')
 *
 * @example
 * generateBaseQueryKeyFromRoute('core/admin/user-admin/') // Returns 'CoreAdminUserAdmin'
 * generateBaseQueryKeyFromRoute('auth/login/') // Returns 'AuthLogin'
 */

export const generateBaseQueryFromRoute = (route: string) => {
  const segments = route.split("/").filter(Boolean);

  const PascalCase = segments
    .map((segment) =>
      segment
        .split("-")
        .map((words) => words.charAt(0).toUpperCase() + words.slice(1))
        .join("")
    )
    .join("_");

  return PascalCase;
};