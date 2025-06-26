import { ApiResponseUserProperty } from "@/constants/types";
import { useAppQueryHandler } from "../client-constructor";
import { generateBaseQueryFromRoute, routes } from "../routes";

export async function useSingleUserProperty(id:string){
    const baseQueryKey = generateBaseQueryFromRoute(routes.client_routes.property(id))
    return useAppQueryHandler<ApiResponseUserProperty>(
        {
            apiRoute: routes.client_routes.property(id),
            queryKey: [baseQueryKey]
        }
    )
}