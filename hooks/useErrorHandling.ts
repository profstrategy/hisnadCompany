'use client';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useError } from '@/providers/error-provider';

export function useErrorHandling<T extends object>(useHook: () => T) {
  return function useWrappedHook() {
    const { setError } = useError();
    const result = useHook();

    useEffect(() => {
      if ('error' in result && result.error) {
        const error = result.error;

        console.log(error);
        if (error instanceof Error) {
          setError(error);
        } else if (error instanceof AxiosError) {
          setError(
            new Error(
              error?.response?.data?.message ||
                error?.message ||
                'An unexpected error occurred'
            )
          );
        } else if (error && typeof error === 'object' && 'message' in error) {
          setError(
            new Error((error as any)?.message || 'An unexpected error occurred')
          );
        } else {
          setError(new Error('An unexpected error occurred'));
        }
      }
    }, [result, setError]);

    return result;
  };
}
