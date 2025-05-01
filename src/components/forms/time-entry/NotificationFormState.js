const useNotificationFormState = (notification) => {
  const input = {
    id: notification.id,
    comment: notification.id,
    status: notification.id,
    timestamp: notification.id,
  };

  return {
    input,
  };
};

export default useNotificationFormState;
