import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import get from 'lodash/get';

export const DEFAULT_TOAST_ERROR_MESSAGE =
  'Oops! Something Went Wrong. Please Check Your Network And Try Again';

export const getBestErrorMessage = (
  errorResponse: object,
  bestErrorMessage = DEFAULT_TOAST_ERROR_MESSAGE,
) => {
  if (get(errorResponse, ['message'], false)) {
    bestErrorMessage = get(errorResponse, ['message'], '');
  }

  if (get(errorResponse, ['response', 'data', 'message'], false)) {
    bestErrorMessage = get(errorResponse, ['response', 'data', 'message'], '');
  }

  if (bestErrorMessage === 'Internal server error') {
    // or the error response is 500
    bestErrorMessage =
      'Oops! Something Went Wrong On Our End, Our Engineers Are Already Notified And Are Working On It. Please Check Back Shortly';
  }

  if (bestErrorMessage === 'Network Error') {
    bestErrorMessage = 'No Network Connection. Please Check Your Network And Try Again';
  }

  return bestErrorMessage;
};

const doNothing = () => {
  // Do nothing;
};

export class ToastService {
  static success(message: string, duration = 10000) {
    return toast.success(message);
  }

  static confirmDelete(action: () => void) {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => action(),
        },
        {
          label: 'No',
          onClick: () => doNothing(),
        },
      ],
    });
  }

  static error(error: object | string): void {
    if (typeof error === 'string') {
      toast.error(error);
      return;
    }
    const errorMessage = getBestErrorMessage(error);
    if (typeof error === 'string') {
      toast.error(errorMessage);
      return;
    }
    toast.error('An Error Occured');
  }
}
