import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';

export const notification = (type = 'success' || 'error', message: string = '') => {
  NotificationManager[type](
    message,
    type === 'success' ? 'Successful' : 'Failed',
    2000,
  );
};

export const getFileName = (response: AxiosResponse): string => {
  const fileNameHeader = "content-disposition";

  const suggestedFileName = response.headers[fileNameHeader];

  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

  const matches = filenameRegex.exec(suggestedFileName);

  if (matches != null && matches[1]) {
    return matches[1].replace(/['"]/g, '');
  }

  return 'report.xlsx';
}

export const isEmptyOrUndefine = (value) => {
  return _.isEmpty(value) || _.isNull(value) || _.isUndefined(value)
};