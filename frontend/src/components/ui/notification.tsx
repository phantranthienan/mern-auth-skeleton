import React from 'react';
import { useNotificationStore } from '@/stores/notification.store';
import { CircleCheck, Info, AlertTriangle, XCircle } from 'lucide-react';

const Notification: React.FC = () => {
  const { isVisible, message, type } = useNotificationStore();

  if (!isVisible) return null;

  return (
    <div className="toast toast-top toast-center">
      <div className={`alert alert-${type} alert-vertical sm:alert-horizontal`}>
        {type === 'info' && <Info size={24} />}
        {type === 'success' && <CircleCheck size={24} />}
        {type === 'warning' && <AlertTriangle size={24} />}
        {type === 'error' && <XCircle size={24} />}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
