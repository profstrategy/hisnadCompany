import { auth } from "@/auth";
import { PaginatedResponse } from "@/constants/types";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

type QueryConfig<TQueryKey, TData> = {
  queryKey: TQueryKey;
  apiRoute: string;
  options?: Omit<AxiosRequestConfig, "url" | "method"> & {
    enabled?: boolean;
    retry?: number;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    refetchOnReconnect?: boolean;
    refetchInterval?: number | false;
    cacheTime?: number;
  };
};

type QueryConfigWithParams<TQueryKey, TData> = QueryConfig<TQueryKey, TData> & {
  params?: Record<string, string | number | boolean | null>;
};

type MutationConfig<TVariables, TData> = {
  apiRoute: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TVariables;
  options?: Omit<AxiosRequestConfig, "url" | "method"> & {
    enabled?: boolean;
  };
};

const axiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export function useAppQueryHandler<
  TData = unknown,
  TError = AxiosError,
  TQueryKey extends Array<unknown> = unknown[],
>(config: QueryConfig<TQueryKey, TData>): UseQueryResult<TData, TError> {
  const { queryKey, apiRoute, options } = config;

  const query = useQuery<TData, TError>({
    queryKey: queryKey,
    queryFn: async () => {
      const session = await auth();
      const token = session?.user.accessToken;
      const response = await axiosInstance.get(apiRoute, {
        ...options,
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      if (!response?.data) {
        throw new Error(
          "No data received from server. It may be network issue"
        );
      }

      return response.data;
    },
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled !== false,
  });

  return useErrorHandling(() => query)();
}

export function useAppMutationHandler<
  Tvariables = unknown,
  TData = unknown,
  TError = AxiosError,
>(
  config: MutationConfig<Tvariables, TData>
): UseMutationResult<NonNullable<TData>, TError, Tvariables> {
  const { apiRoute, method, body, options } = config;

  const mutation = useMutation<NonNullable<TData>, TError, Tvariables>({
    mutationFn: async (variables: Tvariables) => {
      const session = await auth();
      const token = session?.user?.accessToken ?? "";

      const response = await axiosInstance.request<TData>({
        url: apiRoute,
        method,
        data: body ?? variables,
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response?.data) {
        throw new Error(
          "No data received from server. It may be network issue"
        );
      }

      return response.data as NonNullable<TData>;
    },
    retry: 0,
  });

  return useErrorHandling(() => mutation)();
}

export function useAppQueryWithPaginatedResponseHandler<
  TError = AxiosError,
  TData = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  config: QueryConfigWithParams<TQueryKey, TData>
): UseQueryResult<TError, PaginatedResponse<TData>> {
  const { apiRoute, params, queryKey, options } = config;
  const query = useQuery<TError, PaginatedResponse<TData>>({
    queryKey: queryKey,
    queryFn: async () => {
      const session = await auth();
      const token = session?.user.accessToken;
      const queryParams = params
        ? Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== null && value !== undefined) {
                acc[key] =
                  typeof value === "string" ? value.toLowerCase() : value;
              }
              return acc;
            },
            {} as Record<string, any>
          )
        : undefined;

      const response = await axiosInstance.get(apiRoute, {
        ...options,
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      if (!response?.data) {
        throw new Error(
          "No data received from server. It may be network issue"
        );
      }

      return (
        response.data ?? {
          count: 0,
          next: null,
          previous: null,
          results: [],
        }
      );
    },
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled !== false,
  });

  return useErrorHandling(() => query)();
}
