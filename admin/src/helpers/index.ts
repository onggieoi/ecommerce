import { NotificationManager } from 'react-notifications';

export const notification = (type = 'success' || 'error', message: string = '') => {
  NotificationManager[type](
    message,
    type === 'success' ? 'Successful' : 'Failed',
    2000,
  );
};