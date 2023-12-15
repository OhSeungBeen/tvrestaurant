import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const defaultHandlers = {
  common: () => {},
  default: () => {},
  401: () => {},
  403: (errorMessage) => {
    toast.error(errorMessage, {
      onClose: () => {
        location.replace('/');
      },
    });
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
      const errorMessage = error.response.data.message;

      switch (true) {
        case handlers && !!handlers[httpStatus]:
          handlers[httpStatus]();
          break;
        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus](errorMessage);
          break;
        default:
          defaultHandlers.default();
      }

      defaultHandlers.common();
    },
    [handlers],
  );

  return { handleError };
}
