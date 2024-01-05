import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { defaultAxios } from '@lib/api/apiClient';
import { router } from '@tvrestaurant/contracts';

const defaultHandlers = {
  common: () => {},
  default: () => {},
  400: (error) => {
    const errorMessage = error.response.data.message;
    toast.error(errorMessage);
  },
  401: () => {},
  403: (error) => {
    const errorMessage = error.response.data.message;
    toast.error(errorMessage, {
      onClose: () => {
        location.href = '/login';
        return Promise.reject(error);
      },
    });
  },
  409: (error) => {
    const errorMessage = error.response.data.message;
    toast.error(errorMessage);
  },
  500: () => {},
};

export function useApiError(handlers?: { [httpStatus: number]: any }) {
  const handleError = useCallback(
    (
      error: AxiosError<{
        message: string;
      }>,
    ) => {
      const httpStatus = error.response.status;

      switch (true) {
        // 정의된 에러
        case handlers && !!handlers[httpStatus]:
          handlers[httpStatus]();
          break;
        // 공통 에러
        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus](error);
          break;
        // 정의되지 않은 에러
        default:
          defaultHandlers.default();
      }
      // 공통 로직
      defaultHandlers.common();
    },
    [handlers],
  );

  return { handleError };
}
